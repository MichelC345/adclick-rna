from fastapi import FastAPI, Depends, status
from pydantic import BaseModel
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import tensorflow as tf
from sqlalchemy.orm import Session
from .database import get_db
from .models import AdClickData
from .schemas import AdClickDataSchema

# Comando para executar: uvicorn app:app --reload
app = FastAPI()

# Executa a RNA treinada
model = load_model("adclick_model.keras")

#Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define um modelo para os dados do usuário
class UserData(BaseModel):
    age: int
    gender: str
    history: str
    device: str
    timeOfDay: str


# Executa o pré-processamento dos dados do usuário para realizar predições
# O mapeamento é feito conforme a conversão feita de dados categóricos para numéricos durante o treinamento
def preprocess_user_data(data: UserData, adPosition):
    # Definição de como deve ser o mapeamento
    gender_map = {
        'Masculino': [0, 1, 0],
        'Feminino': [1, 0, 0],
        'Prefiro não dizer': [0, 0, 1],  # Não-binário
    }

    device_map = {
        'Desktop': [1, 0, 0],
        'Mobile': [0, 1, 0],
        'Tablet': [0, 0, 1],
    }

    ad_position_map = {
        'Bottom': [1, 0, 0],  # Posição inferior
        'Side': [0, 1, 0],    # Esquerda/Direita
        'Top': [0, 0, 1],     # Superior
    }

    history_map = {
        'Educação': [1, 0, 0, 0, 0],
        'Entretenimento': [0, 1, 0, 0, 0],
        'Notícias': [0, 0, 1, 0, 0],
        'Shopping': [0, 0, 0, 1, 0],
        'Redes Sociais': [0, 0, 0, 0, 1],
    }

    time_of_day_map = {
        'Afternoon': [1, 0, 0, 0], # Tarde
        'Evening': [0, 1, 0, 0], # Final de tarde
        'Morning': [0, 0, 1, 0], # Manhã
        'Night': [0, 0, 0, 1], # Noite
    }

    # Mapeia cada variável
    gender_encoding = gender_map.get(data.gender, [0, 0, 1])  # Por padrão "Não-binário"
    device_encoding = device_map[data.device]
    ad_position_encoding = ad_position_map[adPosition]
    history_encoding = history_map[data.history]
    time_of_day_encoding = time_of_day_map[data.timeOfDay]

    # Combina as variáveis categóricas codificadas com as numéricas
    features = np.array([data.age] + gender_encoding + device_encoding + 
                        ad_position_encoding + history_encoding + time_of_day_encoding)

    return features.reshape(1, -1)  # A entrada será composta por 19 variáveis

# Função para predizer o click considerando os dados do usuário e a posição de um anúncio
def predict_click(data: UserData, adPosition):
    # Primeiro executa o processamento, e então executa a predição
    features = preprocess_user_data(data, adPosition)
    prediction = model(features)
    # Retorna a predição como float
    return tf.cast(prediction, tf.float32).numpy().item()

@app.post("/ad-positions")
# Função que retorna as predições para cada posição de acordo com os dados de um usuário
def get_ad_positions(data: UserData):
    #print(data)

    def calculate_position_probability(position):
        pred = predict_click(data, position)
        return 100*pred

    positions = {
        "top": calculate_position_probability("Top"),
        "bottom": calculate_position_probability("Bottom"),
        "left": calculate_position_probability("Side"),
        "right": calculate_position_probability("Side"),
    }

    return {"positions": positions}


@app.post("/store-ad")
# Função para armazenar os dados de um usuário efetivo no banco de dados
def store_ad_data(data: AdClickDataSchema, db: Session = Depends(get_db)):
    #print("armazenando dados")
    #print(data)
    ad_data = AdClickData(
        age=data.age,
        gender=data.gender,
        history=data.history,
        device=data.device,
        timeOfDay=data.timeOfDay,
        adPosition=data.adPosition,
        click=data.click
    )

    # Armazena os dados
    db.add(ad_data)
    db.commit()
    db.refresh(ad_data)

    # Retorna um código sinalizando sucesso na operação
    return {"message": "Os dados foram armazenados com sucesso!"}, status.HTTP_201_CREATED
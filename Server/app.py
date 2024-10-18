from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import tensorflow as tf


app = FastAPI()

model = load_model("adclick_model.keras")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a Pydantic model for the input data
class UserData(BaseModel):
    age: int
    gender: str
    history: str
    device: str
    timeOfDay: str

#class AdPositionData(BaseModel):
 #   userData: UserData
 #   timeOfDay: str

def preprocess_user_data(data: UserData, adPosition):
    gender_map = {
        'Masculino': [0, 1, 0, 0],  # Male
        'Feminino': [1, 0, 0, 0],  # Female
        'Non-Binary': [0, 0, 1, 0],  # Non-Binary (if applicable)
        'Prefiro não dizer': [0, 0, 0, 1],  # Unknown / Not Specified
    }

    device_map = {
        'Desktop': [1, 0, 0, 0],  # Desktop
        'Mobile': [0, 1, 0, 0],   # Mobile
        'Tablet': [0, 0, 1, 0],   # Tablet
        'Unknown': [0, 0, 0, 1],
    }

    ad_position_map = {
        'Top': [1, 0, 0, 0],     # Top position
        'Bottom': [0, 1, 0, 0],  # Bottom position
        'Side': [0, 0, 1, 0],    # Side position
        'Unknown': [0, 0, 0, 1],   # Unknown position
    }

    history_map = {
        'Shopping': [1, 0, 0, 0, 0, 0],  # Shopping
        'Notícias': [0, 1, 0, 0, 0, 0],  # News
        'Entretenimento': [0, 0, 1, 0, 0, 0],  # Entertainment
        'Educação': [0, 0, 0, 1, 0, 0],   # Education
        'Redes Sociais': [0, 0, 0, 0, 1, 0],  # Social Media
        'Unknown': [0, 0, 0, 0, 0, 1],
    }

    time_of_day_map = {
        'Morning': [1, 0, 0, 0, 0],   # Morning
        'Afternoon': [0, 1, 0, 0, 0], # Afternoon
        'Evening': [0, 0, 1, 0, 0],   # Evening
        'Night': [0, 0, 0, 1, 0],     # Night
        'Unknown': [0, 0, 0, 0, 1],
    }

    # Map each feature
    gender_encoding = gender_map.get(data.gender, [0, 0, 0, 1])  # Default to 'Unknown'
    device_encoding = device_map[data.device]
    ad_position_encoding = ad_position_map[adPosition]
    history_encoding = history_map[data.history]
    time_of_day_encoding = time_of_day_map[data.timeOfDay]

    # Combine all encoded features and age (numerical)
    features = np.array([data.age] + gender_encoding + device_encoding + 
                        ad_position_encoding + history_encoding + time_of_day_encoding)

    return features.reshape(1, -1)  # Shape as (1, 24) for model input

# Placeholder for your MLP model
def predict_click(data: UserData, adPosition):
    print("Executando função de predição", data, adPosition)
    # Simulate loading your trained MLP model here
    # Use the user_data to run the prediction
    #features = np.array([[data.age, data.gender, data.history, 
     #                     data.device, adPosition, data.timeOfDay]])
    features = preprocess_user_data(data, adPosition)
    print("features received", features)
    prediction = model(features)
    print("prediction:", prediction)
    # Convert prediction to binary class (0 or 1)
    predicted_class = tf.cast(prediction > 0.5, tf.int32).numpy().item()

    print("predicted class:", predicted_class)
    return predicted_class

# Run the server: uvicorn app:app --reload
@app.post("/ad-positions")
def get_ad_positions(data: UserData):
    print(data)
    # Mocked data for example purposes
    # Replace with actual MLP model prediction logic
    def calculate_position_probability(position):
        # Logic to determine click probability based on position and time of day
        #return np.random.randint(0, 100)
        pred = predict_click(data, position)
        if (pred): 
            return 100 
        else: 
            return 0

    positions = {
        "top": calculate_position_probability("Top"),
        "bottom": calculate_position_probability("Bottom"),
        "left": calculate_position_probability("Side"),
        "right": calculate_position_probability("Side"),
    }

    return {"positions": positions}

# Definição de como deve ser a entrada de dados na requisição de armazenamento
from pydantic import BaseModel

class AdClickDataSchema(BaseModel):
    age: int
    gender: str
    history: str
    device: str
    timeOfDay: str
    adPosition: str
    click: bool

    class Config:
        orm_mode = True

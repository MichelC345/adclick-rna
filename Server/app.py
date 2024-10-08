from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np

app = FastAPI()

# Define a Pydantic model for the input data
class UserData(BaseModel):
    age: int
    gender: str
    location: str
    preferences: list

# Placeholder for your MLP model
def predict_click(user_data):
    # Simulate loading your trained MLP model here
    # Use the user_data to run the prediction
    return {"clicked": np.random.choice([True, False])}

# Endpoint to receive user data and return prediction
@app.post("/predict")
def predict_ad(user_data: UserData):
    prediction = predict_click(user_data)
    return {"prediction": prediction}

# Run the server: uvicorn app:app --reload

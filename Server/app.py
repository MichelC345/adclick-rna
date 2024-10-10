from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
@app.post("/ad-positions")
def get_ad_positions(data: UserData):
    print(data)
    # Mocked data for example purposes
    # Replace with actual MLP model prediction logic
    def calculate_position_probability(position, time_of_day):
        # Logic to determine click probability based on position and time of day
        return np.random.randint(0, 100)

    positions = {
        "top": calculate_position_probability("top", data.timeOfDay),
        "bottom": calculate_position_probability("bottom", data.timeOfDay),
        "left": calculate_position_probability("left", data.timeOfDay),
        "right": calculate_position_probability("right", data.timeOfDay),
    }

    return {"positions": positions}

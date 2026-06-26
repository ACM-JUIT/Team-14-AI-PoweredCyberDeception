from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()


#load the trained model
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "isolation_forest_model.pkl")

model = joblib.load(MODEL_PATH)


class SessionFeatures(BaseModel):
    requests_per_minute: float
    failed_logins: float
    unique_paths: float
    post_get_ratio: float
    suspicious_keywords: float

@app.post("/score")
def score_session(session: SessionFeatures):

    features = np.array([[
        session.requests_per_minute,
        session.failed_logins,
        session.unique_paths,
        session.post_get_ratio,
        session.suspicious_keywords
    ]])

    prediction = model.predict(features)[0]
    anomaly_score = model.decision_function(features)[0]

    return {
        "prediction": int(prediction),
        "anomaly_score": float(anomaly_score)
    }
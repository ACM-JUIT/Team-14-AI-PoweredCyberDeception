from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI()

# Load trained model
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

    prediction = int(model.predict(features)[0])
    anomaly_score = float(model.decision_function(features)[0])

    # Convert anomaly score to risk score (0-100)
    risk_score = int((1 - (anomaly_score + 1) / 2) * 100)

    # Keep risk score between 0 and 100
    risk_score = max(0, min(100, risk_score))

    # Risk level
    if risk_score <= 30:
        risk_level = "Low"
    elif risk_score <= 70:
        risk_level = "Medium"
    else:
        risk_level = "High"

    return {
        "prediction": prediction,
        "anomaly_score": anomaly_score,
        "risk_score": risk_score,
        "risk_level": risk_level
    }
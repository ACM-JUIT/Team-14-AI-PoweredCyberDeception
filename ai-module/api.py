from score_normalizer import normalize_anomaly_score

import os
import logging
from contextlib import asynccontextmanager

import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel, Field


logger = logging.getLogger("uvicorn.error")


# -----------------------------
# Model path
# -----------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.environ.get(
    "MODEL_PATH",
    os.path.join(BASE_DIR, "..", "isolation_forest_model.pkl")
)


# -----------------------------
# Load model at startup
# -----------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Loading model from {MODEL_PATH} ...")

    app.state.model = joblib.load(MODEL_PATH)

    logger.info(f"Loaded model parameters: {app.state.model}")
    logger.info("Model loaded successfully at startup.")

    yield


app = FastAPI(lifespan=lifespan)


# -----------------------------
# Input data model
# -----------------------------

class SessionFeatures(BaseModel):
    requests_per_minute: float = Field(ge=0)
    failed_logins: float = Field(ge=0)
    unique_paths: float = Field(ge=0)
    post_get_ratio: float = Field(ge=0)
    suspicious_keywords: float = Field(ge=0, le=1)


# -----------------------------
# Health endpoint
# -----------------------------

@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": hasattr(app.state, "model")
    }


# -----------------------------
# Score endpoint
# -----------------------------

@app.post("/score")
def score_session(session: SessionFeatures):

    model = app.state.model

    features = np.array([[
        session.requests_per_minute,
        session.failed_logins,
        session.unique_paths,
        session.post_get_ratio,
        session.suspicious_keywords
    ]])

    prediction = model.predict(features)[0]

    anomaly_score = model.decision_function(features)[0]

    risk_score = normalize_anomaly_score(anomaly_score)

    return {
        "prediction": int(prediction),
        "anomaly_score": float(anomaly_score),
        "risk_score": risk_score
    }


# -----------------------------
# Explain endpoint
# -----------------------------

@app.post("/explain")
def explain_session(session: SessionFeatures):

    reasons = []

    if session.requests_per_minute > 100:
        reasons.append(
            f"Unusually high request rate: "
            f"{session.requests_per_minute}/min"
        )

    if session.failed_logins > 3:
        reasons.append(
            f"Multiple failed login attempts: "
            f"{session.failed_logins}"
        )

    if session.unique_paths > 30:
        reasons.append(
            f"High number of unique paths accessed: "
            f"{session.unique_paths}"
        )

    if session.post_get_ratio > 1:
        reasons.append(
            f"Unusually high POST-to-GET ratio: "
            f"{session.post_get_ratio}"
        )

    if session.suspicious_keywords == 1:
        reasons.append(
            "Suspicious keywords detected"
        )

    if not reasons:
        reasons.append(
            "No significant suspicious behavior detected"
        )

    return {
        "explanation": reasons
    }
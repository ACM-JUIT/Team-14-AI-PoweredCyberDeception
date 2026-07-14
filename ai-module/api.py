import os
import logging
from contextlib import asynccontextmanager

import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

logger = logging.getLogger("uvicorn.error")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.environ.get(
    "MODEL_PATH",
    os.path.join(BASE_DIR, "models", "isolation_forest_model.pkl")
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Loading model from {MODEL_PATH} ...")
    app.state.model = joblib.load(MODEL_PATH)
    logger.info("Model loaded successfully at startup.")
    yield


app = FastAPI(lifespan=lifespan)


class SessionFeatures(BaseModel):
    requests_per_minute: float
    failed_logins: float
    unique_paths: float
    post_get_ratio: float
    suspicious_keywords: float


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": hasattr(app.state, "model")}


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

    return {
        "prediction": int(prediction),
        "anomaly_score": float(anomaly_score)
    }
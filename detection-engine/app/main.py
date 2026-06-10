from fastapi import FastAPI

from app.models import RequestData
from app.scorer import calculate

app = FastAPI(
    title="PhantomShield Detection Engine"
)


@app.get("/")
def root():

    return {
        "message":
        "PhantomShield Detection Engine Running"
    }


@app.post("/analyze")
def analyze(request: RequestData):

    result = calculate(request)

    return result
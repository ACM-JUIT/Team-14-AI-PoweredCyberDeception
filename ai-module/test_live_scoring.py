import requests
from feature_extractor import extract_features


def test_live_scoring_flow():

    raw_session = {
        "requests": [
            {"method": "GET", "path": "/home"},
            {"method": "GET", "path": "/login"},
            {"method": "POST", "path": "/login"}
        ],
        "failed_logins": 2,
        "duration_seconds": 60
    }

    # Step 1: Extract features from raw session data
    features = extract_features(raw_session)

    print("Extracted Features:")
    print(features)

    # Step 2: Send extracted features to /score endpoint
    response = requests.post(
        "http://127.0.0.1:8000/score",
        json=features
    )

    print("\nAPI Response:")
    print(response.json())

    # Check API response
    assert response.status_code == 200

    result = response.json()

    assert "prediction" in result
    assert "anomaly_score" in result
    assert "risk_score" in result

    print("\nFull live scoring flow successful!")


if __name__ == "__main__":
    test_live_scoring_flow()
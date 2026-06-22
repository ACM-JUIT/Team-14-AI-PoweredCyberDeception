import os
import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csv_path = os.path.join(base_dir, "synthetic_cyber_dataset.csv")

data = pd.read_csv(csv_path)
print(data.columns)
X = data[
    [
        "requests_per_minute",
        "failed_logins",
        "unique_paths",
        "post_get_ratio",
        "suspicious_keywords"
    ]
]
print(X.head())
print(X.shape)
model = IsolationForest(
    contamination=0.1,
    random_state=42
)
model.fit(X)  # train  the model on dataset
print(model)

# Generate predictions for each session
predictions = model.predict(X)
# Add predictions to the dataset
data["prediction"] = predictions
print(data["prediction"].value_counts())
print(predictions[:10])

scores = model.decision_function(X)
# Add anomaly scores to the dataset
data["anomaly_score"] = scores
print(data.head())
print(data.tail())

# saved the trained model to a file
joblib.dump(model, "isolation_forest_model.pkl")

# Load the saved model to verify that it was stored correctly
loaded_model = joblib.load("isolation_forest_model.pkl")
print(loaded_model)

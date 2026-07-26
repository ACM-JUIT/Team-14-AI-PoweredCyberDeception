import os
import pandas as pd
import joblib
from sklearn.metrics import confusion_matrix, classification_report

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

csv_path = os.path.join(base_dir, "synthetic_cyber_dataset.csv")
model_path = os.path.join(base_dir, "isolation_forest_model.pkl")

data = pd.read_csv(csv_path)

features = [
    "requests_per_minute",
    "failed_logins",
    "unique_paths",
    "post_get_ratio",
    "suspicious_keywords"
]

X = data[features]

model = joblib.load(model_path)

# Model prediction: 1 = normal, -1 = anomaly
data["model_prediction"] = model.predict(X)

# Convert actual labels to same format
# Assuming: 0 = normal, 1 = attack
data["actual_prediction"] = data["label"].map({
    0: 1,
    1: -1
})

print("\nActual label counts:")
print(data["label"].value_counts())

print("\nModel prediction counts:")
print(data["model_prediction"].value_counts())

print("\nConfusion Matrix:")
print(
    confusion_matrix(
        data["actual_prediction"],
        data["model_prediction"],
        labels=[1, -1]
    )
)

print("\nClassification Report:")
print(
    classification_report(
        data["actual_prediction"],
        data["model_prediction"],
        labels=[1, -1],
        target_names=["Normal", "Attack"]
    )
)
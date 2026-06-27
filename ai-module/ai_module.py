import pandas as pd
import numpy as np

# Generate normal user sessions
normal_users = pd.DataFrame({
    "requests_per_minute": np.random.randint(5, 80, 1000),
    "failed_logins": np.random.randint(0, 4, 1000),
    "unique_paths": np.random.randint(2, 20, 1000),
    "post_get_ratio": np.random.uniform(0.05, 0.8, 1000),
    "suspicious_keywords": np.random.randint(0, 2, 1000)
})

# Label normal users as 0
normal_users["label"] = 0

print("Normal User Dataset:")
print(normal_users.head())

# Generate attack/anomalous sessions
attack_users = pd.DataFrame({
    "requests_per_minute": np.random.randint(300, 1500, 200),
    "failed_logins": np.random.randint(5, 30, 200),
    "unique_paths": np.random.randint(50, 200, 200),
    "post_get_ratio": np.random.uniform(1.5, 8.0, 200),
    "suspicious_keywords": np.ones(200, dtype=int)
})

# Label attack users as 1
attack_users["label"] = 1

print("\nAttack User Dataset:")
print(attack_users.head())

# Combine datasets
combined_dataset = pd.concat(
    [normal_users, attack_users],
    ignore_index=True
)

print("\nCombined Dataset Shape:")
print(combined_dataset.shape)

print("\nFirst 5 Rows:")
print(combined_dataset.head())

# Save dataset
combined_dataset.to_csv(
    "synthetic_cyber_dataset.csv",
    index=False
)

print("\nCombined dataset saved successfully!")
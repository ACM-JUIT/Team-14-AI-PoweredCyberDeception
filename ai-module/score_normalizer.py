def normalize_anomaly_score(anomaly_score: float) -> int:
    """
    Convert a raw Isolation Forest anomaly score
    into a normalized risk score from 0 to 100.
    """

    normalized_score = (1 - (anomaly_score + 1) / 2) * 100

    return int(max(0, min(100, normalized_score)))


if __name__ == "__main__":
    test_scores = [1.0, 0.5, 0.0, -0.5, -1.0]

    for score in test_scores:
        print(
            f"Raw score: {score} -> "
            f"Normalized score: {normalize_anomaly_score(score)}"
        )
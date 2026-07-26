SUSPICIOUS_KEYWORDS = [
    "admin",
    "password",
    "cmd",
    "shell",
    "exec",
    "select",
    "union",
    "drop"
]


def extract_features(raw_session_data):
    """
    Extract the 5 features required by the Isolation Forest model
    from raw session data.
    """

    # Get raw data
    requests = raw_session_data.get("requests", [])
    duration_seconds = raw_session_data.get("duration_seconds", 60)
    failed_logins = raw_session_data.get("failed_logins", 0)

    # 1. Calculate requests per minute
    duration_minutes = max(duration_seconds / 60, 1 / 60)
    requests_per_minute = len(requests) / duration_minutes

    # 2. Calculate number of unique paths
    paths = [
        request.get("path", "")
        for request in requests
    ]

    unique_paths = len(set(paths))

    # 3. Calculate POST/GET ratio
    get_count = sum(
        1
        for request in requests
        if request.get("method", "").upper() == "GET"
    )

    post_count = sum(
        1
        for request in requests
        if request.get("method", "").upper() == "POST"
    )

    post_get_ratio = post_count / max(get_count, 1)

    # 4. Check for suspicious keywords
    suspicious_keywords = int(
        any(
            keyword in request.get("path", "").lower()
            for request in requests
            for keyword in SUSPICIOUS_KEYWORDS
        )
    )

    # Return the 5 features required by the ML model
    return {
        "requests_per_minute": requests_per_minute,
        "failed_logins": failed_logins,
        "unique_paths": unique_paths,
        "post_get_ratio": post_get_ratio,
        "suspicious_keywords": suspicious_keywords
    }


# Test the feature extractor
if __name__ == "__main__":

    raw_session = {
        "requests": [
            {"method": "GET", "path": "/home"},
            {"method": "GET", "path": "/login"},
            {"method": "POST", "path": "/login"}
        ],
        "failed_logins": 2,
        "duration_seconds": 60
    }

    features = extract_features(raw_session)

    print("Extracted Features:")
    print(features)
SUSPICIOUS_PATHS = [
    "/admin",
    "/phpmyadmin",
    "/wp-admin",
    "/.env",
    "/config",
    "/backup",
]


def detect(path: str):

    if path.lower() in SUSPICIOUS_PATHS:

        return (
            60,
            [f"Suspicious path accessed: {path}"]
        )

    return 0, []
from collections import defaultdict

failed_logins = defaultdict(int)


def record_failure(ip):

    failed_logins[ip] += 1


def detect(ip):

    attempts = failed_logins[ip]

    if attempts >= 10:

        return (
            80,
            [f"Brute force suspected ({attempts} failures)"]
        )

    return attempts * 5, []
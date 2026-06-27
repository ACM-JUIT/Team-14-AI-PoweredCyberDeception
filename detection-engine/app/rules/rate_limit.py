from collections import defaultdict
from time import time

request_log = defaultdict(list)

WINDOW = 60


def track(ip):

    request_log[ip].append(time())


def detect(ip):

    now = time()

    request_log[ip] = [
        t
        for t in request_log[ip]
        if now - t < WINDOW
    ]

    count = len(request_log[ip])

    if count > 100:

        return (
            90,
            [f"Rate limit exceeded ({count}/min)"]
        )

    if count > 50:

        return (
            50,
            [f"High request volume ({count}/min)"]
        )

    return 0, []
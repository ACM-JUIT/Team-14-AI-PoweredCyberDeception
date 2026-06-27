BAD_AGENTS = [
    "sqlmap",
    "nikto",
    "nmap",
    "curl",
    "wget",
    "python-requests",
]


def detect(agent: str):

    agent = agent.lower()

    for bad in BAD_AGENTS:

        if bad in agent:

            return (
                50,
                [f"Suspicious user agent: {bad}"]
            )

    return 0, []
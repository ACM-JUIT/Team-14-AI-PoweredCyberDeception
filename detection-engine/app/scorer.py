from app.rules import (
    sql,
    xss,
    user_agent,
    url_scan,
    brute_force,
    rate_limit,
)


def get_action(score):

    if score >= 80:
        return "DECOY"

    if score >= 60:
        return "CHALLENGE"

    if score >= 30:
        return "MONITOR"

    return "ALLOW"


def get_threat_level(score):

    if score >= 80:
        return "CRITICAL"

    if score >= 60:
        return "HIGH"

    if score >= 30:
        return "MEDIUM"

    return "LOW"


def classify_attack(rule_scores):

    attack_types = []

    if rule_scores["sql"] > 0:
        attack_types.append("SQL_INJECTION")

    if rule_scores["xss"] > 0:
        attack_types.append("XSS")

    if rule_scores["url_scan"] > 0:
        attack_types.append("RECONNAISSANCE")

    if rule_scores["user_agent"] > 0:
        attack_types.append("AUTOMATED_SCANNER")

    if rule_scores["brute_force"] > 0:
        attack_types.append("BRUTE_FORCE")

    if rule_scores["rate_limit"] > 0:
        attack_types.append("RATE_LIMIT_EXCEEDED")

    if not attack_types:
        attack_types.append("NORMAL_TRAFFIC")

    return attack_types


def calculate(request):

    reasons = []

    rate_limit.track(request.ip)

    rule_scores = {
        "sql": 0,
        "xss": 0,
        "user_agent": 0,
        "url_scan": 0,
        "brute_force": 0,
        "rate_limit": 0,
    }

    body = request.body

    score, reason = sql.detect(body)
    rule_scores["sql"] = score
    reasons.extend(reason)

    score, reason = xss.detect(body)
    rule_scores["xss"] = score
    reasons.extend(reason)

    score, reason = url_scan.detect(
        request.path
    )
    rule_scores["url_scan"] = score
    reasons.extend(reason)

    score, reason = user_agent.detect(
        request.headers.get(
            "User-Agent",
            ""
        )
    )
    rule_scores["user_agent"] = score
    reasons.extend(reason)

    score, reason = brute_force.detect(
        request.ip
    )
    rule_scores["brute_force"] = score
    reasons.extend(reason)

    score, reason = rate_limit.detect(
        request.ip
    )
    rule_scores["rate_limit"] = score
    reasons.extend(reason)

    total_score = sum(
        rule_scores.values()
    )

    final_score = min(
        total_score,
        100
    )

    attack_types = classify_attack(
        rule_scores
    )

    return {
        "score": final_score,
        "threat_level":
            get_threat_level(
                final_score
            ),
        "action":
            get_action(
                final_score
            ),
        "attack_types":
            attack_types,
        "rule_scores":
            rule_scores,
        "reasons":
            reasons,
    }
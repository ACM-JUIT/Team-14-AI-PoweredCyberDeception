# Feature Documentation

## requests_per_minute

This feature represents the number of requests made by a user in one minute
 A very high number of requests may indicate unusual activity

## failed_logins

This feature stores the number of failed login attempts , multiple failed logins can be a sign of brute-force attacks

## unique_paths

This feature shows how many different paths or endpoints were visited during a session
 A large number of unique paths may indicate scanning behavior

## post_get_ratio

This feature represents the ratio of POST requests to GET requests Unusual ratios can help identify abnormal request patterns

## suspicious_keywords

This feature indicates whether suspicious keywords are present in the requests, it helps in identifying potentially malicious activity

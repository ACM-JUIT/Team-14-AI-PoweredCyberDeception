const SESSION_KEY = "decoy_session_id";

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = "session_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function logAction(action, details = {}) {
  const entry = {
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    action,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href,
    referrer: document.referrer || "direct",
  };

  // Store locally
  const existing = JSON.parse(localStorage.getItem("attack_log") || "[]");
  existing.push(entry);
  localStorage.setItem("attack_log", JSON.stringify(existing));

  console.log("[DECOY LOG]", entry);

  // Try to send to backend (Member 2's API)
  // Will fail silently if backend not ready yet
  fetch("http://localhost:8000/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  }).catch(() => {
    // Backend not ready yet — stored locally
  });
}

export function getLocalLogs() {
  return JSON.parse(localStorage.getItem("attack_log") || "[]");
}

export function clearLocalLogs() {
  localStorage.removeItem("attack_log");
}
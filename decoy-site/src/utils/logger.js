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
  };
  const existing = JSON.parse(localStorage.getItem("attack_log") || "[]");
  existing.push(entry);
  localStorage.setItem("attack_log", JSON.stringify(existing));
  console.log("[DECOY LOG]", entry);
}
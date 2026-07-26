const SESSION_KEY = "decoy_session_id";
const LOG_KEY = "attack_log";

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = "session_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function logAction(action, details = {}) {
  const entry = {
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    action,
    details,
    device: getDeviceInfo(),
    url: window.location.href,
    referrer: document.referrer || "direct",
  };

  const existing = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  existing.push(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(existing));
  console.log("[DECOY LOG]", entry);

  fetch("http://localhost:8000/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  }).catch(() => {});
}

export function getLocalLogs() {
  return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
}

export function clearLocalLogs() {
  localStorage.removeItem(LOG_KEY);
  console.log("[DECOY LOG] Logs cleared");
}

export function exportLogsAsJSON() {
  const logs = getLocalLogs();
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "attack_log.json";
  a.click();
}
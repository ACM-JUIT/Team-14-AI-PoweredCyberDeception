let actionLog = [];

export function trackAction(actionType, details = {}) {
  const entry = {
    actionType,
    details,
    timestamp: new Date().toISOString(),
  };
  actionLog.push(entry);
  console.log("[BEHAVIOR TRACKER]", entry);
}

export function getActionLog() {
  return actionLog;
}

export function clearActionLog() {
  actionLog = [];
  console.log("[BEHAVIOR TRACKER] Log cleared");
}
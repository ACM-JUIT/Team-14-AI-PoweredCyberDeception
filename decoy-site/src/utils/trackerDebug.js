import { getActionLog, clearActionLog } from "./behaviorTracker";

export function printActionLog() {
  console.log("===== FULL BEHAVIOR LOG =====");
  console.table(getActionLog());
}

export function resetTracker() {
  clearActionLog();
  console.log("Tracker reset complete.");
}
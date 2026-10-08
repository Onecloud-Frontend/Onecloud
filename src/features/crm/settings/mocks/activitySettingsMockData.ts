import type { ActivitySettings } from "../types/activitySettings.types";

export const activitySettingsMockData: ActivitySettings = {
  activityTypes: [
    { id: "CALL", name: "Call", enabled: true },
    { id: "MEETING", name: "Meeting", enabled: true },
    { id: "TASK", name: "Task", enabled: true },
    { id: "NOTE", name: "Note", enabled: true },
    { id: "EMAIL", name: "Email", enabled: true },
  ],
  priorities: ["LOW", "MEDIUM", "HIGH"],
  reminders: {
    enabled: true,
    defaultMinutesBefore: 15,
  },
  defaults: {
    activityType: "CALL",
    priority: "MEDIUM",
    durationMinutes: 30,
    reminderEnabled: true,
  },
};

import type { ActivityPriority, ActivityType } from "../../activities/types/activity.types";

export interface ActivityTypeSetting {
  id: string;
  name: string;
  enabled: boolean;
}

export interface ActivityReminderSettings {
  enabled: boolean;
  defaultMinutesBefore: number;
}

export interface ActivityDefaultSettings {
  activityType: ActivityType;
  priority: ActivityPriority;
  durationMinutes: number;
  reminderEnabled: boolean;
}

export interface ActivitySettings {
  activityTypes: ActivityTypeSetting[];
  priorities: ActivityPriority[];
  reminders: ActivityReminderSettings;
  defaults: ActivityDefaultSettings;
}

export type ActivitySettingsUpdate = ActivitySettings;

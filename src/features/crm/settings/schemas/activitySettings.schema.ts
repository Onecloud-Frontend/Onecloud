import { z } from "zod";

export const activitySettingsSchema = z.object({
  activityTypes: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      enabled: z.boolean(),
    }),
  ),

  priorities: z
    .array(z.enum(["LOW", "MEDIUM", "HIGH"]))
    .min(1, "Select at least one priority."),

  reminders: z.object({
    enabled: z.boolean(),
    defaultMinutesBefore: z
      .number()
      .min(0, "Reminder time cannot be negative."),
  }),

  defaults: z.object({
    activityType: z.enum(["CALL", "MEETING", "TASK", "NOTE", "EMAIL"]),

    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),

    durationMinutes: z.number().min(1, "Duration must be at least 1 minute."),

    reminderEnabled: z.boolean(),
  }),
});

export type ActivitySettingsFormValues = z.infer<typeof activitySettingsSchema>;

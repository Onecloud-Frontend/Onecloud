import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  activitySettingsSchema,
  type ActivitySettingsFormValues,
} from "../schemas/activitySettings.schema";

interface ActivitySettingsFormProps {
  defaultValues: ActivitySettingsFormValues;
  onSubmit: (values: ActivitySettingsFormValues) => void;
  submitting?: boolean;
}

const ActivitySettingsForm: React.FC<ActivitySettingsFormProps> = ({
  defaultValues,
  onSubmit,
  submitting = false,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivitySettingsFormValues>({
    resolver: zodResolver(activitySettingsSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Activity Types</h2>
          <p className="mt-1 text-sm text-slate-500">
            Enable or disable the activity types available when creating CRM activities.
          </p>
        </div>
        <div className="space-y-3">
          {defaultValues.activityTypes.map((activityType, index) => (
            <div
              key={activityType.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-800">{activityType.name}</p>
                <p className="text-xs text-slate-500">{activityType.id}</p>
              </div>
              <Controller
                name={`activityTypes.${index}.enabled`}
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                )}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Priorities</h2>
          <p className="mt-1 text-sm text-slate-500">
            Configure the priority values used by activities.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(["LOW", "MEDIUM", "HIGH"] as const).map((priority) => (
            <Controller
              key={priority}
              name="priorities"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={field.value.includes(priority)}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...field.value, priority]
                        : field.value.filter((value) => value !== priority);
                      field.onChange(next);
                    }}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {priority.charAt(0) + priority.slice(1).toLowerCase()}
                  </span>
                </label>
              )}
            />
          ))}
        </div>
        {errors.priorities && (
          <p className="mt-2 text-xs text-red-600">Select at least one priority.</p>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Reminders</h2>
          <p className="mt-1 text-sm text-slate-500">
            Set the reminder behavior used by default for activities.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Controller
            name="reminders.enabled"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Enable reminders</span>
              </label>
            )}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Default reminder time (minutes)
            </label>
            <Input
              type="number"
              min={0}
              {...register("reminders.defaultMinutesBefore", { valueAsNumber: true })}
            />
            {errors.reminders?.defaultMinutesBefore && (
              <p className="mt-1 text-xs text-red-600">
                {errors.reminders.defaultMinutesBefore.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Activity Defaults</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose the values used when a new activity is created.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Default activity type
            </label>
            <select
              {...register("defaults.activityType")}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
            >
              <option value="CALL">Call</option>
              <option value="MEETING">Meeting</option>
              <option value="TASK">Task</option>
              <option value="NOTE">Note</option>
              <option value="EMAIL">Email</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Default priority
            </label>
            <select
              {...register("defaults.priority")}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Default duration (minutes)
            </label>
            <Input
              type="number"
              min={1}
              {...register("defaults.durationMinutes", { valueAsNumber: true })}
            />
            {errors.defaults?.durationMinutes && (
              <p className="mt-1 text-xs text-red-600">
                {errors.defaults.durationMinutes.message}
              </p>
            )}
          </div>
          <Controller
            name="defaults.reminderEnabled"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">
                  Enable reminder by default
                </span>
              </label>
            )}
          />
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Activity Settings"}
        </Button>
      </div>
    </form>
  );
};

export default ActivitySettingsForm;

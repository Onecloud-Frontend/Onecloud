import React from "react";
import { Activity, Save } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import ActivitySettingsForm from "../forms/ActivitySettingsForm";
import {
  useActivitySettings,
  useUpdateActivitySettings,
} from "../hooks/useActivitySettings";
import type { ActivitySettingsFormValues } from "../schemas/activitySettings.schema";

const ActivitySettings: React.FC = () => {
  const { data, isLoading, isError, error } = useActivitySettings();
  const updateSettings = useUpdateActivitySettings();

  const handleSubmit = (values: ActivitySettingsFormValues) => {
    updateSettings.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Loading activity settings...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-sm font-semibold text-red-800">
          Unable to load activity settings
        </h2>
        <p className="mt-1 text-sm text-red-700">
          {error instanceof Error ? error.message : "Please try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-slate-100 p-2">
            <Activity className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Activity Settings
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Configure activity types, priorities, reminders, and activity
              defaults.
            </p>
          </div>
        </div>
        {updateSettings.isSuccess && (
          <div className="flex items-center gap-2 text-sm text-green-700">
            <Save className="h-4 w-4" />
            Settings saved
          </div>
        )}
      </div>

      <ActivitySettingsForm
        defaultValues={data}
        onSubmit={handleSubmit}
        submitting={updateSettings.isPending}
      />

      {updateSettings.isError && (
        <p className="text-sm text-red-600">
          {updateSettings.error instanceof Error
            ? updateSettings.error.message
            : "Unable to save activity settings."}
        </p>
      )}
    </div>
  );
};

export default ActivitySettings;

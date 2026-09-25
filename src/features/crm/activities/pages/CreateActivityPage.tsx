import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";
import ActivityForm from "../forms/ActivityForm";
import { useCreateActivity } from "../hooks/useActivities";
import type { ActivityFormValues } from "../schemas/activitySchema";
export const CreateActivityPage: React.FC = () => {
  const navigate = useNavigate();
  const createActivity = useCreateActivity();
  const handleSubmit = (values: ActivityFormValues) => {
    createActivity.mutate(values, {
      onSuccess: (activity) => {
        navigate(`/crm/activities/${activity.id}`);
      },
    });
  };
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-red-500">Create Activity</h1>
          </div>
          <p className="mt-1 text-sm font-bold text-black-500">
            Create a new CRM activity.
          </p>
        </div>
        <Button onClick={() => navigate("/crm/activities")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Activities
        </Button>
      </div>
      <ActivityForm
        onSubmit={handleSubmit}
        submitting={createActivity.isPending}
        submitLabel="Create Activity"
      />
      {createActivity.isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {createActivity.error instanceof Error
            ? createActivity.error.message
            : "Failed to create activity."}
        </div>
      )}
    </div>
  );
};

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import ActivityForm from "../forms/ActivityForm";
import { useActivity, useUpdateActivity } from "../hooks/useActivities";
import type { ActivityFormValues } from "../schemas/activitySchema";
const EditActivityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: activity, isLoading, isError } = useActivity(id ?? "");
  const updateActivity = useUpdateActivity();
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="rounded-lg border bg-white p-8 text-center">
          <p className="text-sm text-slate-900">Loading activity...</p>
        </div>
      </div>
    );
  }
  if (isError || !activity) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            Activity not found
          </h2>
          <p className="mt-2 text-sm text-red-600">
            The activity you are trying to edit could not be found.
          </p>
          <Link
            to="/crm/activities"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Back to Activities
          </Link>
        </div>
      </div>
    );
  }
  const defaultValues: ActivityFormValues = {
    activityType: activity.activityType,
    subject: activity.subject,
    description: activity.description ?? "",
    relatedLead: activity.relatedLead ?? "",
    relatedCustomer: activity.relatedCustomer ?? "",
    relatedContact: activity.relatedContact ?? "",
    relatedOpportunity: activity.relatedOpportunity ?? "",
    owner: activity.owner,
    priority: activity.priority,
    status: activity.status,
    startDate: activity.startDate,
    endDate: activity.endDate ?? "",
    dueDate: activity.dueDate ?? "",
    reminder: activity.reminder ?? false,
    location: activity.location ?? "",
    notes: activity.notes ?? "",
  };
  const handleSubmit = async (values: ActivityFormValues) => {
    try {
      await updateActivity.mutateAsync({
        id: activity.id,
        values,
      });
      navigate(`/crm/activities/${activity.id}`);
    } catch {}
  };
  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-1 text-2xl font-bold text-red-500">
              Edit Activity
            </h1>
            <p className="mt-1 text-sm text-slate-900">
              Update activity {activity.id}
            </p>
          </div>
          <Button onClick={() => navigate("/crm/activities")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Activities
          </Button>
        </div>
        <ActivityForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          submitting={updateActivity.isPending}
          submitLabel="Update Activity"
        />
        {updateActivity.isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              Failed to update activity.
            </p>
            <p className="mt-1 text-sm text-red-600">
              {updateActivity.error instanceof Error
                ? updateActivity.error.message
                : "Something went wrong while updating the activity."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export { EditActivityPage };
export default EditActivityPage;

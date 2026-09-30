import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Pencil,
  Phone,
  StickyNote,
  Users,
  ClipboardList,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import ActivityRelatedRecords from "../components/ActivityRelatedRecords";
import ActivityTimeline from "../components/ActivityTimeline";
import { useActivity, useCompleteActivity } from "../hooks/useActivities";
import type { ActivityType } from "../types/activity.types";
const typeConfig: Record<
  ActivityType,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  CALL: {
    label: "Call",
    icon: Phone,
    className: "bg-blue-50 text-blue-700",
  },
  MEETING: {
    label: "Meeting",
    icon: Users,
    className: "bg-purple-50 text-purple-700",
  },
  TASK: {
    label: "Task",
    icon: ClipboardList,
    className: "bg-orange-50 text-orange-700",
  },
  NOTE: {
    label: "Note",
    icon: StickyNote,
    className: "bg-yellow-50 text-yellow-700",
  },
  EMAIL: {
    label: "Email",
    icon: Mail,
    className: "bg-green-50 text-green-700",
  },
};
const formatDateTime = (value?: string) => {
  if (!value) {
    return "-";
  }
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const ActivityDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: activity,
    isLoading,
    isError,
    error,
    refetch,
  } = useActivity(id ?? "");
  const completeActivity = useCompleteActivity();
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
          <p className="mt-3 text-sm text-slate-900">Loading activity...</p>
        </div>
      </div>
    );
  }
  if (isError || !activity) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">Activity not found</h2>
          <p className="mt-1 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Unable to load this activity."}
          </p>
          <Button onClick={() => navigate("/crm/activities")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Activities
          </Button>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }
  const type = typeConfig[activity.activityType];
  const TypeIcon = type.icon;
  const handleComplete = () => {
    completeActivity.mutate(activity.id);
  };
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${type.className}`}
              >
                <TypeIcon className="h-4 w-4" />
                {type.label}
              </span>

              <span className="text-sm font-bold text-slate-900">
                {activity.id}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-bold text-slate-900">
              {activity.subject}
            </h1>

            <p className="mt-1 text-sm text-slate-900">
              Owned by {activity.owner}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/crm/activities/${activity.id}/edit`)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          {activity.status !== "COMPLETED" && (
            <Button
              onClick={handleComplete}
              disabled={completeActivity.isPending}
            >
              <CheckCircle2 className="h-4 w-4" />
              {completeActivity.isPending ? "Completing..." : "Complete"}
            </Button>
          )}
          <Button onClick={() => navigate("/crm/activities")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Activities
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-slate-900">
                Activity Information
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs text-slate-400">Activity ID</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {activity.id}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Type</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {type.label}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Priority</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {activity.priority}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Status</p>
                <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {activity.status.replace("_", " ")}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-400">Owner</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {activity.owner}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Reminder</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {activity.reminder ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-slate-900">
                Schedule
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-slate-400">Start Date</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDateTime(activity.startDate)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-slate-400">End Date</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDateTime(activity.endDate)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-slate-400">Due Date</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDateTime(activity.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Description
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {activity.description || "No description provided."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <StickyNote className="h-4 w-4 text-slate-900" />
                <h2 className="text-base font-semibold text-slate-900">
                  Notes
                </h2>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                {activity.notes || "No notes added."}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-900" />
                <h2 className="text-base font-semibold text-slate-900">
                  Location
                </h2>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                {activity.location || "No location specified."}
              </p>
            </div>
          </div>
          <ActivityTimeline activity={activity} />
        </div>
        <div className="space-y-6">
          <ActivityRelatedRecords activity={activity} />
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Activity Metadata
            </h2>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-slate-400">Created</p>
                <p className="mt-1 text-sm text-slate-700">
                  {formatDateTime(activity.createdDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Last Updated</p>
                <p className="mt-1 text-sm text-slate-700">
                  {formatDateTime(activity.updatedDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {completeActivity.isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {completeActivity.error instanceof Error
            ? completeActivity.error.message
            : "Unable to complete the activity."}
        </div>
      )}
      {completeActivity.isSuccess && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          Activity marked as completed successfully.
        </div>
      )}
    </div>
  );
};

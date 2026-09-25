import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Pencil,
  Plus,
} from "lucide-react";
import type { Activity } from "../types/activity.types";
interface ActivityTimelineProps {
  activity: Activity;
}
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
const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activity }) => {
  const events = [
    {
      title: "Activity created",
      description: "The activity was created.",
      date: activity.createdDate,
      icon: Plus,
    },
    {
      title: "Activity scheduled",
      description: `Start date: ${formatDateTime(activity.startDate)}`,
      date: activity.startDate,
      icon: CalendarDays,
    },
    ...(activity.updatedDate
      ? [
          {
            title: "Activity updated",
            description: "The activity information was updated.",
            date: activity.updatedDate,
            icon: Pencil,
          },
        ]
      : []),
    ...(activity.status === "COMPLETED"
      ? [
          {
            title: "Activity completed",
            description: "The activity has been completed.",
            date: activity.updatedDate ?? activity.startDate,
            icon: CheckCircle2,
          },
        ]
      : []),
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-900">
          Activity Timeline
        </h2>
        <p className="mt-1 text-sm text-slate-500">History of this activity.</p>
      </div>
      <div className="relative">
        <div className="absolute bottom-0 left-15px top-0 w-px bg-slate-200" />
        <div className="space-y-7">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <div
                key={`${event.title}-${index}`}
                className="relative flex gap-4"
              >
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-sm font-medium text-slate-900">
                      {event.title}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {formatDateTime(event.date)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {events.length === 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Circle className="h-4 w-4" />
          No timeline events available.
        </div>
      )}
      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <Clock3 className="h-3.5 w-3.5" />
        Last updated {formatDateTime(activity.updatedDate)}
      </div>
    </div>
  );
};
export default ActivityTimeline;

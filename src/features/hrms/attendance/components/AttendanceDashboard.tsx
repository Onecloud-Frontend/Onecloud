import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";

import type { AttendanceRecord } from "../types/attendance.types";

interface AttendanceDashboardProps {
  today: AttendanceRecord | null;
}

const formatTime = (value: string | null): string => {
  if (!value) {
    return "--";
  }

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const getWorkingDuration = (
  clockIn: string | null,
  clockOut: string | null,
): string => {
  if (!clockIn) {
    return "--";
  }

  const start = new Date(clockIn).getTime();
  const end = clockOut ? new Date(clockOut).getTime() : Date.now();

  const totalMinutes = Math.max(0, Math.floor((end - start) / 60000));

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
};

const getStatus = (today: AttendanceRecord | null): string => {
  if (!today) {
    return "Not started";
  }

  if (!today.clockOut) {
    return "In progress";
  }

  return "Completed";
};

export default function AttendanceDashboard({
  today,
}: AttendanceDashboardProps) {
  const status = getStatus(today);

  return (
    <section>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm font-medium text-brand-600">
          <CalendarDays className="h-4 w-4" />
          Today's Attendance
        </div>

        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          Attendance Dashboard
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View today's attendance status and working time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Status</p>

          <div className="mt-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-brand-600" />

            <p className="text-xl font-semibold text-slate-900">{status}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Clock In</p>

          <p className="mt-3 text-xl font-semibold text-slate-900">
            {formatTime(today?.clockIn ?? null)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Clock Out</p>

          <p className="mt-3 text-xl font-semibold text-slate-900">
            {formatTime(today?.clockOut ?? null)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Working Time</p>

          <div className="mt-3 flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-brand-600" />

            <p className="text-xl font-semibold text-slate-900">
              {getWorkingDuration(
                today?.clockIn ?? null,
                today?.clockOut ?? null,
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

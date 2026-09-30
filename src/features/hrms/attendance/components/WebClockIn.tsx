import { Clock3, LogIn, LogOut } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import type { AttendanceRecord } from "../types/attendance.types";

interface WebClockInProps {
  today: AttendanceRecord | null;
  isLoading: boolean;
  error: Error | null;
  onClockIn: () => void;
  onClockOut: () => void;
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

export default function WebClockIn({
  today,
  isLoading,
  error,
  onClockIn,
  onClockOut,
}: WebClockInProps) {
  const isClockedIn = Boolean(today?.clockIn);
  const isClockedOut = Boolean(today?.clockOut);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Clock3 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Web Clock</h2>
          <p className="text-sm text-slate-500">Record today's attendance</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Clock In
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {formatTime(today?.clockIn ?? null)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Clock Out
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {formatTime(today?.clockOut ?? null)}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error.message}
        </div>
      )}

      <div className="mt-6">
        {!isClockedIn && (
          <Button
            type="button"
            className="w-full sm:w-auto"
            disabled={isLoading}
            onClick={onClockIn}
          >
            <LogIn className="h-4 w-4" />
            {isLoading ? "Clocking in..." : "Clock In"}
          </Button>
        )}

        {isClockedIn && !isClockedOut && (
          <Button
            type="button"
            className="w-full sm:w-auto"
            disabled={isLoading}
            onClick={onClockOut}
          >
            <LogOut className="h-4 w-4" />
            {isLoading ? "Clocking out..." : "Clock Out"}
          </Button>
        )}

        {isClockedIn && isClockedOut && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            Today's attendance is completed.
          </div>
        )}
      </div>
    </section>
  );
}

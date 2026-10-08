import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import AttendanceDashboard from "../components/AttendanceDashboard";
import AttendanceLogs from "../components/AttendanceLogs";
import WebClockIn from "../components/WebClockIn";
import { getTodayDateKey } from "../api/attendanceService";
import { useAttendance } from "../hooks/useAttendance";

export default function AttendancePage() {
  const {
    data: records = [],
    isLoading,
    isError,
    error,
    refetch,
    clockInMutation,
    clockOutMutation,
  } = useAttendance();

  const today =
    records.find((record) => record.date === getTodayDateKey()) ?? null;

  const mutationError = clockInMutation.error ?? clockOutMutation.error;

  const isMutationLoading =
    clockInMutation.isPending || clockOutMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading attendance...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <AlertCircle className="mx-auto h-10 w-10 text-red-500" />

          <h1 className="mt-4 text-lg font-semibold text-slate-900">
            Unable to load attendance
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading attendance."}
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-5"
            onClick={() => void refetch()}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          HRMS
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Attendance Management
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Daily attendance tracking, web clock-in/out and attendance history.
        </p>
      </header>

      <AttendanceDashboard today={today} />

      <WebClockIn
        today={today}
        isLoading={isMutationLoading}
        error={mutationError}
        onClockIn={() => {
          clockInMutation.reset();
          void clockInMutation.mutateAsync();
        }}
        onClockOut={() => {
          clockOutMutation.reset();
          void clockOutMutation.mutateAsync();
        }}
      />

      <AttendanceLogs records={records} />
    </div>
  );
}

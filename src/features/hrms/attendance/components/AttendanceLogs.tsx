import type { AttendanceRecord } from "../types/attendance.types";

interface AttendanceLogsProps {
  records: AttendanceRecord[];
}

const formatDate = (value: string): string => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
};

const formatTime = (value: string | null): string => {
  if (!value) {
    return "--";
  }

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const getStatus = (record: AttendanceRecord): string => {
  if (!record.clockIn) {
    return "Not started";
  }

  if (!record.clockOut) {
    return "In progress";
  }

  return "Completed";
};

export default function AttendanceLogs({ records }: AttendanceLogsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Attendance Logs
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Attendance history for the current user.
        </p>
      </div>

      {records.length === 0 ? (
        <div className="p-8 text-center">
          <p className="font-medium text-slate-700">
            No attendance records found.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Clock in to create today's attendance record.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Clock In</th>
                <th className="px-6 py-4 font-semibold">Clock Out</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {formatDate(record.date)}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {formatTime(record.clockIn)}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {formatTime(record.clockOut)}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {getStatus(record)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

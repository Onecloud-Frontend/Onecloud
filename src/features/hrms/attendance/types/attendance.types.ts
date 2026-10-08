export interface AttendanceRecord {
  id: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
}

export interface AttendanceSummary {
  records: AttendanceRecord[];
  today: AttendanceRecord | null;
}

export type AttendanceStatus =
    | 'PRESENT'
    | 'ABSENT'
    | 'LATE'
    | 'HALF_DAY'
    | 'ON_LEAVE'
    | 'HOLIDAY';

export interface AttendanceLog {
    id: string;
    employeeId: string;
    date: string;             // ISO date (YYYY-MM-DD)
    clockIn: string | null;   // ISO datetime
    clockOut: string | null;
    workedHours: number | null;
    status: AttendanceStatus;
    note: string | null;
}

export interface ClockInPayload {
    employeeId: string;
    timestamp: string;
}
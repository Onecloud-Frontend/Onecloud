import type { AttendanceLog } from '../types';

export const mockAttendanceLogs: AttendanceLog[] = [
    {
        id: 'att-1', employeeId: 'emp-5', date: '2024-06-03',
        clockIn: '2024-06-03T09:02:00.000Z', clockOut: '2024-06-03T18:10:00.000Z',
        workedHours: 9.13, status: 'PRESENT', note: null,
    },
    {
        id: 'att-2', employeeId: 'emp-5', date: '2024-06-04',
        clockIn: '2024-06-04T09:45:00.000Z', clockOut: '2024-06-04T18:00:00.000Z',
        workedHours: 8.25, status: 'LATE', note: 'Traffic',
    },
    {
        id: 'att-3', employeeId: 'emp-6', date: '2024-06-03',
        clockIn: '2024-06-03T09:00:00.000Z', clockOut: '2024-06-03T18:00:00.000Z',
        workedHours: 9, status: 'PRESENT', note: null,
    },
];
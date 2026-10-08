import type { AttendanceRecord } from "../types/attendance.types";

const STORAGE_KEY = "onecloud.hrms.attendance.demo.v1";

const getDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const readRecords = (): AttendanceRecord[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as AttendanceRecord[];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

const saveRecords = (records: AttendanceRecord[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

const simulateNetworkDelay = async (): Promise<void> => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 300);
  });
};

export const attendanceService = {
  async getAttendanceLogs(): Promise<AttendanceRecord[]> {
    await simulateNetworkDelay();

    return readRecords().sort((a, b) => {
      return b.date.localeCompare(a.date);
    });
  },

  async clockIn(): Promise<AttendanceRecord> {
    await simulateNetworkDelay();

    const records = readRecords();
    const today = getDateKey(new Date());

    const existingRecord = records.some((record) => record.date === today);

    if (existingRecord) {
      throw new Error("Attendance has already been started for today.");
    }

    const record: AttendanceRecord = {
      id: `attendance-${Date.now()}`,
      date: today,
      clockIn: new Date().toISOString(),
      clockOut: null,
    };

    saveRecords([record, ...records]);

    return record;
  },

  async clockOut(): Promise<AttendanceRecord> {
    await simulateNetworkDelay();

    const records = readRecords();
    const today = getDateKey(new Date());

    const index = records.findIndex((record) => record.date === today);

    if (index === -1) {
      throw new Error("Please clock in before clocking out.");
    }

    const record = records[index];

    if (!record) {
      throw new Error("Attendance record could not be found.");
    }

    if (record.clockOut) {
      throw new Error("Attendance has already been completed for today.");
    }

    const updatedRecord: AttendanceRecord = {
      ...record,
      clockOut: new Date().toISOString(),
    };

    const updatedRecords = [...records];
    updatedRecords[index] = updatedRecord;

    saveRecords(updatedRecords);

    return updatedRecord;
  },
};

export const getTodayDateKey = (): string => {
  return getDateKey(new Date());
};

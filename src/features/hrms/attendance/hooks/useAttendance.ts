import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { attendanceService } from "../api/attendanceService";

const ATTENDANCE_QUERY_KEY = ["hrms", "attendance"];

export const useAttendance = () => {
  const queryClient = useQueryClient();

  const attendanceQuery = useQuery({
    queryKey: ATTENDANCE_QUERY_KEY,
    queryFn: attendanceService.getAttendanceLogs,
  });

  const clockInMutation = useMutation({
    mutationFn: attendanceService.clockIn,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ATTENDANCE_QUERY_KEY,
      });
    },
  });

  const clockOutMutation = useMutation({
    mutationFn: attendanceService.clockOut,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ATTENDANCE_QUERY_KEY,
      });
    },
  });

  return {
    ...attendanceQuery,
    clockInMutation,
    clockOutMutation,
  };
};

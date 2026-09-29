# OneCloud HRMS Developer Assignments & GitHub Issues

This document defines the precise folder ownership, branch names, and GitHub Issues for each of the 10 HRMS developers.

## Developer 1: HRMS Foundation & Integration Coordinator (P0)
- **Branch**: `feature/hrms-101-core-foundation`
- **Ownership**: `src/features/hrms/shared/`
- **Responsibility**: Scaffold shared types, employee mock data, employee service. Collate route definitions (does NOT modify core router/sidebar directly).

## Developer 2: Employee List (P1)
- **Branch**: `feature/hrms-201-employee-list`
- **Ownership**: `src/features/hrms/employees/`
- **Responsibility**: `EmployeeListPage`, `EmployeeTable` (MUI DataGrid), `EmployeeFilters`.

## Developer 3: Employee Details & Forms (P1)
- **Branch**: `feature/hrms-202-employee-details`
- **Ownership**: `src/features/hrms/employees/`
- **Responsibility**: `EmployeeDetailsPage`, `EmployeeCreatePage`, `EmployeeEditPage`, `EmployeeForm` (React Hook Form + Zod).

## Developer 4: Organization (P1)
- **Branch**: `feature/hrms-301-organization-management`
- **Ownership**: `src/features/hrms/organization/`
- **Responsibility**: `DepartmentsPage`, `DesignationsPage`, hierarchical `DepartmentTree`.

## Developer 5: Leave Dashboard (P1)
- **Branch**: `feature/hrms-401-leave-dashboard`
- **Ownership**: `src/features/hrms/leave/`
- **Responsibility**: `LeaveDashboardPage`, `LeaveBalanceCards`.

## Developer 6: Leave Application & Approvals (P1)
- **Branch**: `feature/hrms-402-leave-workflows`
- **Ownership**: `src/features/hrms/leave/`
- **Responsibility**: `LeaveRequestsPage`, `LeaveApplicationForm`.

## Developer 7: Attendance (P1)
- **Branch**: `feature/hrms-501-attendance-tracking`
- **Ownership**: `src/features/hrms/attendance/`
- **Responsibility**: `AttendanceDashboardPage`, `WebClockIn`, `AttendanceLogsPage`.

## Developer 8: Payroll (P1)
- **Branch**: `feature/hrms-601-payroll-management`
- **Ownership**: `src/features/hrms/payroll/`
- **Responsibility**: `PayrollDashboardPage`, `PayslipViewPage`, `PayslipTable`.

## Developer 9: Reports (P1)
- **Branch**: `feature/hrms-701-reports-generation`
- **Ownership**: `src/features/hrms/reports/`
- **Responsibility**: `ReportsPage`, `ReportGeneratorForm` (export engine).

## Developer 10: Global Dashboard (P2)
- **Branch**: `feature/hrms-801-global-dashboard`
- **Ownership**: `src/features/hrms/dashboard/`
- **Responsibility**: `DashboardPage`, `MetricCard`, `PendingApprovalsWidget`.

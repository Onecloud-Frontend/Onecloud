import { HRMS_ROUTES } from '../constants/hrmsRoutes';

export interface HrmsRouteDefinition {
    path: string;
    component: string;
    label: string;
    owner: string;
    group: 'main' | 'employees' | 'organization' | 'leave' | 'attendance' | 'payroll' | 'reports';
}

export const hrmsRouteDefinitions: HrmsRouteDefinition[] = [
    { path: HRMS_ROUTES.dashboard, component: 'features/hrms/dashboard/pages/DashboardPage', label: 'HRMS Dashboard', owner: 'Developer 10', group: 'main' },
    { path: HRMS_ROUTES.employees.list, component: 'features/hrms/employees/pages/EmployeesPage', label: 'Employees', owner: 'Developer 2', group: 'employees' },
    { path: HRMS_ROUTES.employees.create, component: 'features/hrms/employees/pages/EmployeeCreatePage', label: 'Create Employee', owner: 'Developer 3', group: 'employees' },
    { path: HRMS_ROUTES.employees.details(), component: 'features/hrms/employees/pages/EmployeeDetailsPage', label: 'Employee Details', owner: 'Developer 3', group: 'employees' },
    { path: HRMS_ROUTES.employees.edit(), component: 'features/hrms/employees/pages/EmployeeEditPage', label: 'Edit Employee', owner: 'Developer 3', group: 'employees' },
    { path: HRMS_ROUTES.organization.departments, component: 'features/hrms/organization/pages/DepartmentsPage', label: 'Departments', owner: 'Developer 4', group: 'organization' },
    { path: HRMS_ROUTES.organization.designations, component: 'features/hrms/organization/pages/DesignationsPage', label: 'Designations', owner: 'Developer 4', group: 'organization' },
    { path: HRMS_ROUTES.leave.dashboard, component: 'features/hrms/leave/pages/LeaveDashboardPage', label: 'Leave Dashboard', owner: 'Developer 5', group: 'leave' },
    { path: HRMS_ROUTES.leave.requests, component: 'features/hrms/leave/pages/LeaveRequestsPage', label: 'Leave Requests', owner: 'Developer 6', group: 'leave' },
    { path: HRMS_ROUTES.leave.apply, component: 'features/hrms/leave/pages/LeaveApplicationPage', label: 'Apply Leave', owner: 'Developer 6', group: 'leave' },
    { path: HRMS_ROUTES.attendance.dashboard, component: 'features/hrms/attendance/pages/AttendanceDashboardPage', label: 'Attendance', owner: 'Developer 7', group: 'attendance' },
    { path: HRMS_ROUTES.attendance.logs, component: 'features/hrms/attendance/pages/AttendanceLogsPage', label: 'Attendance Logs', owner: 'Developer 7', group: 'attendance' },
    { path: HRMS_ROUTES.payroll.dashboard, component: 'features/hrms/payroll/pages/PayrollDashboardPage', label: 'Payroll', owner: 'Developer 8', group: 'payroll' },
    { path: HRMS_ROUTES.payroll.payslip(), component: 'features/hrms/payroll/pages/PayslipViewPage', label: 'Payslip', owner: 'Developer 8', group: 'payroll' },
    { path: HRMS_ROUTES.reports.root, component: 'features/hrms/reports/pages/ReportsPage', label: 'Reports', owner: 'Developer 9', group: 'reports' },
];
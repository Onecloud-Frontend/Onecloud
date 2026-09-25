export const HRMS_ROUTES = {
    root: '/hrms',

    employees: {
        list: '/hrms/employees',
        create: '/hrms/employees/create',
        details: (id = ':id') => `/hrms/employees/${id}`,
        edit: (id = ':id') => `/hrms/employees/${id}/edit`,
    },

    organization: {
        departments: '/hrms/organization/departments',
        designations: '/hrms/organization/designations',
    },

    leave: {
        dashboard: '/hrms/leave',
        requests: '/hrms/leave/requests',
        apply: '/hrms/leave/apply',
    },

    attendance: {
        dashboard: '/hrms/attendance',
        logs: '/hrms/attendance/logs',
    },

    payroll: {
        dashboard: '/hrms/payroll',
        payslip: (id = ':id') => `/hrms/payroll/payslips/${id}`,
    },

    reports: { root: '/hrms/reports' },
    dashboard: '/hrms/dashboard',
} as const;
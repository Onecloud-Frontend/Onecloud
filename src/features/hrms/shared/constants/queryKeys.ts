export const hrmsQueryKeys = {
  all: ['hrms'] as const,

  employees: {
    all: () => [...hrmsQueryKeys.all, 'employees'] as const,
    list: (filters?: unknown) =>
      [...hrmsQueryKeys.employees.all(), 'list', filters] as const,
    detail: (id: string) =>
      [...hrmsQueryKeys.employees.all(), 'detail', id] as const,
  },

  departments: {
    all: () => [...hrmsQueryKeys.all, 'departments'] as const,
    list: () => [...hrmsQueryKeys.departments.all(), 'list'] as const,
    tree: () => [...hrmsQueryKeys.departments.all(), 'tree'] as const,
    detail: (id: string) =>
      [...hrmsQueryKeys.departments.all(), 'detail', id] as const,
  },

  designations: {
    all: () => [...hrmsQueryKeys.all, 'designations'] as const,
    list: (filters?: unknown) =>
      [...hrmsQueryKeys.designations.all(), 'list', filters] as const,
    detail: (id: string) =>
      [...hrmsQueryKeys.designations.all(), 'detail', id] as const,
  },

  leave: {
    all: () => [...hrmsQueryKeys.all, 'leave'] as const,
    balances: (employeeId?: string) =>
      [...hrmsQueryKeys.leave.all(), 'balances', employeeId] as const,
    requests: (filters?: unknown) =>
      [...hrmsQueryKeys.leave.all(), 'requests', filters] as const,
    request: (id: string) =>
      [...hrmsQueryKeys.leave.all(), 'request', id] as const,
  },

  attendance: {
    all: () => [...hrmsQueryKeys.all, 'attendance'] as const,
    logs: (filters?: unknown) =>
      [...hrmsQueryKeys.attendance.all(), 'logs', filters] as const,
    today: (employeeId: string) =>
      [...hrmsQueryKeys.attendance.all(), 'today', employeeId] as const,
  },

  payroll: {
    all: () => [...hrmsQueryKeys.all, 'payroll'] as const,
    payslips: (filters?: unknown) =>
      [...hrmsQueryKeys.payroll.all(), 'payslips', filters] as const,
    payslip: (id: string) =>
      [...hrmsQueryKeys.payroll.all(), 'payslip', id] as const,
  },
} as const;

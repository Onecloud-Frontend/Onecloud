import type { Designation } from '../types';

const t = '2024-06-01T00:00:00.000Z';

export const mockDesignations: Designation[] = [
    { id: 'des-1', title: 'Software Engineer', level: 3, departmentId: 'dept-1', createdAt: t, updatedAt: t },
    { id: 'des-2', title: 'Senior Software Engineer', level: 4, departmentId: 'dept-1', createdAt: t, updatedAt: t },
    { id: 'des-3', title: 'Engineering Manager', level: 5, departmentId: 'dept-1', createdAt: t, updatedAt: t },
    { id: 'des-4', title: 'HR Executive', level: 2, departmentId: 'dept-2', createdAt: t, updatedAt: t },
    { id: 'des-5', title: 'HR Manager', level: 5, departmentId: 'dept-2', createdAt: t, updatedAt: t },
    { id: 'des-6', title: 'Sales Executive', level: 2, departmentId: 'dept-3', createdAt: t, updatedAt: t },
    { id: 'des-7', title: 'Chief Technology Officer', level: 1, departmentId: null, createdAt: t, updatedAt: t },
];
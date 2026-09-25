import type { Department } from '../types';

const t = '2024-06-01T00:00:00.000Z';

export const mockDepartments: Department[] = [
    {
        id: 'dept-1', name: 'Engineering',
        description: 'Product engineering and platform teams',
        headId: 'emp-1', parentDepartmentId: null,
        createdAt: t, updatedAt: t,
    },
    {
        id: 'dept-2', name: 'Human Resources',
        description: 'People operations and culture',
        headId: 'emp-2', parentDepartmentId: null,
        createdAt: t, updatedAt: t,
    },
    {
        id: 'dept-3', name: 'Sales',
        description: 'Revenue and account management',
        headId: 'emp-3', parentDepartmentId: null,
        createdAt: t, updatedAt: t,
    },
    {
        id: 'dept-4', name: 'Frontend Engineering',
        description: 'Web and mobile clients',
        headId: 'emp-1', parentDepartmentId: 'dept-1',
        createdAt: t, updatedAt: t,
    },
    {
        id: 'dept-5', name: 'Backend Engineering',
        description: 'APIs and services',
        headId: 'emp-4', parentDepartmentId: 'dept-1',
        createdAt: t, updatedAt: t,
    },
];
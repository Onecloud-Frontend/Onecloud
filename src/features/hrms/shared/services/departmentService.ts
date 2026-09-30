import type { Department } from '../types';
import { mockDepartments } from '../mocks';

const USE_MOCK = true;
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export interface DepartmentTreeNode extends Department {
    children: DepartmentTreeNode[];
}

function buildTree(rows: Department[], parentId: string | null = null): DepartmentTreeNode[] {
    return rows
        .filter((d) => d.parentDepartmentId === parentId)
        .map((d) => ({ ...d, children: buildTree(rows, d.id) }));
}

export const departmentService = {
    async list(): Promise<Department[]> {
        if (USE_MOCK) { await delay(); return mockDepartments.slice(); }
        throw new Error('Department API contract not yet confirmed.');
    },

    async tree(): Promise<DepartmentTreeNode[]> {
        if (USE_MOCK) { await delay(); return buildTree(mockDepartments); }
        throw new Error('Department API contract not yet confirmed.');
    },
};
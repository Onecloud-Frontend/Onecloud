import type {
    Employee,
    EmployeeFilters,
    PaginatedEmployees,
} from '../types';
import { mockEmployees } from '../mocks';

const USE_MOCK = true;

const API_BASE = '/hrms/employees';
const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

function applyFilters(rows: Employee[], filters: EmployeeFilters): Employee[] {
    let out = rows.slice();

    if (filters.search) {
        const q = filters.search.toLowerCase();
        out = out.filter(
            (e) =>
                `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
                e.email.toLowerCase().includes(q) ||
                e.employeeId.toLowerCase().includes(q),
        );
    }
    if (filters.departmentId) out = out.filter((e) => e.departmentId === filters.departmentId);
    if (filters.designationId) out = out.filter((e) => e.designationId === filters.designationId);
    if (filters.status) out = out.filter((e) => e.status === filters.status);

    if (filters.sortBy) {
        const dir = filters.sortOrder === 'desc' ? -1 : 1;
        const key = filters.sortBy;
        out.sort((a, b) => {
            const av = a[key];
            const bv = b[key];
            if (av == null && bv == null) return 0;
            if (av == null) return 1;
            if (bv == null) return -1;
            return av > bv ? dir : av < bv ? -dir : 0;
        });
    }
    return out;
}

export const employeeService = {
    async list(filters: EmployeeFilters = {}): Promise<PaginatedEmployees> {
        if (USE_MOCK) {
            await delay();
            const filtered = applyFilters(mockEmployees, filters);
            const page = filters.page ?? 1;
            const limit = filters.limit ?? 10;
            const total = filtered.length;
            const totalPages = Math.max(1, Math.ceil(total / limit));
            const data = filtered.slice((page - 1) * limit, page * limit);
            return { data, total, page, limit, totalPages };
        }
        // Backend contract TBD — flip on once confirmed with integration owner.
        throw new Error('Employee API contract not yet confirmed.');
    },

    async getById(employeeId: string): Promise<Employee> {
        if (USE_MOCK) {
            await delay();
            const found = mockEmployees.find((e) => e.employeeId === employeeId);
            if (!found) throw new Error(`Employee ${employeeId} not found`);
            return found;
        }
        throw new Error('Employee API contract not yet confirmed.');
    },

    async create(payload: Omit<Employee, 'employeeId'>): Promise<Employee> {
        if (USE_MOCK) {
            await delay();
            const employee: Employee = {
                employeeId: `emp-${Date.now()}`,
                ...payload,
            };
            mockEmployees.push(employee);
            return employee;
        }
        throw new Error('Employee API contract not yet confirmed.');
    },

    async update(employeeId: string, payload: Partial<Employee>): Promise<Employee> {
        if (USE_MOCK) {
            await delay();
            const idx = mockEmployees.findIndex((e) => e.employeeId === employeeId);
            if (idx < 0) throw new Error(`Employee ${employeeId} not found`);
            mockEmployees[idx] = { ...mockEmployees[idx], ...payload };
            return mockEmployees[idx];
        }
        throw new Error('Employee API contract not yet confirmed.');
    },

    async remove(employeeId: string): Promise<void> {
        if (USE_MOCK) {
            await delay();
            const idx = mockEmployees.findIndex((e) => e.employeeId === employeeId);
            if (idx >= 0) mockEmployees.splice(idx, 1);
            return;
        }
        throw new Error('Employee API contract not yet confirmed.');
    },
};
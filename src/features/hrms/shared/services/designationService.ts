import type { Designation } from '../types';
import { mockDesignations } from '../mocks';

const USE_MOCK = true;
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const designationService = {
    async list(): Promise<Designation[]> {
        if (USE_MOCK) { await delay(); return mockDesignations.slice(); }
        throw new Error('Designation API contract not yet confirmed.');
    },

    async listByDepartment(departmentId: string): Promise<Designation[]> {
        if (USE_MOCK) {
            await delay();
            return mockDesignations.filter(
                (d) => d.departmentId === departmentId || d.departmentId === null,
            );
        }
        throw new Error('Designation API contract not yet confirmed.');
    },
};
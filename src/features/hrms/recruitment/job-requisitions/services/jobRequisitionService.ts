import type {
  JobRequisition,
  JobRequisitionFormValues,
  JobRequisitionListResult,
  JobRequisitionStatus,
} from '../types/jobRequisition.types';
import { mockJobRequisitions } from '../mocks/jobRequisitions.mock';

const STORAGE_KEY = 'onecloud.hrms.jobRequisitions';

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const readStore = (): JobRequisition[] => {
  if (typeof window === 'undefined') return clone(mockJobRequisitions);

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const initial = clone(mockJobRequisitions);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(stored) as JobRequisition[];
  } catch {
    const initial = clone(mockJobRequisitions);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
};

const writeStore = (items: JobRequisition[]) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

const nextId = (items: JobRequisition[]) => {
  const max = items.reduce((highest, item) => {
    const match = /^REQ-(\d+)$/.exec(item.id);
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 0);

  return `REQ-${String(max + 1).padStart(3, '0')}`;
};

class JobRequisitionService {
  async getRequisitions(): Promise<JobRequisitionListResult> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const data = readStore();
    return { data: clone(data), total: data.length };
  }

  async getRequisitionById(id: string): Promise<JobRequisition> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const requisition = readStore().find((item) => item.id === id);

    if (!requisition) {
      throw new Error(`Job requisition ${id} was not found.`);
    }

    return clone(requisition);
  }

  async createDraft(values: JobRequisitionFormValues): Promise<JobRequisition> {
    await new Promise((resolve) => setTimeout(resolve, 350));

    const now = new Date().toISOString();
    const items = readStore();
    const requisition: JobRequisition = {
      ...clone(values),
      id: nextId(items),
      status: 'DRAFT',
      createdAt: now,
      updatedAt: now,
    };

    writeStore([requisition, ...items]);
    return clone(requisition);
  }

  async updateDraft(id: string, values: JobRequisitionFormValues): Promise<JobRequisition> {
    await new Promise((resolve) => setTimeout(resolve, 350));

    const items = readStore();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Job requisition ${id} was not found.`);
    }

    const current = items[index];
    if (!['DRAFT', 'PENDING_APPROVAL'].includes(current.status)) {
      throw new Error('Only draft or pending-approval requisitions can be edited.');
    }

    const updated: JobRequisition = {
      ...current,
      ...clone(values),
      updatedAt: new Date().toISOString(),
    };

    items[index] = updated;
    writeStore(items);
    return clone(updated);
  }

  async updateStatus(id: string, status: JobRequisitionStatus): Promise<JobRequisition> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const items = readStore();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Job requisition ${id} was not found.`);
    }

    const current = items[index];
    const transitions: Record<JobRequisitionStatus, JobRequisitionStatus[]> = {
      DRAFT: ['PENDING_APPROVAL'],
      PENDING_APPROVAL: ['APPROVED'],
      APPROVED: ['JOB_OPENING'],
      JOB_OPENING: [],
    };

    if (!transitions[current.status].includes(status)) {
      throw new Error(`Cannot move a requisition from ${current.status} to ${status}.`);
    }

    const now = new Date().toISOString();
    const updated: JobRequisition = {
      ...current,
      status,
      updatedAt: now,
      ...(status === 'PENDING_APPROVAL' ? { submittedAt: now } : {}),
      ...(status === 'APPROVED' ? { approvedAt: now } : {}),
      ...(status === 'JOB_OPENING' ? { jobOpeningCreatedAt: now } : {}),
    };

    items[index] = updated;
    writeStore(items);
    return clone(updated);
  }
}

export const jobRequisitionService = new JobRequisitionService();

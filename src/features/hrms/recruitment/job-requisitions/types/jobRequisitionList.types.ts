import type { JobRequisition, JobRequisitionStatus, RequisitionPriority } from './jobRequisition.types';

export interface JobRequisitionFilterState {
  search: string;
  status: JobRequisitionStatus | '';
  department: string;
  hiringManager: string;
  priority: RequisitionPriority | '';
  expectedJoiningDate: string;
}

export interface JobRequisitionSortState {
  field: keyof JobRequisition;
  order: 'asc' | 'desc';
}

export interface JobRequisitionPaginationState {
  page: number;
  limit: number;
}

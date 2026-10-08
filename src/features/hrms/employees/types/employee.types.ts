export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT";

export type EmployeeStatus =
  | "ACTIVE"
  | "PROBATION"
  | "TERMINATED"
  | "ON_LEAVE";

export interface Employee {
  employeeId: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  departmentId: string;
  designationId: string;

  managerId: string | null;

  joiningDate: string;

  employmentType: EmploymentType;

  status: EmployeeStatus;

  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface EmployeeFilters {
  search?: string;

  departmentId?: string;

  designationId?: string;

  status?: EmployeeStatus;

  page?: number;

  limit?: number;

  sortBy?: keyof Employee;

  sortOrder?: "asc" | "desc";
}

export interface PaginatedEmployees {
  data: Employee[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}
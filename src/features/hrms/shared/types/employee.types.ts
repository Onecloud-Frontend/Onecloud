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
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
  status: 'ACTIVE' | 'PROBATION' | 'TERMINATED' | 'ON_LEAVE';
}

export interface EmployeeFilters {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
  designationId?: string;
  status?: Employee['status'];
  sortBy?: keyof Employee;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedEmployees {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

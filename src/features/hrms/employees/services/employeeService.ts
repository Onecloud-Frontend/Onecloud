import { Employee, EmployeeFilters, PaginatedEmployees } from '../../shared/types/employee.types';
import { mockEmployees } from '../mocks/employeesMockData';

class EmployeeService {
  async getEmployees(filters?: EmployeeFilters): Promise<PaginatedEmployees> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    let filteredData = [...mockEmployees];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredData = filteredData.filter(emp => 
          emp.firstName.toLowerCase().includes(searchLower) ||
          emp.lastName.toLowerCase().includes(searchLower) ||
          emp.email.toLowerCase().includes(searchLower)
        );
      }
      if (filters.departmentId) {
        filteredData = filteredData.filter(emp => emp.departmentId === filters.departmentId);
      }
      if (filters.designationId) {
        filteredData = filteredData.filter(emp => emp.designationId === filters.designationId);
      }
      if (filters.status) {
        filteredData = filteredData.filter(emp => emp.status === filters.status);
      }

      if (filters.sortBy) {
        filteredData.sort((a, b) => {
          const valA = a[filters.sortBy as keyof Employee];
          const valB = b[filters.sortBy as keyof Employee];
          if (valA === null) return 1;
          if (valB === null) return -1;
          
          if (valA < valB) return filters.sortOrder === 'desc' ? 1 : -1;
          if (valA > valB) return filters.sortOrder === 'desc' ? -1 : 1;
          return 0;
        });
      }
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
    };
  }

  async getEmployeeById(id: string): Promise<Employee> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const employee = mockEmployees.find(emp => emp.employeeId === id);
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return employee;
  }
}

export const employeeService = new EmployeeService();

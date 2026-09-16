import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../services/employeeService';
import { EmployeeFilters } from '../../shared/types/employee.types';

export const useEmployees = (filters?: EmployeeFilters) => {
  return useQuery({
    queryKey: ['hrms', 'employees', filters],
    queryFn: () => employeeService.getEmployees(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ['hrms', 'employee', id],
    queryFn: () => employeeService.getEmployeeById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

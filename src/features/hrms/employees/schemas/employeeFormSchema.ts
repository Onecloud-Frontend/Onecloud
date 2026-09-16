import { z } from 'zod';

export const employeeFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  departmentId: z.string().min(1, 'Department is required'),
  designationId: z.string().min(1, 'Designation is required'),
  managerId: z.string().nullable().optional(),
  joiningDate: z.string().min(1, 'Joining date is required'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT']),
  status: z.enum(['ACTIVE', 'PROBATION', 'TERMINATED', 'ON_LEAVE']),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

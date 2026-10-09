import { z } from 'zod';
import { EMPLOYMENT_TYPES, REQUISITION_PRIORITIES } from '../types/jobRequisition.types';

export const jobRequisitionSchema = z.object({
  jobTitle: z.string().trim().min(2, 'Job title must be at least 2 characters'),
  department: z.string().trim().min(1, 'Department is required'),
  location: z.string().trim().min(1, 'Location is required'),
  employmentType: z.enum(EMPLOYMENT_TYPES),
  numberOfPositions: z.number().int('Number of positions must be a whole number').min(1, 'At least one position is required'),
  experience: z.string().trim().min(1, 'Experience is required'),
  skills: z.array(z.string().trim().min(1)).min(1, 'Add at least one skill'),
  education: z.string().trim().min(1, 'Education is required'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters'),
  hiringManager: z.string().trim().min(1, 'Hiring manager is required'),
  priority: z.enum(REQUISITION_PRIORITIES),
  expectedJoiningDate: z.string().min(1, 'Expected joining date is required'),
});

export type JobRequisitionSchemaValues = z.infer<typeof jobRequisitionSchema>;

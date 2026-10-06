import { z } from 'zod';

export const applicationSchema = z.object({
  candidateId: z.string().min(1, 'Candidate is required'),
  candidateName: z.string().min(1, 'Candidate name is required'),
  candidateEmail: z.string().email('Candidate email is required'),
  jobOpeningId: z.number().positive('Job opening is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  recruiterId: z.string().min(1, 'Recruiter is required'),
  recruiterName: z.string().min(1, 'Recruiter name is required'),
  status: z.enum([
    'APPLIED',
    'UNDER_REVIEW',
    'SHORTLISTED',
    'REJECTED',
    'INTERVIEW',
    'SELECTED',
    'OFFER',
    'HIRED',
  ]),
  currentStage: z.string().min(1, 'Current stage is required'),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
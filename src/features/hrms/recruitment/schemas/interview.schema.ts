// NOTE: uses zod. If the project uses a different validation library, port this file only.
import { z } from 'zod';
import { INTERVIEW_TYPES } from '../types/interview.types';

export const interviewSchema = z
  .object({
    candidateId: z.string().min(1, 'Select a candidate'),
    jobOpeningId: z.string().min(1, 'Select a job opening'),
    round: z.number().int().min(1, 'Round must be at least 1').max(10, 'Round cannot exceed 10'),
    type: z.enum(INTERVIEW_TYPES),
    date: z.string().min(1, 'Date is required'),
    time: z.string().regex(/^\d{2}:\d{2}$/, 'Time is required'),
    durationMinutes: z.number().int().min(15, 'Minimum 15 minutes').max(480, 'Maximum 8 hours'),
    interviewers: z.array(z.string()).min(1, 'Select at least one interviewer'),
    location: z.string().optional(),
    meetingLink: z.string().optional(),
    notes: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.type === 'Video') {
      if (!v.meetingLink?.trim()) {
        ctx.addIssue({ code: 'custom', path: ['meetingLink'], message: 'Meeting link is required for video interviews' });
      } else if (!/^https?:\/\//i.test(v.meetingLink)) {
        ctx.addIssue({ code: 'custom', path: ['meetingLink'], message: 'Enter a valid URL (https://...)' });
      }
    }
    if (v.type === 'In Person' && !v.location?.trim()) {
      ctx.addIssue({ code: 'custom', path: ['location'], message: 'Location is required for in-person interviews' });
    }
  });

export type InterviewSchemaValues = z.infer<typeof interviewSchema>;
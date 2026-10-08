import { z } from 'zod';

export const contactActivitySchema = z.object({
  title: z.string().min(1, 'Enter an activity title.'),
  date: z.string().optional(),
  type: z.enum(['appointment', 'task']),
});

export type ContactActivityFormValues = z.infer<typeof contactActivitySchema>;

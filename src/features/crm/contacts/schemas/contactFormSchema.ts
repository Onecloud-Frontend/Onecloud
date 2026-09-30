import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().min(1, 'Last Name is required'),
  customer: z.string().trim().min(1, 'Customer is required'),
  designation: z.string(),
  department: z.string(),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone is required'),
  mobile: z.string(),
  contactType: z.string(),
  owner: z.string(),
  status: z.string(),
  dateOfBirth: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  linkedIn: z.string(),
  notes: z.string(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

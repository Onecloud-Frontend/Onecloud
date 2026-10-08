import { z } from "zod";

export const candidateFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Name must be at least 2 characters"
    ),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(
      10,
      "Phone number must be at least 10 digits"
    ),

  location: z
    .string()
    .trim()
    .min(
      2,
      "Location is required"
    ),

  currentCompany: z
    .string()
    .trim()
    .min(
      2,
      "Current company is required"
    ),

  experience: z
    .number()
    .min(
      0,
      "Experience cannot be negative"
    ),

  skills: z
    .array(z.string())
    .min(
      1,
      "At least one skill is required"
    ),

  currentPosition: z
    .string()
    .trim()
    .min(
      2,
      "Current position is required"
    ),

  source: z.enum([
    "CAREER_PAGE",
    "LINKEDIN",
    "REFERRAL",
    "JOB_PORTAL",
    "AGENCY",
    "OTHER",
  ]),

  appliedPosition: z
    .string()
    .trim()
    .min(
      2,
      "Applied position is required"
    ),

  status: z.enum([
    "NEW",
    "SCREENING",
    "SHORTLISTED",
    "INTERVIEW",
    "OFFERED",
    "HIRED",
    "REJECTED",
  ]),
});

export type CandidateFormValues =
  z.infer<typeof candidateFormSchema>;
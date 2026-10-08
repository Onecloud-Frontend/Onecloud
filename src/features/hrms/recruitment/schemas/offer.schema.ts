import { z } from "zod";

export const offerSchema = z.object({
  candidateName: z
    .string()
    .min(2, "Candidate name is required"),

  candidateEmail: z
    .string()
    .email("Enter a valid email address"),

  position: z
    .string()
    .min(2, "Position is required"),

  department: z
    .string()
    .min(2, "Department is required"),

  joiningDate: z
    .string()
    .min(1, "Joining date is required"),

  employmentType: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
  ]),

  salary: z
    .number()
    .positive("Salary must be greater than 0"),

  benefits: z
    .array(z.string())
    .min(1, "Select at least one benefit"),

  offerExpiry: z
    .string()
    .min(1, "Offer expiry date is required"),

  status: z.enum([
    "Draft",
    "Pending Approval",
    "Sent",
    "Accepted",
    "Rejected",
    "Expired",
  ]),
});

export type OfferFormData = z.infer<typeof offerSchema>;
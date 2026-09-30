import { z } from "zod";

export const opportunitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Opportunity name is required"),

  customerName: z
    .string()
    .trim()
    .min(1, "Customer is required"),

  contactName: z
    .string()
    .trim()
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  stage: z
    .string()
    .min(1, "Stage is required"),

  expectedRevenue: z
    .coerce
    .number()
    .min(0, "Expected revenue cannot be negative"),

  probability: z
    .coerce
    .number()
    .min(0, "Probability cannot be less than 0")
    .max(100, "Probability cannot exceed 100"),

  expectedCloseDate: z
    .string()
    .min(1, "Expected close date is required"),

  ownerName: z
    .string()
    .trim()
    .min(1, "Owner is required"),

  competitor: z
    .string()
    .trim()
    .optional(),

  source: z
    .string()
    .optional(),

  currency: z
    .string()
    .min(1, "Currency is required"),

  notes: z
    .string()
    .trim()
    .optional(),
});

export type OpportunityFormInput =
  z.input<typeof opportunitySchema>;

export type OpportunityFormValues =
  z.output<typeof opportunitySchema>;
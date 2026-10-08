import { z } from "zod";

const LEAD_SOURCES = [
  "WEBSITE",
  "REFERRAL",
  "SOCIAL_MEDIA",
  "EMAIL",
  "EVENT",
  "COLD_CALL",
] as const;

export const opportunitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Opportunity name is required"),

  customerId: z
    .string()
    .min(1, "Customer is required"),

  contactId: z
    .string()
    .optional(),

  leadId: z
    .string()
    .optional(),

  stage: z
    .enum([
      "QUALIFICATION",
      "DISCOVERY",
      "PROPOSAL",
      "NEGOTIATION",
      "CLOSED_WON",
      "CLOSED_LOST",
    ])
    .default("QUALIFICATION"),

  probability: z
    .coerce
    .number()
    .min(0, "Probability cannot be less than 0")
    .max(100, "Probability cannot exceed 100"),

  expectedRevenue: z
    .coerce
    .number()
    .min(0, "Expected revenue cannot be negative"),

  amount: z
    .coerce
    .number()
    .min(0, "Amount cannot be negative"),

  expectedCloseDate: z
    .string()
    .min(1, "Expected close date is required"),

  assignedTo: z
    .string()
    .min(1, "Owner is required"),

  source: z
    .union([
      z.enum(LEAD_SOURCES),
      z.literal(""),
    ])
    .optional()
    .transform((value) => value || undefined),

  competitors: z
    .array(z.string())
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),
});

export type OpportunityFormInput =
  z.input<typeof opportunitySchema>;

export type OpportunityFormValues =
  z.output<typeof opportunitySchema>;
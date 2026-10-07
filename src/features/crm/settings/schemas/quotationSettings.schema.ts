import { z } from "zod";

const quoteStatusSchema = z.object({
  id: z.string().min(1, "Status ID is required"),

  name: z
    .string()
    .trim()
    .min(1, "Status name is required"),

  code: z.enum([
    "draft",
    "sent",
    "accepted",
    "rejected",
    "expired",
  ]),

  description: z
    .string()
    .trim()
    .min(1, "Status description is required"),

  active: z.boolean(),
});

export const quotationSettingsSchema = z.object({
  /*
   * Quote Numbering
   */
  quoteNumberPrefix: z
    .string()
    .trim()
    .min(1, "Quote number prefix is required")
    .max(20, "Quote number prefix cannot exceed 20 characters"),

  nextQuoteNumber: z
    .number()
    .int("Quote number must be a whole number")
    .min(1, "Quote number must be greater than 0"),

  quoteNumberFormat: z
    .string()
    .trim()
    .min(1, "Quote number format is required"),

  /*
   * Quote Statuses
   */
  quoteStatuses: z
    .array(quoteStatusSchema)
    .min(1, "At least one quote status is required"),

  /*
   * Approval Configuration
   */
  approvalRequired: z.boolean(),

  approvalThreshold: z
    .number()
    .min(0, "Approval threshold cannot be negative"),

  /*
   * Tax & Pricing
   */
  defaultCurrency: z
    .string()
    .trim()
    .min(1, "Default currency is required"),

  defaultTaxRate: z
    .number()
    .min(0, "Tax rate cannot be negative")
    .max(100, "Tax rate cannot exceed 100%"),

  allowDiscount: z.boolean(),

  maximumDiscount: z
    .number()
    .min(0, "Maximum discount cannot be negative")
    .max(100, "Maximum discount cannot exceed 100%"),
});

export type QuotationSettingsFormValues = z.infer<
  typeof quotationSettingsSchema
>;

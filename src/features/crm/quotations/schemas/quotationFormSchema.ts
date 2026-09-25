import { z } from "zod";

const dateStringSchema = z
  .string()
  .trim()
  .min(1, "Date is required")
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Enter a valid date",
  );

const nonNegativeNumberSchema = z
  .number({
    message: "Value is required",
  })
  .finite(
    "Value must be a valid number",
  )
  .nonnegative(
    "Value cannot be negative",
  );

const lineItemSchema = z.object({
  id: z
    .string()
    .min(
      1,
      "Line item ID is required",
    ),

  productId: z
    .string()
    .trim()
    .optional(),

  productName: z
    .string()
    .trim()
    .min(
      1,
      "Product or service is required",
    ),

  description: z
    .string()
    .trim()
    .optional(),

  quantity: z
    .number({
      message: "Quantity is required",
    })
    .finite(
      "Quantity must be a valid number",
    )
    .positive(
      "Quantity must be greater than 0",
    ),

  unitPrice: z
    .number({
      message: "Unit price is required",
    })
    .finite(
      "Unit price must be a valid number",
    )
    .nonnegative(
      "Unit price cannot be negative",
    ),

  discountPercent: z
    .number({
      message: "Discount is required",
    })
    .finite(
      "Discount must be a valid number",
    )
    .min(
      0,
      "Discount cannot be negative",
    )
    .max(
      100,
      "Discount cannot exceed 100%",
    ),

  taxRate: z
    .number({
      message: "Tax rate is required",
    })
    .finite(
      "Tax rate must be a valid number",
    )
    .min(
      0,
      "Tax rate cannot be negative",
    )
    .max(
      100,
      "Tax rate cannot exceed 100%",
    ),

  /*
   * These values are calculated by the
   * quotation form before submission.
   *
   * They are intentionally validated only
   * as non-negative numbers here.
   */
  discountAmount:
    nonNegativeNumberSchema,

  taxAmount:
    nonNegativeNumberSchema,

  subtotal:
    nonNegativeNumberSchema,

  total:
    nonNegativeNumberSchema,
});

export const quotationFormSchema =
  z
    .object({
      customerId: z
        .string()
        .trim()
        .min(
          1,
          "Customer is required",
        ),

      opportunityId: z
        .string()
        .trim()
        .optional(),

      quoteDate:
        dateStringSchema,

      validUntil:
        dateStringSchema,

      salespersonId: z
        .string()
        .trim()
        .min(
          1,
          "Salesperson is required",
        ),

      currency: z.enum([
        "INR",
        "USD",
        "EUR",
        "GBP",
      ]),

      paymentTerms: z
        .string()
        .trim()
        .max(
          200,
          "Payment terms cannot exceed 200 characters",
        )
        .optional(),

      deliveryTerms: z
        .string()
        .trim()
        .max(
          200,
          "Delivery terms cannot exceed 200 characters",
        )
        .optional(),

      lineItems: z
        .array(lineItemSchema)
        .min(
          1,
          "Add at least one line item",
        ),

      notes: z
        .string()
        .trim()
        .max(
          1000,
          "Notes cannot exceed 1000 characters",
        )
        .optional(),
    })
    .superRefine(
      (data, ctx) => {
        if (
          data.quoteDate &&
          data.validUntil &&
          data.validUntil <
            data.quoteDate
        ) {
          ctx.addIssue({
            code: "custom",
            path: [
              "validUntil",
            ],
            message:
              "Valid until date cannot be before the quote date",
          });
        }
      },
    );

export type QuotationFormSchemaValues =
  z.infer<
    typeof quotationFormSchema
  >;
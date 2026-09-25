import { z } from "zod";
export const activitySchema = z
  .object({
    activityType: z.enum(["CALL", "MEETING", "TASK", "NOTE", "EMAIL"]),
    subject: z.string().trim().min(1, "Subject is required"),
    description: z.string().optional(),
    relatedLead: z.string().optional(),
    relatedCustomer: z.string().optional(),
    relatedContact: z.string().optional(),
    relatedOpportunity: z.string().optional(),
    owner: z.string().trim().min(1, "Owner is required"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    dueDate: z.string().optional(),
    reminder: z.boolean().optional(),
    location: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.endDate || !data.startDate) {
        return true;
      }
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    },
  );
export type ActivityFormValues = z.infer<typeof activitySchema>;

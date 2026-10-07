import { z } from "zod";

export const employeeFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(
      2,
      "First name must be at least 2 characters"
    ),

  lastName: z
    .string()
    .trim()
    .min(
      2,
      "Last name must be at least 2 characters"
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

  departmentId: z
    .string()
    .min(
      1,
      "Department is required"
    ),

  designationId: z
    .string()
    .min(
      1,
      "Designation is required"
    ),

  managerId: z
    .string()
    .nullable()
    .optional(),

  joiningDate: z
    .string()
    .min(
      1,
      "Joining date is required"
    ),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
  ]),

  status: z.enum([
    "ACTIVE",
    "PROBATION",
    "TERMINATED",
    "ON_LEAVE",
  ]),

  address: z
    .string()
    .optional(),

  city: z
    .string()
    .optional(),

  state: z
    .string()
    .optional(),

  country: z
    .string()
    .optional(),

  postalCode: z
    .string()
    .optional(),
});

export type EmployeeFormValues =
  z.infer<typeof employeeFormSchema>;
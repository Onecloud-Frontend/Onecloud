export type UserRole =
  | "ADMIN"
  | "SALES_MANAGER"
  | "SALES_EXECUTIVE"
  | "SUPPORT_EXECUTIVE"
  | "FINANCE_EXECUTIVE";

export interface CRMUser {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}
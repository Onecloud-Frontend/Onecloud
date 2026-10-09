export interface Contact {
  id: string;
  contactCode: string;
  customerId: string;
  firstName: string;
  lastName: string;
  designation: string;
  department?: string;
  email: string;
  phone: string;
  mobile?: string;
  isPrimary: boolean;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
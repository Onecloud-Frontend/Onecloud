export type CustomerStatus =
  | "PROSPECT"
  | "ACTIVE"
  | "INACTIVE"
  | "CHURNED";

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Customer {
  id: string;
  customerCode: string;
  companyName: string;
  industry: string;
  email: string;
  phone: string;
  website?: string;
  status: CustomerStatus;
  ownerId: string;
  billingAddress: Address;
  shippingAddress: Address;
  annualRevenue?: number;
  employeeCount?: number;
  createdAt: string;
  updatedAt: string;
}
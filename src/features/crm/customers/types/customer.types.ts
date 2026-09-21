export type CustomerStatus = 'Active' | 'Inactive';

export type CustomerType =
  | 'Individual'
  | 'Business'
  | 'Enterprise';

export interface CustomerContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface CustomerOpportunity {
  id: string;
  name: string;
  stage: string;
  amount: number;
  status: string;
}

export interface CustomerQuote {
  id: string;
  quoteNumber: string;
  amount: number;
  status: string;
  date: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  amount: number;
  status: string;
  date: string;
}

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: string;
  date: string;
}

export interface CustomerActivity {
  id: string;
  type: string;
  description: string;
  date: string;
  performedBy: string;
}

export interface ServiceHistory {
  id: string;
  service: string;
  status: string;
  date: string;
}

export interface Customer {
  id: string;
  customerId: string;

  customerName: string;
  customerType: CustomerType;
  industry: string;
  website: string;

  email: string;
  phone: string;

  owner: string;
  status: CustomerStatus;

  taxNumber: string;

  billingAddress: string;
  shippingAddress: string;

  city: string;
  state: string;
  country: string;
  postalCode: string;

  currency: string;
  paymentTerms: string;
  notes: string;

  primaryContact: string;

  totalOpportunities: number;
  totalRevenue: number;

  createdDate: string;
  updatedDate: string;
  lastActivity: string;

  contacts: CustomerContact[];
  opportunities: CustomerOpportunity[];
  quotes: CustomerQuote[];
  orders: CustomerOrder[];
  invoices: CustomerInvoice[];
  activities: CustomerActivity[];
  serviceHistory: ServiceHistory[];
}

export interface CustomerFormData {
  customerName: string;
  customerType: CustomerType;
  industry: string;
  website: string;

  email: string;
  phone: string;

  owner: string;
  status: CustomerStatus;

  taxNumber: string;

  billingAddress: string;
  shippingAddress: string;

  city: string;
  state: string;
  country: string;
  postalCode: string;

  currency: string;
  paymentTerms: string;
  notes: string;
}
/**
 * OneCloud Enterprise ERP — Common Foundation Types
 *
 * Core contracts for IDs, currency, pagination, audit metadata,
 * and read-only cross-module references (HRMS, CRM).
 */

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'SGD' | 'AUD';

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface AuditMetadata {
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
}

export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ErpApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * Read-only reference to an entity owned by CRM.
 * ERP consumes customer details for sales orders and billing,
 * but NEVER writes to or mutates CRM database records.
 */
export interface CrmCustomerReference {
  id: string;
  customerName: string;
  contactPerson: string;
  email: string;
  phone: string;
  billingAddress: string;
  taxIdentifier?: string;
}

/**
 * Read-only reference to an employee owned by HRMS.
 * ERP references employees for requisition submission, approval workflows,
 * and operational audit trails, but NEVER mutates HRMS personnel records.
 */
export interface HrmsEmployeeReference {
  id: number;
  employeeCode: string;
  fullName: string;
  department: string;
  designation: string;
  email: string;
}

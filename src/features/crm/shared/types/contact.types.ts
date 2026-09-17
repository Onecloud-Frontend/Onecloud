export type ContactType = 'CUSTOMER' | 'PARTNER' | 'VENDOR' | 'OTHER';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  accountId: string; // Associated company/account
  email: string;
  phone: string;
  jobTitle: string;
  type: ContactType;
  ownerId: string; // Assigned Employee ID
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ContactFilters {
  page?: number;
  limit?: number;
  search?: string;
  accountId?: string;
  type?: ContactType;
  sortBy?: keyof Contact;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedContacts {
  data: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

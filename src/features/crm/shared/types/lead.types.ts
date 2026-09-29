export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'LOST' | 'WON';
export type LeadSource = 'WEBSITE' | 'REFERRAL' | 'COLD_CALL' | 'CONFERENCE' | 'PARTNER';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  estimatedValue: number;
  assignedTo: string; // Employee ID
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface LeadFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  assignedTo?: string;
  sortBy?: keyof Lead;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedLeads {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

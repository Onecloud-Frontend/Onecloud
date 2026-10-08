import { Lead, LeadFilters, PaginatedLeads } from '../../shared/types/lead.types';
import { mockLeads } from '../mocks/leadsMockData';

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'crm_leads';

const getStoredLeads = (): Lead[] => {
  const storedLeads = localStorage.getItem(STORAGE_KEY);

  if (storedLeads) {
    return JSON.parse(storedLeads);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockLeads));

  return mockLeads;
};

const saveLeads = (leads: Lead[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
};

class LeadService {
  async getLeads(filters: LeadFilters): Promise<PaginatedLeads> {
    await delay(600);

    let filteredData = [...getStoredLeads()];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();

      filteredData = filteredData.filter(
        lead =>
          lead.firstName.toLowerCase().includes(searchLower) ||
          lead.lastName.toLowerCase().includes(searchLower) ||
          lead.company.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status) {
      filteredData = filteredData.filter(
        lead => lead.status === filters.status
      );
    }

    if (filters.source) {
      filteredData = filteredData.filter(
        lead => lead.source === filters.source
      );
    }

    if (filters.assignedTo) {
      filteredData = filteredData.filter(
        lead => lead.assignedTo === filters.assignedTo
      );
    }

    if (filters.sortBy) {
      const sortField = filters.sortBy;
      const order = filters.sortOrder === 'desc' ? -1 : 1;

      filteredData.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (valA < valB) {
          return -1 * order;
        }

        if (valA > valB) {
          return 1 * order;
        }

        return 0;
      });
    }

    const page = filters.page || 1;
    const limit = filters.limit || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
    };
  }

  async getLeadById(id: string): Promise<Lead> {
    await delay(300);

    const leads = getStoredLeads();

    const lead = leads.find(lead => lead.id === id);

    if (!lead) {
      throw new Error('Lead not found');
    }

    return lead;
  }

  async createLead(lead: Lead): Promise<Lead> {
    await delay(300);

    const leads = getStoredLeads();

    const updatedLeads = [...leads, lead];

    saveLeads(updatedLeads);

    return lead;
  }

  async updateLead(id: string, updatedLead: Lead): Promise<Lead> {
    await delay(300);

    const leads = getStoredLeads();

    const leadExists = leads.some(lead => lead.id === id);

    if (!leadExists) {
      throw new Error('Lead not found');
    }

    const updatedLeads = leads.map(lead =>
      lead.id === id ? updatedLead : lead
    );

    saveLeads(updatedLeads);

    return updatedLead;
  }
}

export const leadService = new LeadService();
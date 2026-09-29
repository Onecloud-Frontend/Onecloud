import { Lead, LeadFilters, PaginatedLeads } from '../../shared/types/lead.types';
import { mockLeads } from '../mocks/leadsMockData';

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class LeadService {
  async getLeads(filters: LeadFilters): Promise<PaginatedLeads> {
    await delay(600); // Simulate network latency

    let filteredData = [...mockLeads];

    // Apply text search
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

    // Apply exact match filters
    if (filters.status) {
      filteredData = filteredData.filter(lead => lead.status === filters.status);
    }
    if (filters.source) {
      filteredData = filteredData.filter(lead => lead.source === filters.source);
    }
    if (filters.assignedTo) {
      filteredData = filteredData.filter(lead => lead.assignedTo === filters.assignedTo);
    }

    // Apply sorting
    if (filters.sortBy) {
      const sortField = filters.sortBy;
      const order = filters.sortOrder === 'desc' ? -1 : 1;

      filteredData.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return -1 * order;
        if (valA > valB) return 1 * order;
        return 0;
      });
    }

    // Apply pagination
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
    const lead = mockLeads.find(l => l.id === id);
    if (!lead) throw new Error('Lead not found');
    return lead;
  }
}

export const leadService = new LeadService();

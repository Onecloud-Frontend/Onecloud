import { useQuery } from '@tanstack/react-query';
import { leadService } from '../services/leadService';
import { LeadFilters } from '../../shared/types/lead.types';

export const useLeads = (filters: LeadFilters) => {
  return useQuery({
    queryKey: ['crm', 'leads', filters],
    queryFn: () => leadService.getLeads(filters),
    placeholderData: (previousData) => previousData, // keep previous data while loading new pages
  });
};

export const useLead = (id: string) => {
  return useQuery({
    queryKey: ['crm', 'leads', id],
    queryFn: () => leadService.getLeadById(id),
    enabled: !!id,
  });
};

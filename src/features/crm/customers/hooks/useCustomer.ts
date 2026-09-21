import { useQuery } from '@tanstack/react-query';
import { customerService } from '../services/customerService';

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => customerService.getCustomerById(id),
    enabled: Boolean(id),
  });
};
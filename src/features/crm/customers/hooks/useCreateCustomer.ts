import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from '../services/customerService';
import { CustomerFormData } from '../types/customer.types';

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerData: CustomerFormData) =>
      customerService.createCustomer(customerData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers'],
      });
    },
  });
};
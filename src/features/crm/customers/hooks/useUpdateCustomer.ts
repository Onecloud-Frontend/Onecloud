import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from '../services/customerService';
import { CustomerFormData } from '../types/customer.types';

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      customerData,
    }: {
      id: string;
      customerData: CustomerFormData;
    }) =>
      customerService.updateCustomer(id, customerData),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['customers'],
      });

      queryClient.invalidateQueries({
        queryKey: ['customer', variables.id],
      });
    },
  });
};
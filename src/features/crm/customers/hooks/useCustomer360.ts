
import { useQuery } from '@tanstack/react-query';

import { customer360Service } from '../services/customer360Service';

export const useCustomer360 = (customerId: string) => {
  return useQuery({
    queryKey: ['customer360', customerId],

    queryFn: () =>
      customer360Service.getCustomer360(customerId),

    enabled: Boolean(customerId),
  });
};

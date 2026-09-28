import { useMutation, useQueryClient } from '@tanstack/react-query'

import { customerService } from '../services/customerService'
import type {
  Customer,
  CustomerFormData,
} from '../types/customer.types'

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      customerData,
    }: {
      id: string
      customerData: CustomerFormData
    }) => {
      return customerService.updateCustomer(
        id,
        customerData
      )
    },

    onSuccess: (updatedCustomer) => {
      if (!updatedCustomer) {
        return
      }

      // Update Customers Page data
      queryClient.setQueryData<Customer[]>(
        ['customers'],
        (oldCustomers = []) => {
          return oldCustomers.map((customer) =>
            customer.id === updatedCustomer.id
              ? { ...updatedCustomer }
              : customer
          )
        }
      )

      // Update Customer Details Page data
      queryClient.setQueryData<Customer>(
        ['customer', updatedCustomer.id],
        { ...updatedCustomer }
      )
    },
  })
}
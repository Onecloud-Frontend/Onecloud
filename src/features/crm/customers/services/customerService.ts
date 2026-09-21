import { mockCustomers } from '../mocks/customerMockData';
import { Customer, CustomerFormData } from '../types/customer.types';

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    return Promise.resolve(mockCustomers);
  },

  getCustomerById: async (id: string): Promise<Customer | undefined> => {
    const customer = mockCustomers.find(
      (customer) => customer.id === id
    );

    return Promise.resolve(customer);
  },

  createCustomer: async (
    customerData: CustomerFormData
  ): Promise<Customer> => {
    const newCustomer: Customer = {
      ...customerData,

      id: String(mockCustomers.length + 1),

      customerId: `CUS-${String(mockCustomers.length + 1).padStart(3, '0')}`,

      primaryContact: '',

      totalOpportunities: 0,

      totalRevenue: 0,

      createdDate: new Date().toISOString(),

      updatedDate: new Date().toISOString(),

      lastActivity: '',

      contacts: [],

      opportunities: [],

      quotes: [],

      orders: [],

      invoices: [],

      activities: [],

      serviceHistory: [],
    };

    mockCustomers.push(newCustomer);

    return Promise.resolve(newCustomer);
  },

  updateCustomer: async (
    id: string,
    customerData: CustomerFormData
  ): Promise<Customer | undefined> => {
    const customerIndex = mockCustomers.findIndex(
      (customer) => customer.id === id
    );

    if (customerIndex === -1) {
      return Promise.resolve(undefined);
    }

    const updatedCustomer: Customer = {
      ...mockCustomers[customerIndex],
      ...customerData,
      updatedDate: new Date().toISOString(),
    };

    mockCustomers[customerIndex] = updatedCustomer;

    return Promise.resolve(updatedCustomer);
  },

  deleteCustomer: async (id: string): Promise<boolean> => {
    const customerIndex = mockCustomers.findIndex(
      (customer) => customer.id === id
    );

    if (customerIndex === -1) {
      return Promise.resolve(false);
    }

    mockCustomers.splice(customerIndex, 1);

    return Promise.resolve(true);
  },
};
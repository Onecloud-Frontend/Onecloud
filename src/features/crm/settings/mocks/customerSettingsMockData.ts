import type { CustomerSettings } from '../types/customerSettings.types';

export const customerSettingsMockData: CustomerSettings = {
  generalSettings: {
    allowDuplicateCustomers: false,
    autoAssignCustomerOwner: true,
  },

  customerTypes: [
    {
      id: '1',
      name: 'Business',
      description: 'Customers representing a business or company',
      isActive: true,
    },
    {
      id: '2',
      name: 'Individual',
      description: 'Individual customers',
      isActive: true,
    },
    {
      id: '3',
      name: 'Enterprise',
      description: 'Large enterprise customers',
      isActive: true,
    },
  ],

  customerStatuses: [
    {
      id: '1',
      name: 'Active',
      description: 'Currently active customers',
      isActive: true,
    },
    {
      id: '2',
      name: 'Inactive',
      description: 'Currently inactive customers',
      isActive: true,
    },
    {
      id: '3',
      name: 'Prospect',
      description: 'Potential customers',
      isActive: true,
    },
  ],

  defaults: {
    defaultCustomerType: 'Business',
    defaultCustomerStatus: 'Active',
  },
};
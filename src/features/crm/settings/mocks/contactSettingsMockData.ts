import type { ContactSettings } from '../types/contactSettings.types';

export const contactSettingsMockData: ContactSettings = {
  contactTypes: [
    {
      id: 'contact-type-1',
      name: 'Primary',
      description: 'Primary contact for the customer.',
      isActive: true,
    },
    {
      id: 'contact-type-2',
      name: 'Secondary',
      description: 'Secondary contact for the customer.',
      isActive: true,
    },
    {
      id: 'contact-type-3',
      name: 'Billing',
      description: 'Contact responsible for billing communication.',
      isActive: true,
    },
    {
      id: 'contact-type-4',
      name: 'Technical',
      description: 'Contact responsible for technical communication.',
      isActive: true,
    },
  ],

  requiredFields: [
    {
      field: 'firstName',
      label: 'First Name',
      required: true,
    },
    {
      field: 'lastName',
      label: 'Last Name',
      required: true,
    },
    {
      field: 'customer',
      label: 'Customer',
      required: true,
    },
    {
      field: 'email',
      label: 'Email',
      required: true,
    },
    {
      field: 'phone',
      label: 'Phone',
      required: true,
    },
    {
      field: 'designation',
      label: 'Designation',
      required: false,
    },
    {
      field: 'department',
      label: 'Department',
      required: false,
    },
    {
      field: 'mobile',
      label: 'Mobile',
      required: false,
    },
    {
      field: 'contactType',
      label: 'Contact Type',
      required: false,
    },
    {
      field: 'owner',
      label: 'Owner',
      required: false,
    },
    {
      field: 'status',
      label: 'Status',
      required: false,
    },
  ],

  defaults: {
    contactType: 'Primary',
    owner: '',
    status: 'Active',
  },
};
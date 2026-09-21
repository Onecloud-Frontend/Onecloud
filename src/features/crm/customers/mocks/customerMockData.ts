import { Customer } from '../types/customer.types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    customerId: 'CUS-001',

    customerName: 'ABC Technologies',
    customerType: 'Business',
    industry: 'Information Technology',
    website: 'https://abctech.com',

    email: 'contact@abctech.com',
    phone: '+91 9876543210',

    owner: 'Pavan',
    status: 'Active',

    taxNumber: 'GSTIN123456789',

    billingAddress: 'Madhapur',
    shippingAddress: 'Madhapur',

    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500081',

    currency: 'INR',
    paymentTerms: 'Net 30',

    notes: 'Important technology customer.',

    primaryContact: 'Ravi Kumar',

    totalOpportunities: 5,
    totalRevenue: 1250000,

    createdDate: '2026-01-10',
    updatedDate: '2026-09-15',
    lastActivity: '2026-09-18',

    contacts: [
      {
        id: 'contact-1',
        name: 'Ravi Kumar',
        email: 'ravi@abctech.com',
        phone: '+91 9000000001',
        role: 'Manager',
      },
      {
        id: 'contact-2',
        name: 'Anita Sharma',
        email: 'anita@abctech.com',
        phone: '+91 9000000002',
        role: 'Finance Manager',
      },
    ],

    opportunities: [
      {
        id: 'opp-1',
        name: 'ERP Implementation',
        stage: 'Proposal',
        amount: 500000,
        status: 'Open',
      },
      {
        id: 'opp-2',
        name: 'CRM Upgrade',
        stage: 'Negotiation',
        amount: 750000,
        status: 'Open',
      },
    ],

    quotes: [
      {
        id: 'quote-1',
        quoteNumber: 'QT-001',
        amount: 500000,
        status: 'Sent',
        date: '2026-09-10',
      },
    ],

    orders: [
      {
        id: 'order-1',
        orderNumber: 'ORD-001',
        amount: 250000,
        status: 'Confirmed',
        date: '2026-09-12',
      },
    ],

    invoices: [
      {
        id: 'invoice-1',
        invoiceNumber: 'INV-001',
        amount: 250000,
        status: 'Paid',
        date: '2026-09-15',
      },
    ],

    activities: [
      {
        id: 'activity-1',
        type: 'Call',
        description: 'Customer follow-up call',
        date: '2026-09-18',
        performedBy: 'Pavan',
      },
      {
        id: 'activity-2',
        type: 'Meeting',
        description: 'Product discussion meeting',
        date: '2026-09-15',
        performedBy: 'Pavan',
      },
    ],

    serviceHistory: [
      {
        id: 'service-1',
        service: 'Technical Support',
        status: 'Completed',
        date: '2026-08-20',
      },
    ],
  },

  {
    id: '2',
    customerId: 'CUS-002',

    customerName: 'Global Solutions Pvt Ltd',
    customerType: 'Enterprise',
    industry: 'Consulting',
    website: 'https://globalsolutions.com',

    email: 'contact@globalsolutions.com',
    phone: '+91 9988776655',

    owner: 'Pavan',
    status: 'Active',

    taxNumber: 'GSTIN987654321',

    billingAddress: 'Banjara Hills',
    shippingAddress: 'Banjara Hills',

    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500034',

    currency: 'INR',
    paymentTerms: 'Net 45',

    notes: 'Enterprise customer.',

    primaryContact: 'Suresh Reddy',

    totalOpportunities: 8,
    totalRevenue: 2450000,

    createdDate: '2026-02-05',
    updatedDate: '2026-09-12',
    lastActivity: '2026-09-17',

    contacts: [
      {
        id: 'contact-3',
        name: 'Suresh Reddy',
        email: 'suresh@globalsolutions.com',
        phone: '+91 9000000003',
        role: 'Director',
      },
    ],

    opportunities: [
      {
        id: 'opp-3',
        name: 'Digital Transformation',
        stage: 'Qualification',
        amount: 1200000,
        status: 'Open',
      },
    ],

    quotes: [
      {
        id: 'quote-2',
        quoteNumber: 'QT-002',
        amount: 1200000,
        status: 'Draft',
        date: '2026-09-11',
      },
    ],

    orders: [],
    invoices: [],

    activities: [
      {
        id: 'activity-3',
        type: 'Email',
        description: 'Sent product proposal',
        date: '2026-09-17',
        performedBy: 'Pavan',
      },
    ],

    serviceHistory: [],
  },

  {
    id: '3',
    customerId: 'CUS-003',

    customerName: 'Sunrise Retail',
    customerType: 'Business',
    industry: 'Retail',
    website: 'https://sunriseretail.com',

    email: 'info@sunriseretail.com',
    phone: '+91 9123456789',

    owner: 'Pavan',
    status: 'Inactive',

    taxNumber: 'GSTIN555555555',

    billingAddress: 'Kukatpally',
    shippingAddress: 'Kukatpally',

    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500072',

    currency: 'INR',
    paymentTerms: 'Net 30',

    notes: 'Customer currently inactive.',

    primaryContact: 'Meena Rao',

    totalOpportunities: 2,
    totalRevenue: 450000,

    createdDate: '2026-03-15',
    updatedDate: '2026-08-25',
    lastActivity: '2026-08-20',

    contacts: [
      {
        id: 'contact-4',
        name: 'Meena Rao',
        email: 'meena@sunriseretail.com',
        phone: '+91 9000000004',
        role: 'Operations Manager',
      },
    ],

    opportunities: [],

    quotes: [],

    orders: [
      {
        id: 'order-2',
        orderNumber: 'ORD-002',
        amount: 150000,
        status: 'Completed',
        date: '2026-07-15',
      },
    ],

    invoices: [
      {
        id: 'invoice-2',
        invoiceNumber: 'INV-002',
        amount: 150000,
        status: 'Paid',
        date: '2026-07-20',
      },
    ],

    activities: [
      {
        id: 'activity-4',
        type: 'Call',
        description: 'Account review call',
        date: '2026-08-20',
        performedBy: 'Pavan',
      },
    ],

    serviceHistory: [],
  },

  {
    id: '4',
    customerId: 'CUS-004',

    customerName: 'NextGen Industries',
    customerType: 'Enterprise',
    industry: 'Manufacturing',
    website: 'https://nextgenindustries.com',

    email: 'contact@nextgenindustries.com',
    phone: '+91 9000012345',

    owner: 'Pavan',
    status: 'Active',

    taxNumber: 'GSTIN444444444',

    billingAddress: 'Gachibowli',
    shippingAddress: 'Gachibowli',

    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500032',

    currency: 'INR',
    paymentTerms: 'Net 60',

    notes: 'Large manufacturing customer.',

    primaryContact: 'Kiran Kumar',

    totalOpportunities: 10,
    totalRevenue: 3800000,

    createdDate: '2026-04-01',
    updatedDate: '2026-09-16',
    lastActivity: '2026-09-19',

    contacts: [
      {
        id: 'contact-5',
        name: 'Kiran Kumar',
        email: 'kiran@nextgenindustries.com',
        phone: '+91 9000000005',
        role: 'General Manager',
      },
    ],

    opportunities: [
      {
        id: 'opp-4',
        name: 'Manufacturing Automation',
        stage: 'Proposal',
        amount: 2000000,
        status: 'Open',
      },
    ],

    quotes: [
      {
        id: 'quote-3',
        quoteNumber: 'QT-003',
        amount: 2000000,
        status: 'Sent',
        date: '2026-09-14',
      },
    ],

    orders: [],
    invoices: [],

    activities: [
      {
        id: 'activity-5',
        type: 'Meeting',
        description: 'Automation requirements discussion',
        date: '2026-09-19',
        performedBy: 'Pavan',
      },
    ],

    serviceHistory: [
      {
        id: 'service-2',
        service: 'Implementation Support',
        status: 'In Progress',
        date: '2026-09-01',
      },
    ],
  },

  {
    id: '5',
    customerId: 'CUS-005',

    customerName: 'TechVision Labs',
    customerType: 'Business',
    industry: 'Software',
    website: 'https://techvisionlabs.com',

    email: 'hello@techvisionlabs.com',
    phone: '+91 9012345678',

    owner: 'Pavan',
    status: 'Active',

    taxNumber: 'GSTIN333333333',

    billingAddress: 'Hitech City',
    shippingAddress: 'Hitech City',

    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500081',

    currency: 'INR',
    paymentTerms: 'Net 30',

    notes: 'Software product company.',

    primaryContact: 'Arjun Varma',

    totalOpportunities: 3,
    totalRevenue: 850000,

    createdDate: '2026-05-12',
    updatedDate: '2026-09-14',
    lastActivity: '2026-09-16',

    contacts: [
      {
        id: 'contact-6',
        name: 'Arjun Varma',
        email: 'arjun@techvisionlabs.com',
        phone: '+91 9000000006',
        role: 'Product Manager',
      },
    ],

    opportunities: [
      {
        id: 'opp-5',
        name: 'Cloud Migration',
        stage: 'Negotiation',
        amount: 850000,
        status: 'Open',
      },
    ],

    quotes: [],

    orders: [],
    invoices: [],

    activities: [
      {
        id: 'activity-6',
        type: 'Email',
        description: 'Shared cloud migration proposal',
        date: '2026-09-16',
        performedBy: 'Pavan',
      },
    ],

    serviceHistory: [],
  },
];
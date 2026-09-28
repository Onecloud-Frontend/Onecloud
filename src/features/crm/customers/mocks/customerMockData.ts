import type { Customer } from '../types/customer.types'

export const mockCustomers: Customer[] = [
  {
    id: '1',
    customerId: 'CUS-001',

    customerName: 'ABC Technologies',
    customerType: 'Business',
    industry: 'Information Technology',
    website: 'https://abctech.example.com',

    email: 'contact@abctech.example.com',
    phone: '+91 98765 43210',

    owner: 'Pavan',
    status: 'Active',

    taxNumber: 'GST29ABCDE1234F1Z5',

    billingAddress: '12 Tech Park Road',
    shippingAddress: '12 Tech Park Road',

    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500081',

    currency: 'INR',
    paymentTerms: 'Net 30',
    notes: 'Important technology customer.',

    primaryContact: 'Rahul Sharma',

    totalOpportunities: 5,
    totalRevenue: 2500000,

    createdDate: '2026-01-15',
    updatedDate: '2026-09-01',
    lastActivity: '2026-09-20',

    contacts: [
      {
        id: 'C001',
        name: 'Rahul Sharma',
        email: 'rahul@abctech.example.com',
        phone: '+91 98765 43210',
        role: 'IT Manager',
      },
    ],

    opportunities: [
      {
        id: 'OPP-001',
        name: 'Cloud Migration',
        stage: 'Proposal',
        amount: 1500000,
        status: 'Open',
      },
    ],

    quotes: [
      {
        id: 'QUO-001',
        quoteNumber: 'QT-001',
        amount: 1500000,
        status: 'Sent',
        date: '2026-09-10',
      },
    ],

    orders: [
      {
        id: 'ORD-001',
        orderNumber: 'ORD-001',
        amount: 1000000,
        status: 'Confirmed',
        date: '2026-08-20',
      },
    ],

    invoices: [
      {
        id: 'INV-001',
        invoiceNumber: 'INV-001',
        amount: 1000000,
        status: 'Paid',
        date: '2026-08-25',
      },
    ],

    activities: [
      {
        id: 'ACT-001',
        type: 'Call',
        description: 'Discussed cloud migration requirements.',
        date: '2026-09-20',
        performedBy: 'Pavan',
      },
    ],

    serviceHistory: [
      {
        id: 'SRV-001',
        service: 'Cloud Support',
        status: 'Completed',
        date: '2026-08-15',
      },
    ],
  },

  {
    id: '2',
    customerId: 'CUS-002',

    customerName: 'Global Solutions Pvt Ltd',
    customerType: 'Enterprise',
    industry: 'Consulting',
    website: 'https://globalsolutions.example.com',

    email: 'info@globalsolutions.example.com',
    phone: '+91 99887 66554',

    owner: 'Rahul',
    status: 'Active',

    taxNumber: 'GST36XYZAB5678C1Z2',

    billingAddress: '45 Business Avenue',
    shippingAddress: '45 Business Avenue',

    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560001',

    currency: 'INR',
    paymentTerms: 'Net 45',
    notes: 'Enterprise account with multiple opportunities.',

    primaryContact: 'Anita Rao',

    totalOpportunities: 8,
    totalRevenue: 5200000,

    createdDate: '2026-02-10',
    updatedDate: '2026-09-05',
    lastActivity: '2026-09-18',

    contacts: [
      {
        id: 'C002',
        name: 'Anita Rao',
        email: 'anita@globalsolutions.example.com',
        phone: '+91 99887 66554',
        role: 'Director',
      },
    ],

    opportunities: [
      {
        id: 'OPP-002',
        name: 'Enterprise Platform',
        stage: 'Negotiation',
        amount: 3000000,
        status: 'Open',
      },
    ],

    quotes: [
      {
        id: 'QUO-002',
        quoteNumber: 'QT-002',
        amount: 3000000,
        status: 'Negotiation',
        date: '2026-09-05',
      },
    ],

    orders: [
      {
        id: 'ORD-002',
        orderNumber: 'ORD-002',
        amount: 2000000,
        status: 'Confirmed',
        date: '2026-08-10',
      },
    ],

    invoices: [
      {
        id: 'INV-002',
        invoiceNumber: 'INV-002',
        amount: 2000000,
        status: 'Pending',
        date: '2026-08-30',
      },
    ],

    activities: [
      {
        id: 'ACT-002',
        type: 'Meeting',
        description: 'Enterprise solution discussion.',
        date: '2026-09-18',
        performedBy: 'Rahul',
      },
    ],

    serviceHistory: [
      {
        id: 'SRV-002',
        service: 'Enterprise Support',
        status: 'Active',
        date: '2026-07-15',
      },
    ],
  },

  {
    id: '3',
    customerId: 'CUS-003',

    customerName: 'Sunrise Retail',
    customerType: 'Business',
    industry: 'Retail',
    website: 'https://sunriseretail.example.com',

    email: 'contact@sunriseretail.example.com',
    phone: '+91 91234 56789',

    owner: 'Priya',
    status: 'Active',

    taxNumber: 'GST07RETAIL1234A1Z1',

    billingAddress: '78 Market Street',
    shippingAddress: '78 Market Street',

    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110001',

    currency: 'INR',
    paymentTerms: 'Net 30',
    notes: 'Retail customer.',

    primaryContact: 'Vikram Singh',

    totalOpportunities: 3,
    totalRevenue: 1200000,

    createdDate: '2026-03-05',
    updatedDate: '2026-08-25',
    lastActivity: '2026-09-15',

    contacts: [
      {
        id: 'C003',
        name: 'Vikram Singh',
        email: 'vikram@sunriseretail.example.com',
        phone: '+91 91234 56789',
        role: 'Operations Manager',
      },
    ],

    opportunities: [],

    quotes: [],

    orders: [],

    invoices: [],

    activities: [
      {
        id: 'ACT-003',
        type: 'Email',
        description: 'Sent product update.',
        date: '2026-09-15',
        performedBy: 'Priya',
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
    website: 'https://nextgen.example.com',

    email: 'info@nextgen.example.com',
    phone: '+91 90123 45678',

    owner: 'Pavan',
    status: 'Inactive',

    taxNumber: 'GST27NEXTG1234B1Z8',

    billingAddress: '90 Industrial Area',
    shippingAddress: '90 Industrial Area',

    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    postalCode: '411001',

    currency: 'INR',
    paymentTerms: 'Net 60',
    notes: 'Account currently inactive.',

    primaryContact: 'Suresh Kumar',

    totalOpportunities: 2,
    totalRevenue: 800000,

    createdDate: '2026-04-12',
    updatedDate: '2026-08-10',
    lastActivity: '2026-08-20',

    contacts: [
      {
        id: 'C004',
        name: 'Suresh Kumar',
        email: 'suresh@nextgen.example.com',
        phone: '+91 90123 45678',
        role: 'Purchase Manager',
      },
    ],

    opportunities: [],

    quotes: [],

    orders: [],

    invoices: [],

    activities: [
      {
        id: 'ACT-004',
        type: 'Call',
        description: 'Discussed account status.',
        date: '2026-08-20',
        performedBy: 'Pavan',
      },
    ],

    serviceHistory: [],
  },

  {
    id: '5',
    customerId: 'CUS-005',

    customerName: 'TechVision Labs',
    customerType: 'Business',
    industry: 'Software',
    website: 'https://techvision.example.com',

    email: 'hello@techvision.example.com',
    phone: '+91 93456 78901',

    owner: 'Priya',
    status: 'Active',

    taxNumber: 'GST29TECHV1234D1Z4',

    billingAddress: '25 Innovation Road',
    shippingAddress: '25 Innovation Road',

    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    postalCode: '600001',

    currency: 'INR',
    paymentTerms: 'Net 30',
    notes: 'Growing software company.',

    primaryContact: 'Kiran Reddy',

    totalOpportunities: 4,
    totalRevenue: 1750000,

    createdDate: '2026-05-20',
    updatedDate: '2026-09-10',
    lastActivity: '2026-09-22',

    contacts: [
      {
        id: 'C005',
        name: 'Kiran Reddy',
        email: 'kiran@techvision.example.com',
        phone: '+91 93456 78901',
        role: 'Founder',
      },
    ],

    opportunities: [
      {
        id: 'OPP-005',
        name: 'CRM Implementation',
        stage: 'Qualification',
        amount: 750000,
        status: 'Open',
      },
    ],

    quotes: [
      {
        id: 'QUO-005',
        quoteNumber: 'QT-005',
        amount: 750000,
        status: 'Draft',
        date: '2026-09-22',
      },
    ],

    orders: [],

    invoices: [],

    activities: [
      {
        id: 'ACT-005',
        type: 'Meeting',
        description: 'CRM implementation requirements discussed.',
        date: '2026-09-22',
        performedBy: 'Priya',
      },
    ],

    serviceHistory: [
      {
        id: 'SRV-005',
        service: 'CRM Consultation',
        status: 'In Progress',
        date: '2026-09-20',
      },
    ],
  },
]
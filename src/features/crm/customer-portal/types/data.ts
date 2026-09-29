export type TicketStatus = 'Open' | 'In Progress' | 'Waiting on Customer' | 'Resolved';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type OrderStatus = 'Draft' | 'Confirmed' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
export type InvoiceStatus = 'Draft' | 'Sent' | 'Partially Paid' | 'Paid' | 'Overdue';
export type QuotationStatus = 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Changes Requested' | 'Expired';

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  category: string;
  priority: Priority;
  customer: string;
  contact: string;
  createdDate: string;
  updatedDate: string;
  assignedTo: string;
  status: TicketStatus;
  expectedResolutionDate: string;
  resolutionNotes: string;
  attachments: { name: string; size: string; type: string }[];
  conversation: { id: string; author: string; role: 'Customer' | 'Support'; message: string; date: string }[];
}

export interface CustomerActivity {
  id: string;
  activityType: 'Call' | 'Email' | 'Meeting' | 'Task' | 'Note';
  subject: string;
  description: string;
  relatedContact: string;
  relatedOpportunity: string;
  activityDate: string;
  owner: string;
  status: 'Planned' | 'Completed' | 'Pending';
  priority: Priority;
  nextAction: string;
  reminderDate: string;
}

export interface CustomerNotification {
  id: string;
  notificationType: 'Ticket Update' | 'Reminder' | 'Invoice' | 'Order' | 'System';
  title: string;
  message: string;
  relatedModule: string;
  relatedRecordId: string;
  createdDate: string;
  read: boolean;
  priority: Priority;
  actionLabel?: string;
  actionPath?: string;
}

export interface CustomerOrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: OrderStatus;
  expectedDelivery: string;
  total: number;
  currency: string;
  paymentStatus: 'Pending' | 'Paid' | 'Partially Paid';
  shippingAddress: string;
  trackingNumber?: string;
  items: CustomerOrderItem[];
}

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  currency: string;
  orderNumber?: string;
}

export interface CustomerQuotationItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

export interface CustomerQuotation {
  id: string;
  quotationNumber: string;
  title: string;
  createdDate: string;
  validUntil: string;
  status: QuotationStatus;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  owner: string;
  notes: string;
  items: CustomerQuotationItem[];
}

export interface CustomerProfile {
  companyName: string;
  customerCode: string;
  primaryContact: string;
  email: string;
  phone: string;
  alternatePhone: string;
  website: string;
  billingAddress: string;
  shippingAddress: string;
  gstin: string;
  pan: string;
  paymentTerms: string;
  accountManager: string;
  preferredContact: 'Email' | 'Phone' | 'Portal';
}

export interface CustomerAccount {
  customerCode: string;
  companyName: string;
  accountManager: string;
  accountStatus: 'Active' | 'On Hold' | 'Inactive';
  customerSince: string;
  creditLimit: number;
  outstanding: number;
  availableCredit: number;
  currency: string;
  paymentTerms: string;
  totalOrders: number;
  lifetimeValue: number;
  billingCycle: string;
}

export const supportTickets: SupportTicket[] = [
  {
    id: 'TCK-1001', ticketNumber: 'SUP-2026-00124', subject: 'Unable to download monthly invoice',
    description: 'The invoice download button returns an error for the September invoice from the customer portal.',
    category: 'Billing', priority: 'High', customer: 'Acme Industries', contact: 'Rohan Mehta',
    createdDate: 'Sep 22, 2026 · 09:40 AM', updatedDate: 'Sep 23, 2026 · 09:10 AM', assignedTo: 'Priya Nair',
    status: 'In Progress', expectedResolutionDate: 'Sep 30, 2026',
    resolutionNotes: 'Support team is validating the invoice document service and download permissions.',
    attachments: [{ name: 'invoice-error.png', size: '482 KB', type: 'image' }],
    conversation: [
      { id: 'c1', author: 'Rohan Mehta', role: 'Customer', message: 'I cannot download the September invoice. The portal shows an error after I click Download.', date: 'Sep 22, 2026 · 09:40 AM' },
      { id: 'c2', author: 'Priya Nair', role: 'Support', message: 'Thanks for reporting this. We have reproduced the issue and are checking the document service.', date: 'Sep 22, 2026 · 02:15 PM' },
      { id: 'c3', author: 'Rohan Mehta', role: 'Customer', message: 'Thank you. Please let me know when the invoice is available.', date: 'Sep 23, 2026 · 08:32 AM' },
    ],
  },
  {
    id: 'TCK-1002', ticketNumber: 'SUP-2026-00119', subject: 'Add a new billing contact',
    description: 'Request to add Ananya Kulkarni as an additional billing contact for the account.',
    category: 'Account', priority: 'Medium', customer: 'Acme Industries', contact: 'Rohan Mehta',
    createdDate: 'Sep 20, 2026 · 11:20 AM', updatedDate: 'Sep 22, 2026 · 04:45 PM', assignedTo: 'Arjun Rao',
    status: 'Waiting on Customer', expectedResolutionDate: 'Sep 30, 2026',
    resolutionNotes: 'Waiting for confirmation of the new contact email and phone number.',
    attachments: [],
    conversation: [
      { id: 'c4', author: 'Rohan Mehta', role: 'Customer', message: 'Please add Ananya Kulkarni as a billing contact.', date: 'Sep 20, 2026 · 11:20 AM' },
      { id: 'c5', author: 'Arjun Rao', role: 'Support', message: 'Please confirm the contact email before we update the account.', date: 'Sep 22, 2026 · 04:45 PM' },
    ],
  },
  {
    id: 'TCK-1003', ticketNumber: 'SUP-2026-00107', subject: 'Portal access for finance team',
    description: 'Two finance users need access to invoices and account statements.',
    category: 'Access', priority: 'Low', customer: 'Acme Industries', contact: 'Neha Shah',
    createdDate: 'Sep 15, 2026 · 10:05 AM', updatedDate: 'Sep 16, 2026 · 03:30 PM', assignedTo: 'Priya Nair',
    status: 'Resolved', expectedResolutionDate: 'Sep 17, 2026',
    resolutionNotes: 'Access was provisioned for the two requested finance users.',
    attachments: [],
    conversation: [
      { id: 'c6', author: 'Neha Shah', role: 'Customer', message: 'Please enable invoice access for our finance team.', date: 'Sep 15, 2026 · 10:05 AM' },
      { id: 'c7', author: 'Priya Nair', role: 'Support', message: 'Access has been enabled for both users. The ticket is now resolved.', date: 'Sep 16, 2026 · 03:30 PM' },
    ],
  },
  {
    id: 'TCK-1004', ticketNumber: 'SUP-2026-00098', subject: 'Order status clarification',
    description: 'Need the latest dispatch status for order ORD-7842.',
    category: 'Orders', priority: 'Medium', customer: 'Acme Industries', contact: 'Rohan Mehta',
    createdDate: 'Sep 10, 2026 · 01:25 PM', updatedDate: 'Sep 11, 2026 · 12:05 PM', assignedTo: 'Arjun Rao',
    status: 'Resolved', expectedResolutionDate: 'Sep 11, 2026',
    resolutionNotes: 'Order was dispatched on Sep 11 and tracking details were shared.',
    attachments: [{ name: 'dispatch-note.pdf', size: '218 KB', type: 'pdf' }],
    conversation: [
      { id: 'c8', author: 'Rohan Mehta', role: 'Customer', message: 'Could you share the dispatch status for ORD-7842?', date: 'Sep 10, 2026 · 01:25 PM' },
      { id: 'c9', author: 'Arjun Rao', role: 'Support', message: 'The order was dispatched today. Tracking details are available in Orders.', date: 'Sep 11, 2026 · 12:05 PM' },
    ],
  },
];

export const customerActivities: CustomerActivity[] = [
  { id: 'ACT-2201', activityType: 'Call', subject: 'Quarterly account review', description: 'Reviewed open support items and upcoming renewal requirements.', relatedContact: 'Rohan Mehta', relatedOpportunity: 'Acme Renewal 2027', activityDate: 'Sep 29, 2026 · 11:00 AM', owner: 'Priya Nair', status: 'Planned', priority: 'High', nextAction: 'Send renewal summary', reminderDate: 'Sep 30, 2026' },
  { id: 'ACT-2198', activityType: 'Email', subject: 'Invoice issue follow-up', description: 'Follow-up sent regarding SUP-2026-00124.', relatedContact: 'Rohan Mehta', relatedOpportunity: '—', activityDate: 'Sep 28, 2026 · 08:30 AM', owner: 'Priya Nair', status: 'Completed', priority: 'High', nextAction: 'Confirm invoice download', reminderDate: 'Sep 30, 2026' },
  { id: 'ACT-2192', activityType: 'Meeting', subject: 'Product roadmap discussion', description: 'Discussed requested portal enhancements and reporting needs.', relatedContact: 'Neha Shah', relatedOpportunity: 'Portal Expansion', activityDate: 'Sep 26, 2026 · 03:00 PM', owner: 'Arjun Rao', status: 'Completed', priority: 'Medium', nextAction: 'Share roadmap notes', reminderDate: 'Oct 02, 2026' },
  { id: 'ACT-2186', activityType: 'Task', subject: 'Confirm billing contact', description: 'Validate the new billing contact information.', relatedContact: 'Rohan Mehta', relatedOpportunity: '—', activityDate: 'Sep 26, 2026 · 01:00 PM', owner: 'Arjun Rao', status: 'Pending', priority: 'Medium', nextAction: 'Await customer confirmation', reminderDate: 'Sep 30, 2026' },
  { id: 'ACT-2179', activityType: 'Note', subject: 'Finance team access enabled', description: 'Recorded completion of finance portal access request.', relatedContact: 'Neha Shah', relatedOpportunity: '—', activityDate: 'Sep 16, 2026 · 03:30 PM', owner: 'Priya Nair', status: 'Completed', priority: 'Low', nextAction: 'None', reminderDate: '—' },
];

export const customerNotifications: CustomerNotification[] = [
  { id: 'NTF-901', notificationType: 'Ticket Update', title: 'Support ticket updated', message: 'SUP-2026-00124 is now In Progress. Expected resolution is Sep 30.', relatedModule: 'Support', relatedRecordId: 'TCK-1001', createdDate: 'Sep 29, 2026 · 09:10 AM', read: false, priority: 'High', actionLabel: 'View ticket', actionPath: '/crm/customer-portal/support/TCK-1001' },
  { id: 'NTF-902', notificationType: 'Reminder', title: 'Customer activity reminder', message: 'Quarterly account review is scheduled for today at 11:00 AM.', relatedModule: 'Activities', relatedRecordId: 'ACT-2201', createdDate: 'Sep 29, 2026 · 08:00 AM', read: false, priority: 'Medium', actionLabel: 'View activities', actionPath: '/crm/customer-portal/activities' },
  { id: 'NTF-903', notificationType: 'Invoice', title: 'Invoice available', message: 'September invoice is available in your account. A support ticket is also open for download assistance.', relatedModule: 'Invoices', relatedRecordId: 'INV-2026-09', createdDate: 'Sep 28, 2026 · 05:15 PM', read: true, priority: 'Medium', actionLabel: 'Open invoices', actionPath: '/crm/customer-portal/invoices' },
  { id: 'NTF-904', notificationType: 'Order', title: 'Order status changed', message: 'ORD-7842 has been dispatched and is ready for tracking.', relatedModule: 'Orders', relatedRecordId: 'ORD-7842', createdDate: 'Sep 27, 2026 · 12:20 PM', read: true, priority: 'Low', actionLabel: 'View orders', actionPath: '/crm/customer-portal/orders' },
];

export const customerOrders: CustomerOrder[] = [
  { id: 'ORD-7842', orderNumber: 'ORD-7842', orderDate: 'Sep 10, 2026', status: 'Dispatched', expectedDelivery: 'Oct 01, 2026', total: 148500, currency: 'INR', paymentStatus: 'Paid', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', trackingNumber: 'BLR-TRK-7842', items: [{ id: 'oi1', name: 'Enterprise Service Pack', sku: 'ESP-01', quantity: 1, unitPrice: 120000 }, { id: 'oi2', name: 'Implementation Support', sku: 'IMP-12', quantity: 1, unitPrice: 28500 }] },
  { id: 'ORD-7798', orderNumber: 'ORD-7798', orderDate: 'Aug 18, 2026', status: 'Delivered', expectedDelivery: 'Aug 28, 2026', total: 86250, currency: 'INR', paymentStatus: 'Paid', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', trackingNumber: 'BLR-TRK-7798', items: [{ id: 'oi3', name: 'CRM User Licences', sku: 'CRM-USER', quantity: 15, unitPrice: 5750 }] },
  { id: 'ORD-7721', orderNumber: 'ORD-7721', orderDate: 'Jul 09, 2026', status: 'Delivered', expectedDelivery: 'Jul 18, 2026', total: 54200, currency: 'INR', paymentStatus: 'Partially Paid', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', items: [{ id: 'oi4', name: 'Analytics Add-on', sku: 'ANL-02', quantity: 2, unitPrice: 27100 }] },
  { id: 'ORD-7650', orderNumber: 'ORD-7650', orderDate: 'Jun 02, 2026', status: 'Cancelled', expectedDelivery: 'Jun 12, 2026', total: 32000, currency: 'INR', paymentStatus: 'Pending', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', items: [{ id: 'oi5', name: 'Training Package', sku: 'TRN-05', quantity: 1, unitPrice: 32000 }] },
];

export const customerInvoices: CustomerInvoice[] = [
  { id: 'INV-2026-09', invoiceNumber: 'INV-2026-09-118', invoiceDate: 'Sep 01, 2026', dueDate: 'Sep 30, 2026', status: 'Sent', subtotal: 125000, tax: 22500, total: 147500, amountPaid: 0, balanceDue: 147500, currency: 'INR', orderNumber: 'ORD-7842' },
  { id: 'INV-2026-08', invoiceNumber: 'INV-2026-08-101', invoiceDate: 'Aug 01, 2026', dueDate: 'Aug 31, 2026', status: 'Paid', subtotal: 72000, tax: 12960, total: 84960, amountPaid: 84960, balanceDue: 0, currency: 'INR', orderNumber: 'ORD-7798' },
  { id: 'INV-2026-07', invoiceNumber: 'INV-2026-07-086', invoiceDate: 'Jul 01, 2026', dueDate: 'Jul 31, 2026', status: 'Partially Paid', subtotal: 50000, tax: 9000, total: 59000, amountPaid: 30000, balanceDue: 29000, currency: 'INR', orderNumber: 'ORD-7721' },
  { id: 'INV-2026-06', invoiceNumber: 'INV-2026-06-070', invoiceDate: 'Jun 01, 2026', dueDate: 'Jun 30, 2026', status: 'Paid', subtotal: 38000, tax: 6840, total: 44840, amountPaid: 44840, balanceDue: 0, currency: 'INR', orderNumber: 'ORD-7650' },
];

export const customerQuotations: CustomerQuotation[] = [
  { id: 'QT-26091', quotationNumber: 'QT-2026-091', title: 'CRM Enterprise Expansion', createdDate: 'Sep 24, 2026', validUntil: 'Oct 15, 2026', status: 'Sent', subtotal: 310000, tax: 55800, total: 365800, currency: 'INR', owner: 'Priya Nair', notes: 'Includes 25 additional CRM users, onboarding and priority support.', items: [{ id: 'qi1', name: 'CRM Enterprise User Licence', quantity: 25, unitPrice: 10000, discount: 0 }, { id: 'qi2', name: 'Priority Support', quantity: 1, unitPrice: 60000, discount: 0 }] },
  { id: 'QT-26072', quotationNumber: 'QT-2026-072', title: 'Analytics & BI Upgrade', createdDate: 'Aug 14, 2026', validUntil: 'Sep 14, 2026', status: 'Accepted', subtotal: 180000, tax: 32400, total: 212400, currency: 'INR', owner: 'Arjun Rao', notes: 'Analytics workspace with dashboards and scheduled reports.', items: [{ id: 'qi3', name: 'Analytics Add-on', quantity: 2, unitPrice: 90000, discount: 0 }] },
  { id: 'QT-26044', quotationNumber: 'QT-2026-044', title: 'Customer Portal Enhancements', createdDate: 'Jul 22, 2026', validUntil: 'Aug 22, 2026', status: 'Changes Requested', subtotal: 95000, tax: 17100, total: 112100, currency: 'INR', owner: 'Priya Nair', notes: 'Portal workflow, branding and self-service enhancements.', items: [{ id: 'qi4', name: 'Portal Enhancement Sprint', quantity: 1, unitPrice: 95000, discount: 0 }] },
];

export const customerProfile: CustomerProfile = {
  companyName: 'Acme Industries', customerCode: 'CUS-00418', primaryContact: 'Rohan Mehta', email: 'rohan.mehta@acmeindustries.example', phone: '+91 98765 43210', alternatePhone: '+91 98765 43111', website: 'www.acmeindustries.example', billingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', gstin: '29AACCA1234A1Z5', pan: 'AACCA1234A', paymentTerms: 'Net 30', accountManager: 'Priya Nair', preferredContact: 'Email',
};

export const customerAccount: CustomerAccount = {
  customerCode: 'CUS-00418', companyName: 'Acme Industries', accountManager: 'Priya Nair', accountStatus: 'Active', customerSince: 'April 2023', creditLimit: 750000, outstanding: 176500, availableCredit: 573500, currency: 'INR', paymentTerms: 'Net 30', totalOrders: customerOrders.length, lifetimeValue: 2846500, billingCycle: 'Monthly',
};

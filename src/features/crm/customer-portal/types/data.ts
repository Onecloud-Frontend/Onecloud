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
  accountId: string;
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
  billingCycle: string;
  totalQuotes: number;
  pendingQuotes: number;
  totalOrders: number;
  openOrders: number;
  totalInvoices: number;
  outstandingAmount: number;
  paidAmount: number;
  paymentDueDate: string;
  supportTickets: SupportTicket[];
  recentActivities: CustomerActivity[];
  recentQuotes: CustomerQuotation[];
  recentOrders: CustomerOrder[];
  recentInvoices: CustomerInvoice[];
  lifetimeValue: number;
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
  {
    id: 'TCK-1005', ticketNumber: 'SUP-2026-00125', subject: 'Portal login fails after password reset',
    description: 'Customer cannot access the portal after resetting the account password.',
    category: 'Account', priority: 'High', customer: 'Yasin', contact: 'Yasin',
    createdDate: 'Oct 2, 2026 · 09:15 AM', updatedDate: 'Oct 2, 2026 · 02:30 PM', assignedTo: 'Priya Nair',
    status: 'In Progress', expectedResolutionDate: 'Oct 10, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1005', author: 'Yasin', role: 'Customer', message: 'Portal login fails after password reset. Please help us resolve this request.', date: 'Oct 2, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1005-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 2, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1006', ticketNumber: 'SUP-2026-00126', subject: 'Invoice PDF shows incorrect tax',
    description: 'The tax amount on the latest invoice does not match the expected value.',
    category: 'Billing', priority: 'High', customer: 'Andrew', contact: 'Andrew',
    createdDate: 'Oct 2, 2026 · 10:15 AM', updatedDate: 'Oct 2, 2026 · 03:30 PM', assignedTo: 'Arjun Rao',
    status: 'Open', expectedResolutionDate: 'Oct 11, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1006', author: 'Andrew', role: 'Customer', message: 'Invoice PDF shows incorrect tax. Please help us resolve this request.', date: 'Oct 2, 2026 · 10:15 AM' },
      { id: 'seed-TCK-1006-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 2, 2026 · 03:30 PM' },
    ],
  },
  {
    id: 'TCK-1007', ticketNumber: 'SUP-2026-00127', subject: 'Request new billing contact',
    description: 'Request to add a new billing contact to the customer account.',
    category: 'Account', priority: 'Medium', customer: 'Pavan', contact: 'Pavan',
    createdDate: 'Oct 2, 2026 · 11:15 AM', updatedDate: 'Oct 2, 2026 · 04:30 PM', assignedTo: 'Priya Nair',
    status: 'Waiting on Customer', expectedResolutionDate: 'Oct 12, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1007', author: 'Pavan', role: 'Customer', message: 'Request new billing contact. Please help us resolve this request.', date: 'Oct 2, 2026 · 11:15 AM' },
      { id: 'seed-TCK-1007-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 2, 2026 · 04:30 PM' },
    ],
  },
  {
    id: 'TCK-1008', ticketNumber: 'SUP-2026-00128', subject: 'Order tracking not updating',
    description: 'The order page has not refreshed with the latest shipment tracking information.',
    category: 'Orders', priority: 'Medium', customer: 'Yasin', contact: 'Yasin',
    createdDate: 'Oct 3, 2026 · 12:15 AM', updatedDate: 'Oct 3, 2026 · 05:30 PM', assignedTo: 'Arjun Rao',
    status: 'In Progress', expectedResolutionDate: 'Oct 12, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1008', author: 'Yasin', role: 'Customer', message: 'Order tracking not updating. Please help us resolve this request.', date: 'Oct 3, 2026 · 12:15 AM' },
      { id: 'seed-TCK-1008-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 3, 2026 · 05:30 PM' },
    ],
  },
  {
    id: 'TCK-1009', ticketNumber: 'SUP-2026-00129', subject: 'Quotation download issue',
    description: 'Customer is unable to download the approved quotation document.',
    category: 'Quotations', priority: 'High', customer: 'Andrew', contact: 'Andrew',
    createdDate: 'Oct 3, 2026 · 13:15 AM', updatedDate: 'Oct 3, 2026 · 06:30 PM', assignedTo: 'Priya Nair',
    status: 'Open', expectedResolutionDate: 'Oct 13, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1009', author: 'Andrew', role: 'Customer', message: 'Quotation download issue. Please help us resolve this request.', date: 'Oct 3, 2026 · 13:15 AM' },
      { id: 'seed-TCK-1009-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 3, 2026 · 06:30 PM' },
    ],
  },
  {
    id: 'TCK-1010', ticketNumber: 'SUP-2026-00130', subject: 'Support portal notification delay',
    description: 'New ticket notifications are not appearing immediately in the portal.',
    category: 'Technical', priority: 'Medium', customer: 'Pavan', contact: 'Pavan',
    createdDate: 'Oct 3, 2026 · 14:15 AM', updatedDate: 'Oct 3, 2026 · 07:30 PM', assignedTo: 'Arjun Rao',
    status: 'Open', expectedResolutionDate: 'Oct 13, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1010', author: 'Pavan', role: 'Customer', message: 'Support portal notification delay. Please help us resolve this request.', date: 'Oct 3, 2026 · 14:15 AM' },
      { id: 'seed-TCK-1010-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 3, 2026 · 07:30 PM' },
    ],
  },
  {
    id: 'TCK-1011', ticketNumber: 'SUP-2026-00131', subject: 'Update company profile details',
    description: 'Request to update company contact and address information.',
    category: 'Profile', priority: 'Low', customer: 'Yasin', contact: 'Yasin',
    createdDate: 'Oct 4, 2026 · 15:15 AM', updatedDate: 'Oct 4, 2026 · 08:30 PM', assignedTo: 'Priya Nair',
    status: 'Resolved', expectedResolutionDate: 'Oct 9, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1011', author: 'Yasin', role: 'Customer', message: 'Update company profile details. Please help us resolve this request.', date: 'Oct 4, 2026 · 15:15 AM' },
      { id: 'seed-TCK-1011-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 4, 2026 · 08:30 PM' },
    ],
  },
  {
    id: 'TCK-1012', ticketNumber: 'SUP-2026-00132', subject: 'Payment status not refreshed',
    description: 'Payment was completed but the invoice still shows the previous payment status.',
    category: 'Billing', priority: 'Urgent', customer: 'Andrew', contact: 'Andrew',
    createdDate: 'Oct 4, 2026 · 16:15 AM', updatedDate: 'Oct 4, 2026 · 09:30 PM', assignedTo: 'Arjun Rao',
    status: 'In Progress', expectedResolutionDate: 'Oct 10, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1012', author: 'Andrew', role: 'Customer', message: 'Payment status not refreshed. Please help us resolve this request.', date: 'Oct 4, 2026 · 16:15 AM' },
      { id: 'seed-TCK-1012-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 4, 2026 · 09:30 PM' },
    ],
  },
  {
    id: 'TCK-1013', ticketNumber: 'SUP-2026-00133', subject: 'Unable to view support history',
    description: 'Older support requests are missing from the customer portal history.',
    category: 'Technical', priority: 'High', customer: 'Pavan', contact: 'Pavan',
    createdDate: 'Oct 4, 2026 · 17:15 AM', updatedDate: 'Oct 4, 2026 · 10:30 PM', assignedTo: 'Priya Nair',
    status: 'Open', expectedResolutionDate: 'Oct 14, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1013', author: 'Pavan', role: 'Customer', message: 'Unable to view support history. Please help us resolve this request.', date: 'Oct 4, 2026 · 17:15 AM' },
      { id: 'seed-TCK-1013-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 4, 2026 · 10:30 PM' },
    ],
  },
  {
    id: 'TCK-1014', ticketNumber: 'SUP-2026-00134', subject: 'Request order delivery update',
    description: 'Customer needs the latest expected delivery date for an active order.',
    category: 'Orders', priority: 'Medium', customer: 'Yasin', contact: 'Yasin',
    createdDate: 'Oct 5, 2026 · 18:15 AM', updatedDate: 'Oct 5, 2026 · 11:30 PM', assignedTo: 'Arjun Rao',
    status: 'Waiting on Customer', expectedResolutionDate: 'Oct 14, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1014', author: 'Yasin', role: 'Customer', message: 'Request order delivery update. Please help us resolve this request.', date: 'Oct 5, 2026 · 18:15 AM' },
      { id: 'seed-TCK-1014-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 5, 2026 · 11:30 PM' },
    ],
  },
  {
    id: 'TCK-1015', ticketNumber: 'SUP-2026-00135', subject: 'Quotation needs correction',
    description: 'Customer requested a correction to the quantity shown on a quotation.',
    category: 'Quotations', priority: 'Medium', customer: 'Andrew', contact: 'Andrew',
    createdDate: 'Oct 5, 2026 · 19:15 AM', updatedDate: 'Oct 5, 2026 · 12:30 PM', assignedTo: 'Priya Nair',
    status: 'In Progress', expectedResolutionDate: 'Oct 15, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1015', author: 'Andrew', role: 'Customer', message: 'Quotation needs correction. Please help us resolve this request.', date: 'Oct 5, 2026 · 19:15 AM' },
      { id: 'seed-TCK-1015-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 5, 2026 · 12:30 PM' },
    ],
  },
  {
    id: 'TCK-1016', ticketNumber: 'SUP-2026-00136', subject: 'Portal page loading slowly',
    description: 'Customer reports slow loading when opening the support request list.',
    category: 'Technical', priority: 'High', customer: 'Pavan', contact: 'Pavan',
    createdDate: 'Oct 5, 2026 · 20:15 AM', updatedDate: 'Oct 5, 2026 · 13:30 PM', assignedTo: 'Arjun Rao',
    status: 'Open', expectedResolutionDate: 'Oct 15, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1016', author: 'Pavan', role: 'Customer', message: 'Portal page loading slowly. Please help us resolve this request.', date: 'Oct 5, 2026 · 20:15 AM' },
      { id: 'seed-TCK-1016-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 5, 2026 · 13:30 PM' },
    ],
  },
  {
    id: 'TCK-1017', ticketNumber: 'SUP-2026-00137', subject: 'Unable to access account dashboard',
    description: 'Portal dashboard is not loading after customer login.',
    category: 'Account', priority: 'High', customer: 'Rahul Sharma', contact: 'Rahul Sharma',
    createdDate: 'Oct 6, 2026 · 09:15 AM', updatedDate: 'Oct 6, 2026 · 02:30 PM', assignedTo: 'Priya Nair',
    status: 'Open', expectedResolutionDate: 'Oct 13, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1017', author: 'Rahul Sharma', role: 'Customer', message: 'Unable to access account dashboard. Please help us resolve this request.', date: 'Oct 6, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1017-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 6, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1018', ticketNumber: 'SUP-2026-00138', subject: 'Invoice payment confirmation needed',
    description: 'Customer needs confirmation that the latest invoice payment was received.',
    category: 'Billing', priority: 'Medium', customer: 'Sneha Patil', contact: 'Sneha Patil',
    createdDate: 'Oct 6, 2026 · 09:15 AM', updatedDate: 'Oct 6, 2026 · 02:30 PM', assignedTo: 'Arjun Rao',
    status: 'In Progress', expectedResolutionDate: 'Oct 13, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1018', author: 'Sneha Patil', role: 'Customer', message: 'Invoice payment confirmation needed. Please help us resolve this request.', date: 'Oct 6, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1018-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 6, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1019', ticketNumber: 'SUP-2026-00139', subject: 'Order delivery date change',
    description: 'Customer requested an updated delivery date for an active order.',
    category: 'Orders', priority: 'High', customer: 'Vikram Joshi', contact: 'Vikram Joshi',
    createdDate: 'Oct 6, 2026 · 09:15 AM', updatedDate: 'Oct 6, 2026 · 02:30 PM', assignedTo: 'Megha Joshi',
    status: 'Waiting on Customer', expectedResolutionDate: 'Oct 13, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1019', author: 'Vikram Joshi', role: 'Customer', message: 'Order delivery date change. Please help us resolve this request.', date: 'Oct 6, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1019-reply', author: 'Megha Joshi', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 6, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1020', ticketNumber: 'SUP-2026-00140', subject: 'Quotation item quantity correction',
    description: 'Customer requested a quantity correction on the latest quotation.',
    category: 'Quotations', priority: 'Medium', customer: 'Kavya Desai', contact: 'Kavya Desai',
    createdDate: 'Oct 7, 2026 · 09:15 AM', updatedDate: 'Oct 7, 2026 · 02:30 PM', assignedTo: 'Priya Nair',
    status: 'Open', expectedResolutionDate: 'Oct 14, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1020', author: 'Kavya Desai', role: 'Customer', message: 'Quotation item quantity correction. Please help us resolve this request.', date: 'Oct 7, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1020-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 7, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1021', ticketNumber: 'SUP-2026-00141', subject: 'Profile contact number update',
    description: 'Customer requested an update to the primary contact number.',
    category: 'Profile', priority: 'Low', customer: 'Nikhil Verma', contact: 'Nikhil Verma',
    createdDate: 'Oct 7, 2026 · 09:15 AM', updatedDate: 'Oct 7, 2026 · 02:30 PM', assignedTo: 'Arjun Rao',
    status: 'Resolved', expectedResolutionDate: 'Oct 14, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1021', author: 'Nikhil Verma', role: 'Customer', message: 'Profile contact number update. Please help us resolve this request.', date: 'Oct 7, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1021-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 7, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1022', ticketNumber: 'SUP-2026-00142', subject: 'Support notifications not received',
    description: 'Customer is not receiving notifications for ticket updates.',
    category: 'Technical', priority: 'High', customer: 'Meera Kulkarni', contact: 'Meera Kulkarni',
    createdDate: 'Oct 7, 2026 · 09:15 AM', updatedDate: 'Oct 7, 2026 · 02:30 PM', assignedTo: 'Megha Joshi',
    status: 'In Progress', expectedResolutionDate: 'Oct 14, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1022', author: 'Meera Kulkarni', role: 'Customer', message: 'Support notifications not received. Please help us resolve this request.', date: 'Oct 7, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1022-reply', author: 'Megha Joshi', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 7, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1023', ticketNumber: 'SUP-2026-00143', subject: 'Request additional portal user',
    description: 'Customer wants to add another portal user for the finance team.',
    category: 'Access', priority: 'Medium', customer: 'Sameer Khan', contact: 'Sameer Khan',
    createdDate: 'Oct 8, 2026 · 09:15 AM', updatedDate: 'Oct 8, 2026 · 02:30 PM', assignedTo: 'Priya Nair',
    status: 'Open', expectedResolutionDate: 'Oct 15, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1023', author: 'Sameer Khan', role: 'Customer', message: 'Request additional portal user. Please help us resolve this request.', date: 'Oct 8, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1023-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 8, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1024', ticketNumber: 'SUP-2026-00144', subject: 'Invoice download is slow',
    description: 'Customer reports a delay while downloading invoice documents.',
    category: 'Billing', priority: 'Medium', customer: 'Divya Rao', contact: 'Divya Rao',
    createdDate: 'Oct 8, 2026 · 09:15 AM', updatedDate: 'Oct 8, 2026 · 02:30 PM', assignedTo: 'Arjun Rao',
    status: 'Waiting on Customer', expectedResolutionDate: 'Oct 15, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1024', author: 'Divya Rao', role: 'Customer', message: 'Invoice download is slow. Please help us resolve this request.', date: 'Oct 8, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1024-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 8, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1025', ticketNumber: 'SUP-2026-00145', subject: 'Order tracking link broken',
    description: 'The tracking link for the latest order returns an error.',
    category: 'Orders', priority: 'Urgent', customer: 'Aisha Sheikh', contact: 'Aisha Sheikh',
    createdDate: 'Oct 8, 2026 · 09:15 AM', updatedDate: 'Oct 8, 2026 · 02:30 PM', assignedTo: 'Megha Joshi',
    status: 'In Progress', expectedResolutionDate: 'Oct 15, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1025', author: 'Aisha Sheikh', role: 'Customer', message: 'Order tracking link broken. Please help us resolve this request.', date: 'Oct 8, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1025-reply', author: 'Megha Joshi', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 8, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1026', ticketNumber: 'SUP-2026-00146', subject: 'Quotation expiry date clarification',
    description: 'Customer needs clarification about the quotation validity date.',
    category: 'Quotations', priority: 'Low', customer: 'Rohit Patil', contact: 'Rohit Patil',
    createdDate: 'Oct 9, 2026 · 09:15 AM', updatedDate: 'Oct 9, 2026 · 02:30 PM', assignedTo: 'Priya Nair',
    status: 'Resolved', expectedResolutionDate: 'Oct 16, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1026', author: 'Rohit Patil', role: 'Customer', message: 'Quotation expiry date clarification. Please help us resolve this request.', date: 'Oct 9, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1026-reply', author: 'Priya Nair', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 9, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1027', ticketNumber: 'SUP-2026-00147', subject: 'Customer portal search issue',
    description: 'Search results are not displaying older support tickets.',
    category: 'Technical', priority: 'High', customer: 'Kiran Deshmukh', contact: 'Kiran Deshmukh',
    createdDate: 'Oct 9, 2026 · 09:15 AM', updatedDate: 'Oct 9, 2026 · 02:30 PM', assignedTo: 'Arjun Rao',
    status: 'Open', expectedResolutionDate: 'Oct 16, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1027', author: 'Kiran Deshmukh', role: 'Customer', message: 'Customer portal search issue. Please help us resolve this request.', date: 'Oct 9, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1027-reply', author: 'Arjun Rao', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 9, 2026 · 02:30 PM' },
    ],
  },
  {
    id: 'TCK-1028', ticketNumber: 'SUP-2026-00148', subject: 'Update billing address',
    description: 'Customer requested an update to the billing address.',
    category: 'Account', priority: 'Medium', customer: 'Anjali More', contact: 'Anjali More',
    createdDate: 'Oct 9, 2026 · 09:15 AM', updatedDate: 'Oct 9, 2026 · 02:30 PM', assignedTo: 'Megha Joshi',
    status: 'Resolved', expectedResolutionDate: 'Oct 16, 2026',
    resolutionNotes: 'Support team is reviewing the request and will provide an update through the customer portal.',
    attachments: [],
    conversation: [
      { id: 'seed-TCK-1028', author: 'Anjali More', role: 'Customer', message: 'Update billing address. Please help us resolve this request.', date: 'Oct 9, 2026 · 09:15 AM' },
      { id: 'seed-TCK-1028-reply', author: 'Megha Joshi', role: 'Support', message: 'We have received the request and assigned it for follow-up.', date: 'Oct 9, 2026 · 02:30 PM' },
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

// Additional customer portal seed data
customerOrders.push(
  { id: 'ORD-7588', orderNumber: 'ORD-7588', orderDate: 'May 18, 2026', status: 'Delivered', expectedDelivery: 'May 28, 2026', total: 97500, currency: 'INR', paymentStatus: 'Paid', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', trackingNumber: 'BLR-TRK-7588', items: [{ id: 'oi6', name: 'CRM Implementation Package', sku: 'CRM-IMP', quantity: 1, unitPrice: 97500 }] },
  { id: 'ORD-7521', orderNumber: 'ORD-7521', orderDate: 'Apr 12, 2026', status: 'Processing', expectedDelivery: 'Apr 24, 2026', total: 126000, currency: 'INR', paymentStatus: 'Partially Paid', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', items: [{ id: 'oi7', name: 'Workflow Automation', sku: 'WFA-01', quantity: 2, unitPrice: 63000 }] },
  { id: 'ORD-7466', orderNumber: 'ORD-7466', orderDate: 'Mar 08, 2026', status: 'Delivered', expectedDelivery: 'Mar 18, 2026', total: 68500, currency: 'INR', paymentStatus: 'Paid', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', trackingNumber: 'BLR-TRK-7466', items: [{ id: 'oi8', name: 'Support Retainer', sku: 'SUP-RET', quantity: 1, unitPrice: 68500 }] },
  { id: 'ORD-7392', orderNumber: 'ORD-7392', orderDate: 'Feb 16, 2026', status: 'Confirmed', expectedDelivery: 'Feb 28, 2026', total: 154000, currency: 'INR', paymentStatus: 'Pending', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', items: [{ id: 'oi9', name: 'Enterprise Reporting Suite', sku: 'RPT-ENT', quantity: 1, unitPrice: 154000 }] },
  { id: 'ORD-7310', orderNumber: 'ORD-7310', orderDate: 'Jan 22, 2026', status: 'Delivered', expectedDelivery: 'Feb 02, 2026', total: 44500, currency: 'INR', paymentStatus: 'Paid', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', trackingNumber: 'BLR-TRK-7310', items: [{ id: 'oi10', name: 'Admin Training', sku: 'TRN-ADM', quantity: 1, unitPrice: 44500 }] },
  { id: 'ORD-7244', orderNumber: 'ORD-7244', orderDate: 'Dec 10, 2025', status: 'Delivered', expectedDelivery: 'Dec 20, 2025', total: 118000, currency: 'INR', paymentStatus: 'Paid', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', trackingNumber: 'BLR-TRK-7244', items: [{ id: 'oi11', name: 'Customer Portal License', sku: 'PORTAL-01', quantity: 1, unitPrice: 118000 }] },
  { id: 'ORD-7188', orderNumber: 'ORD-7188', orderDate: 'Nov 05, 2025', status: 'Cancelled', expectedDelivery: 'Nov 15, 2025', total: 76000, currency: 'INR', paymentStatus: 'Pending', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', items: [{ id: 'oi12', name: 'Mobile CRM Add-on', sku: 'MCRM-01', quantity: 1, unitPrice: 76000 }] },
  { id: 'ORD-7102', orderNumber: 'ORD-7102', orderDate: 'Oct 14, 2025', status: 'Delivered', expectedDelivery: 'Oct 25, 2025', total: 92000, currency: 'INR', paymentStatus: 'Paid', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', trackingNumber: 'BLR-TRK-7102', items: [{ id: 'oi13', name: 'Data Migration Service', sku: 'DATA-MIG', quantity: 1, unitPrice: 92000 }] },
);

customerInvoices.push(
  { id: 'INV-2026-05', invoiceNumber: 'INV-2026-05-061', invoiceDate: 'May 01, 2026', dueDate: 'May 31, 2026', status: 'Paid', subtotal: 82000, tax: 14760, total: 96760, amountPaid: 96760, balanceDue: 0, currency: 'INR', orderNumber: 'ORD-7588' },
  { id: 'INV-2026-04', invoiceNumber: 'INV-2026-04-054', invoiceDate: 'Apr 01, 2026', dueDate: 'Apr 30, 2026', status: 'Partially Paid', subtotal: 106780, tax: 19220, total: 126000, amountPaid: 76000, balanceDue: 50000, currency: 'INR', orderNumber: 'ORD-7521' },
  { id: 'INV-2026-03', invoiceNumber: 'INV-2026-03-043', invoiceDate: 'Mar 01, 2026', dueDate: 'Mar 31, 2026', status: 'Paid', subtotal: 58000, tax: 10440, total: 68440, amountPaid: 68440, balanceDue: 0, currency: 'INR', orderNumber: 'ORD-7466' },
  { id: 'INV-2026-02', invoiceNumber: 'INV-2026-02-035', invoiceDate: 'Feb 01, 2026', dueDate: 'Feb 28, 2026', status: 'Overdue', subtotal: 130508, tax: 23492, total: 154000, amountPaid: 0, balanceDue: 154000, currency: 'INR', orderNumber: 'ORD-7392' },
  { id: 'INV-2026-01', invoiceNumber: 'INV-2026-01-021', invoiceDate: 'Jan 01, 2026', dueDate: 'Jan 31, 2026', status: 'Paid', subtotal: 37712, tax: 6788, total: 44500, amountPaid: 44500, balanceDue: 0, currency: 'INR', orderNumber: 'ORD-7310' },
  { id: 'INV-2025-12', invoiceNumber: 'INV-2025-12-014', invoiceDate: 'Dec 01, 2025', dueDate: 'Dec 31, 2025', status: 'Paid', subtotal: 100000, tax: 18000, total: 118000, amountPaid: 118000, balanceDue: 0, currency: 'INR', orderNumber: 'ORD-7244' },
);

customerQuotations.push(
  { id: 'QT-26018', quotationNumber: 'QT-2026-018', title: 'Managed Support Renewal', createdDate: 'Jun 18, 2026', validUntil: 'Jul 18, 2026', status: 'Viewed', subtotal: 145000, tax: 26100, total: 171100, currency: 'INR', owner: 'Megha Joshi', notes: 'Annual managed support renewal with priority SLA.', items: [{ id: 'qi5', name: 'Managed Support Renewal', quantity: 1, unitPrice: 145000, discount: 0 }] },
  { id: 'QT-26012', quotationNumber: 'QT-2026-012', title: 'Workflow Automation Pack', createdDate: 'May 09, 2026', validUntil: 'Jun 09, 2026', status: 'Accepted', subtotal: 210000, tax: 37800, total: 247800, currency: 'INR', owner: 'Arjun Rao', notes: 'Workflow automation for sales and service operations.', items: [{ id: 'qi6', name: 'Workflow Automation', quantity: 3, unitPrice: 70000, discount: 0 }] },
  { id: 'QT-26008', quotationNumber: 'QT-2026-008', title: 'Data Migration Services', createdDate: 'Apr 04, 2026', validUntil: 'May 04, 2026', status: 'Expired', subtotal: 90000, tax: 16200, total: 106200, currency: 'INR', owner: 'Priya Nair', notes: 'Migration and validation services for legacy CRM records.', items: [{ id: 'qi7', name: 'Data Migration', quantity: 1, unitPrice: 90000, discount: 0 }] },
  { id: 'QT-25091', quotationNumber: 'QT-2025-091', title: 'Mobile CRM Extension', createdDate: 'Dec 12, 2025', validUntil: 'Jan 12, 2026', status: 'Accepted', subtotal: 125000, tax: 22500, total: 147500, currency: 'INR', owner: 'Megha Joshi', notes: 'Mobile access and field-service extension.', items: [{ id: 'qi8', name: 'Mobile CRM Extension', quantity: 1, unitPrice: 125000, discount: 0 }] },
  { id: 'QT-25076', quotationNumber: 'QT-2025-076', title: 'Reporting Dashboard Pack', createdDate: 'Nov 05, 2025', validUntil: 'Dec 05, 2025', status: 'Sent', subtotal: 160000, tax: 28800, total: 188800, currency: 'INR', owner: 'Arjun Rao', notes: 'Executive dashboards and scheduled reporting.', items: [{ id: 'qi9', name: 'Reporting Dashboard Pack', quantity: 2, unitPrice: 80000, discount: 0 }] },
  { id: 'QT-25058', quotationNumber: 'QT-2025-058', title: 'Security & Access Review', createdDate: 'Sep 21, 2025', validUntil: 'Oct 21, 2025', status: 'Changes Requested', subtotal: 72000, tax: 12960, total: 84960, currency: 'INR', owner: 'Priya Nair', notes: 'Portal access review and security hardening.', items: [{ id: 'qi10', name: 'Security Review', quantity: 1, unitPrice: 72000, discount: 0 }] },
  { id: 'QT-25031', quotationNumber: 'QT-2025-031', title: 'Training & Enablement', createdDate: 'Jul 11, 2025', validUntil: 'Aug 11, 2025', status: 'Expired', subtotal: 54000, tax: 9720, total: 63720, currency: 'INR', owner: 'Megha Joshi', notes: 'Administrator and end-user training package.', items: [{ id: 'qi11', name: 'Training Package', quantity: 1, unitPrice: 54000, discount: 0 }] },
);

customerActivities.push(
  { id: 'ACT-2170', activityType: 'Call', subject: 'Payment follow-up', description: 'Discussed outstanding invoice balance and payment date.', relatedContact: 'Rohan Mehta', relatedOpportunity: 'Renewal 2027', activityDate: 'Sep 14, 2026 · 10:30 AM', owner: 'Priya Nair', status: 'Completed', priority: 'High', nextAction: 'Confirm payment', reminderDate: 'Sep 18, 2026' },
  { id: 'ACT-2164', activityType: 'Email', subject: 'Quotation shared', description: 'Shared CRM enterprise expansion quotation.', relatedContact: 'Neha Shah', relatedOpportunity: 'CRM Expansion', activityDate: 'Sep 12, 2026 · 02:00 PM', owner: 'Priya Nair', status: 'Completed', priority: 'Medium', nextAction: 'Await customer response', reminderDate: 'Sep 16, 2026' },
  { id: 'ACT-2158', activityType: 'Meeting', subject: 'Support SLA review', description: 'Reviewed support response times and open requests.', relatedContact: 'Rohan Mehta', relatedOpportunity: 'Support Renewal', activityDate: 'Sep 09, 2026 · 04:00 PM', owner: 'Megha Joshi', status: 'Completed', priority: 'High', nextAction: 'Share SLA report', reminderDate: 'Sep 11, 2026' },
  { id: 'ACT-2151', activityType: 'Task', subject: 'Verify invoice payment', description: 'Verify bank receipt against July invoice.', relatedContact: 'Neha Shah', relatedOpportunity: '—', activityDate: 'Sep 05, 2026 · 11:30 AM', owner: 'Arjun Rao', status: 'Pending', priority: 'High', nextAction: 'Check finance ledger', reminderDate: 'Sep 06, 2026' },
  { id: 'ACT-2145', activityType: 'Email', subject: 'Order delivery confirmation', description: 'Confirmed delivery details for ORD-7842.', relatedContact: 'Rohan Mehta', relatedOpportunity: '—', activityDate: 'Sep 03, 2026 · 09:15 AM', owner: 'Arjun Rao', status: 'Completed', priority: 'Medium', nextAction: 'None', reminderDate: '—' },
  { id: 'ACT-2139', activityType: 'Call', subject: 'Quarterly business review', description: 'Reviewed account health and upcoming requirements.', relatedContact: 'Rohan Mehta', relatedOpportunity: 'QBR 2026', activityDate: 'Aug 28, 2026 · 03:30 PM', owner: 'Priya Nair', status: 'Completed', priority: 'Medium', nextAction: 'Send QBR notes', reminderDate: 'Aug 29, 2026' },
  { id: 'ACT-2132', activityType: 'Note', subject: 'New finance users', description: 'Finance team requested additional portal access.', relatedContact: 'Neha Shah', relatedOpportunity: 'Portal Expansion', activityDate: 'Aug 22, 2026 · 01:20 PM', owner: 'Arjun Rao', status: 'Completed', priority: 'Low', nextAction: 'None', reminderDate: '—' },
  { id: 'ACT-2126', activityType: 'Task', subject: 'Review open quotations', description: 'Review quotations awaiting customer action.', relatedContact: 'Rohan Mehta', relatedOpportunity: 'CRM Expansion', activityDate: 'Aug 18, 2026 · 10:00 AM', owner: 'Priya Nair', status: 'Pending', priority: 'Medium', nextAction: 'Follow up with customer', reminderDate: 'Aug 20, 2026' },
  { id: 'ACT-2119', activityType: 'Meeting', subject: 'Portal enhancement planning', description: 'Planned self-service and support portal improvements.', relatedContact: 'Neha Shah', relatedOpportunity: 'Portal Expansion', activityDate: 'Aug 12, 2026 · 02:30 PM', owner: 'Megha Joshi', status: 'Completed', priority: 'Medium', nextAction: 'Prepare estimate', reminderDate: 'Aug 14, 2026' },
  { id: 'ACT-2112', activityType: 'Email', subject: 'Invoice reminder', description: 'Reminder sent for outstanding invoice balance.', relatedContact: 'Rohan Mehta', relatedOpportunity: '—', activityDate: 'Aug 05, 2026 · 08:45 AM', owner: 'Priya Nair', status: 'Completed', priority: 'High', nextAction: 'Await payment', reminderDate: 'Aug 10, 2026' },
);

customerNotifications.push(
  { id: 'NTF-905', notificationType: 'Ticket Update', title: 'Ticket assigned', message: 'SUP-2026-00140 was assigned to Priya Nair.', relatedModule: 'Support', relatedRecordId: 'TCK-1020', createdDate: 'Oct 07, 2026 · 03:10 PM', read: false, priority: 'Medium', actionLabel: 'View ticket', actionPath: '/crm/customer-portal/support/TCK-1020' },
  { id: 'NTF-906', notificationType: 'Invoice', title: 'Payment overdue', message: 'Invoice INV-2026-02-035 has an outstanding balance of ₹154,000.', relatedModule: 'Invoices', relatedRecordId: 'INV-2026-02', createdDate: 'Oct 06, 2026 · 10:30 AM', read: false, priority: 'Urgent', actionLabel: 'Open invoices', actionPath: '/crm/customer-portal/invoices' },
  { id: 'NTF-907', notificationType: 'Order', title: 'Order processing', message: 'ORD-7521 is currently being processed.', relatedModule: 'Orders', relatedRecordId: 'ORD-7521', createdDate: 'Oct 05, 2026 · 01:20 PM', read: false, priority: 'Medium', actionLabel: 'View orders', actionPath: '/crm/customer-portal/orders' },
  { id: 'NTF-908', notificationType: 'Reminder', title: 'Quotation follow-up', message: 'QT-2026-018 is awaiting customer action.', relatedModule: 'Quotations', relatedRecordId: 'QT-26018', createdDate: 'Oct 04, 2026 · 09:45 AM', read: true, priority: 'Medium', actionLabel: 'Open quotations', actionPath: '/crm/customer-portal/quotations' },
  { id: 'NTF-909', notificationType: 'Ticket Update', title: 'Urgent support request', message: 'SUP-2026-00145 has been marked Urgent.', relatedModule: 'Support', relatedRecordId: 'TCK-1025', createdDate: 'Oct 03, 2026 · 04:10 PM', read: false, priority: 'Urgent', actionLabel: 'View ticket', actionPath: '/crm/customer-portal/support/TCK-1025' },
  { id: 'NTF-910', notificationType: 'System', title: 'Profile update completed', message: 'Customer account profile information was updated successfully.', relatedModule: 'Profile', relatedRecordId: 'CUS-00418', createdDate: 'Oct 02, 2026 · 11:10 AM', read: true, priority: 'Low', actionLabel: 'View profile', actionPath: '/crm/customer-portal/profile' },
  { id: 'NTF-911', notificationType: 'Order', title: 'Delivery completed', message: 'ORD-7798 was delivered successfully.', relatedModule: 'Orders', relatedRecordId: 'ORD-7798', createdDate: 'Sep 28, 2026 · 05:20 PM', read: true, priority: 'Low', actionLabel: 'View orders', actionPath: '/crm/customer-portal/orders' },
  { id: 'NTF-912', notificationType: 'Reminder', title: 'Account review reminder', message: 'Quarterly account review is scheduled for the next business day.', relatedModule: 'Activities', relatedRecordId: 'ACT-2201', createdDate: 'Sep 27, 2026 · 08:15 AM', read: false, priority: 'Medium', actionLabel: 'View activities', actionPath: '/crm/customer-portal/activities' },
);

export const customerProfile: CustomerProfile = {
  companyName: 'Acme Industries', customerCode: 'CUS-00418', primaryContact: 'Rohan Mehta', email: 'rohan.mehta@acmeindustries.example', phone: '+91 98765 43210', alternatePhone: '+91 98765 43111', website: 'www.acmeindustries.example', billingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', shippingAddress: 'Plot 18, Industrial Area, Belagavi, Karnataka 590001', gstin: '29AACCA1234A1Z5', pan: 'AACCA1234A', paymentTerms: 'Net 30', accountManager: 'Priya Nair', preferredContact: 'Email',
};

export const customerAccount: CustomerAccount = {
  accountId: 'ACC-00418',
  customerCode: 'CUS-00418',
  companyName: 'Acme Industries',
  accountManager: 'Priya Nair',
  accountStatus: 'Active',
  customerSince: 'April 2023',
  creditLimit: 750000,
  outstanding: 176500,
  availableCredit: 573500,
  currency: 'INR',
  paymentTerms: 'Net 30',
  billingCycle: 'Monthly',
  totalQuotes: customerQuotations.length,
  pendingQuotes: customerQuotations.filter((q) =>
    ['Draft', 'Sent', 'Viewed', 'Changes Requested'].includes(q.status)
  ).length,
  totalOrders: customerOrders.length,
  openOrders: customerOrders.filter((o) =>
    ['Draft', 'Confirmed', 'Processing', 'Dispatched'].includes(o.status)
  ).length,
  totalInvoices: customerInvoices.length,
  outstandingAmount: customerInvoices.reduce((sum, invoice) => sum + invoice.balanceDue, 0),
  paidAmount: customerInvoices.reduce((sum, invoice) => sum + invoice.amountPaid, 0),
  paymentDueDate: customerInvoices
    .filter((invoice) => invoice.balanceDue > 0)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]?.dueDate ?? '—',
  supportTickets,
  recentActivities: customerActivities.slice(0, 5),
  recentQuotes: customerQuotations.slice(0, 5),
  recentOrders: customerOrders.slice(0, 5),
  recentInvoices: customerInvoices.slice(0, 5),
  lifetimeValue: 2846500,
};

export interface CustomerKPI {
  id: string;
  label: string;
  value: string | number;
  description: string;
  category: 'Support' | 'Sales' | 'Orders' | 'Finance' | 'Account' | 'Activity';
  trend?: 'up' | 'down' | 'neutral';
}

export const customerKPIs: CustomerKPI[] = [
  { id: 'kpi-01', label: 'Total Support Tickets', value: supportTickets.length, description: 'All customer support requests', category: 'Support', trend: 'up' },
  { id: 'kpi-02', label: 'Open Support Tickets', value: supportTickets.filter((t) => t.status === 'Open').length, description: 'Tickets currently open', category: 'Support', trend: 'neutral' },
  { id: 'kpi-03', label: 'In Progress Tickets', value: supportTickets.filter((t) => t.status === 'In Progress').length, description: 'Tickets being worked on', category: 'Support', trend: 'neutral' },
  { id: 'kpi-04', label: 'Waiting on Customer', value: supportTickets.filter((t) => t.status === 'Waiting on Customer').length, description: 'Tickets awaiting customer response', category: 'Support', trend: 'neutral' },
  { id: 'kpi-05', label: 'Resolved Tickets', value: supportTickets.filter((t) => t.status === 'Resolved').length, description: 'Successfully resolved requests', category: 'Support', trend: 'up' },
  { id: 'kpi-06', label: 'Urgent Tickets', value: supportTickets.filter((t) => t.priority === 'Urgent').length, description: 'Highest-priority support requests', category: 'Support', trend: 'down' },
  { id: 'kpi-07', label: 'High Priority Tickets', value: supportTickets.filter((t) => t.priority === 'High').length, description: 'High-priority support requests', category: 'Support', trend: 'neutral' },
  { id: 'kpi-08', label: 'Total Quotations', value: customerQuotations.length, description: 'All quotations raised', category: 'Sales', trend: 'up' },
  { id: 'kpi-09', label: 'Pending Quotations', value: customerQuotations.filter((q) => ['Draft', 'Sent', 'Viewed', 'Changes Requested'].includes(q.status)).length, description: 'Quotes awaiting action', category: 'Sales', trend: 'neutral' },
  { id: 'kpi-10', label: 'Accepted Quotations', value: customerQuotations.filter((q) => q.status === 'Accepted').length, description: 'Quotes accepted by customer', category: 'Sales', trend: 'up' },
  { id: 'kpi-11', label: 'Quotation Pipeline Value', value: `₹${customerQuotations.reduce((sum, q) => sum + q.total, 0).toLocaleString('en-IN')}`, description: 'Combined value of all quotations', category: 'Sales', trend: 'up' },
  { id: 'kpi-12', label: 'Total Orders', value: customerOrders.length, description: 'All customer orders', category: 'Orders', trend: 'up' },
  { id: 'kpi-13', label: 'Open Orders', value: customerOrders.filter((o) => ['Draft', 'Confirmed', 'Processing', 'Dispatched'].includes(o.status)).length, description: 'Orders not yet completed or cancelled', category: 'Orders', trend: 'neutral' },
  { id: 'kpi-14', label: 'Delivered Orders', value: customerOrders.filter((o) => o.status === 'Delivered').length, description: 'Successfully delivered orders', category: 'Orders', trend: 'up' },
  { id: 'kpi-15', label: 'Order Value', value: `₹${customerOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString('en-IN')}`, description: 'Combined order value', category: 'Orders', trend: 'up' },
  { id: 'kpi-16', label: 'Total Invoices', value: customerInvoices.length, description: 'All invoices issued', category: 'Finance', trend: 'neutral' },
  { id: 'kpi-17', label: 'Paid Amount', value: `₹${customerAccount.paidAmount.toLocaleString('en-IN')}`, description: 'Amount received from customer', category: 'Finance', trend: 'up' },
  { id: 'kpi-18', label: 'Outstanding Amount', value: `₹${customerAccount.outstandingAmount.toLocaleString('en-IN')}`, description: 'Amount currently due', category: 'Finance', trend: 'down' },
  { id: 'kpi-19', label: 'Overdue Invoices', value: customerInvoices.filter((i) => i.status === 'Overdue').length, description: 'Invoices past their due date', category: 'Finance', trend: 'down' },
  { id: 'kpi-20', label: 'Average Invoice Value', value: `₹${Math.round(customerInvoices.reduce((sum, i) => sum + i.total, 0) / Math.max(customerInvoices.length, 1)).toLocaleString('en-IN')}`, description: 'Average invoice amount', category: 'Finance', trend: 'neutral' },
  { id: 'kpi-21', label: 'Credit Utilization', value: `${Math.round((customerAccount.outstanding / customerAccount.creditLimit) * 100)}%`, description: 'Outstanding balance versus credit limit', category: 'Finance', trend: 'neutral' },
  { id: 'kpi-22', label: 'Lifetime Customer Value', value: `₹${customerAccount.lifetimeValue.toLocaleString('en-IN')}`, description: 'Customer lifetime commercial value', category: 'Account', trend: 'up' },
  { id: 'kpi-23', label: 'Upcoming Activities', value: customerActivities.filter((a) => a.status !== 'Completed').length, description: 'Planned or pending customer activities', category: 'Activity', trend: 'neutral' },
  { id: 'kpi-24', label: 'Unread Notifications', value: customerNotifications.filter((n) => !n.read).length, description: 'Notifications requiring attention', category: 'Activity', trend: 'neutral' },
];
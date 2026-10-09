
import {
  customers,
  contacts,
  opportunities,
  activities,
  quotations,
  orders,
  invoices,
  users,
} from '@/features/crm/shared/data';

export const customer360Service = {
  getCustomer360: async (customerId: string) => {
    const customer = customers.find(
      (item) => item.id === customerId
    );

    if (!customer) {
      return null;
    }

    const customerContacts = contacts.filter(
      (item) => item.customerId === customerId
    );

    const customerOpportunities = opportunities.filter(
      (item) => item.customerId === customerId
    );

    const customerActivities = activities.filter(
      (item) => item.customerId === customerId
    );

    const customerQuotations = quotations.filter(
      (item) => item.customerId === customerId
    );

    const customerOrders = orders.filter(
      (item) => item.customerId === customerId
    );

    const customerInvoices = invoices.filter(
      (item) => item.customerId === customerId
    );

    const owner = users.find(
      (user) => user.id === customer.ownerId
    );

    return {
      customer,
      owner,
      contacts: customerContacts,
      opportunities: customerOpportunities,
      activities: customerActivities,
      quotations: customerQuotations,
      orders: customerOrders,
      invoices: customerInvoices,
    };
  },
};

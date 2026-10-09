
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useCustomer } from '../hooks/useCustomer';
import { useCustomer360 } from '../hooks/useCustomer360';

const tabs = [
  'Overview',
  'Contacts',
  'Opportunities',
  'Activities',
  'Quotations',
  'Orders',
  'Invoices',
] as const;

type Tab = (typeof tabs)[number];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const CustomerDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const [activeTab, setActiveTab] = useState<Tab>('Overview');


  const {
    data: existingCustomer,
    isPending: existingLoading,
  } = useCustomer(id);


  const sharedCustomerId = id.startsWith('CUS-')
    ? id
    : existingCustomer?.customerId ?? '';

  const {
    data,
    isPending,
    isError,
  } = useCustomer360(sharedCustomerId);

  const waitingForExistingCustomer =
    !id.startsWith('CUS-') && existingLoading;

  if (waitingForExistingCustomer || (sharedCustomerId && isPending)) {
    return (
      <div className="p-6 text-gray-600">
        Loading Customer 360...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load Customer 360 data.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Customer not found
        </h2>
        <p className="mt-2 text-gray-500">
          No matching customer was found in the
          centralized CRM dataset.
        </p>
        <button
          onClick={() => navigate('/crm/customers')}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
        >
          Back to Customers
        </button>
      </div>
    );
  }

  const {
    customer,
    owner,
    contacts,
    opportunities,
    activities,
    quotations,
    orders,
    invoices,
  } = data;

  const counts = [
    { label: 'Contacts', value: contacts.length },
    { label: 'Opportunities', value: opportunities.length },
    { label: 'Activities', value: activities.length },
    { label: 'Quotations', value: quotations.length },
    { label: 'Orders', value: orders.length },
    { label: 'Invoices', value: invoices.length },
  ];

  const emptyMessage = (
    <p className="rounded border border-dashed p-6 text-gray-500">
      No records found for this customer.
    </p>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <button
        onClick={() => navigate('/crm/customers')}
        className="mb-5 text-sm font-medium text-blue-600"
      >
        ← Back to Customers
      </button>

      {/* Customer Header */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {customer.companyName}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {customer.id} · {customer.industry}
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            {customer.status}
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Account Owner:{' '}
          {owner
            ? `${owner.firstName} ${owner.lastName}`
            : 'Not assigned'}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {counts.map((item) => (
          <div
            key={item.label}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="rounded-xl bg-white shadow-sm">
        <div className="flex gap-2 overflow-x-auto border-b p-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Overview */}
          {activeTab === 'Overview' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                Company Information
              </h2>

              <div className="grid gap-4 text-sm md:grid-cols-2">
                <p><strong>Company:</strong> {customer.companyName}</p>
                <p><strong>Industry:</strong> {customer.industry}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Status:</strong> {customer.status}</p>
                <p>
                  <strong>Owner:</strong>{' '}
                  {owner
                    ? `${owner.firstName} ${owner.lastName}`
                    : 'Not assigned'}
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  {customer.website || 'Not available'}
                </p>
                <p>
                  <strong>Employees:</strong>{' '}
                  {customer.employeeCount ?? 'Not available'}
                </p>
              </div>

              <h3 className="pt-3 font-semibold">
                Billing Address
              </h3>
              <p className="text-sm text-gray-600">
                {[
                  customer.billingAddress.addressLine1,
                  customer.billingAddress.addressLine2,
                  customer.billingAddress.city,
                  customer.billingAddress.state,
                  customer.billingAddress.postalCode,
                  customer.billingAddress.country,
                ].filter(Boolean).join(', ')}
              </p>
            </div>
          )}

          {/* Contacts */}
          {activeTab === 'Contacts' && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Contacts</h2>
              {contacts.length === 0
                ? emptyMessage
                : contacts.map((contact) => (
                    <div key={contact.id} className="rounded-lg border p-4">
                      <h3 className="font-semibold">
                        {contact.firstName} {contact.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {contact.designation}
                      </p>
                      <p className="mt-2 text-sm">{contact.email}</p>
                      <p className="text-sm">{contact.phone}</p>
                    </div>
                  ))}
            </div>
          )}

          {/* Opportunities */}
          {activeTab === 'Opportunities' && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Opportunities</h2>
              {opportunities.length === 0
                ? emptyMessage
                : opportunities.map((opportunity) => (
                    <div key={opportunity.id} className="rounded-lg border p-4">
                      <h3 className="font-semibold">
                        {opportunity.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Stage: {opportunity.stage}
                      </p>
                      <p className="mt-2 text-sm">
                        Amount: {formatCurrency(opportunity.amount)}
                      </p>
                      <p className="text-sm">
                        Probability: {opportunity.probability}%
                      </p>
                    </div>
                  ))}
            </div>
          )}

          {/* Activities */}
          {activeTab === 'Activities' && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Activities</h2>
              {activities.length === 0
                ? emptyMessage
                : activities.map((activity) => (
                    <div key={activity.id} className="rounded-lg border p-4">
                      <h3 className="font-semibold">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {activity.type} · {activity.status}
                      </p>
                      <p className="mt-2 text-sm">
                        {activity.description}
                      </p>
                    </div>
                  ))}
            </div>
          )}

          {/* Quotations */}
          {activeTab === 'Quotations' && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Quotations</h2>
              {quotations.length === 0
                ? emptyMessage
                : quotations.map((quotation) => (
                    <div key={quotation.id} className="rounded-lg border p-4">
                      <h3 className="font-semibold">
                        {quotation.quotationNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Status: {quotation.status}
                      </p>
                      <p className="mt-2 text-sm">
                        Total: {formatCurrency(quotation.totalAmount)}
                      </p>
                    </div>
                  ))}
            </div>
          )}

          {/* Orders */}
          {activeTab === 'Orders' && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Orders</h2>
              {orders.length === 0
                ? emptyMessage
                : orders.map((order) => (
                    <div key={order.id} className="rounded-lg border p-4">
                      <h3 className="font-semibold">
                        {order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Status: {order.status}
                      </p>
                      <p className="mt-2 text-sm">
                        Total: {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                  ))}
            </div>
          )}

          {/* Invoices */}
          {activeTab === 'Invoices' && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Invoices</h2>
              {invoices.length === 0
                ? emptyMessage
                : invoices.map((invoice) => (
                    <div key={invoice.id} className="rounded-lg border p-4">
                      <h3 className="font-semibold">
                        {invoice.invoiceNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Status: {invoice.status}
                      </p>
                      <p className="mt-2 text-sm">
                        Total: {formatCurrency(invoice.totalAmount)}
                      </p>
                      <p className="text-sm">
                        Balance: {formatCurrency(invoice.balanceAmount)}
                      </p>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;

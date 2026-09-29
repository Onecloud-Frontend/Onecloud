import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useCustomer } from '../hooks/useCustomer'

export const CustomerDetailsPage: React.FC = () => {
  const navigate = useNavigate()
  const { id = '' } = useParams()

  const {
    data: customer,
    isLoading,
    isError,
  } = useCustomer(id)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: string) => {
    if (!date) {
      return '-'
    }

    return new Date(date).toLocaleDateString('en-IN')
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading customer...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6">
        <p>Unable to load customer.</p>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Customer not found
        </h1>

        <button
          type="button"
          onClick={() => navigate('/crm/customers')}
          className="mt-4 rounded border px-4 py-2"
        >
          Back to Customers
        </button>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Back Button */}

      <button
        type="button"
        onClick={() => navigate('/crm/customers')}
        className="mb-4 text-sm text-blue-600"
      >
        ← Back to Customers
      </button>

      {/* Customer Header */}

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">
              {customer.customerName}
            </h1>

            <span
              className={`rounded-full px-2 py-1 text-xs ${
                customer.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {customer.status}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            {customer.customerId}
          </p>
        </div>

        {/* Edit Customer */}

        <button
          type="button"
          onClick={() =>
            navigate(
              `/crm/customers/${customer.id}/edit`
            )
          }
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Edit Customer
        </button>
      </div>

      {/* Overview */}

      <div className="mb-6 rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Overview
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">
              Customer ID
            </p>
            <p className="font-medium">
              {customer.customerId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Customer Name
            </p>
            <p className="font-medium">
              {customer.customerName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Customer Type
            </p>
            <p>{customer.customerType}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Industry
            </p>
            <p>{customer.industry || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Website
            </p>
            <p>{customer.website || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>
            <p>{customer.email || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>
            <p>{customer.phone || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Owner
            </p>
            <p>{customer.owner}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>
            <p>{customer.status}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Tax / GST Number
            </p>
            <p>{customer.taxNumber || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Currency
            </p>
            <p>{customer.currency || '-'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Payment Terms
            </p>
            <p>{customer.paymentTerms || '-'}</p>
          </div>
        </div>
      </div>

      {/* Addresses */}

      <div className="mb-6 rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Addresses
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-medium">
              Billing Address
            </h3>

            <p className="text-sm text-gray-600">
              {customer.billingAddress || '-'}
            </p>

            <p className="text-sm text-gray-600">
              {customer.city || ''}
              {customer.city && customer.state
                ? ', '
                : ''}
              {customer.state || ''}
            </p>

            <p className="text-sm text-gray-600">
              {customer.country || ''}
              {customer.postalCode
                ? ` - ${customer.postalCode}`
                : ''}
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-medium">
              Shipping Address
            </h3>

            <p className="text-sm text-gray-600">
              {customer.shippingAddress || '-'}
            </p>

            <p className="text-sm text-gray-600">
              {customer.city || ''}
              {customer.city && customer.state
                ? ', '
                : ''}
              {customer.state || ''}
            </p>

            <p className="text-sm text-gray-600">
              {customer.country || ''}
              {customer.postalCode
                ? ` - ${customer.postalCode}`
                : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Contacts */}

      <div className="mb-6 rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Contacts
        </h2>

        {customer.contacts.length === 0 ? (
          <p className="text-sm text-gray-500">
            No contacts available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">
                    Name
                  </th>

                  <th className="px-3 py-2 text-left">
                    Role
                  </th>

                  <th className="px-3 py-2 text-left">
                    Email
                  </th>

                  <th className="px-3 py-2 text-left">
                    Phone
                  </th>
                </tr>
              </thead>

              <tbody>
                {customer.contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-t"
                  >
                    <td className="px-3 py-2">
                      {contact.name}
                    </td>

                    <td className="px-3 py-2">
                      {contact.role}
                    </td>

                    <td className="px-3 py-2">
                      {contact.email}
                    </td>

                    <td className="px-3 py-2">
                      {contact.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Opportunities */}

      <div className="mb-6 rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Opportunities
        </h2>

        {customer.opportunities.length === 0 ? (
          <p className="text-sm text-gray-500">
            No opportunities available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">
                    Opportunity
                  </th>

                  <th className="px-3 py-2 text-left">
                    Stage
                  </th>

                  <th className="px-3 py-2 text-left">
                    Amount
                  </th>

                  <th className="px-3 py-2 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {customer.opportunities.map(
                  (opportunity) => (
                    <tr
                      key={opportunity.id}
                      className="border-t"
                    >
                      <td className="px-3 py-2">
                        {opportunity.name}
                      </td>

                      <td className="px-3 py-2">
                        {opportunity.stage}
                      </td>

                      <td className="px-3 py-2">
                        {formatCurrency(
                          opportunity.amount
                        )}
                      </td>

                      <td className="px-3 py-2">
                        {opportunity.status}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quotes */}

      <div className="mb-6 rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Quotes
        </h2>

        {customer.quotes.length === 0 ? (
          <p className="text-sm text-gray-500">
            No quotes available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">
                    Quote Number
                  </th>

                  <th className="px-3 py-2 text-left">
                    Amount
                  </th>

                  <th className="px-3 py-2 text-left">
                    Status
                  </th>

                  <th className="px-3 py-2 text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {customer.quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="border-t"
                  >
                    <td className="px-3 py-2">
                      {quote.quoteNumber}
                    </td>

                    <td className="px-3 py-2">
                      {formatCurrency(quote.amount)}
                    </td>

                    <td className="px-3 py-2">
                      {quote.status}
                    </td>

                    <td className="px-3 py-2">
                      {formatDate(quote.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Orders */}

      <div className="mb-6 rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Orders
        </h2>

        {customer.orders.length === 0 ? (
          <p className="text-sm text-gray-500">
            No orders available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">
                    Order Number
                  </th>

                  <th className="px-3 py-2 text-left">
                    Amount
                  </th>

                  <th className="px-3 py-2 text-left">
                    Status
                  </th>

                  <th className="px-3 py-2 text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {customer.orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t"
                  >
                    <td className="px-3 py-2">
                      {order.orderNumber}
                    </td>

                    <td className="px-3 py-2">
                      {formatCurrency(order.amount)}
                    </td>

                    <td className="px-3 py-2">
                      {order.status}
                    </td>

                    <td className="px-3 py-2">
                      {formatDate(order.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoices */}

      <div className="mb-6 rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Invoices
        </h2>

        {customer.invoices.length === 0 ? (
          <p className="text-sm text-gray-500">
            No invoices available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">
                    Invoice Number
                  </th>

                  <th className="px-3 py-2 text-left">
                    Amount
                  </th>

                  <th className="px-3 py-2 text-left">
                    Status
                  </th>

                  <th className="px-3 py-2 text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {customer.invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-t"
                  >
                    <td className="px-3 py-2">
                      {invoice.invoiceNumber}
                    </td>

                    <td className="px-3 py-2">
                      {formatCurrency(invoice.amount)}
                    </td>

                    <td className="px-3 py-2">
                      {invoice.status}
                    </td>

                    <td className="px-3 py-2">
                      {formatDate(invoice.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Activities */}

      <div className="mb-6 rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Activities
        </h2>

        {customer.activities.length === 0 ? (
          <p className="text-sm text-gray-500">
            No activities available.
          </p>
        ) : (
          <div className="space-y-3">
            {customer.activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded border p-3"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="font-medium">
                    {activity.type}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatDate(activity.date)}
                  </p>
                </div>

                <p className="mt-1 text-sm text-gray-600">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  By {activity.performedBy}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Service History */}

      <div className="mb-6 rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Service History
        </h2>

        {customer.serviceHistory.length === 0 ? (
          <p className="text-sm text-gray-500">
            No service history available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">
                    Service
                  </th>

                  <th className="px-3 py-2 text-left">
                    Status
                  </th>

                  <th className="px-3 py-2 text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {customer.serviceHistory.map(
                  (service) => (
                    <tr
                      key={service.id}
                      className="border-t"
                    >
                      <td className="px-3 py-2">
                        {service.service}
                      </td>

                      <td className="px-3 py-2">
                        {service.status}
                      </td>

                      <td className="px-3 py-2">
                        {formatDate(service.date)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Additional Details */}

      <div className="rounded border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Additional Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">
              Created Date
            </p>

            <p>
              {formatDate(customer.createdDate)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Updated Date
            </p>

            <p>
              {formatDate(customer.updatedDate)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Opportunities
            </p>

            <p>{customer.totalOpportunities}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Revenue
            </p>

            <p>
              {formatCurrency(customer.totalRevenue)}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">
              Notes
            </p>

            <p className="mt-1">
              {customer.notes || '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
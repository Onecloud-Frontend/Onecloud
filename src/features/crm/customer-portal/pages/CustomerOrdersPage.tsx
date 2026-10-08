import React from "react";

import { orders } from "../../shared/data/orders";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const currency = (value: number, code: string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const statusStyles: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-600 border-gray-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
  PROCESSING: "bg-amber-50 text-amber-700 border-amber-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

const statusLabels: Record<string, string> = {
  DRAFT: "Draft",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
      statusStyles[status] ??
      "bg-gray-100 text-gray-600 border-gray-200"
    }`}
  >
    {statusLabels[status] ?? status}
  </span>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const CustomerOrdersPage: React.FC = () => {
  const handleViewOrder = (orderId: string) => {
    // TODO: navigate to order detail
    console.log("View order", orderId);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500">{orders.length} total</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Order Number</th>
              <th className="px-4 py-3">Quotation</th>
              <th className="px-4 py-3">Order Date</th>
              <th className="px-4 py-3 text-right">Items</th>
              <th className="px-4 py-3 text-right">Quantity</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
              <th className="px-4 py-3 text-right">Tax</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3">Order Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const totalQuantity = order.lineItems.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                );

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {order.orderNumber}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {order.quotationId}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {formatDate(order.orderDate)}
                    </td>

                    <td className="px-4 py-3 text-right text-gray-600">
                      {order.lineItems.length}
                    </td>

                    <td className="px-4 py-3 text-right text-gray-600">
                      {totalQuantity}
                    </td>

                    <td className="px-4 py-3 text-right text-gray-600">
                      {currency(order.subtotal, order.currency)}
                    </td>

                    <td className="px-4 py-3 text-right text-gray-600">
                      {currency(order.taxAmount, order.currency)}
                    </td>

                    <td className="px-4 py-3 text-right font-medium text-gray-800">
                      {currency(order.totalAmount, order.currency)}
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        View order
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { CustomerOrdersPage };

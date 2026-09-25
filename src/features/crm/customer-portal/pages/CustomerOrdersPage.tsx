import React, { useEffect, useState } from "react";

type OrderStatus = "Open" | "Processing" | "Completed" | "Cancelled";
type DeliveryStatus = "Not Shipped" | "Shipped" | "In Transit" | "Delivered" | "Delayed";

interface Order {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  quoteNumber: string;
  customer: string;
  orderStatus: OrderStatus;
  items: number;
  quantity: number;
  subtotal: number;
  tax: number;
  totalAmount: number;
  currency: string;
  deliveryStatus: DeliveryStatus;
  expectedDeliveryDate: string;
}

async function fetchOrders(): Promise<Order[]> {
  return [
    {
      orderId: "o1",
      orderNumber: "ORD-8842",
      orderDate: "2026-09-19",
      quoteNumber: "QUO-1185",
      customer: "Meridian Logistics Pvt Ltd",
      orderStatus: "Processing",
      items: 4,
      quantity: 120,
      subtotal: 21000,
      tax: 1750,
      totalAmount: 22750,
      currency: "INR",
      deliveryStatus: "In Transit",
      expectedDeliveryDate: "2026-09-25",
    },
    {
      orderId: "o2",
      orderNumber: "ORD-8831",
      orderDate: "2026-09-15",
      quoteNumber: "QUO-1179",
      customer: "Meridian Logistics Pvt Ltd",
      orderStatus: "Completed",
      items: 2,
      quantity: 15,
      subtotal: 5800,
      tax: 400,
      totalAmount: 6200,
      currency: "INR",
      deliveryStatus: "Delivered",
      expectedDeliveryDate: "2026-09-18",
    },
    {
      orderId: "o3",
      orderNumber: "ORD-8817",
      orderDate: "2026-09-11",
      quoteNumber: "QUO-1190",
      customer: "Meridian Logistics Pvt Ltd",
      orderStatus: "Open",
      items: 6,
      quantity: 40,
      subtotal: 91000,
      tax: 7500,
      totalAmount: 98500,
      currency: "INR",
      deliveryStatus: "Not Shipped",
      expectedDeliveryDate: "2026-10-02",
    },
  ];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const currency = (value: number, code: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: code, maximumFractionDigits: 0 }).format(value);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const statusStyles: Record<string, string> = {
  Open: "bg-blue-50 text-blue-700 border-blue-200",
  Processing: "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
  "Not Shipped": "bg-gray-100 text-gray-600 border-gray-200",
  Shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  "In Transit": "bg-blue-50 text-blue-700 border-blue-200",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Delayed: "bg-red-50 text-red-700 border-red-200",
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
      statusStyles[status] ?? "bg-gray-100 text-gray-600 border-gray-200"
    }`}
  >
    {status}
  </span>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const CustomerOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchOrders()
      .then((result) => {
        if (isMounted) setOrders(result);
      })
      .catch(() => {
        if (isMounted) setError("Could not load orders. Please try again.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewOrder = (orderId: string) => {
    // TODO: navigate to order detail, e.g. navigate(`/crm/customer-portal/orders/${orderId}`)
    console.log("View order", orderId);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-400">Loading orders…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

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
              <th className="px-4 py-3">Quote Number</th>
              <th className="px-4 py-3">Order Date</th>
              <th className="px-4 py-3 text-right">Items</th>
              <th className="px-4 py-3 text-right">Quantity</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
              <th className="px-4 py-3 text-right">Tax</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3">Order Status</th>
              <th className="px-4 py-3">Delivery Status</th>
              <th className="px-4 py-3">Expected Delivery</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-8 text-center text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.orderId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{o.orderNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{o.quoteNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(o.orderDate)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{o.items}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{o.quantity}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(o.subtotal, o.currency)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(o.tax, o.currency)}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">
                    {currency(o.totalAmount, o.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.orderStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.deliveryStatus} />
                  </td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(o.expectedDeliveryDate)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleViewOrder(o.orderId)}
                      className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View order
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export {CustomerOrdersPage}
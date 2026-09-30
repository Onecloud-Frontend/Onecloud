<<<<<<< HEAD
import React, { useMemo, useState } from 'react';
import { Eye, Package, Truck, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { customerOrders, type OrderStatus } from '../types/data';
import { EmptyState, PageHeader, PortalNav, SearchBox, StatCard, formatMoney, portalStatus } from '../components/PortalUi';

const statuses: Array<'All' | OrderStatus> = ['All','Draft','Confirmed','Processing','Dispatched','Delivered','Cancelled'];
export const CustomerOrdersPage: React.FC = () => {
  const [query,setQuery]=useState(''); const [status,setStatus]=useState<'All'|OrderStatus>('All'); const [expanded,setExpanded]=useState<string|null>(null);
  const rows=useMemo(()=>customerOrders.filter(o=>`${o.orderNumber} ${o.status} ${o.trackingNumber??''} ${o.items.map(i=>i.name).join(' ')}`.toLowerCase().includes(query.toLowerCase())&&(status==='All'||o.status===status)),[query,status]);
  return <div className="p-5 md:p-7"><PageHeader title="Orders" description="Track your orders, delivery status, payment state and line items."/><PortalNav/><div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4"><StatCard label="Total Orders" value={customerOrders.length} icon={<Package size={19}/>} /><StatCard label="In Progress" value={customerOrders.filter(o=>['Confirmed','Processing','Dispatched'].includes(o.status)).length} icon={<Truck size={19}/>} tone="bg-cyan-50 text-cyan-600"/><StatCard label="Delivered" value={customerOrders.filter(o=>o.status==='Delivered').length} icon={<Package size={19}/>} tone="bg-emerald-50 text-emerald-600"/><StatCard label="Order Value" value={formatMoney(customerOrders.reduce((s,o)=>s+o.total,0))} icon={<Package size={19}/>} tone="bg-violet-50 text-violet-600"/></div><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row"><div className="flex-1"><SearchBox value={query} onChange={setQuery} placeholder="Search order, product or tracking..."/></div><select value={status} onChange={e=>setStatus(e.target.value as typeof status)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{statuses.map(s=><option key={s}>{s}</option>)}</select></div>{rows.length?<div className="divide-y divide-slate-100">{rows.map(o=><div key={o.id}><div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Package size={19}/></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-slate-900">{o.orderNumber}</h3><span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus(o.status)}`}>{o.status}</span></div><p className="mt-1 text-xs text-slate-500">Placed {o.orderDate} · Expected {o.expectedDelivery}</p></div><div><p className="text-xs text-slate-400">Total</p><p className="font-bold text-slate-900">{formatMoney(o.total)}</p></div><div><p className="text-xs text-slate-400">Payment</p><p className="text-sm font-semibold text-slate-700">{o.paymentStatus}</p></div><button onClick={()=>setExpanded(expanded===o.id?null:o.id)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600">{expanded===o.id?<ChevronUp size={15}/>:<ChevronDown size={15}/>} Details</button></div>{expanded===o.id&&<div className="grid gap-4 bg-slate-50/70 p-5 md:grid-cols-2"><div><h4 className="text-sm font-bold text-slate-800">Items</h4><div className="mt-2 space-y-2">{o.items.map(item=><div key={item.id} className="flex justify-between rounded-xl border border-slate-200 bg-white p-3 text-sm"><span><b>{item.name}</b><span className="ml-2 text-xs text-slate-400">{item.sku} × {item.quantity}</span></span><span className="font-semibold">{formatMoney(item.unitPrice*item.quantity)}</span></div>)}</div></div><div><h4 className="text-sm font-bold text-slate-800">Delivery</h4><div className="mt-2 rounded-xl border border-slate-200 bg-white p-4 text-sm"><div className="flex gap-2"><MapPin size={16} className="text-blue-600"/><span>{o.shippingAddress}</span></div>{o.trackingNumber&&<div className="mt-3 flex gap-2"><Truck size={16} className="text-cyan-600"/><span>Tracking: <b>{o.trackingNumber}</b></span></div>}</div></div></div>}</div>)}</div>:<EmptyState title="No orders found" text="Try a different order search or status filter."/>}</div></div>;
};
=======
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
>>>>>>> origin/dev

<<<<<<< HEAD
import React, { useMemo, useState } from 'react';
import { Check, Download, Eye, FileCheck2, MessageSquare, X } from 'lucide-react';
import { customerQuotations, type CustomerQuotation, type QuotationStatus } from '../types/data';
import { EmptyState, PageHeader, PortalNav, SearchBox, StatCard, formatMoney, portalStatus } from '../components/PortalUi';

const statuses: Array<'All'|QuotationStatus> = ['All','Draft','Sent','Viewed','Accepted','Changes Requested','Expired'];
export const CustomerQuotationsPage: React.FC = () => {
  const [query,setQuery]=useState(''); const [status,setStatus]=useState<'All'|QuotationStatus>('All'); const [selected,setSelected]=useState<CustomerQuotation|null>(null); const [rows,setRows]=useState(customerQuotations);
  const filtered=useMemo(()=>rows.filter(q=>`${q.quotationNumber} ${q.title} ${q.owner} ${q.status}`.toLowerCase().includes(query.toLowerCase())&&(status==='All'||q.status===status)),[rows,query,status]);
  const update=(id:string,next:QuotationStatus)=>{setRows(prev=>prev.map(q=>q.id===id?{...q,status:next}:q));setSelected(prev=>prev?{...prev,status:next}:prev)};
  const download=(q:CustomerQuotation)=>{const text=`ONECLOUD QUOTATION\n${q.quotationNumber}\n${q.title}\nValid until: ${q.validUntil}\nStatus: ${q.status}\nTotal: ${formatMoney(q.total)}\n\n${q.notes}`;const blob=new Blob([text],{type:'text/plain'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${q.quotationNumber}.txt`;a.click();URL.revokeObjectURL(url)};
  return <div className="p-5 md:p-7"><PageHeader title="Quotations" description="Review commercial proposals, validity dates, line items and respond directly from the portal."/><PortalNav/><div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"><StatCard label="Total Quotes" value={rows.length} icon={<FileCheck2 size={19}/>} /><StatCard label="Awaiting Response" value={rows.filter(q=>['Sent','Viewed'].includes(q.status)).length} icon={<MessageSquare size={19}/>} tone="bg-blue-50 text-blue-600"/><StatCard label="Accepted Value" value={formatMoney(rows.filter(q=>q.status==='Accepted').reduce((s,q)=>s+q.total,0))} icon={<Check size={19}/>} tone="bg-emerald-50 text-emerald-600"/></div><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row"><div className="flex-1"><SearchBox value={query} onChange={setQuery} placeholder="Search quotation or title..."/></div><select value={status} onChange={e=>setStatus(e.target.value as typeof status)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{statuses.map(s=><option key={s}>{s}</option>)}</select></div>{filtered.length?<div className="overflow-x-auto"><table className="w-full min-w-[1000px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{['Quotation','Title','Created','Valid Until','Owner','Status','Total','Actions'].map(h=><th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{filtered.map(q=><tr key={q.id} className="hover:bg-slate-50/70"><td className="px-4 py-4 font-semibold text-blue-700">{q.quotationNumber}</td><td className="px-4 py-4 font-semibold text-slate-800">{q.title}</td><td className="px-4 py-4 text-slate-500">{q.createdDate}</td><td className="px-4 py-4 text-slate-500">{q.validUntil}</td><td className="px-4 py-4">{q.owner}</td><td className="px-4 py-4"><span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus(q.status)}`}>{q.status}</span></td><td className="px-4 py-4 font-bold">{formatMoney(q.total)}</td><td className="px-4 py-4"><div className="flex gap-2"><button onClick={()=>setSelected(q)} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-blue-600" title="View"><Eye size={15}/></button><button onClick={()=>download(q)} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-blue-600" title="Download"><Download size={15}/></button></div></td></tr>)}</tbody></table></div>:<EmptyState title="No quotations found" text="Try another quotation search or status filter."/>}</div>{selected&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={e=>e.currentTarget===e.target&&setSelected(null)}><div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold text-blue-600">{selected.quotationNumber}</p><h2 className="mt-1 text-xl font-bold">{selected.title}</h2><p className="mt-1 text-sm text-slate-500">Valid until {selected.validUntil} · Owner {selected.owner}</p></div><button onClick={()=>setSelected(null)} className="text-slate-400"><X size={19}/></button></div><div className="mt-5 space-y-2">{selected.items.map(item=><div key={item.id} className="flex justify-between rounded-xl border border-slate-100 p-3 text-sm"><span>{item.name} <span className="text-xs text-slate-400">× {item.quantity}</span></span><b>{formatMoney(item.unitPrice*item.quantity)}</b></div>)}</div><div className="mt-4 rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-600">{selected.notes}</p><p className="mt-3 text-right text-lg font-bold">Total: {formatMoney(selected.total)}</p></div>{['Sent','Viewed','Changes Requested'].includes(selected.status)&&<div className="mt-5 flex flex-wrap gap-2"><button onClick={()=>update(selected.id,'Accepted')} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white"><Check size={16}/> Accept Quote</button><button onClick={()=>update(selected.id,'Changes Requested')} className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700"><MessageSquare size={16}/> Request Changes</button></div>}</div></div>}</div>;
};
=======
import React, { useEffect, useState } from "react";

type QuoteStatus = "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";
type ApprovalStatus = "Not Submitted" | "Pending" | "Approved" | "Rejected";

interface Quote {
  quoteId: string;
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  customer: string;
  opportunity: string;
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  currency: string;
  quoteStatus: QuoteStatus;
  approvalStatus: ApprovalStatus;
}

async function fetchQuotations(): Promise<Quote[]> {
  return [
    {
      quoteId: "q1",
      quoteNumber: "QUO-1190",
      quoteDate: "2026-09-18",
      validUntil: "2026-10-18",
      customer: "Meridian Logistics Pvt Ltd",
      opportunity: "Q4 Fleet Maintenance",
      subtotal: 80000,
      discount: 2000,
      tax: 6500,
      grandTotal: 84500,
      currency: "INR",
      quoteStatus: "Sent",
      approvalStatus: "Pending",
    },
    {
      quoteId: "q2",
      quoteNumber: "QUO-1185",
      quoteDate: "2026-09-12",
      validUntil: "2026-10-12",
      customer: "Meridian Logistics Pvt Ltd",
      opportunity: "Warehouse Racking Upgrade",
      subtotal: 140000,
      discount: 5000,
      tax: 17000,
      grandTotal: 152000,
      currency: "INR",
      quoteStatus: "Accepted",
      approvalStatus: "Approved",
    },
    {
      quoteId: "q3",
      quoteNumber: "QUO-1179",
      quoteDate: "2026-09-08",
      validUntil: "2026-09-30",
      customer: "Meridian Logistics Pvt Ltd",
      opportunity: "Annual Software License",
      subtotal: 37000,
      discount: 0,
      tax: 2900,
      grandTotal: 39900,
      currency: "INR",
      quoteStatus: "Draft",
      approvalStatus: "Not Submitted",
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
  Draft: "bg-gray-100 text-gray-600 border-gray-200",
  Sent: "bg-blue-50 text-blue-700 border-blue-200",
  Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Expired: "bg-gray-100 text-gray-500 border-gray-200",
  "Not Submitted": "bg-gray-100 text-gray-600 border-gray-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
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

const CustomerQuotationsPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchQuotations()
      .then((result) => {
        if (isMounted) setQuotes(result);
      })
      .catch(() => {
        if (isMounted) setError("Could not load quotations. Please try again.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewQuote = (quoteId: string) => {
    console.log("View quote", quoteId);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-400">Loading quotations…</p>
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
        <h1 className="text-xl font-semibold text-gray-900">Quotations</h1>
        <p className="text-sm text-gray-500">{quotes.length} total</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Quote Number</th>
              <th className="px-4 py-3">Opportunity</th>
              <th className="px-4 py-3">Quote Date</th>
              <th className="px-4 py-3">Valid Until</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
              <th className="px-4 py-3 text-right">Discount</th>
              <th className="px-4 py-3 text-right">Tax</th>
              <th className="px-4 py-3 text-right">Grand Total</th>
              <th className="px-4 py-3">Quote Status</th>
              <th className="px-4 py-3">Approval Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {quotes.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-8 text-center text-gray-400">
                  No quotations found.
                </td>
              </tr>
            ) : (
              quotes.map((q) => (
                <tr key={q.quoteId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{q.quoteNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{q.opportunity}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(q.quoteDate)}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(q.validUntil)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(q.subtotal, q.currency)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(q.discount, q.currency)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(q.tax, q.currency)}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">
                    {currency(q.grandTotal, q.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={q.quoteStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={q.approvalStatus} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleViewQuote(q.quoteId)}
                      className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View quote
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

export {CustomerQuotationsPage}
>>>>>>> origin/dev

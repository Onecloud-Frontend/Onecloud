import React, { useMemo, useState } from "react";
import { Download, Eye, FileText, Printer } from "lucide-react";
import {
  customerInvoices,
  type CustomerInvoice,
  type InvoiceStatus,
} from "../types/data";
import {
  EmptyState,
  PageHeader,
  PortalNav,
  SearchBox,
  StatCard,
  formatMoney,
  portalStatus,
} from "../components/PortalUi";

const statuses: Array<"All" | InvoiceStatus> = [
  "All",
  "Draft",
  "Sent",
  "Partially Paid",
  "Paid",
  "Overdue",
];
export const CustomerInvoicesPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | InvoiceStatus>("All");
  const [selected, setSelected] = useState<CustomerInvoice | null>(null);
  const rows = useMemo(
    () =>
      customerInvoices.filter(
        (i) =>
          `${i.invoiceNumber} ${i.orderNumber ?? ""} ${i.status}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (status === "All" || i.status === status),
      ),
    [query, status],
  );
  const download = (invoice: CustomerInvoice) => {
    const text = `ONECLOUD CUSTOMER INVOICE\n\nInvoice: ${invoice.invoiceNumber}\nInvoice Date: ${invoice.invoiceDate}\nDue Date: ${invoice.dueDate}\nOrder: ${invoice.orderNumber ?? "—"}\nStatus: ${invoice.status}\nSubtotal: ${formatMoney(invoice.subtotal)}\nTax: ${formatMoney(invoice.tax)}\nTotal: ${formatMoney(invoice.total)}\nAmount Paid: ${formatMoney(invoice.amountPaid)}\nBalance Due: ${formatMoney(invoice.balanceDue)}\n`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${invoice.invoiceNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const print = () => window.print();
  return (
    <div className="p-5 md:p-7">
      <PageHeader
        title="Invoices"
        description="Review billing documents, payment status, due dates and outstanding balances."
      />
      <PortalNav />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Invoices"
          value={customerInvoices.length}
          icon={<FileText size={19} />}
        />
        <StatCard
          label="Paid"
          value={customerInvoices.filter((i) => i.status === "Paid").length}
          icon={<FileText size={19} />}
          tone="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Balance Due"
          value={formatMoney(
            customerInvoices.reduce((s, i) => s + i.balanceDue, 0),
          )}
          icon={<FileText size={19} />}
          tone="bg-orange-50 text-orange-600"
        />
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row">
          <div className="flex-1">
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search invoice or order..."
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        {rows.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {[
                    "Invoice",
                    "Invoice Date",
                    "Due Date",
                    "Order",
                    "Status",
                    "Total",
                    "Balance",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((i) => (
                  <tr key={i.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-4 font-semibold text-blue-700">
                      {i.invoiceNumber}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {i.invoiceDate}
                    </td>
                    <td className="px-4 py-4 text-slate-600">{i.dueDate}</td>
                    <td className="px-4 py-4">{i.orderNumber ?? "—"}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus(i.status)}`}
                      >
                        {i.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold">
                      {formatMoney(i.total)}
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-700">
                      {formatMoney(i.balanceDue)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelected(i)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-blue-200 hover:text-blue-600"
                          title="View"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => download(i)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-blue-200 hover:text-blue-600"
                          title="Download"
                        >
                          <Download size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No invoices found"
            text="Try a different invoice search or status filter."
          />
        )}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onMouseDown={(e) => e.currentTarget === e.target && setSelected(null)}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600">Invoice</p>
                <h2 className="mt-1 text-xl font-bold">
                  {selected.invoiceNumber}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400"
              >
                ×
              </button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-400">Invoice Date</p>
                <b>{selected.invoiceDate}</b>
              </div>
              <div>
                <p className="text-xs text-slate-400">Due Date</p>
                <b>{selected.dueDate}</b>
              </div>
              <div>
                <p className="text-xs text-slate-400">Subtotal</p>
                <b>{formatMoney(selected.subtotal)}</b>
              </div>
              <div>
                <p className="text-xs text-slate-400">Tax</p>
                <b>{formatMoney(selected.tax)}</b>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total</p>
                <b>{formatMoney(selected.total)}</b>
              </div>
              <div>
                <p className="text-xs text-slate-400">Balance Due</p>
                <b>{formatMoney(selected.balanceDue)}</b>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => download(selected)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Download size={16} /> Download
              </button>
              <button
                onClick={print}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold"
              >
                <Printer size={16} /> Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

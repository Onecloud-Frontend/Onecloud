<<<<<<< HEAD
import React from 'react';
import { CreditCard, Download, Landmark, ReceiptText, ShieldCheck, Wallet } from 'lucide-react';
import { customerAccount, customerInvoices, customerOrders } from '../types/data';
import { DetailRow, PageHeader, PortalNav, StatCard, formatMoney, portalStatus } from '../components/PortalUi';

export const AccountSummaryPage: React.FC = () => {
  const statement = () => {
    const rows = [['Invoice','Date','Status','Total','Balance'], ...customerInvoices.map(i => [i.invoiceNumber,i.invoiceDate,i.status,String(i.total),String(i.balanceDue)])];
    const blob = new Blob([rows.map(row => row.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'acme-account-statement.csv'; a.click(); URL.revokeObjectURL(url);
  };
  return <div className="p-5 md:p-7"><PageHeader title="Account & Billing" description="View account status, credit, payment terms, billing information and recent financial activity." action={<button onClick={statement} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600"><Download size={16}/> Download Statement</button>}/><PortalNav />
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Credit Limit" value={formatMoney(customerAccount.creditLimit)} icon={<CreditCard size={19}/>} /><StatCard label="Outstanding" value={formatMoney(customerAccount.outstanding)} icon={<Wallet size={19}/>} tone="bg-orange-50 text-orange-600"/><StatCard label="Available Credit" value={formatMoney(customerAccount.availableCredit)} icon={<ShieldCheck size={19}/>} tone="bg-emerald-50 text-emerald-600"/><StatCard label="Lifetime Value" value={formatMoney(customerAccount.lifetimeValue)} icon={<Landmark size={19}/>} tone="bg-violet-50 text-violet-600"/></div>
    <div className="grid gap-5 xl:grid-cols-[1fr_380px]"><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">Account Information</h2><dl className="mt-3 grid gap-x-6 md:grid-cols-2"><DetailRow label="Customer Code" value={customerAccount.customerCode}/><DetailRow label="Company" value={customerAccount.companyName}/><DetailRow label="Account Manager" value={customerAccount.accountManager}/><DetailRow label="Account Status" value={<span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus(customerAccount.accountStatus)}`}>{customerAccount.accountStatus}</span>}/><DetailRow label="Customer Since" value={customerAccount.customerSince}/><DetailRow label="Payment Terms" value={customerAccount.paymentTerms}/><DetailRow label="Billing Cycle" value={customerAccount.billingCycle}/><DetailRow label="Total Orders" value={customerAccount.totalOrders}/></dl></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="flex items-center gap-2 font-bold text-slate-900"><ReceiptText size={18} className="text-blue-600"/> Billing Summary</h2><div className="mt-4 space-y-3"><div className="flex justify-between text-sm"><span className="text-slate-500">Open invoices</span><b>{customerInvoices.filter(i => i.balanceDue > 0).length}</b></div><div className="flex justify-between text-sm"><span className="text-slate-500">Open orders</span><b>{customerOrders.filter(o => !['Delivered','Cancelled'].includes(o.status)).length}</b></div><div className="flex justify-between text-sm"><span className="text-slate-500">Current outstanding</span><b>{formatMoney(customerAccount.outstanding)}</b></div><div className="mt-4 rounded-xl bg-blue-50 p-4 text-xs leading-5 text-blue-800">Your account is active. Payment terms are {customerAccount.paymentTerms}; available credit is {formatMoney(customerAccount.availableCredit)}.</div></div></section></div>
  </div>;
};
=======
import React, { useEffect, useState } from "react";

type AccountStatus = "Active" | "Inactive" | "Suspended" | "Pending";

interface ServiceHistoryItem {
  id: string;
  description: string;
  date: string;
}

interface AccountSummary {
  accountId: string;
  customerName: string;
  accountStatus: AccountStatus;
  accountOwner: string;
  customerType: "Enterprise" | "SMB" | "Individual";
  industry: string;
  totalRevenue: number;
  totalOrders: number;
  totalInvoices: number;
  outstandingBalance: number;
  paidAmount: number;
  paymentTerms: string;
  creditLimit: number;
  currency: string;
  serviceHistory: ServiceHistoryItem[];
}


async function fetchAccountSummary(): Promise<AccountSummary> {

  return {
    accountId: "ACC-10492",
    customerName: "Meridian Logistics Pvt Ltd",
    accountStatus: "Active",
    accountOwner: "Priya Nair",
    customerType: "Enterprise",
    industry: "Logistics & Supply Chain",
    totalRevenue: 1428500,
    totalOrders: 61,
    totalInvoices: 47,
    outstandingBalance: 182500,
    paidAmount: 1246000,
    paymentTerms: "Net 30",
    creditLimit: 500000,
    currency: "INR",
    serviceHistory: [
      { id: "s1", description: "Annual maintenance contract renewed", date: "2026-08-14" },
      { id: "s2", description: "Escalated support ticket resolved on-site", date: "2026-07-22" },
      { id: "s3", description: "Account review meeting completed", date: "2026-06-30" },
    ],
  };
}

const currency = (value: number, code: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: code, maximumFractionDigits: 0 }).format(value);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactive: "bg-gray-100 text-gray-600 border-gray-200",
  Suspended: "bg-red-50 text-red-700 border-red-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
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

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);

const Field: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 text-sm text-gray-800">{value}</p>
  </div>
);

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-lg border border-gray-200 bg-white">
    <div className="border-b border-gray-100 px-4 py-3">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="p-4">{children}</div>
  </div>
);


const AccountSummaryPage: React.FC = () => {
  const [account, setAccount] = useState<AccountSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchAccountSummary()
      .then((result) => {
        if (isMounted) setAccount(result);
      })
      .catch(() => {
        if (isMounted) setError("Could not load account summary. Please try again.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewDetails = () => {
    console.log("View account details clicked");
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-400">Loading account summary…</p>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-600">{error ?? "Something went wrong."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{account.customerName}</h1>
          <p className="mt-1 text-sm text-gray-500">Account ID: {account.accountId}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={account.accountStatus} />
          <button
            onClick={handleViewDetails}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            View details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={currency(account.totalRevenue, account.currency)} />
        <StatCard label="Total Orders" value={account.totalOrders} />
        <StatCard label="Total Invoices" value={account.totalInvoices} />
        <StatCard label="Outstanding Balance" value={currency(account.outstandingBalance, account.currency)} />
        <StatCard label="Paid Amount" value={currency(account.paidAmount, account.currency)} />
        <StatCard label="Credit Limit" value={currency(account.creditLimit, account.currency)} />
      </div>

      <SectionCard title="Account Overview">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Account Owner" value={account.accountOwner} />
          <Field label="Customer Type" value={account.customerType} />
          <Field label="Industry" value={account.industry} />
          <Field label="Payment Terms" value={account.paymentTerms} />
        </div>
      </SectionCard>

      <SectionCard title="Service History">
        {account.serviceHistory.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">No service history recorded.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {account.serviceHistory.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3 text-sm first:pt-0 last:pb-0">
                <span className="text-gray-700">{item.description}</span>
                <span className="text-xs text-gray-400">{formatDate(item.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
};

export {AccountSummaryPage}
>>>>>>> origin/dev

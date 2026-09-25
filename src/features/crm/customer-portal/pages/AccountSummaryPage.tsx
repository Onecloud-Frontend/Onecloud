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

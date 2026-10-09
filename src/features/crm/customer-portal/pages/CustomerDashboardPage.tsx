import React from "react";
import {
    Bell,
    CheckCircle2,
    Clock3,
    Headphones,
    MessageSquare,
} from "lucide-react";

import {
  customers,
  invoices,
  orders,
  quotations,
} from "../../shared/data";

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------

interface MenuItem {
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Profile",
    description:
      "View and manage your customer profile and contact details.",
    path: "/crm/customer-portal/profile",
    icon: User,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    hoverBorder: "hover:border-violet-300",
  },
  {
    title: "Quotations",
    description:
      "Review quotations and track their current status.",
    path: "/crm/customer-portal/quotations",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-300",
  },
  {
    title: "Orders",
    description:
      "View your orders and monitor order progress.",
    path: "/crm/customer-portal/orders",
    icon: Package,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-300",
  },
  {
    title: "Invoices",
    description:
      "View invoices, payment details, and outstanding amounts.",
    path: "/crm/customer-portal/invoices",
    icon: Receipt,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    hoverBorder: "hover:border-orange-300",
  },
  {
    title: "Account Summary",
    description:
      "Review your account and overall financial information.",
    path: "/crm/customer-portal/account",
    icon: Wallet,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    hoverBorder: "hover:border-cyan-300",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const CustomerDashboardPage: React.FC = () => {
  const customer = customers[0];

  const totalOrders = orders.length;

  const openQuotations = quotations.filter(
    (quotation) =>
      quotation.status !== "ACCEPTED" &&
      quotation.status !== "REJECTED",
  ).length;

  const outstandingAmount = invoices.reduce(
    (total, invoice) => total + invoice.balanceAmount,
    0,
  );

  const currencyCode = invoices[0]?.currency ?? "INR";

  const formattedOutstanding = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(outstandingAmount);

  const accountStatus = customer?.status ?? "UNKNOWN";

  const summaryItems = [
    {
      label: "Total Orders",
      value: String(totalOrders).padStart(2, "0"),
      description: "Orders placed",
      icon: Package,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Open Quotations",
      value: String(openQuotations).padStart(2, "0"),
      description: "Awaiting response",
      icon: FileText,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Outstanding",
      value: formattedOutstanding,
      description: "Amount due",
      icon: Wallet,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      label: "Account Status",
      value: accountStatus,
      description: "Customer account status",
      icon: User,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-violet-100/50 blur-3xl" />

          <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-200">
                <LayoutDashboard size={27} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    CUSTOMER PORTAL
                  </span>
                </div>

                <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Welcome back
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  Manage your customer account, quotations, orders, invoices,
                  and financial information from one place.
                </p>
              </div>
            </div>

            {/* Account Status */}
            <div className="relative min-w-[190px] rounded-xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Account ID
              </p>

              <p className="mt-1 text-lg font-bold text-gray-900">
                {customer?.id ?? "—"}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    accountStatus === "ACTIVE"
                      ? "bg-emerald-500"
                      : "bg-gray-400"
                  }`}
                />

                <span
                  className={`text-xs font-medium ${
                    accountStatus === "ACTIVE"
                      ? "text-emerald-600"
                      : "text-gray-600"
                  }`}
                >
                  {accountStatus} Account
                </span>
              </div>
            </div>
            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="font-bold text-slate-900">Customer Account Summary</h2>
                        <p className="mt-1 text-xs text-slate-500">
                            {customerAccount.companyName} · {customerAccount.accountId} · {customerAccount.customerCode}
                        </p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {customerAccount.accountStatus}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">
                    {[
                        ["Total Quotes", customerAccount.totalQuotes],
                        ["Pending Quotes", customerAccount.pendingQuotes],
                        ["Total Orders", customerAccount.totalOrders],
                        ["Open Orders", customerAccount.openOrders],
                        ["Total Invoices", customerAccount.totalInvoices],
                        ["Outstanding", `₹${customerAccount.outstandingAmount.toLocaleString("en-IN")}`],
                        ["Paid Amount", `₹${customerAccount.paidAmount.toLocaleString("en-IN")}`],
                        ["Payment Due", customerAccount.paymentDueDate],
                    ].map(([label, value]) => (
                        <div key={label} className="rounded-xl bg-slate-50 p-3">
                            <p className="text-[11px] font-medium text-slate-500">{label}</p>
                            <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
                        </div>
                    ))}
                </div>
            </section>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_.65fr]">
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 p-5">
                        <div>
                            <h2 className="font-bold text-slate-900">Recent Support</h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Latest customer support requests
                            </p>
                        </div>
                        <Link
                            to="/crm/customer-portal/support"
                            className="text-xs font-semibold text-blue-600"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {supportTickets.slice(0, 4).map((t) => (
                            <Link
                                key={t.id}
                                to={`/crm/customer-portal/support/${t.id}`}
                                className="flex items-center gap-3 p-4 hover:bg-slate-50"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Headphones size={18} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-semibold text-blue-600">
                                            {t.ticketNumber}
                                        </span>
                                        <span
                                            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${portalStatus(t.status)}`}
                                        >
                                            {t.status}
                                        </span>
                                    </div>
                                    <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                                        {t.subject}
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-400">
                                        Updated {t.updatedDate} · {t.assignedTo}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>

                  <div
                    className={`mt-4 text-sm font-semibold ${item.iconColor}`}
                  >
                    View details →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Account Information */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-white to-cyan-50 px-6 py-5">
            <h2 className="text-lg font-bold text-gray-900">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Basic information associated with your customer account.
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Customer Name
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                {customer?.companyName ?? "—"}
              </p>
            </div>

            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Customer Type
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                {customer?.industry ?? "—"}
              </p>
            </div>
        </div>
    );
};

export { CustomerDashboardPage };

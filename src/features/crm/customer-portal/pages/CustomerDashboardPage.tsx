
import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  FileText,
  LayoutDashboard,
  Package,
  Receipt,
  User,
  Wallet,
} from "lucide-react";

interface MenuItem {
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
}

interface SummaryItem {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Profile",
    description: "View and manage your customer profile and contact details.",
    path: "/crm/customer-portal/profile",
    icon: User,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    hoverBorder: "hover:border-violet-300",
  },
  {
    title: "Quotations",
    description: "Review quotations and track their current status.",
    path: "/crm/customer-portal/quotations",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-300",
  },
  {
    title: "Orders",
    description: "View your orders and monitor order progress.",
    path: "/crm/customer-portal/orders",
    icon: Package,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-300",
  },
  {
    title: "Invoices",
    description: "View invoices, payment details, and outstanding amounts.",
    path: "/crm/customer-portal/invoices",
    icon: Receipt,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    hoverBorder: "hover:border-orange-300",
  },
  {
    title: "Account Summary",
    description: "Review your account and overall financial information.",
    path: "/crm/customer-portal/account",
    icon: Wallet,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    hoverBorder: "hover:border-cyan-300",
  },
];

const summaryItems: SummaryItem[] = [
  {
    label: "Total Orders",
    value: "24",
    description: "Orders placed",
    icon: Package,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Open Quotations",
    value: "06",
    description: "Awaiting response",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Outstanding",
    value: "$12,450",
    description: "Amount due",
    icon: Wallet,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    label: "Account Status",
    value: "Active",
    description: "Account in good standing",
    icon: User,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
];

const CustomerDashboardPage: React.FC = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Decorative background */}
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
                ACC-10245
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">
                  Active Account
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Account Overview */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Account Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Quick insights into your customer account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}
                    >
                      <Icon size={21} />
                    </div>

                    <span className="text-xs font-medium text-gray-400">
                      Overview
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>

                    <p
                      className={`mt-1 text-2xl font-bold ${
                        item.label === "Account Status"
                          ? "text-emerald-600"
                          : "text-gray-900"
                      }`}
                    >
                      {item.value}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Customer Services */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Customer Services
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Access your account information and services.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.hoverBorder}`}
                >
                  {/* Top gradient line */}
                  <div
                    className={`absolute left-0 right-0 top-0 h-1 ${
                      item.title === "Profile"
                        ? "bg-gradient-to-r from-violet-500 to-purple-500"
                        : item.title === "Quotations"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                          : item.title === "Orders"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                            : item.title === "Invoices"
                              ? "bg-gradient-to-r from-orange-500 to-amber-500"
                              : "bg-gradient-to-r from-cyan-500 to-sky-500"
                    }`}
                  />

                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} transition-all duration-300 group-hover:scale-110`}
                    >
                      <Icon size={23} />
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-gray-100 group-hover:text-gray-700">
                      <ChevronRight size={17} />
                    </div>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>

                  <div className={`mt-4 text-sm font-semibold ${item.iconColor}`}>
                    View details →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* account information */}
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
                Shan Admin
              </p>
            </div>

            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Customer Type
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                Enterprise Customer
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { CustomerDashboardPage };


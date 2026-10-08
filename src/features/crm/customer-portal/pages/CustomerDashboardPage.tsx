import React from "react";
import {
    Bell,
    CheckCircle2,
    Clock3,
    Headphones,
    MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
    customerActivities,
    customerNotifications,
    customerKPIs,
    customerAccount,
    supportTickets,
} from "../types/data";
import {
    ActivityIcon,
    PageHeader,
    QuickLink,
    StatCard,
    portalStatus,
} from "../components/PortalUi";

export const CustomerDashboardPage: React.FC = () => {
    const open = supportTickets.filter((t) => t.status !== "Resolved");
    const unread = customerNotifications.filter((n) => !n.read);
    return (
        <div className="p-5 md:p-7">
            <PageHeader
                title="Customer Portal"
                description="A single workspace for support requests, customer activity, reminders and notifications."
            />
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {customerKPIs.map((kpi) => (
                    <StatCard
                        key={kpi.id}
                        label={kpi.label}
                        value={kpi.value}
                        icon={<Headphones size={19} />}
                        tone={
                            kpi.category === "Finance"
                                ? "bg-emerald-50 text-emerald-600"
                                : kpi.category === "Support"
                                  ? "bg-blue-50 text-blue-600"
                                  : kpi.category === "Sales"
                                    ? "bg-violet-50 text-violet-600"
                                    : "bg-orange-50 text-orange-600"
                        }
                    />
                ))}
            </div>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <QuickLink
                    to="/crm/customer-portal/support"
                    label="Support Requests"
                    count={supportTickets.length}
                    icon={<Headphones size={18} />}
                />
                <QuickLink
                    to="/crm/customer-portal/activities"
                    label="Customer Activities"
                    count={customerActivities.length}
                    icon={<MessageSquare size={18} />}
                />
                <QuickLink
                    to="/crm/customer-portal/notifications"
                    label="Notifications"
                    count={unread.length}
                    icon={<Bell size={18} />}
                />
                <QuickLink
                    to="/crm/customer-portal/profile"
                    label="Customer Profile"
                    icon={<MessageSquare size={18} />}
                />
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
                </section>
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 p-5">
                        <h2 className="font-bold text-slate-900">Upcoming Reminders</h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Next actions requiring attention
                        </p>
                    </div>
                    <div className="space-y-3 p-4">
                        {customerActivities
                            .filter((a) => a.status !== "Completed")
                            .map((a) => (
                                <div
                                    key={a.id}
                                    className="flex gap-3 rounded-xl border border-slate-100 p-3"
                                >
                                    <ActivityIcon type={a.activityType} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {a.subject}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {a.nextAction}
                                        </p>
                                        <p className="mt-2 text-[11px] font-semibold text-blue-600">
                                            Reminder: {a.reminderDate}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

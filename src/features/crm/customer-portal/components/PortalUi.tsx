import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Bell, CalendarClock, CheckCircle2, FileText, Headphones, MessageSquare, Package, Search, UserRound } from 'lucide-react';
import type { Priority, TicketStatus } from '../types/data';

export const portalStatus = (status: string) => {
  const styles: Record<string, string> = {
    Open: 'bg-blue-50 text-blue-700 border-blue-200',
    'In Progress': 'bg-violet-50 text-violet-700 border-violet-200',
    'Waiting on Customer': 'bg-amber-50 text-amber-700 border-amber-200',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Planned: 'bg-blue-50 text-blue-700 border-blue-200',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Draft: 'bg-slate-50 text-slate-600 border-slate-200',
    Sent: 'bg-blue-50 text-blue-700 border-blue-200',
    Viewed: 'bg-violet-50 text-violet-700 border-violet-200',
    Accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Changes Requested': 'bg-orange-50 text-orange-700 border-orange-200',
    Expired: 'bg-red-50 text-red-700 border-red-200',
    Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    Processing: 'bg-violet-50 text-violet-700 border-violet-200',
    Dispatched: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Cancelled: 'bg-red-50 text-red-700 border-red-200',
    'Partially Paid': 'bg-amber-50 text-amber-700 border-amber-200',
    Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Overdue: 'bg-red-50 text-red-700 border-red-200',
    'On Hold': 'bg-amber-50 text-amber-700 border-amber-200',
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-600 border-slate-200',
  };
  return styles[status] || 'bg-slate-50 text-slate-600 border-slate-200';
};

export const priorityBadge = (priority: Priority) => ({
  Low: 'bg-slate-50 text-slate-600 border-slate-200',
  Medium: 'bg-blue-50 text-blue-700 border-blue-200',
  High: 'bg-orange-50 text-orange-700 border-orange-200',
  Urgent: 'bg-red-50 text-red-700 border-red-200',
}[priority]);

const portalLinks = [
  { to: '/crm/customer-portal', label: 'Overview', icon: <CheckCircle2 size={15} /> },
  { to: '/crm/customer-portal/support', label: 'Support', icon: <Headphones size={15} /> },
  { to: '/crm/customer-portal/orders', label: 'Orders', icon: <Package size={15} /> },
  { to: '/crm/customer-portal/invoices', label: 'Invoices', icon: <FileText size={15} /> },
  { to: '/crm/customer-portal/quotations', label: 'Quotations', icon: <FileText size={15} /> },
  { to: '/crm/customer-portal/activities', label: 'Activities', icon: <CalendarClock size={15} /> },
  { to: '/crm/customer-portal/account', label: 'Account', icon: <UserRound size={15} /> },
  { to: '/crm/customer-portal/profile', label: 'Profile', icon: <UserRound size={15} /> },
  { to: '/crm/customer-portal/notifications', label: 'Notifications', icon: <Bell size={15} /> },
];

export const PortalNav: React.FC = () => {
  const location = useLocation();
  return <nav className="mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
    <div className="flex min-w-max gap-1">
      {portalLinks.map(link => {
        const active = location.pathname === link.to || (link.to !== '/crm/customer-portal' && location.pathname.startsWith(link.to));
        return <Link key={link.to} to={link.to} className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${active ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}>{link.icon}{link.label}</Link>;
      })}
    </div>
  </nav>;
};

export const PageHeader: React.FC<{ title: string; description: string; action?: React.ReactNode }> = ({ title, description, action }) => (
  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600"><span className="h-2 w-2 rounded-full bg-blue-600" /> Customer Portal</div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-1 max-w-3xl text-sm text-slate-500">{description}</p>
    </div>
    {action}
  </div>
);

export const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; tone?: string }> = ({ label, value, icon, tone = 'bg-blue-50 text-blue-600' }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{value}</p></div><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>{icon}</div></div></div>
);

export const EmptyState: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500"><FileText size={22} /></div><h3 className="mt-4 font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-500">{text}</p></div>
);

export const SearchBox: React.FC<{ value: string; onChange: (v: string) => void; placeholder?: string }> = ({ value, onChange, placeholder = 'Search...' }) => (
  <div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" /></div>
);

export const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => <div className="border-b border-slate-100 py-3 last:border-0"><dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt><dd className="mt-1 text-sm font-medium text-slate-800">{value}</dd></div>;

export const QuickLink: React.FC<{ to: string; label: string; icon: React.ReactNode; count?: number | string }> = ({ to, label, icon, count }) => (
  <Link to={to} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">{icon}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-slate-800">{label}</span>{count !== undefined && <span className="text-xs text-slate-500">{count} items</span>}</span><ArrowRight size={17} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" /></Link>
);

export const ActivityIcon: React.FC<{ type: string }> = ({ type }) => {
  const icon = type === 'Call' ? <MessageSquare size={17} /> : type === 'Meeting' ? <CalendarClock size={17} /> : type === 'Task' ? <CheckCircle2 size={17} /> : type === 'Email' ? <Bell size={17} /> : <FileText size={17} />;
  return <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">{icon}</span>;
};

export const formatMoney = (amount: number, currency = 'INR') => new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
export const statusClass = (status: TicketStatus | string) => `rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus(status)}`;

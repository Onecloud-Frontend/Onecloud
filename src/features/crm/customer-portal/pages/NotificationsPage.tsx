import React, { useMemo, useState } from 'react';
import { ArrowLeft, Bell, CheckCheck, ExternalLink, Mail, MailOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  getCustomerNotifications,
  markAllCustomerNotificationsRead,
  markCustomerNotificationRead,
} from '../services/portalStore';
import { PageHeader, PortalNav, StatCard, priorityBadge } from '../components/PortalUi';

export const NotificationsPage: React.FC = () => {
  const [items, setItems] = useState(getCustomerNotifications());
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const shown = useMemo(
    () => items.filter(notification => filter === 'All' || !notification.read),
    [items, filter],
  );

  const markRead = (id: string) => {
    setItems(markCustomerNotificationRead(id));
  };

  const markAll = () => {
    setItems(markAllCustomerNotificationsRead());
  };

  return (
    <div className="p-5 md:p-7">
      <PageHeader
        title="Notifications"
        description="Stay informed about support updates, reminders, invoices, orders and customer-portal events."
    action={
          <div className="flex items-center gap-2">
            <Link
              to="/crm/customer-portal"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600"
            >
              <ArrowLeft size={17} /> Back
            </Link>

            <button
              onClick={markAll}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600"
            >
              <CheckCheck size={17} /> Mark all read
            </button>
          </div>
        }
      />
      <PortalNav />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Notifications" value={items.length} icon={<Bell size={19} />} />
        <StatCard
          label="Unread"
          value={items.filter(notification => !notification.read).length}
          icon={<Mail size={19} />}
          tone="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="High / Urgent"
          value={items.filter(notification => notification.priority === 'High' || notification.priority === 'Urgent').length}
          icon={<Bell size={19} />}
          tone="bg-orange-50 text-orange-600"
        />
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('All')}
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${filter === 'All' ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Unread')}
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${filter === 'Unread' ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
        >
          Unread
        </button>
      </div>

      <div className="space-y-3">
        {shown.map(notification => (
          <div
            key={notification.id}
            className={`rounded-2xl border bg-white p-4 shadow-sm transition ${
              notification.read ? 'border-slate-200' : 'border-blue-200 bg-blue-50/30'
            }`}
          >
            <div className="flex gap-4">
              <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notification.read ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                {notification.read ? <MailOpen size={18} /> : <Mail size={18} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-wrap items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{notification.id}</span><h3 className="font-semibold text-slate-900">{notification.title}</h3></div>
                      {!notification.read && (
                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{notification.message}</p>
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityBadge(notification.priority)}`}>
                    {notification.priority}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span>{notification.notificationType}</span>
                  <span>•</span>
                  <span>{notification.relatedModule} · {notification.relatedRecordId}</span>
                  <span>•</span>
                  <span>{notification.createdDate}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {notification.actionPath && notification.actionLabel && (
                    <Link
                      to={notification.actionPath}
                      onClick={() => markRead(notification.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
                    >
                      {notification.actionLabel} <ExternalLink size={13} />
                    </Link>
                  )}
                  {!notification.read && (
                    <button
                      onClick={() => markRead(notification.id)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {!shown.length && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
            You’re all caught up. No notifications match this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
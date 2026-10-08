import React, { useMemo, useState } from 'react';
import { Bell, CalendarClock, Check, Eye, Plus, X } from 'lucide-react';
import {
  addCustomerActivity,
  getCustomerActivities,
  updateCustomerActivity,
} from '../services/portalStore';
import type { CustomerActivity, Priority } from '../types/data';
import {
  ActivityIcon,
  PageHeader,
  PortalNav,
  SearchBox,
  StatCard,
  portalStatus,
  priorityBadge,
} from '../components/PortalUi';

const defaultForm = {
  activityType: 'Call' as CustomerActivity['activityType'],
  subject: '',
  description: '',
  relatedContact: 'Rohan Mehta',
  relatedOpportunity: '—',
  activityDate: '',
  owner: 'Priya Nair',
  status: 'Planned' as CustomerActivity['status'],
  priority: 'Medium' as Priority,
  nextAction: '',
  reminderDate: '',
};

export const CustomerActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<CustomerActivity[]>(getCustomerActivities);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [reminderOnly, setReminderOnly] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState<CustomerActivity | null>(null);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState(defaultForm);

  const rows = useMemo(
    () =>
      activities.filter(activity => {
        const haystack = `${activity.id} ${activity.activityType} ${activity.subject} ${activity.description} ${activity.owner} ${activity.relatedContact} ${activity.relatedOpportunity}`.toLowerCase();
        return (
          haystack.includes(query.toLowerCase()) &&
          (filter === 'All' || activity.status === filter) &&
          (priorityFilter === 'All' || activity.priority === priorityFilter) &&
          (!reminderOnly || activity.reminderDate !== '—')
        );
      }),
    [activities, query, filter, priorityFilter, reminderOnly],
  );

  const refresh = () => setActivities(getCustomerActivities());

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2500);
  };

  const create = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.subject.trim() || !form.description.trim()) return;

    const activity = addCustomerActivity({
      ...form,
      activityDate:
        form.activityDate ||
        new Date().toLocaleString('en-IN', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      reminderDate: form.reminderDate || '—',
    });

    refresh();
    setShowCreate(false);
    setForm(defaultForm);
    flash(`${activity.id} created successfully.`);
  };

  const complete = (activity: CustomerActivity) => {
    updateCustomerActivity(activity.id, { status: 'Completed' });
    refresh();
    flash(`${activity.id} marked as completed.`);
  };

  return (
    <div className="p-5 md:p-7">
      <PageHeader
        title="Customer Activities"
        description="Review customer interactions, follow-ups, related opportunities, owners and reminders."
        action={
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus size={17} /> Log Activity
          </button>
        }
      />
      <PortalNav />

      {notice && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {notice}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Activities" value={activities.length} icon={<Bell size={19} />} />
        <StatCard
          label="Pending / Planned"
          value={activities.filter(activity => activity.status !== 'Completed').length}
          icon={<CalendarClock size={19} />}
          tone="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="With Reminders"
          value={activities.filter(activity => activity.reminderDate !== '—').length}
          icon={<CalendarClock size={19} />}
          tone="bg-violet-50 text-violet-600"
        />
        <StatCard
          label="High / Urgent"
          value={activities.filter(activity => activity.priority === 'High' || activity.priority === 'Urgent').length}
          icon={<Bell size={19} />}
          tone="bg-orange-50 text-orange-600"
        />
      </div>

      <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-900">Activity Timeline</h2>
            <p className="mt-1 text-xs text-slate-500">Recent customer interactions and the next actions attached to them.</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{rows.length} visible</span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {rows.slice(0, 3).map(activity => (
            <button
              key={`timeline-${activity.id}`}
              onClick={() => setSelected(activity)}
              className="text-left rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
            >
              <div className="flex items-center gap-3">
                <ActivityIcon type={activity.activityType} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{activity.subject}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{activity.activityDate}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">{activity.description}</p>
              <p className="mt-3 text-xs font-semibold text-blue-600">Next: {activity.nextAction || 'None'}</p>
            </button>
          ))}
          {!rows.length && <p className="text-sm text-slate-500">No timeline entries match the current filters.</p>}
        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex-1">
              <SearchBox
                value={query}
                onChange={setQuery}
                placeholder="Search activity, contact, opportunity or owner..."
              />
            </div>
            <select
              value={filter}
              onChange={event => setFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            >
              <option>All</option>
              <option>Planned</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
            <select
              value={priorityFilter}
              onChange={event => setPriorityFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
            <button
              onClick={() => setReminderOnly(value => !value)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${
                reminderOnly
                  ? 'border-violet-200 bg-violet-50 text-violet-700'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              Reminders only
            </button>
            <button
              onClick={refresh}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-600"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1350px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {[
                  'Activity ID',
                  'Type',
                  'Subject',
                  'Related Contact',
                  'Related Opportunity',
                  'Activity Date',
                  'Owner',
                  'Status',
                  'Priority',
                  'Next Action',
                  'Reminder Date',
                  'Actions',
                ].map(header => (
                  <th key={header} className="px-4 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(activity => (
                <tr key={activity.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-4 font-semibold text-slate-700">{activity.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <ActivityIcon type={activity.activityType} />
                      {activity.activityType}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-800">{activity.subject}</p>
                    <p className="mt-1 max-w-[240px] text-xs text-slate-500">{activity.description}</p>
                  </td>
                  <td className="px-4 py-4">{activity.relatedContact}</td>
                  <td className="px-4 py-4">{activity.relatedOpportunity}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-500">{activity.activityDate}</td>
                  <td className="px-4 py-4">{activity.owner}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus(activity.status)}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityBadge(activity.priority)}`}>
                      {activity.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{activity.nextAction}</td>
                  <td className="px-4 py-4 font-medium">{activity.reminderDate}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(activity)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600"
                      >
                        <Eye size={13} /> View
                      </button>
                      {activity.status !== 'Completed' && (
                        <button
                          onClick={() => complete(activity)}
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700"
                        >
                          <Check size={13} /> Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!rows.length && (
          <div className="p-10 text-center text-sm text-slate-500">
            No customer activities match your filters.
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-blue-600">{selected.id}</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">{selected.subject}</h2>
                <p className="mt-1 text-sm text-slate-500">{selected.activityType} · {selected.activityDate}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400">
                <X size={19} />
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-400">Description</p><p className="mt-1 text-sm text-slate-700">{selected.description}</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-400">Next Action</p><p className="mt-1 text-sm text-slate-700">{selected.nextAction || 'None'}</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-400">Related Contact</p><p className="mt-1 text-sm font-semibold text-slate-800">{selected.relatedContact}</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-400">Related Opportunity</p><p className="mt-1 text-sm font-semibold text-slate-800">{selected.relatedOpportunity}</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-400">Owner</p><p className="mt-1 text-sm font-semibold text-slate-800">{selected.owner}</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-400">Reminder</p><p className="mt-1 text-sm font-semibold text-slate-800">{selected.reminderDate}</p></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              {selected.status !== 'Completed' && (
                <button
                  onClick={() => {
                    complete(selected);
                    setSelected(null);
                  }}
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Mark Completed
                </button>
              )}
              <button
                onClick={() => setSelected(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <form onSubmit={create} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600">Customer Activity</p>
                <h2 className="mt-1 text-xl font-bold">Log New Activity</h2>
              </div>
              <button type="button" onClick={() => setShowCreate(false)} className="text-slate-400">
                <X size={19} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label>
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Activity Type</span>
                <select
                  value={form.activityType}
                  onChange={event => setForm({ ...form, activityType: event.target.value as CustomerActivity['activityType'] })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                >
                  <option>Call</option><option>Email</option><option>Meeting</option><option>Task</option><option>Note</option>
                </select>
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Priority</span>
                <select
                  value={form.priority}
                  onChange={event => setForm({ ...form, priority: event.target.value as Priority })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                >
                  <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
                </select>
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Subject</span>
                <input required value={form.subject} onChange={event => setForm({ ...form, subject: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Description</span>
                <textarea required rows={3} value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Related Contact</span>
                <input value={form.relatedContact} onChange={event => setForm({ ...form, relatedContact: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Related Opportunity</span>
                <input value={form.relatedOpportunity} onChange={event => setForm({ ...form, relatedOpportunity: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Activity Date</span>
                <input type="datetime-local" value={form.activityDate} onChange={event => setForm({ ...form, activityDate: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Reminder Date</span>
                <input type="date" value={form.reminderDate} onChange={event => setForm({ ...form, reminderDate: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Owner</span>
                <input value={form.owner} onChange={event => setForm({ ...form, owner: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">Next Action</span>
                <input value={form.nextAction} onChange={event => setForm({ ...form, nextAction: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowCreate(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button>
              <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">Create Activity</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerActivitiesPage;

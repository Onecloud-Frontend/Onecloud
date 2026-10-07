import React, { useMemo, useState } from 'react';
import { Download, Eye, Filter, Plus, RefreshCw, Search, SlidersHorizontal, X, CheckCircle2, Clock3, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSupportTickets, addSupportTicket, saveSupportTickets, updateSupportTicketPriority, updateSupportTicketStatus } from '../services/supportStore';
import type { Priority, SupportTicket, TicketStatus } from '../types/data';
import { PageHeader, PortalNav, SearchBox, StatCard, portalStatus, priorityBadge } from '../components/PortalUi';

const statuses: TicketStatus[] = ['Open', 'In Progress', 'Waiting on Customer', 'Resolved'];
const priorities: Priority[] = ['Low', 'Medium', 'High', 'Urgent'];
const categories = ['Billing', 'Account', 'Access', 'Orders', 'Technical', 'Product', 'Other'];

type SortKey = 'ticketNumber' | 'subject' | 'priority' | 'status' | 'createdDate' | 'expectedResolutionDate';

const dateValue = (value: string) => {
  const parsed = Date.parse(value.replace('·', ''));
  return Number.isNaN(parsed) ? 0 : parsed;
};

const csvEscape = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`;

export const SupportRequestsPage: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(getSupportTickets);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [category, setCategory] = useState('All');
  const [assignee, setAssignee] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('createdDate');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showCreate, setShowCreate] = useState(false);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ subject: '', description: '', category: 'Technical', priority: 'Medium' as Priority, contact: 'Rohan Mehta', expectedResolutionDate: '', assignedTo: 'Priya Nair' });

  const assignees = useMemo(() => Array.from(new Set(tickets.map(t => t.assignedTo))), [tickets]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = tickets.filter(t => {
      const haystack = `${t.ticketNumber} ${t.subject} ${t.category} ${t.assignedTo} ${t.customer} ${t.contact} ${t.status}`.toLowerCase();
      return (!q || haystack.includes(q)) && (status === 'All' || t.status === status) && (priority === 'All' || t.priority === priority) && (category === 'All' || t.category === category) && (assignee === 'All' || t.assignedTo === assignee);
    });
    return [...result].sort((a, b) => {
      const av = sortKey === 'priority' ? priorities.indexOf(a.priority) : sortKey === 'status' ? statuses.indexOf(a.status) : sortKey === 'subject' ? a.subject.toLowerCase() : sortKey === 'ticketNumber' ? a.ticketNumber : dateValue(a[sortKey]);
      const bv = sortKey === 'priority' ? priorities.indexOf(b.priority) : sortKey === 'status' ? statuses.indexOf(b.status) : sortKey === 'subject' ? b.subject.toLowerCase() : sortKey === 'ticketNumber' ? b.ticketNumber : dateValue(b[sortKey]);
      if (av < bv) return sortAsc ? -1 : 1;
      if (av > bv) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [tickets, query, status, priority, category, assignee, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const allVisibleSelected = visible.length > 0 && visible.every(t => selected.includes(t.id));

  const open = tickets.filter(t => t.status !== 'Resolved').length;
  const urgent = tickets.filter(t => t.priority === 'Urgent' || t.priority === 'High').length;
  const waiting = tickets.filter(t => t.status === 'Waiting on Customer').length;
  const overdue = tickets.filter(t => t.status !== 'Resolved' && dateValue(t.expectedResolutionDate) && dateValue(t.expectedResolutionDate) < Date.now()).length;

  const flash = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 3000); };

  const changeSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(v => !v); else { setSortKey(key); setSortAsc(key === 'subject' || key === 'ticketNumber'); }
  };

  const toggleSelected = (id: string) => setSelected(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  const toggleAll = () => setSelected(current => allVisibleSelected ? current.filter(id => !visible.some(t => t.id === id)) : Array.from(new Set([...current, ...visible.map(t => t.id)])));

  const runBulkStatus = (nextStatus: TicketStatus) => {
    if (!selected.length) return;
    setTickets(updateSupportTicketStatus(selected, nextStatus));
    setSelected([]);
    flash(`${selected.length} ticket${selected.length > 1 ? 's' : ''} moved to ${nextStatus}.`);
  };

  const runBulkPriority = (nextPriority: Priority) => {
    if (!selected.length) return;
    setTickets(updateSupportTicketPriority(selected, nextPriority));
    setSelected([]);
    flash(`${selected.length} ticket${selected.length > 1 ? 's' : ''} updated to ${nextPriority} priority.`);
  };

  const exportCsv = () => {
    const headers = ['Ticket ID','Ticket Number','Subject','Category','Priority','Customer','Contact','Created Date','Last Updated','Assigned To','Status','Expected Resolution Date'];
    const rows = filtered.map(t => [t.id,t.ticketNumber,t.subject,t.category,t.priority,t.customer,t.contact,t.createdDate,t.updatedDate,t.assignedTo,t.status,t.expectedResolutionDate]);
    const blob = new Blob([[headers, ...rows].map(row => row.map(csvEscape).join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'customer-support-requests.csv'; anchor.click(); URL.revokeObjectURL(url);
    flash(`${filtered.length} ticket${filtered.length !== 1 ? 's' : ''} exported.`);
  };

  const resetFilters = () => { setQuery(''); setStatus('All'); setPriority('All'); setCategory('All'); setAssignee('All'); setPage(1); };

  const createTicket = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.subject.trim() || !form.description.trim()) return;
    const ticket = addSupportTicket({ description: form.description, subject: form.subject, category: form.category, priority: form.priority, customer: 'Acme Industries', contact: form.contact, assignedTo: form.assignedTo, status: 'Open', expectedResolutionDate: form.expectedResolutionDate || 'Sep 30, 2026', resolutionNotes: 'New support request. Resolution notes will be added by the assigned support owner.', attachments: [] });
    setTickets(getSupportTickets());
    setShowCreate(false);
    setForm({ subject: '', description: '', category: 'Technical', priority: 'Medium', contact: 'Rohan Mehta', expectedResolutionDate: '', assignedTo: 'Priya Nair' });
    setPage(1);
    flash(`${ticket.ticketNumber} created successfully.`);
  };

  const refresh = () => { const latest = getSupportTickets(); setTickets(latest); setSelected([]); flash('Support list refreshed.'); };

  return <div className="p-5 md:p-7">
    <PageHeader title="Support Requests" description="Manage customer issues from intake through assignment, SLA tracking, conversation and resolution." action={
      <div className="flex flex-wrap gap-2">
        <button onClick={refresh} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600"><RefreshCw size={16}/> Refresh</button>
        <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600"><Download size={16}/> Export</button>
        <button onClick={() => setShowCreate(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"><Plus size={17}/> New Request</button>
      </div>
    } />

    <PortalNav />

    {notice && <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><span className="flex items-center gap-2"><CheckCircle2 size={17}/> {notice}</span><button onClick={() => setNotice('')}><X size={16}/></button></div>}

    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Total Tickets" value={tickets.length} icon={<SlidersHorizontal size={19}/>} />
      <StatCard label="Open / In Progress" value={open} icon={<Clock3 size={19}/>} tone="bg-violet-50 text-violet-600" />
      <StatCard label="High / Urgent" value={urgent} icon={<AlertTriangle size={19}/>} tone="bg-orange-50 text-orange-600" />
      <StatCard label="Waiting on Customer" value={waiting} icon={<Filter size={19}/>} tone="bg-amber-50 text-amber-600" />
      <StatCard label="SLA Overdue" value={overdue} icon={<AlertTriangle size={19}/>} tone="bg-red-50 text-red-600" />
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex-1"><SearchBox value={query} onChange={v => { setQuery(v); setPage(1); }} placeholder="Search ticket, subject, customer, contact or assignee..." /></div>
          <select value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none"><option>All</option>{statuses.map(v=><option key={v}>{v}</option>)}</select>
          <select value={priority} onChange={e=>{setPriority(e.target.value);setPage(1)}} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none"><option>All</option>{priorities.map(v=><option key={v}>{v}</option>)}</select>
          <button onClick={() => setShowAdvanced(v => !v)} className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold ${showAdvanced ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700'}`}><Filter size={16}/> More Filters</button>
        </div>
        {showAdvanced && <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 md:grid-cols-3">
          <select value={category} onChange={e=>{setCategory(e.target.value);setPage(1)}} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700"><option>All</option>{categories.map(v=><option key={v}>{v}</option>)}</select>
          <select value={assignee} onChange={e=>{setAssignee(e.target.value);setPage(1)}} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700"><option>All</option>{assignees.map(v=><option key={v}>{v}</option>)}</select>
          <button onClick={resetFilters} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Reset filters</button>
        </div>}
      </div>

      {selected.length > 0 && <div className="flex flex-wrap items-center gap-2 border-b border-blue-100 bg-blue-50/70 px-4 py-3">
        <span className="mr-2 text-sm font-semibold text-blue-800">{selected.length} selected</span>
        <span className="text-xs text-blue-600">Bulk update:</span>
        {statuses.map(s => <button key={s} onClick={() => runBulkStatus(s)} className="rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-400">{s}</button>)}
        <select defaultValue="" onChange={e => { if (e.target.value) runBulkPriority(e.target.value as Priority); e.currentTarget.value = ''; }} className="rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700"><option value="">Set priority</option>{priorities.map(p=><option key={p}>{p}</option>)}</select>
        <button onClick={() => setSelected([])} className="ml-auto text-xs font-semibold text-blue-700">Clear</button>
      </div>}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1420px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>
            <th className="w-10 px-4 py-3"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Select visible tickets" /></th>
            {([['ticketNumber','Ticket Number'],['subject','Subject'],['priority','Priority'],['status','Status'],['createdDate','Created Date'],['expectedResolutionDate','Expected Resolution']] as [SortKey,string][]).map(([key,label]) => <th key={key} onClick={() => changeSort(key)} className="cursor-pointer px-4 py-3 font-semibold hover:text-blue-600">{label} <span className="text-slate-300">{sortKey === key ? (sortAsc ? '↑' : '↓') : '↕'}</span></th>)}
            {['Ticket ID','Category','Customer','Last Updated','Assigned To','Actions'].map(h=><th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map(t => <tr key={t.id} className={`hover:bg-slate-50/70 ${selected.includes(t.id) ? 'bg-blue-50/40' : ''}`}>
              <td className="px-4 py-4"><input type="checkbox" checked={selected.includes(t.id)} onChange={() => toggleSelected(t.id)} aria-label={`Select ${t.ticketNumber}`} /></td>
              <td className="px-4 py-4 font-semibold text-blue-600">{t.ticketNumber}</td>
              <td className="max-w-[230px] px-4 py-4 font-semibold text-slate-800">{t.subject}<div className="mt-1 line-clamp-1 text-xs font-normal text-slate-400">{t.description}</div></td>
              <td className="px-4 py-4"><span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityBadge(t.priority)}`}>{t.priority}</span></td>
              <td className="px-4 py-4"><span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus(t.status)}`}>{t.status}</span></td>
              <td className="whitespace-nowrap px-4 py-4 text-slate-500">{t.createdDate}</td>
              <td className="whitespace-nowrap px-4 py-4 text-slate-600">{t.expectedResolutionDate}</td>
              <td className="px-4 py-4 font-semibold text-slate-700">{t.id}</td>
              <td className="px-4 py-4 text-slate-600">{t.category}</td>
              <td className="px-4 py-4 text-slate-600">{t.customer}</td>
              <td className="whitespace-nowrap px-4 py-4 text-slate-500">{t.updatedDate}</td>
              <td className="px-4 py-4 text-slate-700">{t.assignedTo}</td>
              <td className="px-4 py-4"><div className="flex items-center gap-2"><Link to={`/crm/customer-portal/support/${t.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600"><Eye size={14}/> View</Link><button onClick={() => { setSelected([t.id]); }} title="Select for bulk update" className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:border-blue-200 hover:text-blue-600"><SlidersHorizontal size={14}/></button></div></td>
            </tr>)}
          </tbody>
        </table>
      </div>

      {!visible.length && <div className="p-10 text-center"><Search size={24} className="mx-auto text-slate-300"/><p className="mt-3 text-sm font-semibold text-slate-700">No support requests found</p><p className="mt-1 text-sm text-slate-500">Try changing your filters or create a new request.</p></div>}

      <div className="flex flex-col gap-3 border-t border-slate-100 p-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}-{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} tickets</div>
        <div className="flex items-center gap-2"><select value={pageSize} onChange={e=>{setPageSize(Number(e.target.value));setPage(1)}} className="rounded-lg border border-slate-200 px-2 py-1.5"><option value={5}>5 / page</option><option value={10}>10 / page</option><option value={25}>25 / page</option></select><button disabled={currentPage===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40">Previous</button><span className="px-1 font-medium text-slate-700">{currentPage} / {totalPages}</span><button disabled={currentPage===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40">Next</button></div>
      </div>
    </div>

    {showCreate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onMouseDown={e => { if (e.target === e.currentTarget) setShowCreate(false); }}>
      <form onSubmit={createTicket} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between"><div><h2 className="text-xl font-bold text-slate-900">Create Support Request</h2><p className="mt-1 text-sm text-slate-500">Capture the issue, priority, owner and target resolution date.</p></div><button type="button" onClick={() => setShowCreate(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={19}/></button></div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Subject *</span><input required value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="e.g. Unable to access order invoice" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" /></label>
          <label className="md:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Description *</span><textarea required rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe the issue and expected outcome..." className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" /></label>
          <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Category</span><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{categories.map(v=><option key={v}>{v}</option>)}</select></label>
          <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Priority</span><select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value as Priority})} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{priorities.map(v=><option key={v}>{v}</option>)}</select></label>
          <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Contact</span><input value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
          <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Assigned To</span><select value={form.assignedTo} onChange={e=>setForm({...form,assignedTo:e.target.value})} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{assignees.length ? assignees.map(v=><option key={v}>{v}</option>) : <option>Priya Nair</option>}</select></label>
          <label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Expected Resolution Date</span><input type="date" value={form.expectedResolutionDate} onChange={e=>setForm({...form,expectedResolutionDate:e.target.value})} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
        </div>
        <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={()=>setShowCreate(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Cancel</button><button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Create Request</button></div>
      </form>
    </div>}
  </div>;
};

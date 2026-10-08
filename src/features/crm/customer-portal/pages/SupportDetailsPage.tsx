import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  MessageCircle,
  Paperclip,
  Save,
  Send,
  UserRound,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  addSupportAttachment,
  addSupportConversation,
  getSupportTickets,
  updateSupportTicket,
} from '../services/supportStore';
import type { Priority, TicketStatus } from '../types/data';
import {
  DetailRow,
  PageHeader,
  PortalNav,
  portalStatus,
  priorityBadge,
} from '../components/PortalUi';

const statuses: TicketStatus[] = ['Open', 'In Progress', 'Waiting on Customer', 'Resolved'];
const priorities: Priority[] = ['Low', 'Medium', 'High', 'Urgent'];

export const SupportDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [version, setVersion] = useState(0);
  const [reply, setReply] = useState('');
  const [notice, setNotice] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState<string | null>(null);
  const [showStatusEditor, setShowStatusEditor] = useState(false);

  const tickets = useMemo(() => getSupportTickets(), [version]);
  const ticket = tickets.find(item => item.id === id);

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2500);
  };

  if (!ticket) {
    return (
      <div className="p-7">
        <PageHeader
          title="Support Request Not Found"
          description="The support request does not exist in the current customer portal data."
          action={
            <Link
              to="/crm/customer-portal/support"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Back to Requests
            </Link>
          }
        />
        <PortalNav />
      </div>
    );
  }

  const saveStatus = (status: TicketStatus) => {
    updateSupportTicket(ticket.id, { status });
    setVersion(value => value + 1);
    setShowStatusEditor(false);
    flash(`Ticket ${ticket.ticketNumber} moved to ${status}.`);
  };

  const savePriority = (priority: Priority) => {
    updateSupportTicket(ticket.id, { priority });
    setVersion(value => value + 1);
    flash(`Ticket priority changed to ${priority}.`);
  };

  const saveNotes = () => {
    updateSupportTicket(ticket.id, { resolutionNotes: resolutionNotes ?? ticket.resolutionNotes });
    setVersion(value => value + 1);
    flash('Resolution notes saved.');
  };

  const sendReply = () => {
    const message = reply.trim();
    if (!message) return;
    addSupportConversation(ticket.id, message);
    setReply('');
    setVersion(value => value + 1);
    flash('Your response was added to the conversation.');
  };

  const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    addSupportAttachment(ticket.id, {
      name: file.name,
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      type: file.type || 'file',
    });
    event.target.value = '';
    setVersion(value => value + 1);
    flash(`${file.name} attached to the ticket.`);
  };

  const downloadAttachment = (name: string) => {
    const blob = new Blob(
      [`Customer Portal attachment placeholder\nTicket: ${ticket.ticketNumber}\nFile: ${name}`],
      { type: 'text/plain' },
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name.includes('.') ? name : `${name}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-5 md:p-7">
      <PageHeader
        title="Support Details"
        description={`${ticket.ticketNumber} · Full ticket history, customer context, SLA and resolution information.`}
        action={
          <Link
            to="/crm/customer-portal/support"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600"
          >
            <ArrowLeft size={17} /> Back to Requests
          </Link>
        }
      />
      <PortalNav />

      {notice && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          <CheckCircle2 size={17} /> {notice}
        </div>
      )}

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-xs font-semibold text-blue-600">{ticket.ticketNumber}</div>
            <h2 className="mt-1 text-xl font-bold text-slate-900">{ticket.subject}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{ticket.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={ticket.priority}
              onChange={event => savePriority(event.target.value as Priority)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold outline-none ${priorityBadge(ticket.priority)}`}
              aria-label="Ticket priority"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority} Priority
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowStatusEditor(value => !value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${portalStatus(ticket.status)}`}
            >
              {ticket.status}
            </button>
          </div>
        </div>

        {showStatusEditor && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            <span className="mr-1 text-xs font-semibold text-slate-500">Update status:</span>
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => saveStatus(status)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                  status === ticket.status
                    ? portalStatus(status)
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h3 className="flex items-center gap-2 font-bold text-slate-900">
                <MessageCircle size={18} className="text-blue-600" /> Conversation History
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Customer and support responses are stored with this ticket.
              </p>
            </div>

            <div className="space-y-5 p-5">
              {ticket.conversation.length ? (
                ticket.conversation.map(conversation => (
                  <div key={conversation.id} className="flex gap-3">
                    <div
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        conversation.role === 'Support'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <UserRound size={17} />
                    </div>
                    <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-sm font-semibold text-slate-900">
                            {conversation.author}
                          </span>
                          <span className="ml-2 text-xs text-slate-400">{conversation.role}</span>
                        </div>
                        <span className="text-xs text-slate-400">{conversation.date}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{conversation.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                  No conversation messages yet.
                </p>
              )}
            </div>

            <div className="border-t border-slate-100 p-4">
              <textarea
                value={reply}
                onChange={event => setReply(event.target.value)}
                placeholder="Write a response to the support team..."
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={sendReply}
                  disabled={!reply.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={16} /> Add Response
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h3 className="font-bold text-slate-900">Resolution Notes</h3>
              <p className="mt-1 text-xs text-slate-500">
                Record the current resolution, troubleshooting steps or closure notes.
              </p>
            </div>
            <div className="p-5">
              <textarea
                value={resolutionNotes ?? ticket.resolutionNotes}
                onChange={event => setResolutionNotes(event.target.value)}
                rows={5}
                className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={saveNotes}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Save size={16} /> Save Resolution Notes
                </button>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 font-bold text-slate-900">Ticket Information</h3>
            <dl>
              <DetailRow label="Ticket ID" value={ticket.id} />
              <DetailRow label="Ticket Number" value={ticket.ticketNumber} />
              <DetailRow label="Category" value={ticket.category} />
              <DetailRow label="Customer" value={ticket.customer} />
              <DetailRow label="Contact" value={ticket.contact} />
              <DetailRow label="Assigned To" value={ticket.assignedTo} />
              <DetailRow
                label="Status"
                value={
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus(ticket.status)}`}>
                    {ticket.status}
                  </span>
                }
              />
              <DetailRow
                label="Priority"
                value={
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityBadge(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                }
              />
              <DetailRow label="Created Date" value={ticket.createdDate} />
              <DetailRow label="Updated Date" value={ticket.updatedDate} />
              <DetailRow label="Expected Resolution Date" value={ticket.expectedResolutionDate} />
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="flex items-center gap-2 font-bold text-slate-900">
                  <Paperclip size={18} className="text-blue-600" /> Attachments
                </h3>
                <p className="mt-1 text-xs text-slate-500">Add supporting screenshots or documents.</p>
              </div>
              <label className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600">
                Attach
                <input type="file" className="hidden" onChange={handleAttachment} />
              </label>
            </div>

            {ticket.attachments.length ? (
              <div className="space-y-2">
                {ticket.attachments.map(attachment => (
                  <div key={`${attachment.name}-${attachment.size}`} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <FileText size={17} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">{attachment.name}</p>
                      <p className="text-xs text-slate-400">
                        {attachment.size} · {attachment.type}
                      </p>
                    </div>
                    <button
                      onClick={() => downloadAttachment(attachment.name)}
                      className="text-slate-400 hover:text-blue-600"
                      title="Download attachment"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No attachments added yet.</p>
            )}
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
            <h3 className="font-bold text-blue-900">Customer Support Workflow</h3>
            <div className="mt-4 space-y-3">
              {statuses.map((status, index) => (
                <div key={status} className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      statuses.indexOf(ticket.status) >= index
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-sm ${ticket.status === status ? 'font-bold text-blue-900' : 'text-slate-600'}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default SupportDetailsPage;

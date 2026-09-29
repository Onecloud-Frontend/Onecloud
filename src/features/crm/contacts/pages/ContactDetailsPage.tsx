import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import { Pencil } from 'lucide-react';
import ContactProfile from '../components/ContactProfile';
import CommunicationHistory from '../components/CommunicationHistory';
import ContactActivities from '../components/ContactActivities';
import ContactNotes from '../components/ContactNotes';
import { useContact } from '../hooks/contact.hooks';

export const ContactDetailsPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: contact,
    isLoading,
    isError,
  } = useContact(id);

  if (isLoading) {
    return <PageContainer className="pb-8"><div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading contact…</div></PageContainer>;
  }

  if (isError) {
    return <PageContainer className="pb-8"><div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Contact could not be loaded.</div></PageContainer>;
  }

  if (!contact) {
    return <PageContainer className="pb-8"><div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Contact not found.</div></PageContainer>;
  }

  return (
    <PageContainer className="space-y-5 pb-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-medium text-blue-600">CRM / Contacts</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{contact.firstName} {contact.lastName}</h1><p className="mt-1 text-sm text-slate-500">Contact details and relationship history.</p></div><button type="button" onClick={() => navigate(`/crm/contacts/${contact.contactId}/edit`)} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"><Pencil className="size-4" />Edit Contact</button></div>

      <ContactProfile contact={contact} />

      <CommunicationHistory
        communicationHistory={contact.communicationHistory}
      />

      <ContactActivities
  contactId={contact.contactId}
  appointments={contact.appointments}
  tasks={contact.tasks}
/>

      <ContactNotes notes={contact.notes} />

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-6 py-4"><h2 className="font-semibold text-slate-900">Related Opportunities</h2></div><div className="p-6 text-sm text-slate-500">{contact.relatedOpportunities.length === 0 ? 'No related opportunities available.' : contact.relatedOpportunities.map((opportunity, index) => <div key={index}>{JSON.stringify(opportunity)}</div>)}</div></section>
      <section className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 text-sm shadow-sm sm:grid-cols-2"><div><p className="text-xs font-medium uppercase tracking-wide text-slate-500">Created Date</p><p className="mt-1 text-slate-800">{contact.createdDate}</p></div><div><p className="text-xs font-medium uppercase tracking-wide text-slate-500">Updated Date</p><p className="mt-1 text-slate-800">{contact.updatedDate}</p></div></section>
    </PageContainer>
  );
};

export default ContactDetailsPage;

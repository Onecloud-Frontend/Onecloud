
import { Eye, Pencil } from 'lucide-react';
import React from 'react';
import type { Contact } from '../types/contact.types';

interface ContactTableProps {
  contacts: Contact[];
  onView: (contactId: string) => void;
  onEdit: (contactId: string) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  onView,
  onEdit,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-[1500px] w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>{['Contact ID', 'First Name', 'Last Name', 'Customer', 'Designation', 'Department', 'Email', 'Phone', 'Mobile', 'Contact Type', 'Owner', 'Status', 'Last Contacted Date', 'Created Date', 'Actions'].map((heading) => <th key={heading} className="whitespace-nowrap border-b border-slate-200 px-4 py-3 font-semibold">{heading}</th>)}</tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.contactId} className="text-slate-700 transition hover:bg-blue-50/40">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-blue-700">{contact.contactId}</td><td className="whitespace-nowrap px-4 py-3">{contact.firstName}</td><td className="whitespace-nowrap px-4 py-3">{contact.lastName}</td><td className="whitespace-nowrap px-4 py-3">{contact.customer}</td><td className="whitespace-nowrap px-4 py-3">{contact.designation}</td><td className="whitespace-nowrap px-4 py-3">{contact.department}</td><td className="whitespace-nowrap px-4 py-3">{contact.email}</td><td className="whitespace-nowrap px-4 py-3">{contact.phone}</td><td className="whitespace-nowrap px-4 py-3">{contact.mobile}</td><td className="whitespace-nowrap px-4 py-3">{contact.contactType}</td><td className="whitespace-nowrap px-4 py-3">{contact.owner}</td>
              <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${contact.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{contact.status}</span></td><td className="whitespace-nowrap px-4 py-3">{contact.lastContactedDate || '—'}</td><td className="whitespace-nowrap px-4 py-3">{contact.createdDate}</td>
              <td className="px-4 py-3"><div className="flex items-center gap-1"><button type="button" aria-label={`View ${contact.firstName} ${contact.lastName}`} title="View contact" onClick={() => onView(contact.contactId)} className="rounded-md p-2 text-slate-500 transition hover:bg-blue-100 hover:text-blue-700"><Eye className="size-4" /></button><button type="button" aria-label={`Edit ${contact.firstName} ${contact.lastName}`} title="Edit contact" onClick={() => onEdit(contact.contactId)} className="rounded-md p-2 text-slate-500 transition hover:bg-blue-100 hover:text-blue-700"><Pencil className="size-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;

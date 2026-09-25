
import React from 'react';
import type { Contact } from '../types/contact.types';

interface ContactProfileProps {
  contact: Contact;
}

const ContactProfile: React.FC<ContactProfileProps> = ({ contact }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-6 py-4"><h2 className="font-semibold text-slate-900">Contact information</h2></div>
      <dl className="grid gap-x-6 gap-y-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ['Contact ID', contact.contactId], ['First Name', contact.firstName], ['Last Name', contact.lastName], ['Customer', contact.customer], ['Designation', contact.designation], ['Department', contact.department], ['Email', contact.email], ['Phone', contact.phone], ['Mobile', contact.mobile], ['Contact Type', contact.contactType], ['Owner', contact.owner], ['Status', contact.status], ['Address', contact.address], ['City', contact.city], ['State', contact.state], ['Country', contact.country], ['Postal Code', contact.postalCode], ['LinkedIn', contact.linkedIn],
        ].map(([label, value]) => <div key={label}><dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 break-words text-sm text-slate-800">{value || '—'}</dd></div>)}
      </dl>
    </section>
  );
};

export default ContactProfile;

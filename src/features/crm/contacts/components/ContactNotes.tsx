
import React from 'react';

interface ContactNotesProps {
  notes: string;
}

const ContactNotes: React.FC<ContactNotesProps> = ({ notes }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-6 py-4"><h2 className="font-semibold text-slate-900">Notes</h2></div><div className="whitespace-pre-wrap p-6 text-sm leading-6 text-slate-600">{notes || 'No notes available.'}</div>
    </section>
  );
};

export default ContactNotes;

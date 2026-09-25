import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import ContactForm from '../forms/ContactForm';
import { useCreateContact } from '../hooks/contact.hooks';
import type { ContactFormValues } from '../schemas/contactFormSchema';

const CreateContactPage: React.FC = () => {
  const navigate = useNavigate();
  const createContact = useCreateContact();

  const handleSubmit = async (values: ContactFormValues) => {
    try {
      await createContact.mutateAsync(values);
      navigate('/crm/contacts');
    } catch {
      // Mutation error is handled by the page state below.
    }
  };

  const handleCancel = () => {
    navigate('/crm/contacts');
  };

  return (
    <PageContainer className="space-y-5 pb-8"><div><p className="text-sm font-medium text-blue-600">CRM / Contacts</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Create Contact</h1><p className="mt-1 text-sm text-slate-500">Add a new customer contact to the CRM.</p></div>
      {createContact.isError && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Contact could not be created. Please review the form and try again.</div>
      )}

      <ContactForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={createContact.isPending}
      />
    </PageContainer>
  );
};

export { CreateContactPage };
export default CreateContactPage;

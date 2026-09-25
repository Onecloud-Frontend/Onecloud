import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import ContactForm from '../forms/ContactForm';
import { useContact, useUpdateContact } from '../hooks/contact.hooks';
import type { ContactFormValues } from '../schemas/contactFormSchema';

const EditContactPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: contact,
    isLoading,
    isError,
  } = useContact(id);

  const updateContact = useUpdateContact();

  const handleSubmit = async (values: ContactFormValues) => {
    try {
      await updateContact.mutateAsync({
        contactId: id,
        input: values,
      });

      navigate(`/crm/contacts/${id}`);
    } catch {
      // Mutation error is handled by the page state below.
    }
  };

  const handleCancel = () => {
    navigate(`/crm/contacts/${id}`);
  };

  if (isLoading) {
    return <PageContainer className="pb-8"><div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading contact…</div></PageContainer>;
  }

  if (isError) {
    return <PageContainer className="pb-8"><div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Contact could not be loaded.</div></PageContainer>;
  }

  if (!contact) {
    return <PageContainer className="pb-8"><div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Contact not found.</div></PageContainer>;
  }

  const defaultValues: ContactFormValues = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    customer: contact.customer,
    designation: contact.designation,
    department: contact.department,
    email: contact.email,
    phone: contact.phone,
    mobile: contact.mobile,
    contactType: contact.contactType,
    owner: contact.owner,
    status: contact.status,
    dateOfBirth: contact.dateOfBirth,
    address: contact.address,
    city: contact.city,
    state: contact.state,
    country: contact.country,
    postalCode: contact.postalCode,
    linkedIn: contact.linkedIn,
    notes: contact.notes,
  };

  return (
    <PageContainer className="space-y-5 pb-8"><div><p className="text-sm font-medium text-blue-600">CRM / Contacts</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Edit Contact</h1><p className="mt-1 text-sm text-slate-500">Update {contact.firstName} {contact.lastName}'s contact information.</p></div>
      {updateContact.isError && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Contact could not be updated. Please try again.</div>
      )}

      <ContactForm
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={updateContact.isPending}
      />
    </PageContainer>
  );
};

export { EditContactPage };
export default EditContactPage;

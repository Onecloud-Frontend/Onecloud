import React from 'react';
import ContactSettingsForm from '../forms/ContactSettingsForm';
import {
  useContactSettings,
  useUpdateContactSettings,
} from '../hooks/useContactSettings';
import type { ContactSettingsFormValues } from '../schemas/contactSettings.schema';

const ContactSettings: React.FC = () => {
  const { data, isLoading, isError } = useContactSettings();
  const updateContactSettings = useUpdateContactSettings();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Loading contact settings...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        Contact settings could not be loaded. Please try again.
      </div>
    );
  }

  const handleSubmit = (values: ContactSettingsFormValues) => {
  updateContactSettings.mutate(values);
};

  return (
    <div className="space-y-4">
      {updateContactSettings.isError && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          Contact settings could not be saved. Please try again.
        </div>
      )}

      {updateContactSettings.isSuccess && (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
        >
          Contact settings saved successfully.
        </p>
      )}

      <ContactSettingsForm
        defaultValues={data}
        isSubmitting={updateContactSettings.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ContactSettings;

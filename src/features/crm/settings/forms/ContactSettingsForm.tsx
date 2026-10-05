import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactSettingsSchema,
  type ContactSettingsFormValues,
} from '../schemas/contactSettings.schema';
import { contactStatuses } from '../types/contactSettings.types';

interface ContactSettingsFormProps {
  defaultValues: ContactSettingsFormValues;
  isSubmitting?: boolean;
  onSubmit: (values: ContactSettingsFormValues) => void;
}

const ContactSettingsForm: React.FC<ContactSettingsFormProps> = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
}) => {
  const {
  register,
  handleSubmit,
  control,
  getValues,
  setValue,
  watch,
  formState: { errors },
} = useForm<ContactSettingsFormValues>({
  resolver: zodResolver(contactSettingsSchema),
  values: defaultValues,
  resetOptions: {
    keepDirtyValues: true,
  },
});

  const {
    fields: contactTypeFields,
    append: appendContactType,
    remove: removeContactTypeField,
  } = useFieldArray({
    control,
    name: 'contactTypes',
  });

  const { fields: requiredFieldFields } = useFieldArray({
    control,
    name: 'requiredFields',
  });

  const contactTypes = watch('contactTypes');

  const addContactType = () => {
    appendContactType({
      id: `contact-type-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: '',
      description: '',
      isActive: true,
    });
  };

  const removeContactType = (index: number) => {
    const currentTypes = getValues('contactTypes');
    const removedType = currentTypes[index];
    const remainingTypes = currentTypes.filter((_, itemIndex) => itemIndex !== index);

    if (removedType.name === getValues('defaults.contactType')) {
      const replacementType = remainingTypes.find(
        (contactType) => contactType.isActive
      );

      setValue('defaults.contactType', replacementType?.name ?? '', {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    removeContactTypeField(index);
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Contact Types
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure the available contact types.
            </p>
          </div>

          <button
            type="button"
            onClick={addContactType}
            disabled={isSubmitting}
            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add contact type
          </button>
        </div>

        <div className="space-y-4">
          {contactTypeFields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-4 rounded-lg border border-slate-200 p-4 md:grid-cols-2"
            >
              <input
                type="hidden"
                {...register(`contactTypes.${index}.id`)}
              />

              <div>
                <label
                  htmlFor={`contact-type-name-${field.id}`}
                  className="text-sm font-medium text-slate-700"
                >
                  Name
                </label>

                <input
                  id={`contact-type-name-${field.id}`}
                  {...register(`contactTypes.${index}.name`)}
                  aria-invalid={Boolean(errors.contactTypes?.[index]?.name)}
                  className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {errors.contactTypes?.[index]?.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.contactTypes[index]?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`contact-type-description-${field.id}`}
                  className="text-sm font-medium text-slate-700"
                >
                  Description
                </label>

                <input
                  id={`contact-type-description-${field.id}`}
                  {...register(`contactTypes.${index}.description`)}
                  className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="flex items-center justify-between gap-3 md:col-span-2">
                <label
                  htmlFor={`contact-type-active-${field.id}`}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    id={`contact-type-active-${field.id}`}
                    type="checkbox"
                    {...register(`contactTypes.${index}.isActive`)}
                  />
                  Active
                </label>

                <button
                  type="button"
                  onClick={() => removeContactType(index)}
                  disabled={isSubmitting || contactTypeFields.length === 1}
                  className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {errors.contactTypes?.message && (
          <p role="alert" className="mt-3 text-xs text-red-600">
            {errors.contactTypes.message}
          </p>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">
            Required Contact Fields
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure which contact fields are required.
          </p>
        </div>

        <div className="space-y-3">
          {requiredFieldFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
            >
              <div>
                <input
                  type="hidden"
                  {...register(`requiredFields.${index}.field`)}
                />

                <input
                  type="hidden"
                  {...register(`requiredFields.${index}.label`)}
                />

                <p className="text-sm font-medium text-slate-800">
                  {field.label}
                </p>
              </div>

              <label
                htmlFor={`required-field-${field.id}`}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <input
                  id={`required-field-${field.id}`}
                  type="checkbox"
                  {...register(`requiredFields.${index}.required`)}
                />
                Required
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">
            Contact Defaults
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure default values for new contacts.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="default-contact-type"
              className="text-sm font-medium text-slate-700"
            >
              Contact Type
            </label>

            <select
              id="default-contact-type"
              {...register('defaults.contactType')}
              aria-invalid={Boolean(errors.defaults?.contactType)}
              className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select a contact type</option>
              {contactTypes
                .filter((contactType) => contactType.isActive)
                .map((contactType) => (
                  <option key={contactType.id} value={contactType.name}>
                    {contactType.name || 'Untitled contact type'}
                  </option>
                ))}
            </select>

            {errors.defaults?.contactType && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.defaults.contactType.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="default-contact-owner"
              className="text-sm font-medium text-slate-700"
            >
              Owner
            </label>

            <input
              id="default-contact-owner"
              {...register('defaults.owner')}
              className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="default-contact-status"
              className="text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="default-contact-status"
              {...register('defaults.status')}
              className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {contactStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default ContactSettingsForm;

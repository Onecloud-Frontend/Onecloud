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
      id: `contact-type-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      name: '',
      description: '',
      isActive: true,
    });
  };

  const removeContactType = (index: number) => {
    const currentTypes = getValues('contactTypes');
    const removedType = currentTypes[index];

    const remainingTypes = currentTypes.filter(
      (_, itemIndex) => itemIndex !== index,
    );

    if (removedType.name === getValues('defaults.contactType')) {
      const replacementType = remainingTypes.find(
        (contactType) => contactType.isActive,
      );

      setValue('defaults.contactType', replacementType?.name ?? '', {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    removeContactTypeField(index);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-24">
      {/* ---------------------------------------------------------
          Contact Types
      --------------------------------------------------------- */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Contact Types
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Configure the available contact types for your CRM.
              </p>
            </div>

            <button
              type="button"
              onClick={addContactType}
              disabled={isSubmitting}
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="mr-1.5 text-base leading-none">+</span>
              Add contact type
            </button>
          </div>
        </div>

        <div className="bg-slate-50/40 p-5">
          <div className="grid gap-4 lg:grid-cols-2">
            {contactTypeFields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
              >
                <input
                  type="hidden"
                  {...register(`contactTypes.${index}.id`)}
                />

                {/* Card heading */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Contact type
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                      {field.name || 'Untitled contact type'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeContactType(index)}
                    disabled={
                      isSubmitting || contactTypeFields.length === 1
                    }
                    className="shrink-0 text-xs font-medium text-slate-400 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor={`contact-type-name-${field.id}`}
                      className="text-xs font-medium text-slate-600"
                    >
                      Name
                    </label>

                    <input
                      id={`contact-type-name-${field.id}`}
                      {...register(`contactTypes.${index}.name`)}
                      aria-invalid={Boolean(
                        errors.contactTypes?.[index]?.name,
                      )}
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                    {errors.contactTypes?.[index]?.name && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.contactTypes[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor={`contact-type-description-${field.id}`}
                      className="text-xs font-medium text-slate-600"
                    >
                      Description
                    </label>

                    <input
                      id={`contact-type-description-${field.id}`}
                      {...register(
                        `contactTypes.${index}.description`,
                      )}
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Active */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Active
                    </p>

                    <p className="text-xs text-slate-400">
                      Available for new contacts
                    </p>
                  </div>

                  <label
                    htmlFor={`contact-type-active-${field.id}`}
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      id={`contact-type-active-${field.id}`}
                      type="checkbox"
                      {...register(`contactTypes.${index}.isActive`)}
                      className="peer sr-only"
                    />

                    <span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-100" />

                    <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
                  </label>
                </div>
              </div>
            ))}
          </div>

          {errors.contactTypes?.message && (
            <p role="alert" className="mt-4 text-xs text-red-600">
              {errors.contactTypes.message}
            </p>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------
          Required Contact Fields
      --------------------------------------------------------- */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Required Contact Fields
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose the fields that must be completed when creating a
            contact.
          </p>
        </div>

        <div className="bg-slate-50/40 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {requiredFieldFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition hover:border-slate-300 hover:shadow-sm"
              >
                <div className="min-w-0 pr-4">
                  <input
                    type="hidden"
                    {...register(`requiredFields.${index}.field`)}
                  />

                  <input
                    type="hidden"
                    {...register(`requiredFields.${index}.label`)}
                  />

                  <p className="truncate text-sm font-medium text-slate-800">
                    {field.label}
                  </p>
                </div>

                <label
                  htmlFor={`required-field-${field.id}`}
                  className="relative inline-flex shrink-0 cursor-pointer items-center"
                >
                  <input
                    id={`required-field-${field.id}`}
                    type="checkbox"
                    {...register(
                      `requiredFields.${index}.required`,
                    )}
                    className="peer sr-only"
                  />

                  <span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-100" />

                  <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          Contact Defaults
      --------------------------------------------------------- */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Contact Defaults
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure the default values that will be applied to new
            contacts.
          </p>
        </div>

        <div className="p-5">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Contact Type */}
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
                aria-invalid={Boolean(
                  errors.defaults?.contactType,
                )}
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  Select a contact type
                </option>

                {contactTypes
                  .filter((contactType) => contactType.isActive)
                  .map((contactType) => (
                    <option
                      key={contactType.id}
                      value={contactType.name}
                    >
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

            {/* Owner */}
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
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
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
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {contactStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          Sticky Save Bar
      --------------------------------------------------------- */}
      <div className="sticky bottom-0 z-20 -mx-1 border-t border-slate-200 bg-white/95 px-1 py-3 backdrop-blur">
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactSettingsForm;
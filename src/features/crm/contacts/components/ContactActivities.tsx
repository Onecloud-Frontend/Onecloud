

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddContactActivity } from '../hooks/contact.hooks';
import type { ContactActivity } from '../types/contact.types';
import { contactActivitySchema, type ContactActivityFormValues } from '../schemas/contactActivitySchema';

interface ContactActivitiesProps {
  contactId: string;
  appointments: ContactActivity[];
  tasks: ContactActivity[];
}

type ActivityType = 'appointment' | 'task';

const ContactActivities: React.FC<ContactActivitiesProps> = ({
  contactId,
  appointments,
  tasks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const addActivity = useAddContactActivity();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactActivityFormValues>({
    resolver: zodResolver(contactActivitySchema),
    defaultValues: {
      title: '',
      date: '',
      type: 'appointment',
    },
  });

  const closeForm = () => {
    setIsOpen(false);
    reset();
  };

  const submit = (values: ContactActivityFormValues) => {
    addActivity.mutate(
      {
        contactId,
        type: values.type,
        title: values.title,
        date: values.date || '',
      },
      {
        onSuccess: () => {
          closeForm();
        },
        onError: () => {
          // Errors are handled by react-hook-form if validation fails,
          // but mutation errors can be handled here.
        },
      }
    );
  };

  const renderList = (items: ContactActivity[], emptyText: string) =>
    items.length === 0 ? (
      <p className="text-sm text-gray-500">{emptyText}</p>
    ) : (
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className="rounded-md border border-gray-200 p-3"
          >
            <div className="flex flex-col">
              <span className="font-medium text-slate-900">{item.title}</span>
              {item.date && (
                <span className="text-xs text-slate-500">{item.date}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    );

  return (
    <>
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Appointments & Tasks</h2>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            <Plus size={16} />
            Add Activity
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-medium">Appointments</h3>
            {renderList(appointments, 'No appointments found.')}
          </div>

          <div>
            <h3 className="mb-3 font-medium">Tasks</h3>
            {renderList(tasks, 'No tasks found.')}
          </div>
        </div>
      </section>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <form
            onSubmit={handleSubmit(submit)}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Add Activity</h2>
                <p className="text-sm text-gray-500">
                  Add an appointment or task for this contact.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  Activity type
                </span>
                <select
                  {...register('type')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  disabled={addActivity.isPending}
                >
                  <option value="appointment">Appointment</option>
                  <option value="task">Task</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">Title</span>
                <input
                  {...register('title')}
                  type="text"
                  placeholder="For example, Follow up on proposal"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  disabled={addActivity.isPending}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  Date <span className="font-normal text-gray-500">(optional)</span>
                </span>
                <input
                  {...register('date')}
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  disabled={addActivity.isPending}
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium"
                disabled={addActivity.isPending}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                disabled={addActivity.isPending}
              >
                {addActivity.isPending ? 'Adding...' : 'Add Activity'}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default ContactActivities;


import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useAddContactActivity } from '../hooks/contact.hooks';

interface ContactActivitiesProps {
  contactId: string;
  appointments: unknown[];
  tasks: unknown[];
}

type ActivityType = 'appointment' | 'task';

const getLabel = (item: unknown) => {
  if (typeof item === 'string') return item;

  if (item && typeof item === 'object') {
    const data = item as Record<string, unknown>;
    const label = data.title ?? data.subject ?? data.name;

    if (typeof label === 'string' && label.trim()) {
      return label;
    }
  }

  return JSON.stringify(item);
};

const ContactActivities: React.FC<ContactActivitiesProps> = ({
  contactId,
  appointments,
  tasks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<ActivityType>('appointment');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const addActivity = useAddContactActivity();

  const closeForm = () => {
    setIsOpen(false);
    setType('appointment');
    setTitle('');
    setDate('');
    setError('');
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError('Enter an activity title.');
      return;
    }

    addActivity.mutate(
      {
        contactId,
        type,
        title: cleanTitle,
        date,
      },
      {
        onSuccess: () => {
          closeForm();
        },
        onError: () => {
          setError('Unable to add activity.');
        },
      }
    );
  };

  const renderList = (items: unknown[], emptyText: string) =>
    items.length === 0 ? (
      <p className="text-sm text-gray-500">{emptyText}</p>
    ) : (
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={`${getLabel(item)}-${index}`}
            className="rounded-md border border-gray-200 p-3"
          >
            {getLabel(item)}
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
            onSubmit={submit}
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
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value as ActivityType)
                  }
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
                  type="text"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setError('');
                  }}
                  placeholder="For example, Follow up on proposal"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  disabled={addActivity.isPending}
                />
                {error ? (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  Date <span className="font-normal text-gray-500">(optional)</span>
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
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
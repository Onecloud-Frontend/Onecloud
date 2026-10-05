import { useState, type ReactNode } from 'react';

import {
  GripVertical,
  ListChecks,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Settings,
  Trash2,
} from 'lucide-react';

import { SettingsCard } from './LocalizationSettings';

const defaults = {
  crmName: 'OneCloud CRM',
  description:
    'Enterprise CRM for Sales, Customer and Business Management',
  email: 'info@onecloud.com',
  phoneCode: '+91',
  phone: '98765 43210',
  website: 'https://www.onecloud.com',
  currency: 'INR - Indian Rupee (₹)',
  country: 'India',
  timeZone: 'Asia/Kolkata (GMT+5:30)',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '12 Hour (AM/PM)',
  language: 'English',
  status: 'Active',
};

type Form = typeof defaults;

interface LeadStatus {
  id: number;
  name: string;
  code: string;
  description: string;
  color: string;
  active: boolean;
}

const dot: Record<string, string> = {
  Blue: 'bg-blue-500',
  Yellow: 'bg-yellow-400',
  Green: 'bg-green-500',
  Red: 'bg-red-500',
  Purple: 'bg-purple-500',
};

const initialStatuses: LeadStatus[] = [
  {
    id: 1,
    name: 'New',
    code: 'NEW',
    description: 'Newly created leads',
    color: 'Blue',
    active: true,
  },
  {
    id: 2,
    name: 'Contacted',
    code: 'CONTACTED',
    description: 'Initial contact made',
    color: 'Yellow',
    active: true,
  },
  {
    id: 3,
    name: 'Qualified',
    code: 'QUALIFIED',
    description: 'Qualified prospect',
    color: 'Green',
    active: true,
  },
  {
    id: 4,
    name: 'Unqualified',
    code: 'UNQUALIFIED',
    description: 'Not a potential customer',
    color: 'Red',
    active: true,
  },
  {
    id: 5,
    name: 'Converted',
    code: 'CONVERTED',
    description: 'Converted to opportunity',
    color: 'Purple',
    active: true,
  },
];

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate-700">
        {label}{' '}
        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      className={inputCls}
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    >
      {options.map((option) => (
        <option key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function GeneralSettings() {
  const [form, setForm] =
    useState<Form>(defaults);

  const [statuses, setStatuses] =
    useState<LeadStatus[]>(
      initialStatuses,
    );

  const [saved, setSaved] =
    useState(false);

  const [editingStatus, setEditingStatus] =
    useState<LeadStatus | null>(null);

  const set =
    (key: keyof Form) =>
    (value: string) => {
      setForm((current) => ({
        ...current,
        [key]: value,
      }));

      setSaved(false);
    };

  const text = (key: keyof Form) => ({
    className: inputCls,
    value: form[key],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => set(key)(e.target.value),
  });

  /* ============================
     GENERAL SETTINGS
     ============================ */

  const resetDefaults = () => {
    setForm(defaults);
    setSaved(false);
  };

  /* ============================
     LEAD STATUS
     ============================ */

  const addStatus = () => {
    const name = window.prompt(
      'Enter status name',
    );

    if (!name?.trim()) {
      return;
    }

    const newStatus: LeadStatus = {
      id: Date.now(),
      name: name.trim(),
      code: name
        .trim()
        .toUpperCase()
        .replace(/\s+/g, '_'),
      description: '',
      color: 'Blue',
      active: true,
    };

    setStatuses((current) => [
      ...current,
      newStatus,
    ]);
  };

  const deleteStatus = (id: number) => {
    setStatuses((current) =>
      current.filter(
        (status) => status.id !== id,
      ),
    );
  };

  const toggleStatus = (id: number) => {
    setStatuses((current) =>
      current.map((status) =>
        status.id === id
          ? {
              ...status,
              active: !status.active,
            }
          : status,
      ),
    );
  };

  const updateStatus = () => {
    if (!editingStatus) {
      return;
    }

    setStatuses((current) =>
      current.map((status) =>
        status.id === editingStatus.id
          ? editingStatus
          : status,
      ),
    );

    setEditingStatus(null);
  };

  return (
    <>
      {/* =================================
          GENERAL SETTINGS
          ================================= */}

      <SettingsCard
        icon={Settings}
        tile="bg-blue-50 text-blue-600"
        title="General Settings"
        subtitle="Configure your organization and CRM basic information"
        actions={
          <>
            <button
              type="button"
              onClick={resetDefaults}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw size={16} />

              Reset to Default
            </button>

            <button
              type="button"
              onClick={() =>
                setSaved(true)
              }
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Save size={16} />

              {saved
                ? 'Saved'
                : 'Save Changes'}
            </button>
          </>
        }
      >
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">
            Organization Information
          </h3>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            {/* CRM NAME */}

            <Field
              label="CRM Name"
              required
            >
              <input {...text('crmName')} />
            </Field>

            {/* CRM DESCRIPTION */}

            <Field label="CRM Description">
              <textarea
                rows={2}
                className={inputCls}
                value={form.description}
                onChange={(e) =>
                  set('description')(
                    e.target.value,
                  )
                }
              />
            </Field>

            {/* EMAIL */}

            <Field
              label="Organization Email"
              required
            >
              <input
                type="email"
                {...text('email')}
              />
            </Field>

            {/* PHONE */}

            <Field label="Organization Phone">
              <div className="flex gap-2">
                <select
                  className={`${inputCls} !w-28`}
                  value={form.phoneCode}
                  onChange={(e) =>
                    set('phoneCode')(
                      e.target.value,
                    )
                  }
                >
                  <option value="+91">
                    🇮🇳 +91
                  </option>

                  <option value="+1">
                    🇺🇸 +1
                  </option>

                  <option value="+44">
                    🇬🇧 +44
                  </option>

                  <option value="+971">
                    🇦🇪 +971
                  </option>
                </select>

                <input {...text('phone')} />
              </div>
            </Field>

            {/* WEBSITE */}

            <Field label="Website">
              <input {...text('website')} />
            </Field>

            {/* CURRENCY */}

            <Field label="Default Currency">
              <Select
                value={form.currency}
                onChange={set('currency')}
                options={[
                  'INR - Indian Rupee (₹)',
                  'USD - US Dollar ($)',
                  'EUR - Euro (€)',
                  'GBP - Pound Sterling (£)',
                ]}
              />
            </Field>

            {/* COUNTRY */}

            <Field label="Default Country">
              <Select
                value={form.country}
                onChange={set('country')}
                options={[
                  'India',
                  'United States',
                  'United Kingdom',
                  'United Arab Emirates',
                ]}
              />
            </Field>

            {/* TIMEZONE */}

            <Field label="Default Time Zone">
              <Select
                value={form.timeZone}
                onChange={set('timeZone')}
                options={[
                  'Asia/Kolkata (GMT+5:30)',
                  'UTC (GMT+0:00)',
                  'America/New_York (GMT-5:00)',
                  'Europe/London (GMT+0:00)',
                ]}
              />
            </Field>

            {/* DATE FORMAT */}

            <Field label="Date Format">
              <Select
                value={form.dateFormat}
                onChange={set('dateFormat')}
                options={[
                  'DD/MM/YYYY',
                  'MM/DD/YYYY',
                  'YYYY-MM-DD',
                ]}
              />
            </Field>

            {/* TIME FORMAT */}

            <Field label="Time Format">
              <Select
                value={form.timeFormat}
                onChange={set('timeFormat')}
                options={[
                  '12 Hour (AM/PM)',
                  '24 Hour',
                ]}
              />
            </Field>

            {/* LANGUAGE */}

            <Field label="Default Language">
              <Select
                value={form.language}
                onChange={set('language')}
                options={[
                  'English',
                  'Hindi',
                  'Tamil',
                  'Telugu',
                ]}
              />
            </Field>

            {/* CRM STATUS */}

            <Field label="CRM Status">
              <div className="relative">
                <select
                  className={`${inputCls} pl-9`}
                  value={form.status}
                  onChange={(e) =>
                    set('status')(
                      e.target.value,
                    )
                  }
                >
                  <option>
                    Active
                  </option>

                  <option>
                    Inactive
                  </option>
                </select>

                <span
                  className={`pointer-events-none absolute left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
                    form.status ===
                    'Active'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                />
              </div>
            </Field>
          </div>
        </div>
      </SettingsCard>

      {/* =================================
          LEAD STATUSES
          ================================= */}

      <SettingsCard
        icon={ListChecks}
        tile="bg-red-50 text-red-500"
        title="Lead Statuses"
        subtitle="Manage lead statuses used across the CRM"
        actions={
          <button
            type="button"
            onClick={addStatus}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={16} />

            Add Status
          </button>
        }
      >
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-700">
              <tr>
                <th className="w-16 px-3 py-3">
                  #
                </th>

                <th className="px-3 py-3">
                  Status Name
                </th>

                <th className="px-3 py-3">
                  Status Code
                </th>

                <th className="px-3 py-3">
                  Description
                </th>

                <th className="px-3 py-3">
                  Color
                </th>

                <th className="px-3 py-3">
                  Active
                </th>

                <th className="px-3 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {statuses.map(
                (status, index) => (
                  <tr
                    key={status.id}
                    className="border-t border-slate-100"
                  >
                    {/* NUMBER */}

                    <td className="px-3 py-3 text-slate-500">
                      <span className="flex items-center gap-2">
                        <GripVertical
                          size={14}
                          className="cursor-grab text-slate-400"
                        />

                        {index + 1}
                      </span>
                    </td>

                    {/* STATUS NAME */}

                    <td className="px-3 py-3 font-medium text-slate-900">
                      {status.name}
                    </td>

                    {/* STATUS CODE */}

                    <td className="px-3 py-3 text-slate-500">
                      {status.code}
                    </td>

                    {/* DESCRIPTION */}

                    <td className="px-3 py-3 text-slate-600">
                      {status.description ||
                        '-'}
                    </td>

                    {/* COLOR */}

                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1 text-xs">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            dot[
                              status.color
                            ] ??
                            'bg-slate-400'
                          }`}
                        />

                        {status.color}
                      </span>
                    </td>

                    {/* ACTIVE */}

                    <td className="px-3 py-3">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={
                          status.active
                        }
                        aria-label={`Toggle ${status.name}`}
                        onClick={() =>
                          toggleStatus(
                            status.id,
                          )
                        }
                        className={`relative h-5 w-10 rounded-full transition ${
                          status.active
                            ? 'bg-blue-600'
                            : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                            status.active
                              ? 'left-5'
                              : 'left-0.5'
                          }`}
                        />
                      </button>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          aria-label={`Edit ${status.name}`}
                          onClick={() =>
                            setEditingStatus({
                              ...status,
                            })
                          }
                          className="rounded-md border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-50"
                        >
                          <Pencil
                            size={14}
                          />
                        </button>

                        <button
                          type="button"
                          aria-label={`Delete ${status.name}`}
                          onClick={() =>
                            deleteStatus(
                              status.id,
                            )
                          }
                          className="rounded-md border border-red-100 bg-red-50 p-1.5 text-red-500 transition hover:bg-red-100"
                        >
                          <Trash2
                            size={14}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </SettingsCard>

      {/* =================================
          EDIT STATUS MODAL
          ================================= */}

      {editingStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Edit Lead Status
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Update the lead status information.
              </p>
            </div>

            <div className="space-y-4">
              <Field
                label="Status Name"
                required
              >
                <input
                  className={inputCls}
                  value={
                    editingStatus.name
                  }
                  onChange={(e) =>
                    setEditingStatus({
                      ...editingStatus,
                      name: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Status Code">
                <input
                  className={inputCls}
                  value={
                    editingStatus.code
                  }
                  onChange={(e) =>
                    setEditingStatus({
                      ...editingStatus,
                      code: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Description">
                <textarea
                  rows={3}
                  className={inputCls}
                  value={
                    editingStatus.description
                  }
                  onChange={(e) =>
                    setEditingStatus({
                      ...editingStatus,
                      description:
                        e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Color">
                <Select
                  value={
                    editingStatus.color
                  }
                  onChange={(value) =>
                    setEditingStatus({
                      ...editingStatus,
                      color: value,
                    })
                  }
                  options={[
                    'Blue',
                    'Yellow',
                    'Green',
                    'Red',
                    'Purple',
                  ]}
                />
              </Field>

              <Field label="Active">
                <button
                  type="button"
                  role="switch"
                  aria-checked={
                    editingStatus.active
                  }
                  onClick={() =>
                    setEditingStatus({
                      ...editingStatus,
                      active:
                        !editingStatus.active,
                    })
                  }
                  className={`relative h-5 w-10 rounded-full transition ${
                    editingStatus.active
                      ? 'bg-blue-600'
                      : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                      editingStatus.active
                        ? 'left-5'
                        : 'left-0.5'
                    }`}
                  />
                </button>
              </Field>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setEditingStatus(null)
                }
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={updateStatus}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
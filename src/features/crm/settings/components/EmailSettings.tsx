import { useState } from 'react';

type EmailPreference = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export default function EmailSettings() {
  const [preferences, setPreferences] = useState<EmailPreference[]>([
    {
      id: 'communication',
      title: 'Email Communication',
      description: 'Enable CRM email communication for users.',
      enabled: true,
    },
    {
      id: 'notifications',
      title: 'Email Notifications',
      description: 'Allow system notifications to be delivered by email.',
      enabled: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setPreferences((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, enabled: !item.enabled }
          : item,
      ),
    );
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Email Templates
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage email communication preferences used within the CRM.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-200">
          {preferences.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-6 px-6 py-5"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={item.enabled}
                aria-label={`Toggle ${item.title}`}
                onClick={() => handleToggle(item.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                  item.enabled ? 'bg-slate-900' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    item.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
type ConfigurationHistoryItem = {
  id: number;
  section: string;
  action: string;
  description: string;
  updatedBy: string;
  updatedAt: string;
};

const configurationHistory: ConfigurationHistoryItem[] = [
  {
    id: 1,
    section: 'Notifications',
    action: 'Updated',
    description: 'Notification preferences were updated.',
    updatedBy: 'Deepika Annadurai',
    updatedAt: 'Recently',
  },
  {
    id: 2,
    section: 'Email',
    action: 'Updated',
    description: 'Email configuration was updated.',
    updatedBy: 'Deepika Annadurai',
    updatedAt: 'Recently',
  },
  {
    id: 3,
    section: 'Display & Preferences',
    action: 'Updated',
    description: 'Display preferences were updated.',
    updatedBy: 'Deepika Annadurai',
    updatedAt: 'Recently',
  },
];

export default function ConfigurationHistory() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Configuration History
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Review changes made to CRM settings and preferences.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Section
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Updated By
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Updated At
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {configurationHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {item.section}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.updatedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {item.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
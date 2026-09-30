// OWNER: Sudharsan
import { useState, type ReactNode } from 'react';
import { GripVertical, ListChecks, Pencil, Plus, RotateCcw, Save, Settings, Trash2 } from 'lucide-react';
import { SettingsCard } from './LocalizationSettings';
const defaults = {
  crmName: 'OneCloud CRM',
  description: 'Enterprise CRM for Sales, Customer and Business Management',
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

interface LeadStatus { id: number; name: string; code: string; description: string; color: string; active: boolean }
const dot: Record<string, string> = {
  Blue: 'bg-blue-500', Yellow: 'bg-yellow-400', Green: 'bg-green-500', Red: 'bg-red-500', Purple: 'bg-purple-500',
};
const initialStatuses: LeadStatus[] = [
  { id: 1, name: 'New', code: 'NEW', description: 'Newly created leads', color: 'Blue', active: true },
  { id: 2, name: 'Contacted', code: 'CONTACTED', description: 'Initial contact made', color: 'Yellow', active: true },
  { id: 3, name: 'Qualified', code: 'QUALIFIED', description: 'Qualified prospect', color: 'Green', active: true },
  { id: 4, name: 'Unqualified', code: 'UNQUALIFIED', description: 'Not a potential customer', color: 'Red', active: true },
  { id: 5, name: 'Converted', code: 'CONVERTED', description: 'Converted to opportunity', color: 'Purple', active: true },
];

const inputCls = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500';

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function Select({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <select className={inputCls} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

export default function GeneralSettings() {
  const [form, setForm] = useState<Form>(defaults);
  const [statuses, setStatuses] = useState<LeadStatus[]>(initialStatuses);
  const [saved, setSaved] = useState(false);

  const set = (k: keyof Form) => (v: string) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false); };
  const text = (k: keyof Form) => ({ className: inputCls, value: form[k], onChange: (e: { target: { value: string } }) => set(k)(e.target.value) });

  const addStatus = () => {
    const name = window.prompt('Status name');
    if (!name) return;
    setStatuses((s) => [...s, { id: Date.now(), name, code: name.toUpperCase().replace(/\s+/g, '_'), description: '', color: 'Blue', active: true }]);
  };

  return (
    <>
      <SettingsCard
        icon={Settings} tile="bg-blue-50 text-blue-600"
        title="General Settings" subtitle="Configure your organization and CRM basic information"
        actions={
          <>
            <button onClick={() => { setForm(defaults); setSaved(false); }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">
              <RotateCcw size={16} /> Reset to Default
            </button>
            <button onClick={() => setSaved(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Save size={16} /> {saved ? 'Saved' : 'Save Changes'}
            </button>
          </>
        }
      >
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Organization Information</h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            <Field label="CRM Name" required><input {...text('crmName')} /></Field>
            <Field label="CRM Description">
              <textarea rows={2} className={inputCls} value={form.description} onChange={(e) => set('description')(e.target.value)} />
            </Field>
            <Field label="Organization Email" required><input type="email" {...text('email')} /></Field>
            <Field label="Organization Phone">
              <div className="flex gap-2">
                <select className={inputCls + ' !w-24'} value={form.phoneCode} onChange={(e) => set('phoneCode')(e.target.value)}>
                  <option>+91</option><option>+1</option><option>+44</option><option>+971</option>
                </select>
                <input {...text('phone')} />
              </div>
            </Field>
            <Field label="Website"><input {...text('website')} /></Field>
            <Field label="Default Currency">
              <Select value={form.currency} onChange={set('currency')} options={['INR - Indian Rupee (₹)', 'USD - US Dollar ($)', 'EUR - Euro (€)', 'GBP - Pound Sterling (£)']} />
            </Field>
            <Field label="Default Country">
              <Select value={form.country} onChange={set('country')} options={['India', 'United States', 'United Kingdom', 'United Arab Emirates']} />
            </Field>
            <Field label="Default Time Zone">
              <Select value={form.timeZone} onChange={set('timeZone')} options={['Asia/Kolkata (GMT+5:30)', 'UTC (GMT+0:00)', 'America/New_York (GMT-5:00)', 'Europe/London (GMT+0:00)']} />
            </Field>
            <Field label="Date Format">
              <Select value={form.dateFormat} onChange={set('dateFormat')} options={['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']} />
            </Field>
            <Field label="Time Format">
              <Select value={form.timeFormat} onChange={set('timeFormat')} options={['12 Hour (AM/PM)', '24 Hour']} />
            </Field>
            <Field label="Default Language">
              <Select value={form.language} onChange={set('language')} options={['English', 'Hindi', 'Tamil', 'Telugu']} />
            </Field>
            <Field label="CRM Status">
              <Select value={form.status} onChange={set('status')} options={['Active', 'Inactive']} />
            </Field>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={ListChecks} tile="bg-red-50 text-red-500"
        title="Lead Statuses" subtitle="Manage lead statuses used across the CRM"
        actions={
          <button onClick={addStatus}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus size={16} /> Add Status
          </button>
        }
      >
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-700">
              <tr>
                <th className="w-16 px-3 py-2.5">#</th><th className="px-3">Status Name</th><th className="px-3">Status Code</th>
                <th className="px-3">Description</th><th className="px-3">Color</th><th className="px-3">Active</th><th className="px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {statuses.map((s, i) => (
                <tr key={s.id} className="border-t border-slate-100">
                  <td className="px-3 py-3 text-slate-500">
                    <span className="flex items-center gap-2"><GripVertical size={14} />{i + 1}</span>
                  </td>
                  <td className="px-3 font-medium text-slate-900">{s.name}</td>
                  <td className="px-3 text-slate-500">{s.code}</td>
                  <td className="px-3 text-slate-600">{s.description}</td>
                  <td className="px-3">
                    <span className="inline-flex items-center gap-2 rounded-md bg-slate-50 px-2 py-0.5 text-xs">
                      <span className={'h-2.5 w-2.5 rounded-full ' + (dot[s.color] ?? 'bg-slate-400')} />{s.color}
                    </span>
                  </td>
                  <td className="px-3">
                    <button role="switch" aria-checked={s.active} aria-label={'Toggle ' + s.name}
                      onClick={() => setStatuses((l) => l.map((x) => (x.id === s.id ? { ...x, active: !x.active } : x)))}
                      className={'relative h-5 w-10 rounded-full transition ' + (s.active ? 'bg-blue-600' : 'bg-slate-300')}>
                      <span className={'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ' + (s.active ? 'left-5' : 'left-0.5')} />
                    </button>
                  </td>
                  <td className="px-3">
                    <span className="flex gap-2">
                      <button aria-label={'Edit ' + s.name} className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50"><Pencil size={14} /></button>
                      <button aria-label={'Delete ' + s.name} onClick={() => setStatuses((l) => l.filter((x) => x.id !== s.id))}
                        className="rounded-md border border-red-100 bg-red-50 p-1.5 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingsCard>
    </>
  );
}

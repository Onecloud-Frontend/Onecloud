import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useCrmOperationsSettings, useUpdateLeadManagementSettings } from '../hooks/useCrmOperationsSettings';
import { SettingsToggle } from './SettingsToggle';
import type { LeadSourceConfig, LeadStatusConfig } from '../types/crmOperationsSettings.types';

const generateId = (prefix: string): string => `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000)}`;

/** Lead Management settings: general options, lead statuses and lead sources. */
export const LeadSettings: React.FC = () => {
  const { data, isLoading, isError } = useCrmOperationsSettings();
  const updateMutation = useUpdateLeadManagementSettings();

  const [general, setGeneral] = useState(data?.leadManagement.general);
  const [statuses, setStatuses] = useState<LeadStatusConfig[]>(data?.leadManagement.statuses ?? []);
  const [sources, setSources] = useState<LeadSourceConfig[]>(data?.leadManagement.sources ?? []);
  const [loadedOnce, setLoadedOnce] = useState(false);

  // Seed local editable state once the settings arrive, without overwriting
  // in-progress edits on every background refetch.
  if (data && !loadedOnce) {
    setGeneral(data.leadManagement.general);
    setStatuses(data.leadManagement.statuses);
    setSources(data.leadManagement.sources);
    setLoadedOnce(true);
  }

  if (isLoading || !general) return <p className="text-sm text-slate-500">Loading lead settings...</p>;
  if (isError) return <p className="text-sm text-rose-600">Failed to load lead settings.</p>;

  const addStatus = () => {
    setStatuses((prev) => [
      ...prev,
      { id: generateId('st'), order: prev.length + 1, name: '', code: '', description: '', color: '#2f6bff', active: true },
    ]);
  };

  const updateStatus = (id: string, patch: Partial<LeadStatusConfig>) => {
    setStatuses((prev) => prev.map((status) => (status.id === id ? { ...status, ...patch } : status)));
  };

  const removeStatus = (id: string) => {
    setStatuses((prev) => prev.filter((status) => status.id !== id));
  };

  const addSource = () => {
    setSources((prev) => [...prev, { id: generateId('src'), order: prev.length + 1, name: '', code: '', active: true }]);
  };

  const updateSource = (id: string, patch: Partial<LeadSourceConfig>) => {
    setSources((prev) => prev.map((source) => (source.id === id ? { ...source, ...patch } : source)));
  };

  const removeSource = (id: string) => {
    setSources((prev) => prev.filter((source) => source.id !== id));
  };

  const handleSave = () => {
    updateMutation.mutate({ general, statuses, sources });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200/60 bg-white p-6">
        <h3 className="mb-4 text-sm font-bold text-[#0b1f4d]">General</h3>
        <div className="divide-y divide-slate-100">
          <SettingsToggle
            label="Auto-assign new leads"
            description="Automatically assign incoming leads to a sales owner using the current rotation."
            checked={general.autoAssignLeads}
            onChange={(autoAssignLeads) => setGeneral({ ...general, autoAssignLeads })}
          />
          <SettingsToggle
            label="Require phone on create"
            description="Phone number becomes a mandatory field on the Create Lead form."
            checked={general.requirePhoneOnCreate}
            onChange={(requirePhoneOnCreate) => setGeneral({ ...general, requirePhoneOnCreate })}
          />
          <SettingsToggle
            label="Require email on create"
            description="Email becomes a mandatory field on the Create Lead form."
            checked={general.requireEmailOnCreate}
            onChange={(requireEmailOnCreate) => setGeneral({ ...general, requireEmailOnCreate })}
          />
          <SettingsToggle
            label="Duplicate detection"
            description="Warn when a new lead matches an existing email or phone number."
            checked={general.duplicateDetectionEnabled}
            onChange={(duplicateDetectionEnabled) => setGeneral({ ...general, duplicateDetectionEnabled })}
          />
        </div>
        <label className="mt-4 flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-slate-700">Stale lead threshold (days)</span>
          <Input
            type="number"
            min={1}
            value={general.staleLeadThresholdDays}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneral({ ...general, staleLeadThresholdDays: Number(e.target.value) })}
            className="w-24"
          />
        </label>
      </section>

      <section className="rounded-xl border border-slate-200/60 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0b1f4d]">Lead Statuses</h3>
          <Button type="button" size="sm" variant="outline" onClick={addStatus}>
            <Plus className="h-4 w-4" />
            Add Status
          </Button>
        </div>
        <div className="space-y-2">
          {statuses.map((status) => (
            <div key={status.id} className="grid grid-cols-[1fr_1fr_2fr_auto_auto_auto] items-center gap-2">
              <Input
                value={status.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStatus(status.id, { name: e.target.value })}
                placeholder="Name"
              />
              <Input
                value={status.code}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStatus(status.id, { code: e.target.value.toUpperCase() })}
                placeholder="CODE"
              />
              <Input
                value={status.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStatus(status.id, { description: e.target.value })}
                placeholder="Description"
              />
              <input
                type="color"
                value={status.color}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStatus(status.id, { color: e.target.value })}
                className="h-9 w-9 cursor-pointer rounded border border-slate-200"
                aria-label={`Color for ${status.name || 'status'}`}
              />
              <SettingsToggle
                label=""
                checked={status.active}
                onChange={(active) => updateStatus(status.id, { active })}
              />
              <Button type="button" size="icon-sm" variant="ghost" onClick={() => removeStatus(status.id)} aria-label="Remove status">
                <Trash2 className="h-4 w-4 text-rose-500" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/60 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0b1f4d]">Lead Sources</h3>
          <Button type="button" size="sm" variant="outline" onClick={addSource}>
            <Plus className="h-4 w-4" />
            Add Source
          </Button>
        </div>
        <div className="space-y-2">
          {sources.map((source) => (
            <div key={source.id} className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-2">
              <Input
                value={source.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSource(source.id, { name: e.target.value })}
                placeholder="Name"
              />
              <Input
                value={source.code}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSource(source.id, { code: e.target.value.toUpperCase() })}
                placeholder="CODE"
              />
              <SettingsToggle
                label=""
                checked={source.active}
                onChange={(active) => updateSource(source.id, { active })}
              />
              <Button type="button" size="icon-sm" variant="ghost" onClick={() => removeSource(source.id)} aria-label="Remove source">
                <Trash2 className="h-4 w-4 text-rose-500" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="button" onClick={handleSave} disabled={updateMutation.isPending}>
          <Save className="h-4 w-4" />
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

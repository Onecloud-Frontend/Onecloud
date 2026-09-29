import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useCrmOperationsSettings, useUpdateNumberingSettings } from '../hooks/useCrmOperationsSettings';
import { SettingsToggle } from './SettingsToggle';
import type { NumberingSequence } from '../types/crmOperationsSettings.types';

/** Renders the next document number a sequence will issue, e.g. "QT-0011". */
const previewNumber = (sequence: NumberingSequence): string =>
  `${sequence.prefix}-${String(sequence.nextNumber).padStart(sequence.padding, '0')}`;

/** Numbering & Sequences settings: prefix, padding and next number per document type. */
export const NumberingSettings: React.FC = () => {
  const { data, isLoading, isError } = useCrmOperationsSettings();
  const updateMutation = useUpdateNumberingSettings();

  const [sequences, setSequences] = useState<NumberingSequence[]>(data?.numbering.sequences ?? []);
  const [loadedOnce, setLoadedOnce] = useState(false);

  if (data && !loadedOnce) {
    setSequences(data.numbering.sequences);
    setLoadedOnce(true);
  }

  if (isLoading) return <p className="text-sm text-slate-500">Loading numbering settings...</p>;
  if (isError) return <p className="text-sm text-rose-600">Failed to load numbering settings.</p>;

  const updateSequence = (id: string, patch: Partial<NumberingSequence>) => {
    setSequences((prev) => prev.map((sequence) => (sequence.id === id ? { ...sequence, ...patch } : sequence)));
  };

  const handleSave = () => {
    updateMutation.mutate({ sequences });
  };

  return (
    <div className="space-y-6">
      {sequences.map((sequence) => (
        <section key={sequence.id} className="rounded-xl border border-slate-200/60 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0b1f4d]">{sequence.entityLabel}</h3>
            <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
              Next: {previewNumber(sequence)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prefix</span>
              <Input
                value={sequence.prefix}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSequence(sequence.id, { prefix: e.target.value.toUpperCase() })
                }
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Padding</span>
              <Input
                type="number"
                min={1}
                max={8}
                value={sequence.padding}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSequence(sequence.id, { padding: Number(e.target.value) })
                }
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next Number</span>
              <Input
                type="number"
                min={1}
                value={sequence.nextNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSequence(sequence.id, { nextNumber: Number(e.target.value) })
                }
              />
            </label>
            <div className="flex items-end">
              <SettingsToggle
                label="Reset yearly"
                checked={sequence.resetYearly}
                onChange={(resetYearly) => updateSequence(sequence.id, { resetYearly })}
              />
            </div>
          </div>
        </section>
      ))}

      <div className="flex justify-end">
        <Button type="button" onClick={handleSave} disabled={updateMutation.isPending}>
          <Save className="h-4 w-4" />
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

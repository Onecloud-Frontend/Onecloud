import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useCrmOperationsSettings, useUpdateLeadScoringSettings } from '../hooks/useCrmOperationsSettings';
import { SettingsToggle } from './SettingsToggle';
import type { LeadScoreBand, LeadScoringCriterion, LeadScoringRule } from '../types/crmOperationsSettings.types';

const CRITERION_OPTIONS: { value: LeadScoringCriterion; label: string }[] = [
  { value: 'source', label: 'Lead Source' },
  { value: 'jobTitle', label: 'Job Title' },
  { value: 'companySize', label: 'Company Size' },
  { value: 'emailEngagement', label: 'Email Engagement' },
  { value: 'websiteVisits', label: 'Website Visits' },
  { value: 'formSubmission', label: 'Form Submission' },
];

const generateId = (prefix: string): string => `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000)}`;

/** Lead Scoring settings: scoring rules and the score bands they roll up into. */
export const LeadScoringSettings: React.FC = () => {
  const { data, isLoading, isError } = useCrmOperationsSettings();
  const updateMutation = useUpdateLeadScoringSettings();

  const [enabled, setEnabled] = useState(data?.leadScoring.enabled ?? false);
  const [rules, setRules] = useState<LeadScoringRule[]>(data?.leadScoring.rules ?? []);
  const [bands, setBands] = useState<LeadScoreBand[]>(data?.leadScoring.bands ?? []);
  const [loadedOnce, setLoadedOnce] = useState(false);

  if (data && !loadedOnce) {
    setEnabled(data.leadScoring.enabled);
    setRules(data.leadScoring.rules);
    setBands(data.leadScoring.bands);
    setLoadedOnce(true);
  }

  if (isLoading) return <p className="text-sm text-slate-500">Loading lead scoring settings...</p>;
  if (isError) return <p className="text-sm text-rose-600">Failed to load lead scoring settings.</p>;

  const addRule = () => {
    setRules((prev) => [
      ...prev,
      { id: generateId('rule'), criterion: 'source', label: '', points: 0, active: true },
    ]);
  };

  const updateRule = (id: string, patch: Partial<LeadScoringRule>) => {
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)));
  };

  const removeRule = (id: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== id));
  };

  const updateBand = (id: string, patch: Partial<LeadScoreBand>) => {
    setBands((prev) => prev.map((band) => (band.id === id ? { ...band, ...patch } : band)));
  };

  const handleSave = () => {
    updateMutation.mutate({ enabled, rules, bands });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200/60 bg-white p-6">
        <SettingsToggle
          label="Enable lead scoring"
          description="Calculate a score for each lead based on the rules below."
          checked={enabled}
          onChange={setEnabled}
        />
      </section>

      <section className="rounded-xl border border-slate-200/60 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0b1f4d]">Scoring Rules</h3>
          <Button type="button" size="sm" variant="outline" onClick={addRule}>
            <Plus className="h-4 w-4" />
            Add Rule
          </Button>
        </div>
        <div className="space-y-2">
          {rules.map((rule) => (
            <div key={rule.id} className="grid grid-cols-[1fr_2fr_100px_auto_auto] items-center gap-2">
              <select
                value={rule.criterion}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  updateRule(rule.id, { criterion: e.target.value as LeadScoringCriterion })
                }
                className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-700"
              >
                {CRITERION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Input
                value={rule.label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRule(rule.id, { label: e.target.value })}
                placeholder="Condition description"
              />
              <Input
                type="number"
                value={rule.points}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRule(rule.id, { points: Number(e.target.value) })}
              />
              <SettingsToggle label="" checked={rule.active} onChange={(active) => updateRule(rule.id, { active })} />
              <Button type="button" size="icon-sm" variant="ghost" onClick={() => removeRule(rule.id)} aria-label="Remove rule">
                <Trash2 className="h-4 w-4 text-rose-500" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/60 bg-white p-6">
        <h3 className="mb-4 text-sm font-bold text-[#0b1f4d]">Score Bands</h3>
        <p className="mb-4 text-xs text-slate-500">
          The label shown for a lead depends on which band its total score falls into.
        </p>
        <div className="space-y-2">
          {bands.map((band) => (
            <div key={band.id} className="grid grid-cols-[1fr_100px_100px_auto] items-center gap-2">
              <Input value={band.label} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBand(band.id, { label: e.target.value })} />
              <Input
                type="number"
                value={band.minScore}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBand(band.id, { minScore: Number(e.target.value) })}
              />
              <Input
                type="number"
                value={band.maxScore}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBand(band.id, { maxScore: Number(e.target.value) })}
              />
              <input
                type="color"
                value={band.color}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBand(band.id, { color: e.target.value })}
                className="h-9 w-9 cursor-pointer rounded border border-slate-200"
                aria-label={`Color for ${band.label || 'band'}`}
              />
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

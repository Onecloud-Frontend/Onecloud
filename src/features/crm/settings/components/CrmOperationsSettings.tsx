import React, { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { LeadSettings } from './LeadSettings';
import { LeadScoringSettings } from './LeadScoringSettings';
import { NumberingSettings } from './NumberingSettings';

type CrmOperationsTab = 'leads' | 'scoring' | 'numbering';

const TABS: { id: CrmOperationsTab; label: string }[] = [
  { id: 'leads', label: 'Lead Management' },
  { id: 'scoring', label: 'Lead Scoring' },
  { id: 'numbering', label: 'Numbering & Sequences' },
];

/**
 * CRM Operations settings entry point. Combines the three owned areas (lead
 * management, lead scoring, numbering & sequences) behind an internal tab
 * strip so the settings sidebar only needs a single 'crm-operations' entry.
 */
export const CrmOperationsSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CrmOperationsTab>('leads');

  return (
    <div>
      <div className="mb-6 flex gap-1 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'border-b-2 px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'leads' && <LeadSettings />}
      {activeTab === 'scoring' && <LeadScoringSettings />}
      {activeTab === 'numbering' && <NumberingSettings />}
    </div>
  );
};

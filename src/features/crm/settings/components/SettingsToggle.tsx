import React from 'react';
import { cn } from '@/shared/utils/cn';

interface SettingsToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

/** Labeled on/off switch used across the settings forms for boolean options. */
export const SettingsToggle: React.FC<SettingsToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}) => (
  <label className="flex items-start justify-between gap-4 py-2">
    <span className="flex flex-col">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {description && <span className="text-xs text-slate-500">{description}</span>}
    </span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-50',
        checked ? 'bg-blue-600' : 'bg-slate-200',
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1',
        )}
      />
    </button>
  </label>
);

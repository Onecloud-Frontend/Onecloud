import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  icon: LucideIcon;
  tile: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export function SettingsCard({
  icon: Icon,
  tile,
  title,
  subtitle,
  actions,
  children,
}: SettingsCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${tile}`}
          >
            <Icon size={20} />
          </span>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {title}
            </h2>

            <p className="text-sm text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </section>
  );
}
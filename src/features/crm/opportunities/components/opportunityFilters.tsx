import {
  OPPORTUNITY_STAGES,
  OPPORTUNITY_STATUSES,
} from "../mocks/opportunityConstants";

interface OpportunityFiltersProps {
  search: string;
  stage: string;
  status: string;
  owner: string;
  probability: string;
  closeDateFrom: string;
  closeDateTo: string;

  onSearchChange: (value: string) => void;
  onStageChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onOwnerChange: (value: string) => void;
  onProbabilityChange: (value: string) => void;
  onCloseDateFromChange: (value: string) => void;
  onCloseDateToChange: (value: string) => void;
  onReset: () => void;
}

export function OpportunityFilters({
  search,
  stage,
  status,
  owner,
  probability,
  closeDateFrom,
  closeDateTo,
  onSearchChange,
  onStageChange,
  onStatusChange,
  onOwnerChange,
  onProbabilityChange,
  onCloseDateFromChange,
  onCloseDateToChange,
  onReset,
}: OpportunityFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Search */}
        <div className="xl:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Search
          </label>

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by ID, name, customer or contact..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Stage */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Stage
          </label>

          <select
            value={stage}
            onChange={(event) => onStageChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All stages</option>

            {OPPORTUNITY_STAGES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All statuses</option>

            {OPPORTUNITY_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Owner */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Owner
          </label>

          <input
            value={owner}
            onChange={(event) => onOwnerChange(event.target.value)}
            placeholder="Owner name"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Probability */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Probability
          </label>

          <select
            value={probability}
            onChange={(event) =>
              onProbabilityChange(event.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All probabilities</option>
            <option value="0-25">0% - 25%</option>
            <option value="26-50">26% - 50%</option>
            <option value="51-75">51% - 75%</option>
            <option value="76-100">76% - 100%</option>
          </select>
        </div>

        {/* Close Date From */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Close Date From
          </label>

          <input
            type="date"
            value={closeDateFrom}
            onChange={(event) =>
              onCloseDateFromChange(event.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Close Date To */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Close Date To
          </label>

          <input
            type="date"
            value={closeDateTo}
            onChange={(event) =>
              onCloseDateToChange(event.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
import {OPPORTUNITY_STAGES,} from "../mocks/opportunityConstants";

interface OpportunityFiltersProps {
  search: string;
  stage: string;
  owner: string;
  probability: string;
  closeDateFrom: string;
  closeDateTo: string;

  onSearchChange: (value: string) => void;
  onStageChange: (value: string) => void;
  onOwnerChange: (value: string) => void;
  onProbabilityChange: (value: string) => void;
  onCloseDateFromChange: (value: string) => void;
  onCloseDateToChange: (value: string) => void;
  onReset: () => void;
}

export function OpportunityFilters({
  search,
  stage,
  owner,
  probability,
  closeDateFrom,
  closeDateTo,
  onSearchChange,
  onStageChange,
  onOwnerChange,
  onProbabilityChange,
  onCloseDateFromChange,
  onCloseDateToChange,
  onReset,
}: OpportunityFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="xl:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Search
          </label>

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search by ID, code or opportunity name..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Stage
          </label>

          <select
            value={stage}
            onChange={(e) =>
              onStageChange(e.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">
              All stages
            </option>

            {OPPORTUNITY_STAGES.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ),
            )}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Owner
          </label>

          <input
            value={owner}
            onChange={(e) =>
              onOwnerChange(e.target.value)
            }
            placeholder="Owner name or ID"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Probability
          </label>

          <select
            value={probability}
            onChange={(e) =>
              onProbabilityChange(e.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">
              All probabilities
            </option>
            <option value="0-25">
              0% - 25%
            </option>
            <option value="26-50">
              26% - 50%
            </option>
            <option value="51-75">
              51% - 75%
            </option>
            <option value="76-100">
              76% - 100%
            </option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Close Date From
          </label>

          <input
            type="date"
            value={closeDateFrom}
            onChange={(e) =>
              onCloseDateFromChange(
                e.target.value,
              )
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Close Date To
          </label>

          <input
            type="date"
            value={closeDateTo}
            onChange={(e) =>
              onCloseDateToChange(
                e.target.value,
              )
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
import { Link, useParams } from "react-router-dom";

import PipelineOpportunityTimeline from "../components/PipelineOpportunityTimeline";

import {
  usePipelineOpportunity,
  useUpdatePipelineOwner,
  useUpdatePipelineStage,
} from "../hooks/useSalesPipeline";

import { pipelineStages } from "../mocks/pipelineMockData";

export function PipelineOpportunityDetailsPage() {
  const { id = "" } = useParams();

  const { data: opportunity, isLoading, isError } = usePipelineOpportunity(id);

  const updateStage = useUpdatePipelineStage();

  const updateOwner = useUpdatePipelineOwner();

  if (isLoading) {
    return <div className="p-6">Loading opportunity...</div>;
  }

  if (isError || !opportunity) {
    return (
      <div className="p-6">
        <p className="text-red-600">Opportunity not found.</p>

        <Link
          to="/crm/pipeline"
          className="mt-4 inline-block text-sm font-medium underline"
        >
          Back to Pipeline
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Link
        to="/crm/pipeline"
        className="text-sm font-medium text-gray-600 hover:underline"
      >
        ← Back to Pipeline
      </Link>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-gray-500">{opportunity.id}</p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              {opportunity.name}
            </h1>

            <p className="mt-1 text-gray-500">{opportunity.customer}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="pipeline-stage-update"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Stage
              </label>

              <select
                id="pipeline-stage-update"
                value={opportunity.stage}
                onChange={(event) =>
                  updateStage.mutate({
                    id: opportunity.id,
                    stage: event.target.value as typeof opportunity.stage,
                  })
                }
                className="rounded-md border px-3 py-2 text-sm"
              >
                {pipelineStages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="pipeline-owner-update"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Owner
              </label>

              <select
                id="pipeline-owner-update"
                value={opportunity.owner}
                onChange={(event) =>
                  updateOwner.mutate({
                    id: opportunity.id,
                    owner: event.target.value,
                  })
                }
                className="rounded-md border px-3 py-2 text-sm"
              >
                <option value="kakarla pavan kumar reddy">
                  kakarla pavan kumar reddy
                </option>

                <option value="Sales Team">Sales Team</option>

                <option value="Sales Manager">Sales Manager</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InfoCard label="Customer" value={opportunity.customer} />

        <InfoCard label="Contact" value={opportunity.contact} />

        <InfoCard label="Owner" value={opportunity.owner} />

        <InfoCard
          label="Current Stage"
          value={
            pipelineStages.find((stage) => stage.id === opportunity.stage)
              ?.label || opportunity.stage
          }
        />

        <InfoCard
          label="Expected Revenue"
          value={`${opportunity.currency} ${opportunity.expectedRevenue.toLocaleString()}`}
        />

        <InfoCard label="Probability" value={`${opportunity.probability}%`} />

        <InfoCard
          label="Expected Close Date"
          value={opportunity.expectedCloseDate}
        />

        <InfoCard label="Competitor" value={opportunity.competitor || "—"} />

        <InfoCard
          label="Days in Stage"
          value={String(opportunity.daysInStage)}
        />

        <InfoCard
          label="Last Activity"
          value={opportunity.lastActivityDate || "—"}
        />

        <InfoCard
          label="Next Activity"
          value={opportunity.nextActivityDate || "—"}
        />

        <InfoCard label="Source" value={opportunity.source || "—"} />
      </div>

      <PipelineOpportunityTimeline
        items={opportunity.activities.map((activity) => {
          const activityType =
            (activity as { type?: string }).type || "Activity";

          return {
            id: activity.id,
            title: activityType,
            description: activity.description,
            date:
              (activity as { date?: string }).date ||
              opportunity.lastActivityDate ||
              "—",
            type: activityType,
          };
        })}
      />

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Stage History</h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3">Stage</th>

                <th className="px-4 py-3">Entered At</th>

                <th className="px-4 py-3">Exited At</th>

                <th className="px-4 py-3">Days</th>
              </tr>
            </thead>

            <tbody>
              {opportunity.stageHistory.map((historyItem, index) => {
                const stageLabel =
                  pipelineStages.find((stage) => stage.id === historyItem.stage)
                    ?.label || historyItem.stage;

                return (
                  <tr
                    key={`${historyItem.stage}-${index}`}
                    className="border-b last:border-b-0"
                  >
                    <td className="px-4 py-3 font-medium">{stageLabel}</td>

                    <td className="px-4 py-3">{historyItem.enteredAt}</td>

                    <td className="px-4 py-3">
                      {historyItem.exitedAt || "Current"}
                    </td>

                    <td className="px-4 py-3">{historyItem.daysInStage}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Notes</h2>

        <p className="mt-2 text-sm text-gray-600">
          {opportunity.notes || "No notes available."}
        </p>
      </div>

      {updateStage.isPending && (
        <p className="text-sm text-gray-500">Updating stage...</p>
      )}

      {updateOwner.isPending && (
        <p className="text-sm text-gray-500">Updating owner...</p>
      )}

      {(updateStage.isError || updateOwner.isError) && (
        <p className="text-sm text-red-600">Failed to update opportunity.</p>
      )}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-2 font-semibold text-gray-900">{value}</p>
    </div>
  );
}

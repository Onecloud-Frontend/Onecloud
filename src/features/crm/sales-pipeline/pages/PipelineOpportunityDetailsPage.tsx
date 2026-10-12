import { Link, useParams } from "react-router-dom";

import {
  getPipelineStageLabel,
  pipelineStages,
} from "../config/pipelineStages";

import {
  usePipelineOpportunity,
  useUpdatePipelineStage,
} from "../hooks/useSalesPipeline";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function PipelineOpportunityDetailsPage() {
  const { id = "" } = useParams();

  const { data: opportunity, isLoading, isError } = usePipelineOpportunity(id);

  const updateStage = useUpdatePipelineStage();

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
            <p className="text-sm text-gray-500">
              {opportunity.opportunityCode}
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              {opportunity.name}
            </h1>

            <p className="mt-2 text-gray-500">
              Customer: {opportunity.customerId}
            </p>
          </div>

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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <InfoCard label="Opportunity ID" value={opportunity.id} />

        <InfoCard label="Customer ID" value={opportunity.customerId} />

        <InfoCard label="Contact ID" value={opportunity.contactId ?? "—"} />

        <InfoCard label="Lead ID" value={opportunity.leadId ?? "—"} />

        <InfoCard
          label="Current Stage"
          value={getPipelineStageLabel(opportunity.stage)}
        />

        <InfoCard label="Amount" value={formatCurrency(opportunity.amount)} />

        <InfoCard
          label="Expected Revenue"
          value={formatCurrency(opportunity.expectedRevenue)}
        />

        <InfoCard label="Probability" value={`${opportunity.probability}%`} />

        <InfoCard
          label="Expected Close Date"
          value={opportunity.expectedCloseDate}
        />

        <InfoCard label="Assigned To" value={opportunity.assignedTo} />

        <InfoCard
          label="Competitors"
          value={opportunity.competitors?.join(", ") ?? "—"}
        />

        <InfoCard label="Updated At" value={opportunity.updatedAt} />
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Description</h2>

        <p className="mt-2 text-sm text-gray-600">
          {opportunity.description || "No description available."}
        </p>
      </div>

      {updateStage.isPending && (
        <p className="text-sm text-gray-500">Updating stage...</p>
      )}

      {updateStage.isError && (
        <p className="text-sm text-red-600">
          Failed to update opportunity stage.
        </p>
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

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OpportunityStatusBadge } from "../components/OpportunityStatusBadge";
import {
  useOpportunity,
  useUpdateOpportunity,
} from "../hooks/useOpportunities";
import { OPPORTUNITY_STAGES } from "../mocks/opportunityConstants";

export function OpportunityDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: opportunity,
    isLoading,
    isError,
  } = useOpportunity(id ?? "");

  const updateMutation = useUpdateOpportunity();

  const [showStageEditor, setShowStageEditor] = useState(false);
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedProbability, setSelectedProbability] = useState(0);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading opportunity...</p>
      </main>
    );
  }

  if (isError || !opportunity) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-xl font-semibold text-red-700">
            Opportunity Not Found
          </h1>

          <p className="mt-2 text-sm text-red-600">
            The requested opportunity does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/crm/opportunities")}
            className="mt-4 inline-flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
          >
            <span className="text-xl leading-none">←</span>
            <span>Back to Opportunities</span>
          </button>
        </div>
      </main>
    );
  }

  const formatCurrency = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${currency} ${amount.toLocaleString("en-IN")}`;
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date?: string) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openStageEditor = () => {
    setSelectedStage(opportunity.stage);
    setSelectedProbability(opportunity.probability);
    setShowStageEditor(true);
  };

  const handleStageUpdate = async () => {
    try {
      await updateMutation.mutateAsync({
        id: opportunity.id,
        values: {
          stage: selectedStage,
          probability: selectedProbability,
          status:
            selectedStage === "Closed Won"
              ? "Won"
              : selectedStage === "Closed Lost"
                ? "Lost"
                : "Open",
          lastActivityDate: new Date().toISOString(),
        },
      });

      setShowStageEditor(false);
    } catch (error) {
      console.error("Failed to update opportunity:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          {/* Back Button - left aligned */}
          <div className="mb-6 flex w-full justify-start">
            <button
              type="button"
              onClick={() => navigate("/crm/opportunities")}
              className="inline-flex w-fit items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
            >
              <span className="text-xl leading-none">←</span>
              <span>Back to Opportunities</span>
            </button>
          </div>

          {/* Title and Actions */}
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm text-gray-500">
                CRM / Opportunities / Details
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                {opportunity.name}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Opportunity ID: {opportunity.id}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={openStageEditor}
                className="rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Update Stage
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(`/crm/opportunities/${opportunity.id}/edit`)
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Edit Opportunity
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <SummaryCard
            title="Expected Revenue"
            value={formatCurrency(
              opportunity.expectedRevenue,
              opportunity.currency
            )}
          />

          <SummaryCard
            title="Probability"
            value={`${opportunity.probability}%`}
          />

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Status</p>

            <div className="mt-3">
              <OpportunityStatusBadge status={opportunity.status} />
            </div>
          </div>
        </div>

        {/* Stage Update Panel */}
        {showStageEditor && (
          <section className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Update Opportunity Stage
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Stage
                </label>

                <select
                  value={selectedStage}
                  onChange={(event) => setSelectedStage(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                >
                  {OPPORTUNITY_STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Probability (%)
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={selectedProbability}
                  onChange={(event) =>
                    setSelectedProbability(Number(event.target.value))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleStageUpdate}
                disabled={
                  updateMutation.isPending ||
                  selectedProbability < 0 ||
                  selectedProbability > 100
                }
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updateMutation.isPending ? "Updating..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => setShowStageEditor(false)}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>

            {updateMutation.isError && (
              <p className="mt-3 text-sm text-red-600">
                Failed to update opportunity. Please try again.
              </p>
            )}
          </section>
        )}

        {/* Opportunity Information */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            Opportunity Information
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Opportunity Name" value={opportunity.name} />

            <DetailItem
              label="Customer"
              value={opportunity.customerName}
            />

            <DetailItem
              label="Contact"
              value={opportunity.contactName || "Not specified"}
            />

            <DetailItem label="Owner" value={opportunity.ownerName} />

            <DetailItem label="Stage" value={opportunity.stage} />

            <DetailItem
              label="Expected Revenue"
              value={formatCurrency(
                opportunity.expectedRevenue,
                opportunity.currency
              )}
            />

            <DetailItem
              label="Probability"
              value={`${opportunity.probability}%`}
            />

            <DetailItem
              label="Expected Close Date"
              value={formatDate(opportunity.expectedCloseDate)}
            />

            <DetailItem
              label="Competitor"
              value={opportunity.competitor || "Not specified"}
            />

            <DetailItem
              label="Lead Source"
              value={opportunity.source || "Not specified"}
            />

            <DetailItem label="Currency" value={opportunity.currency} />

            <DetailItem label="Status" value={opportunity.status} />

            <DetailItem
              label="Created Date"
              value={formatDateTime(opportunity.createdAt)}
            />

            <DetailItem
              label="Last Updated"
              value={formatDateTime(opportunity.updatedAt)}
            />

            <DetailItem
              label="Last Activity"
              value={formatDateTime(opportunity.lastActivityDate)}
            />
          </div>
        </section>

        {/* Sales Progress */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            Sales Progress
          </h2>

          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Current Probability
            </span>

            <span className="text-sm font-semibold text-blue-600">
              {opportunity.probability}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${Math.min(
                  Math.max(opportunity.probability, 0),
                  100
                )}%`,
              }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {OPPORTUNITY_STAGES.map((stage) => (
              <span
                key={stage}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  stage === opportunity.stage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {stage}
              </span>
            ))}
          </div>
        </section>

        {/* Description */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Description
          </h2>

          <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
            {opportunity.description || "No description available."}
          </p>
        </section>

        {/* Notes */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Notes</h2>

          <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
            {opportunity.notes || "No notes available."}
          </p>
        </section>

        {/* Activity Timeline */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            Activity Timeline
          </h2>

          <div className="relative border-l-2 border-gray-200 pl-6">
            <div className="relative mb-6">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-blue-600" />

              <h3 className="text-sm font-semibold text-gray-900">
                Opportunity Created
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {formatDateTime(opportunity.createdAt)}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Opportunity was created in the CRM system.
              </p>
            </div>

            <div className="relative mb-6">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-blue-600" />

              <h3 className="text-sm font-semibold text-gray-900">
                Last Updated
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {formatDateTime(opportunity.updatedAt)}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Opportunity information was last updated.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-green-600" />

              <h3 className="text-sm font-semibold text-gray-900">
                Last Activity
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {formatDateTime(opportunity.lastActivityDate)}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Latest recorded activity for this opportunity.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
}

function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>

      <p className="mt-1 break-words text-base text-gray-900">{value}</p>
    </div>
  );
}
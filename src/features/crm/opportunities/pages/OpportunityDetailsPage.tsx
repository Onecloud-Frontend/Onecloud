import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OpportunityStatusBadge } from "../components/OpportunityStatusBadge";
import {useOpportunity,useUpdateOpportunity,} from "../hooks/useOpportunities";
import type { OpportunityStage } from "@/features/crm/shared/types/opportunity.types";
import { customers } from "@/features/crm/shared/data/customers";
import { contacts } from "@/features/crm/shared/data/contacts";
import { users } from "@/features/crm/shared/data/users";

const OPPORTUNITY_STAGES: OpportunityStage[] = [
   "QUALIFICATION",
   "DISCOVERY",
   "PROPOSAL",
   "NEGOTIATION",
  "CLOSED_WON",
  "CLOSED_LOST",
];

function getCustomerName(customerId: string) {
  const customer = customers.find(
    (item) => item.id === customerId,
  );

  return customer?.companyName ?? customerId;
}

function getContactName(contactId?: string) {
  if (!contactId) {
    return "Not specified";
  }

  const contact = contacts.find(
    (item) => item.id === contactId,
  );

  if (!contact) {
    return contactId;
  }

  return `${contact.firstName} ${contact.lastName}`;
}

function getOwnerName(userId: string) {
  const user = users.find(
    (item) => item.id === userId,
  );

  if (!user) {
    return userId;
  }

  return `${user.firstName} ${user.lastName}`;
}

function getStageLabel(stage: string) {
  return stage
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date?: string) {
  if (!date) {
    return "Not specified";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date?: string) {
  if (!date) {
    return "Not specified";
  }

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
}

export function OpportunityDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const {
    data: opportunity,
    isLoading,
    isError,
  } = useOpportunity(id ?? "");

  const updateMutation = useUpdateOpportunity();

  const [
    showStageEditor,
    setShowStageEditor,
  ] = useState(false);

  const [
    selectedStage,
    setSelectedStage,
  ] = useState<OpportunityStage>("QUALIFICATION");

  const [
    selectedProbability,
    setSelectedProbability,
  ] = useState(0);

  const openStageEditor = () => {
    if (!opportunity) {
      return;
    }

    setSelectedStage(opportunity.stage);

    setSelectedProbability(
      opportunity.probability,
    );

    setShowStageEditor(true);
  };

  const handleStageUpdate = async () => {
    if (!opportunity) {
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: opportunity.id,

        values: {
          stage: selectedStage,

          probability: selectedProbability,
        },
      });

      setShowStageEditor(false);
    } catch (error) {
      console.error(
        "Failed to update opportunity:",
        error,
      );
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading opportunity...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !opportunity) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-xl font-semibold text-red-700">
            Opportunity Not Found
          </h1>

          <p className="mt-2 text-sm text-red-600">
            The requested opportunity does not exist.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/crm/opportunities")
            }
            className="mt-4 inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span className="text-xl leading-none">
              ←
            </span>

            Back to Opportunities
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Back */}
        <div className="mb-6 flex w-full justify-start">
          <button
            type="button"
            onClick={() =>
              navigate("/crm/opportunities")
            }
            className="inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span className="text-xl leading-none">
              ←
            </span>

            Back to Opportunities
          </button>
        </div>

        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

            <div className="min-w-0">
              <p className="text-sm text-slate-500">
                CRM / Opportunities / Details
              </p>

              <h1 className="mt-1 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {opportunity.name}
              </h1>

              <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
                <span>
                  ID: {opportunity.id}
                </span>

                <span>•</span>

                <span>
                  {opportunity.opportunityCode}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={openStageEditor}
                className="rounded-lg border border-indigo-600 bg-white px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
              >
                Update Stage
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/crm/opportunities/${opportunity.id}/edit`,
                  )
                }
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                Edit Opportunity
              </button>
            </div>
          </div>
        </header>

        {/* Summary cards */}
        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          <SummaryCard
            title="Expected Revenue"
            value={formatCurrency(
              opportunity.expectedRevenue,
            )}
          />

          <SummaryCard
            title="Probability"
            value={`${opportunity.probability}%`}
          />

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Status
            </p>

            <div className="mt-3">
              <OpportunityStatusBadge
                stage={opportunity.stage}
              />
            </div>
          </div>
        </section>

        {/* Stage editor */}
        {showStageEditor && (
          <section className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-6">

            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Update Opportunity
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Stage
                </label>

                <select
                  value={selectedStage}
                  onChange={(event) =>
                    setSelectedStage(
                      event.target.value as OpportunityStage,
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                >
                  {OPPORTUNITY_STAGES.map(
                    (stage) => (
                      <option
                        key={stage}
                        value={stage}
                      >
                        {getStageLabel(stage)}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Probability (%)
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={selectedProbability}
                  onChange={(event) =>
                    setSelectedProbability(
                      Number(
                        event.target.value,
                      ),
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleStageUpdate}
                disabled={
                  updateMutation.isPending ||
                  selectedProbability < 0 ||
                  selectedProbability > 100
                }
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updateMutation.isPending
                  ? "Updating..."
                  : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowStageEditor(false)
                }
                className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>

            {updateMutation.isError && (
              <p className="mt-3 text-sm text-red-600">
                Failed to update opportunity.
                Please try again.
              </p>
            )}
          </section>
        )}

        {/* Opportunity information */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-xl font-semibold text-slate-900">
            Opportunity Information
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <DetailItem
              label="Opportunity Name"
              value={opportunity.name}
            />

            <DetailItem
              label="Opportunity Code"
              value={opportunity.opportunityCode}
            />

            <DetailItem
              label="Customer"
              value={getCustomerName(
                opportunity.customerId,
              )}
            />

            <DetailItem
              label="Contact"
              value={getContactName(
                opportunity.contactId,
              )}
            />

            <DetailItem
              label="Owner"
              value={getOwnerName(
                opportunity.assignedTo,
              )}
            />

            <DetailItem
              label="Stage"
              value={getStageLabel(
                opportunity.stage,
              )}
            />

            <DetailItem
              label="Expected Revenue"
              value={formatCurrency(
                opportunity.expectedRevenue,
              )}
            />

            <DetailItem
              label="Amount"
              value={formatCurrency(
                opportunity.amount,
              )}
            />

            <DetailItem
              label="Probability"
              value={`${opportunity.probability}%`}
            />

            <DetailItem
              label="Expected Close Date"
              value={formatDate(
                opportunity.expectedCloseDate,
              )}
            />

            <DetailItem
              label="Competitors"
              value={
                opportunity.competitors?.join(", ") ||
                "Not specified"
              }
            />

            <DetailItem
              label="Lead Source"
              value={
                opportunity.source ||
                "Not specified"
              }
            />

            <DetailItem
              label="Created Date"
              value={formatDateTime(
                opportunity.createdAt,
              )}
            />

            <DetailItem
              label="Last Updated"
              value={formatDateTime(
                opportunity.updatedAt,
              )}
            />
          </div>
        </section>

        {/* Sales progress */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <h2 className="mb-5 text-xl font-semibold text-slate-900">
            Sales Progress
          </h2>

          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Current Probability
            </span>

            <span className="text-sm font-semibold text-indigo-600">
              {opportunity.probability}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{
                width: `${Math.min(
                  Math.max(
                    opportunity.probability,
                    0,
                  ),
                  100,
                )}%`,
              }}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {OPPORTUNITY_STAGES.map(
              (stage) => (
                <span
                  key={stage}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    stage === opportunity.stage
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {getStageLabel(stage)}
                </span>
              ),
            )}
          </div>
        </section>

        {/* Description */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            Description
          </h2>

          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {opportunity.description ||
              "No description available."}
          </p>
        </section>

        {/* Activity timeline */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <h2 className="mb-5 text-xl font-semibold text-slate-900">
            Activity Timeline
          </h2>

          <div className="relative border-l-2 border-slate-200 pl-6">

            <TimelineItem
              title="Opportunity Created"
              date={formatDateTime(
                opportunity.createdAt,
              )}
              description="Opportunity was created in the CRM system."
              dotClass="bg-indigo-600"
            />

            <TimelineItem
              title="Last Updated"
              date={formatDateTime(
                opportunity.updatedAt,
              )}
              description="Opportunity information was last updated."
              dotClass="bg-emerald-600"
              last
            />

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

function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({
  label,
  value,
}: DetailItemProps) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-base text-slate-900">
        {value}
      </p>
    </div>
  );
}

interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
  dotClass: string;
  last?: boolean;
}

function TimelineItem({
  title,
  date,
  description,
  dotClass,
  last = false,
}: TimelineItemProps) {
  return (
    <div
      className={`relative ${
        last ? "" : "mb-6"
      }`}
    >
      <span
        className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full ${dotClass}`}
      />

      <h3 className="text-sm font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {date}
      </p>

      <p className="mt-2 text-sm text-slate-600">
        {description}
      </p>
    </div>
  );
}
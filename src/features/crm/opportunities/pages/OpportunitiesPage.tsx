import {useEffect,useMemo,useState,} from "react";
import { useNavigate } from "react-router-dom";
import { OpportunityFilters } from "../components/opportunityFilters";
import { OpportunityTable } from "../components/OpportunityTable";
import {useDeleteOpportunity,useOpportunities,} from "../hooks/useOpportunities";
import { customers } from "@/features/crm/shared/data/customers";
import { contacts } from "@/features/crm/shared/data/contacts";
import { users } from "@/features/crm/shared/data/users";

function getCustomerName(
  customerId: string,
) {
  const customer =
    customers.find(
      (item) =>
        item.id === customerId,
    );

  return (
    customer?.companyName ??
    customerId
  );
}

function getContactName(
  contactId?: string,
) {
  if (!contactId) return "";

  const contact =
    contacts.find(
      (item) =>
        item.id === contactId,
    );

  if (!contact) return contactId;

  return `${contact.firstName} ${contact.lastName}`;
}

function getOwnerName(
  userId: string,
) {
  const user =
    users.find(
      (item) =>
        item.id === userId,
    );

  if (!user) return userId;

  return `${user.firstName} ${user.lastName}`;
}

function getStageLabel(
  stage: string,
) {
  return stage
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

export function OpportunitiesPage() {
  const navigate = useNavigate();

  const {
    data: opportunities = [],
    isLoading,
    isError,
    refetch,
  } = useOpportunities();

  const deleteMutation =
    useDeleteOpportunity();

  const [search, setSearch] =
    useState("");

  const [stage, setStage] =
    useState("");

  const [owner, setOwner] =
    useState("");

  const [probability, setProbability] =
    useState("");

  const [closeDateFrom, setCloseDateFrom] =
    useState("");

  const [closeDateTo, setCloseDateTo] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const filteredOpportunities =
    useMemo(() => {
      const searchValue =
        search
          .toLowerCase()
          .trim();

      return opportunities.filter(
        (opportunity) => {

          const customerName =
            getCustomerName(
              opportunity.customerId,
            );

          const contactName =
            getContactName(
              opportunity.contactId,
            );

          const ownerName =
            getOwnerName(
              opportunity.assignedTo,
            );

          const matchesSearch =
            !searchValue ||
            opportunity.id
              .toLowerCase()
              .includes(searchValue) ||
            opportunity.opportunityCode
              .toLowerCase()
              .includes(searchValue) ||
            opportunity.name
              .toLowerCase()
              .includes(searchValue) ||
            customerName
              .toLowerCase()
              .includes(searchValue) ||
            contactName
              .toLowerCase()
              .includes(searchValue);

          const matchesStage =
            !stage ||
            opportunity.stage === stage;

          const matchesOwner =
            !owner ||
            ownerName
              .toLowerCase()
              .includes(
                owner
                  .toLowerCase()
                  .trim(),
              );

          const matchesProbability =
            (() => {
              if (!probability) {
                return true;
              }

              const [
                minimum,
                maximum,
              ] =
                probability
                  .split("-")
                  .map(Number);

              return (
                opportunity.probability >=
                  minimum &&
                opportunity.probability <=
                  maximum
              );
            })();

          const matchesCloseDateFrom =
            !closeDateFrom ||
            opportunity.expectedCloseDate >=
              closeDateFrom;

          const matchesCloseDateTo =
            !closeDateTo ||
            opportunity.expectedCloseDate <=
              closeDateTo;

          return (
            matchesSearch &&
            matchesStage &&
            matchesOwner &&
            matchesProbability &&
            matchesCloseDateFrom &&
            matchesCloseDateTo
          );
        },
      );
    }, [
      opportunities,
      search,
      stage,
      owner,
      probability,
      closeDateFrom,
      closeDateTo,
    ]);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    stage,
    owner,
    probability,
    closeDateFrom,
    closeDateTo,
  ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredOpportunities.length /
          pageSize,
      ),
    );

  useEffect(() => {
    setPage(
      (currentPage) =>
        Math.min(
          currentPage,
          totalPages,
        ),
    );
  }, [totalPages]);

  const paginatedOpportunities =
    useMemo(() => {
      const startIndex =
        (page - 1) *
        pageSize;

      return filteredOpportunities.slice(
        startIndex,
        startIndex + pageSize,
      );
    }, [
      filteredOpportunities,
      page,
      pageSize,
    ]);

  const totalRevenue =
    filteredOpportunities.reduce(
      (total, opportunity) =>
        total +
        opportunity.expectedRevenue,
      0,
    );

  const averageProbability =
    filteredOpportunities.length
      ? Math.round(
          filteredOpportunities.reduce(
            (
              total,
              opportunity,
            ) =>
              total +
              opportunity.probability,
            0,
          ) /
            filteredOpportunities.length,
        )
      : 0;

  const openCount =
    filteredOpportunities.filter(
      (opportunity) =>
        opportunity.stage !==
          "CLOSED_WON" &&
        opportunity.stage !==
          "CLOSED_LOST",
    ).length;

  function resetFilters() {
    setSearch("");
    setStage("");
    setOwner("");
    setProbability("");
    setCloseDateFrom("");
    setCloseDateTo("");
    setPage(1);
  }

  function handlePageSizeChange(
    nextPageSize: number,
  ) {
    setPageSize(
      nextPageSize,
    );
    setPage(1);
  }

  async function handleDelete(
    id: string,
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this opportunity?",
      );

    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(
        id,
      );
    } catch (error) {
      console.error(
        "Delete opportunity error:",
        error,
      );

      window.alert(
        "Unable to delete opportunity. Please try again.",
      );
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading opportunities...
          </p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-red-600">
            Unable to load
            opportunities
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Something went wrong while
            loading the opportunity data.
          </p>

          <button
            type="button"
            onClick={() =>
              refetch()
            }
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen min-w-0 bg-slate-50 px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px] min-w-0">

        {/* Header */}
        <header className="mb-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">

            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span>CRM</span>

              <span aria-hidden="true">
                /
              </span>

              <span className="font-medium text-slate-700">
                Opportunities
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Opportunities
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Manage your sales opportunities
              and track revenue growth.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/crm/opportunities/new",
              )
            }
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <span
              className="text-lg leading-none"
              aria-hidden="true"
            >
              +
            </span>

            Create Opportunity
          </button>
        </header>

        {/* Summary */}
        <section
          aria-label="Opportunity summary"
          className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <SummaryCard
            title="Total Opportunities"
            value={String(
              filteredOpportunities.length,
            )}
          />

          <SummaryCard
            title="Open Opportunities"
            value={String(openCount)}
          />

          <SummaryCard
            title="Total Expected Revenue"
            value={`₹${totalRevenue.toLocaleString(
              "en-IN",
            )}`}
          />

          <SummaryCard
            title="Average Probability"
            value={`${averageProbability}%`}
          />
        </section>

        {/* Filters */}
        <section
          className="mb-6 min-w-0"
          aria-label="Filter opportunities"
        >
          <OpportunityFilters
            search={search}
            stage={stage}
            owner={owner}
            probability={probability}
            closeDateFrom={
              closeDateFrom
            }
            closeDateTo={
              closeDateTo
            }
            onSearchChange={
              setSearch
            }
            onStageChange={
              setStage
            }
            onOwnerChange={
              setOwner
            }
            onProbabilityChange={
              setProbability
            }
            onCloseDateFromChange={
              setCloseDateFrom
            }
            onCloseDateToChange={
              setCloseDateTo
            }
            onReset={
              resetFilters
            }
          />
        </section>

        {/* Table */}
        <OpportunityTable
          opportunities={
            paginatedOpportunities
          }
          totalCount={
            filteredOpportunities.length
          }
          page={page}
          pageSize={pageSize}
          onPageChange={
            setPage
          }
          onPageSizeChange={
            handlePageSizeChange
          }
          onDelete={
            handleDelete
          }
          isDeleting={
            deleteMutation.isPending
          }
        />
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
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-2 break-words text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}
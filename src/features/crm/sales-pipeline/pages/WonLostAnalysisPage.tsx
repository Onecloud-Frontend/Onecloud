import { useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { useSalesPipeline } from "../hooks/useSalesPipeline";

interface AnalysisFilters {
  owner: string;
  customer: string;
  dateFrom: string;
  dateTo: string;
}

const defaultFilters: AnalysisFilters = {
  owner: "",
  customer: "",
  dateFrom: "",
  dateTo: "",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function WonLostAnalysisPage() {
  const { data: opportunities = [], isLoading, isError } = useSalesPipeline();

  const [filters, setFilters] = useState<AnalysisFilters>(defaultFilters);

  const owners = useMemo(
    () => Array.from(new Set(opportunities.map((item) => item.assignedTo))),
    [opportunities],
  );

  const customers = useMemo(
    () => Array.from(new Set(opportunities.map((item) => item.customerId))),
    [opportunities],
  );

  const closedOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const isClosed =
        opportunity.stage === "CLOSED_WON" ||
        opportunity.stage === "CLOSED_LOST";

      const matchesOwner =
        !filters.owner || opportunity.assignedTo === filters.owner;

      const matchesCustomer =
        !filters.customer || opportunity.customerId === filters.customer;

      const matchesFrom =
        !filters.dateFrom || opportunity.expectedCloseDate >= filters.dateFrom;

      const matchesTo =
        !filters.dateTo || opportunity.expectedCloseDate <= filters.dateTo;

      return (
        isClosed && matchesOwner && matchesCustomer && matchesFrom && matchesTo
      );
    });
  }, [opportunities, filters]);

  const analysis = useMemo(() => {
    const won = closedOpportunities.filter(
      (opportunity) => opportunity.stage === "CLOSED_WON",
    );

    const lost = closedOpportunities.filter(
      (opportunity) => opportunity.stage === "CLOSED_LOST",
    );

    const wonValue = won.reduce(
      (total, opportunity) => total + opportunity.amount,
      0,
    );

    const lostValue = lost.reduce(
      (total, opportunity) => total + opportunity.amount,
      0,
    );

    const totalClosed = won.length + lost.length;

    const averageDealValue =
      totalClosed === 0 ? 0 : (wonValue + lostValue) / totalClosed;

    const averageSalesCycle =
      totalClosed === 0
        ? 0
        : closedOpportunities.reduce((total, opportunity) => {
            const created = new Date(opportunity.createdAt).getTime();

            const closed = new Date(opportunity.expectedCloseDate).getTime();

            const days = Math.max(
              0,
              Math.round((closed - created) / (1000 * 60 * 60 * 24)),
            );

            return total + days;
          }, 0) / totalClosed;

    return {
      totalClosed,
      wonCount: won.length,
      lostCount: lost.length,
      wonValue,
      lostValue,

      winRate: totalClosed === 0 ? 0 : (won.length / totalClosed) * 100,

      lossRate: totalClosed === 0 ? 0 : (lost.length / totalClosed) * 100,

      averageDealValue,
      averageSalesCycle,
    };
  }, [closedOpportunities]);

  if (isLoading) {
    return <div className="p-6">Loading analysis...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">Failed to load pipeline analysis.</div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <Link
        to="/crm/pipeline"
        className="text-sm font-medium text-gray-600 hover:underline"
      >
        ← Back to Pipeline
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Won/Lost Analysis</h1>

        <p className="mt-1 text-sm text-gray-500">
          Analyze closed opportunities from the centralized CRM Opportunity
          data.
        </p>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <select
            value={filters.owner}
            onChange={(event) =>
              setFilters((previous) => ({
                ...previous,
                owner: event.target.value,
              }))
            }
            className="rounded-md border px-3 py-2 text-sm"
          >
            <option value="">All Owners</option>

            {owners.map((owner) => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>

          <select
            value={filters.customer}
            onChange={(event) =>
              setFilters((previous) => ({
                ...previous,
                customer: event.target.value,
              }))
            }
            className="rounded-md border px-3 py-2 text-sm"
          >
            <option value="">All Customers</option>

            {customers.map((customer) => (
              <option key={customer} value={customer}>
                {customer}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filters.dateFrom}
            onChange={(event) =>
              setFilters((previous) => ({
                ...previous,
                dateFrom: event.target.value,
              }))
            }
            className="rounded-md border px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={filters.dateTo}
            onChange={(event) =>
              setFilters((previous) => ({
                ...previous,
                dateTo: event.target.value,
              }))
            }
            className="rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <button
          type="button"
          onClick={() => setFilters(defaultFilters)}
          className="mt-4 rounded-md border px-4 py-2 text-sm font-medium"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalysisCard
          label="Closed Opportunities"
          value={String(analysis.totalClosed)}
        />

        <AnalysisCard
          label="Won Opportunities"
          value={String(analysis.wonCount)}
        />

        <AnalysisCard
          label="Lost Opportunities"
          value={String(analysis.lostCount)}
        />

        <AnalysisCard
          label="Win Rate"
          value={`${analysis.winRate.toFixed(1)}%`}
        />

        <AnalysisCard
          label="Loss Rate"
          value={`${analysis.lossRate.toFixed(1)}%`}
        />

        <AnalysisCard
          label="Won Value"
          value={formatCurrency(analysis.wonValue)}
        />

        <AnalysisCard
          label="Lost Value"
          value={formatCurrency(analysis.lostValue)}
        />

        <AnalysisCard
          label="Average Deal Value"
          value={formatCurrency(analysis.averageDealValue)}
        />

        <AnalysisCard
          label="Average Sales Cycle"
          value={`${analysis.averageSalesCycle.toFixed(0)} days`}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3">Opportunity</th>

              <th className="px-4 py-3">Customer</th>

              <th className="px-4 py-3">Stage</th>

              <th className="px-4 py-3">Amount</th>

              <th className="px-4 py-3">Owner</th>

              <th className="px-4 py-3">Close Date</th>
            </tr>
          </thead>

          <tbody>
            {closedOpportunities.map((opportunity) => (
              <tr key={opportunity.id} className="border-b last:border-b-0">
                <td className="px-4 py-3">{opportunity.name}</td>

                <td className="px-4 py-3">{opportunity.customerId}</td>

                <td className="px-4 py-3">
                  {opportunity.stage === "CLOSED_WON"
                    ? "Closed Won"
                    : "Closed Lost"}
                </td>

                <td className="px-4 py-3">
                  {formatCurrency(opportunity.amount)}
                </td>

                <td className="px-4 py-3">{opportunity.assignedTo}</td>

                <td className="px-4 py-3">{opportunity.expectedCloseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {closedOpportunities.length === 0 && (
          <div className="p-10 text-center text-sm text-gray-500">
            No closed opportunities found.
          </div>
        )}
      </div>
    </div>
  );
}

function AnalysisCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-2 text-xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

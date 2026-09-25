import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import WonLostCards from "../components/WonLostCards";
import WonLostChart, {
  type WonLostChartData,
} from "../components/WonLostChart";
import WonLostTable from "../components/WonLostTable";
import { pipelineStages } from "../mocks/pipelineMockData";
import { useSalesPipeline } from "../hooks/useSalesPipeline";

interface AnalysisFilters {
  owner: string;
  stage: string;
  customer: string;
  dateFrom: string;
  dateTo: string;
}

const defaultFilters: AnalysisFilters = {
  owner: "",
  stage: "",
  customer: "",
  dateFrom: "",
  dateTo: "",
};

export function WonLostAnalysisPage() {
  const { data: opportunities = [], isLoading, isError } = useSalesPipeline();

  const [filters, setFilters] = useState<AnalysisFilters>(defaultFilters);

  const owners = useMemo(
    () => Array.from(new Set(opportunities.map((item) => item.owner))),
    [opportunities],
  );

  const customers = useMemo(
    () => Array.from(new Set(opportunities.map((item) => item.customer))),
    [opportunities],
  );

  /*
   * Get only closed opportunities after
   * applying the selected filters.
   */
  const closedOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesOwner =
        !filters.owner || opportunity.owner === filters.owner;

      const selectedStage = pipelineStages.find(
        (stage) => stage.label === filters.stage,
      )?.id;

      const matchesStage =
        !selectedStage || opportunity.stage === selectedStage;

      const matchesCustomer =
        !filters.customer || opportunity.customer === filters.customer;

      const matchesFrom =
        !filters.dateFrom || opportunity.expectedCloseDate >= filters.dateFrom;

      const matchesTo =
        !filters.dateTo || opportunity.expectedCloseDate <= filters.dateTo;

      const isClosed =
        opportunity.stage === "Closed Won" ||
        opportunity.stage === "Closed Lost" ||
        opportunity.status === "Won" ||
        opportunity.status === "Lost";

      return (
        isClosed &&
        matchesOwner &&
        matchesStage &&
        matchesCustomer &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [opportunities, filters]);

  /*
   * Calculate the Won/Lost analysis.
   */
  const analysis = useMemo(() => {
    const won = closedOpportunities.filter(
      (opportunity) =>
        opportunity.stage === "Closed Won" || opportunity.status === "Won",
    );

    const lost = closedOpportunities.filter(
      (opportunity) =>
        opportunity.stage === "Closed Lost" || opportunity.status === "Lost",
    );

    const wonValue = won.reduce(
      (total, opportunity) => total + opportunity.expectedRevenue,
      0,
    );

    const lostValue = lost.reduce(
      (total, opportunity) => total + opportunity.expectedRevenue,
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
      totalOpportunities: closedOpportunities.length,

      wonOpportunities: won.length,

      lostOpportunities: lost.length,

      wonValue,

      lostValue,

      winRate: totalClosed === 0 ? 0 : (won.length / totalClosed) * 100,

      lossRate: totalClosed === 0 ? 0 : (lost.length / totalClosed) * 100,

      averageDealValue,

      averageSalesCycle,
    };
  }, [closedOpportunities]);

  /*
   * Build chart data from stage history.
   *
   * Example:
   * An opportunity that was Prospecting,
   * then Qualification, then Closed Won
   * contributes to the Won count for the
   * stages it passed through.
   */
  const chartData = useMemo<WonLostChartData[]>(() => {
    return pipelineStages
      .filter(
        (stage) => stage.id !== "Closed Won" && stage.id !== "Closed Lost",
      )
      .map((stage) => {
        const won = closedOpportunities.filter(
          (opportunity) =>
            (opportunity.stage === "Closed Won" ||
              opportunity.status === "Won") &&
            opportunity.stageHistory.some(
              (history) => history.stage === stage.id,
            ),
        ).length;

        const lost = closedOpportunities.filter(
          (opportunity) =>
            (opportunity.stage === "Closed Lost" ||
              opportunity.status === "Lost") &&
            opportunity.stageHistory.some(
              (history) => history.stage === stage.id,
            ),
        ).length;

        return {
          name: stage.label,
          won,
          lost,
        };
      });
  }, [closedOpportunities]);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Loading analysis...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">
          Failed to load pipeline analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Back to Pipeline */}
      <div>
        <Link
          to="/crm/pipeline"
          className="inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to Pipeline
        </Link>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Won/Lost Analysis</h1>

        <p className="mt-1 text-sm text-gray-500">
          Analyze won and lost opportunities across the sales pipeline.
        </p>
      </div>

      {/* Analysis Filters */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Owner */}
          <div>
            <label
              htmlFor="analysis-owner"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Owner
            </label>

            <select
              id="analysis-owner"
              value={filters.owner}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  owner: event.target.value,
                }))
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">All Owners</option>

              {owners.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              ))}
            </select>
          </div>

          {/* Stage */}
          <div>
            <label
              htmlFor="analysis-stage"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Stage
            </label>

            <select
              id="analysis-stage"
              value={filters.stage}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  stage: event.target.value,
                }))
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">All Stages</option>

              {pipelineStages.map((stage) => (
                <option key={stage.id} value={stage.label}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>

          {/* Customer */}
          <div>
            <label
              htmlFor="analysis-customer"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Customer
            </label>

            <select
              id="analysis-customer"
              value={filters.customer}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  customer: event.target.value,
                }))
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">All Customers</option>

              {customers.map((customer) => (
                <option key={customer} value={customer}>
                  {customer}
                </option>
              ))}
            </select>
          </div>

          {/* Date From */}
          <div>
            <label
              htmlFor="analysis-date-from"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Date From
            </label>

            <input
              id="analysis-date-from"
              type="date"
              value={filters.dateFrom}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  dateFrom: event.target.value,
                }))
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Date To */}
          <div>
            <label
              htmlFor="analysis-date-to"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Date To
            </label>

            <input
              id="analysis-date-to"
              type="date"
              value={filters.dateTo}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  dateTo: event.target.value,
                }))
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Won/Lost Summary */}
      <WonLostCards summary={analysis} />

      {/* Won/Lost Chart */}
      <WonLostChart data={chartData} />

      {/* Won/Lost Table */}
      <WonLostTable opportunities={closedOpportunities} />
    </div>
  );
}

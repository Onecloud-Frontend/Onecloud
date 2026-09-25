import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PipelineBoard from "../components/PipelineBoard";

import PipelineFilters, {
  type PipelineFilterValues,
} from "../components/PipelineFilters";

import PipelineSummary from "../components/PipelineSummary";

import { pipelineStages } from "../mocks/pipelineMockData";

import {
  useSalesPipeline,
  useUpdatePipelineStage,
} from "../hooks/useSalesPipeline";

export function SalesPipelinePage() {
  const { data: opportunities = [], isLoading, isError } = useSalesPipeline();

  const updateStageMutation = useUpdatePipelineStage();

  const [filters, setFilters] = useState<PipelineFilterValues>({
    search: "",
    owner: "",
    stage: "",
    customer: "",
    dateFrom: "",
    dateTo: "",
  });

  /*
   * Get unique owners from opportunity data.
   */
  const owners = useMemo(
    () => Array.from(new Set(opportunities.map((item) => item.owner))),
    [opportunities],
  );

  /*
   * Get unique customers from opportunity data.
   */
  const customers = useMemo(
    () => Array.from(new Set(opportunities.map((item) => item.customer))),
    [opportunities],
  );

  /*
   * Get all six pipeline stage labels.
   */
  const stages = useMemo(() => pipelineStages.map((stage) => stage.label), []);

  /*
   * Apply search and filters.
   */
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const search = filters.search.trim().toLowerCase();

      const matchesSearch =
        !search ||
        opportunity.name.toLowerCase().includes(search) ||
        opportunity.customer.toLowerCase().includes(search) ||
        opportunity.id.toLowerCase().includes(search) ||
        opportunity.contact.toLowerCase().includes(search);

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

      return (
        matchesSearch &&
        matchesOwner &&
        matchesStage &&
        matchesCustomer &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [opportunities, filters]);

  /*
   * Handle drag/drop stage changes.
   */
  const handleStageChange = (
    opportunityId: string,
    stage: Parameters<typeof updateStageMutation.mutate>[0]["stage"],
  ) => {
    updateStageMutation.mutate({
      id: opportunityId,
      stage,
    });
  };

  /*
   * Reset all filters.
   */
  const handleResetFilters = () => {
    setFilters({
      search: "",
      owner: "",
      stage: "",
      customer: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  /*
   * Loading state.
   */
  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Loading sales pipeline...</p>
      </div>
    );
  }

  /*
   * Error state.
   */
  if (isError) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">Failed to load sales pipeline.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Enterprise Sales Pipeline
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Sales Pipeline
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage opportunities across the sales pipeline stages.
          </p>
        </div>

        {/* Navigation to Analysis */}
        <Link
          to="/crm/pipeline/analysis"
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Won/Lost Analysis
        </Link>
      </div>

      {/* Pipeline Summary */}
      <PipelineSummary opportunities={filteredOpportunities} />

      {/* Pipeline Filters */}
      <PipelineFilters
        owners={owners}
        stages={stages}
        customers={customers}
        onApply={setFilters}
        onReset={handleResetFilters}
      />

      {/* No Results */}
      {filteredOpportunities.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-white p-10 text-center">
          <h2 className="font-semibold text-gray-900">
            No opportunities found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your filters.
          </p>
        </div>
      ) : (
        /*
         * Pipeline Board
         */
        <PipelineBoard
          opportunities={filteredOpportunities}
          onStageChange={handleStageChange}
        />
      )}

      {/* Stage Update Status */}
      {updateStageMutation.isPending && (
        <p className="text-sm text-gray-500">Updating opportunity stage...</p>
      )}

      {updateStageMutation.isError && (
        <p className="text-sm text-red-600">
          Failed to update opportunity stage.
        </p>
      )}
    </div>
  );
}

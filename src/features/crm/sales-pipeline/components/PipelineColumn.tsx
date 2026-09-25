import type { DragEvent } from "react";

import type {
  PipelineOpportunity,
  PipelineStageConfig,
} from "../types/pipeline.types";

import OpportunityCard from "./OpportunityCard";

interface PipelineColumnProps {
  stage: PipelineStageConfig;

  opportunities: PipelineOpportunity[];

  onDragStart: (event: DragEvent<HTMLDivElement>, id: string) => void;

  onDrop: (event: DragEvent<HTMLDivElement>) => void;

  onView: (id: string) => void;
}

export default function PipelineColumn({
  stage,
  opportunities,
  onDragStart,
  onDrop,
  onView,
}: PipelineColumnProps) {
  const totalStageValue = opportunities.reduce(
    (sum, opportunity) => sum + opportunity.expectedRevenue,
    0,
  );

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      className="flex min-h-[500px] min-w-[280px] flex-1 flex-col rounded-lg bg-gray-100 p-3"
    >
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">{stage.label}</h2>

          <span className="rounded-full bg-white px-2 py-1 text-xs">
            {opportunities.length}
          </span>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          Probability: {stage.probability}%
        </p>

        <p className="mt-1 text-sm font-medium text-gray-900">
          Stage Value: ${totalStageValue.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onDragStart={onDragStart}
            onView={onView}
          />
        ))}

        {opportunities.length === 0 && (
          <div className="rounded-lg border border-dashed bg-white p-6 text-center">
            <p className="text-sm text-gray-400">No opportunities</p>
          </div>
        )}
      </div>
    </div>
  );
}

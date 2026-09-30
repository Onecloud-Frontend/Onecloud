import type { DragEvent } from "react";

import type { PipelineOpportunity } from "../types/pipeline.types";

interface OpportunityCardProps {
  opportunity: PipelineOpportunity;

  onDragStart: (event: DragEvent<HTMLDivElement>, id: string) => void;

  onView: (id: string) => void;
}

export default function OpportunityCard({
  opportunity,
  onDragStart,
  onView,
}: OpportunityCardProps) {
  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, opportunity.id)}
      className="cursor-grab rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-gray-400">{opportunity.id}</p>

          <button
            type="button"
            onClick={() => onView(opportunity.id)}
            className="mt-1 text-left"
          >
            <h3 className="font-semibold text-gray-900 hover:underline">
              {opportunity.name}
            </h3>
          </button>
        </div>

        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
          {opportunity.probability}%
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">{opportunity.customer}</p>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Expected Revenue</span>

          <span className="font-medium">
            {opportunity.currency}{" "}
            {opportunity.expectedRevenue.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Close Date</span>

          <span>{opportunity.expectedCloseDate}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Days in Stage</span>

          <span>{opportunity.daysInStage}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Last Activity</span>

          <span>{opportunity.lastActivityDate || "—"}</span>
        </div>
      </div>

      <div className="mt-4 border-t pt-3">
        <p className="text-xs text-gray-500">Owner</p>

        <p className="text-sm font-medium text-gray-900">{opportunity.owner}</p>
      </div>
    </div>
  );
}

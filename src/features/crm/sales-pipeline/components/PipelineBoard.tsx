import { useState } from "react";
import type { DragEvent } from "react";
import { useNavigate } from "react-router-dom";

import { pipelineStages } from "../mocks/pipelineMockData";

import type {
  PipelineOpportunity,
  PipelineStage,
} from "../types/pipeline.types";

import PipelineColumn from "./PipelineColumn";

interface PipelineBoardProps {
  opportunities: PipelineOpportunity[];

  onStageChange: (id: string, stage: PipelineStage) => void;
}

export default function PipelineBoard({
  opportunities,
  onStageChange,
}: PipelineBoardProps) {
  const navigate = useNavigate();

  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (event: DragEvent<HTMLDivElement>, id: string) => {
    setDraggedId(id);

    event.dataTransfer.setData("text/plain", id);

    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    stage: PipelineStage,
  ) => {
    event.preventDefault();

    const id = event.dataTransfer.getData("text/plain") || draggedId;

    if (!id) {
      return;
    }

    onStageChange(id, stage);

    setDraggedId(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-4 pb-4">
        {pipelineStages.map((stage) => {
          const stageOpportunities = opportunities.filter(
            (item) => item.stage === stage.id,
          );

          return (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              opportunities={stageOpportunities}
              onDragStart={handleDragStart}
              onDrop={(event) => handleDrop(event, stage.id)}
              onView={(id) => navigate(`/crm/pipeline/${id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}

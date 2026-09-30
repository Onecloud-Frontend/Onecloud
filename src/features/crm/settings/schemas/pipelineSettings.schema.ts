import type { Pipeline, PipelineStage } from "../types/pipelineSettings.types";

export function validatePipelineStage(stage: PipelineStage): string[] {
  const errors: string[] = [];

  if (!stage.name.trim()) {
    errors.push("Stage name is required.");
  }

  if (stage.probability < 0 || stage.probability > 100) {
    errors.push("Probability must be between 0 and 100.");
  }

  if (stage.order < 1) {
    errors.push("Stage order must be greater than 0.");
  }

  return errors;
}

export function validatePipeline(pipeline: Pipeline): string[] {
  const errors: string[] = [];

  if (!pipeline.name.trim()) {
    errors.push("Pipeline name is required.");
  }

  if (pipeline.stages.length === 0) {
    errors.push("At least one pipeline stage is required.");
  }

  pipeline.stages.forEach((stage) => {
    errors.push(...validatePipelineStage(stage));
  });

  return errors;
}

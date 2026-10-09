export interface PipelineStage {
  id: string;
  name: string;
  probability: number;
  order: number;
  active: boolean;
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  active: boolean;
  stages: PipelineStage[];
}

export interface PipelineSettings {
  defaultPipelineId: string;
  pipelines: Pipeline[];
}

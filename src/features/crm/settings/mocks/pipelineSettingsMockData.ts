import type { PipelineSettings } from "../types/pipelineSettings.types";

export const pipelineSettingsMockData: PipelineSettings = {
  defaultPipelineId: "sales-pipeline",

  pipelines: [
    {
      id: "sales-pipeline",
      name: "Sales Pipeline",
      description: "Default sales opportunity pipeline",
      active: true,

      stages: [
        {
          id: "prospecting",
          name: "Prospecting",
          probability: 10,
          order: 1,
          active: true,
        },
        {
          id: "qualification",
          name: "Qualification",
          probability: 25,
          order: 2,
          active: true,
        },
        {
          id: "proposal",
          name: "Proposal",
          probability: 50,
          order: 3,
          active: true,
        },
        {
          id: "negotiation",
          name: "Negotiation",
          probability: 75,
          order: 4,
          active: true,
        },
        {
          id: "closed-won",
          name: "Closed Won",
          probability: 100,
          order: 5,
          active: true,
        },
        {
          id: "closed-lost",
          name: "Closed Lost",
          probability: 0,
          order: 6,
          active: true,
        },
      ],
    },
  ],
};

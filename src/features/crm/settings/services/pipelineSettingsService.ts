import { pipelineSettingsMockData } from "../mocks/pipelineSettingsMockData";
import type { PipelineSettings } from "../types/pipelineSettings.types";

export const pipelineSettingsService = {
  async getSettings(): Promise<PipelineSettings> {
    return structuredClone(pipelineSettingsMockData);
  },

  async updateSettings(settings: PipelineSettings): Promise<PipelineSettings> {
    return structuredClone(settings);
  },
};

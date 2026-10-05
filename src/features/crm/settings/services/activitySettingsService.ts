import { activitySettingsMockData } from "../mocks/activitySettingsMockData";
import type {
  ActivitySettings,
  ActivitySettingsUpdate,
} from "../types/activitySettings.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let settings: ActivitySettings = structuredClone(activitySettingsMockData);

class ActivitySettingsService {
  async getSettings(): Promise<ActivitySettings> {
    await delay(300);
    return structuredClone(settings);
  }

  async updateSettings(
    values: ActivitySettingsUpdate,
  ): Promise<ActivitySettings> {
    await delay(500);
    settings = structuredClone(values);
    return structuredClone(settings);
  }
}

export const activitySettingsService = new ActivitySettingsService();

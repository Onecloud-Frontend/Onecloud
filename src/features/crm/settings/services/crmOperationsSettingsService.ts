import { crmOperationsSettingsSeed } from '../mocks/crmOperationsSettingsMockData';
import type {
  CrmOperationsSettings,
  LeadManagementSettings,
  LeadScoringSettings,
  NumberingSettingsData,
} from '../types/crmOperationsSettings.types';

const NETWORK_DELAY_MS = 400;

/**
 * In-memory store for the CRM Operations settings while the backend is not
 * yet available. Held at module scope so edits persist across component
 * remounts within a session, the same way a real save would persist across
 * navigation.
 */
let store: CrmOperationsSettings = structuredClone(crmOperationsSettingsSeed);

const respond = <T>(build: () => T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(build()), NETWORK_DELAY_MS);
  });

/**
 * Data access layer for the CRM Operations settings section (Lead
 * Management, Lead Scoring, Numbering & Sequences). Mirrors the shape of
 * the eventual GET/PUT /api/crm/settings/crm-operations endpoints; callers
 * only depend on this service, so switching to a real API later does not
 * require any change in the hooks or components.
 */
class CrmOperationsSettingsService {
  getSettings(): Promise<CrmOperationsSettings> {
    return respond(() => structuredClone(store));
  }

  updateLeadManagement(next: LeadManagementSettings): Promise<LeadManagementSettings> {
    return respond(() => {
      store = { ...store, leadManagement: structuredClone(next) };
      return structuredClone(store.leadManagement);
    });
  }

  updateLeadScoring(next: LeadScoringSettings): Promise<LeadScoringSettings> {
    return respond(() => {
      store = { ...store, leadScoring: structuredClone(next) };
      return structuredClone(store.leadScoring);
    });
  }

  updateNumbering(next: NumberingSettingsData): Promise<NumberingSettingsData> {
    return respond(() => {
      store = { ...store, numbering: structuredClone(next) };
      return structuredClone(store.numbering);
    });
  }

  resetToDefaults(): Promise<CrmOperationsSettings> {
    return respond(() => {
      store = structuredClone(crmOperationsSettingsSeed);
      return structuredClone(store);
    });
  }
}

export const crmOperationsSettingsService = new CrmOperationsSettingsService();

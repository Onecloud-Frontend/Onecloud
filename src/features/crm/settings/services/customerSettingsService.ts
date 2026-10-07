// src/features/crm/settings/services/customerSettingsService.ts

import type {
  CustomerSettings,
  UpdateCustomerSettingsRequest,
} from '../types/customerSettings.types';

import { customerSettingsMockData } from '../mocks/customerSettingsMockData';

let customerSettings: CustomerSettings = structuredClone(
  customerSettingsMockData
);

export const customerSettingsService = {
  async getCustomerSettings(): Promise<CustomerSettings> {
    return structuredClone(customerSettings);
  },

  async updateCustomerSettings(
    data: UpdateCustomerSettingsRequest
  ): Promise<CustomerSettings> {
    customerSettings = structuredClone(data);

    return structuredClone(customerSettings);
  },
};
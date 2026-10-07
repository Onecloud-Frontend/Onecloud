import type { CustomerSettings } from '../types/customerSettings.types';

export interface CustomerSettingsErrors {
  customerTypes?: string;
  customerStatuses?: string;
  defaultCustomerType?: string;
  defaultCustomerStatus?: string;
}

export const validateCustomerSettings = (
  settings: CustomerSettings
): CustomerSettingsErrors => {
  const errors: CustomerSettingsErrors = {};

  const hasInvalidCustomerType = settings.customerTypes.some(
    (type) => !type.name.trim()
  );

  if (hasInvalidCustomerType) {
    errors.customerTypes = 'Customer type name is required';
  }

  const hasInvalidCustomerStatus = settings.customerStatuses.some(
    (status) => !status.name.trim()
  );

  if (hasInvalidCustomerStatus) {
    errors.customerStatuses = 'Customer status name is required';
  }

  if (!settings.defaults.defaultCustomerType.trim()) {
    errors.defaultCustomerType = 'Default customer type is required';
  }

  if (!settings.defaults.defaultCustomerStatus.trim()) {
    errors.defaultCustomerStatus = 'Default customer status is required';
  }

  return errors;
};

/**
 * Represents a customer type configuration. like Individual, Business, Enterprise
 */
export interface CustomerType {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

/**
 * Represents a customer status configuration.
 * Example: Active, Inactive, Prospect
 */
export interface CustomerStatus {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

/**
 * Default values used when a new customer is created.
 */
export interface DefaultCustomerConfiguration {
  defaultCustomerType: string;
  defaultCustomerStatus: string;
}

/**
 * General customer settings.
 */
export interface CustomerGeneralSettings {
  allowDuplicateCustomers: boolean;
  autoAssignCustomerOwner: boolean;
}

export interface CustomerSettings {
  generalSettings: CustomerGeneralSettings;
  customerTypes: CustomerType[];
  customerStatuses: CustomerStatus[];
  defaults: DefaultCustomerConfiguration;
}


export type UpdateCustomerSettingsRequest = CustomerSettings;
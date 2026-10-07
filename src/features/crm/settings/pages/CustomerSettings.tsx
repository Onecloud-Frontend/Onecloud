import React from 'react';
import { useCustomerSettings } from '../hooks/useCustomerSettings';
import { CustomerSettingsForm } from '../forms/CustomerSettingsForm';

export const CustomerSettings: React.FC = () => {
  const {
    data: customerSettings,
    isLoading,
    isError,
  } = useCustomerSettings();

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">
          Loading customer settings...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">
          Unable to load customer settings.
        </p>
      </div>
    );
  }

  if (!customerSettings) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">
          No customer settings found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Customer Configuration
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage customer settings, customer types,
          customer statuses and default customer configuration.
        </p>
      </div>

      <CustomerSettingsForm
        initialSettings={customerSettings}
      />
    </div>
  );
};

export default CustomerSettings;
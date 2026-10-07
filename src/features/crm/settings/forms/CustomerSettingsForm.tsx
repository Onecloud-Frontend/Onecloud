import React, { useState } from 'react';

import type { CustomerSettings } from '../types/customerSettings.types';

import { useUpdateCustomerSettings } from '../hooks/useCustomerSettings';

import {
  validateCustomerSettings,
  type CustomerSettingsErrors,
} from '../schemas/customerSettings.schema';

interface CustomerSettingsFormProps {
  initialSettings: CustomerSettings;
}

export const CustomerSettingsForm: React.FC<CustomerSettingsFormProps> = ({
  initialSettings,
}) => {
  const [formData, setFormData] =
    useState<CustomerSettings>(initialSettings);

  const [errors, setErrors] =
    useState<CustomerSettingsErrors>({});

  const updateCustomerSettings = useUpdateCustomerSettings();

  // General Settings
  const handleGeneralSettingChange = (
    field: keyof CustomerSettings['generalSettings']
  ) => {
    setFormData({
      ...formData,
      generalSettings: {
        ...formData.generalSettings,
        [field]: !formData.generalSettings[field],
      },
    });
  };

  // Customer Type Name / Description
  const handleCustomerTypeChange = (
    index: number,
    field: 'name' | 'description',
    value: string
  ) => {
    const updatedTypes = [...formData.customerTypes];

    updatedTypes[index] = {
      ...updatedTypes[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      customerTypes: updatedTypes,
    });
  };

  // Customer Type Active / Inactive
  const handleCustomerTypeActiveChange = (index: number) => {
    const updatedTypes = [...formData.customerTypes];

    updatedTypes[index] = {
      ...updatedTypes[index],
      isActive: !updatedTypes[index].isActive,
    };

    setFormData({
      ...formData,
      customerTypes: updatedTypes,
    });
  };

  // Customer Status Name / Description
  const handleCustomerStatusChange = (
    index: number,
    field: 'name' | 'description',
    value: string
  ) => {
    const updatedStatuses = [...formData.customerStatuses];

    updatedStatuses[index] = {
      ...updatedStatuses[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      customerStatuses: updatedStatuses,
    });
  };

  // Customer Status Active / Inactive
  const handleCustomerStatusActiveChange = (index: number) => {
    const updatedStatuses = [...formData.customerStatuses];

    updatedStatuses[index] = {
      ...updatedStatuses[index],
      isActive: !updatedStatuses[index].isActive,
    };

    setFormData({
      ...formData,
      customerStatuses: updatedStatuses,
    });
  };

  // Default Configuration
  const handleDefaultChange = (
    field: keyof CustomerSettings['defaults'],
    value: string
  ) => {
    setFormData({
      ...formData,
      defaults: {
        ...formData.defaults,
        [field]: value,
      },
    });
  };

  // Save Settings
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateCustomerSettings(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    updateCustomerSettings.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Customer Settings */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Customer Settings
        </h2>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={
                formData.generalSettings.allowDuplicateCustomers
              }
              onChange={() =>
                handleGeneralSettingChange(
                  'allowDuplicateCustomers'
                )
              }
              className="h-4 w-4"
            />

            Allow Duplicate Customers
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={
                formData.generalSettings.autoAssignCustomerOwner
              }
              onChange={() =>
                handleGeneralSettingChange(
                  'autoAssignCustomerOwner'
                )
              }
              className="h-4 w-4"
            />

            Auto Assign Customer Owner
          </label>
        </div>
      </section>

      {/* Customer Types */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Customer Types
        </h2>

        <div className="space-y-3">
          {formData.customerTypes.map((type, index) => (
            <div
              key={type.id}
              className="grid gap-3 md:grid-cols-[1fr_2fr_auto] md:items-center"
            >
              <input
                type="text"
                value={type.name}
                placeholder="Customer type"
                onChange={(e) =>
                  handleCustomerTypeChange(
                    index,
                    'name',
                    e.target.value
                  )
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />

              <input
                type="text"
                value={type.description ?? ''}
                placeholder="Description"
                onChange={(e) =>
                  handleCustomerTypeChange(
                    index,
                    'description',
                    e.target.value
                  )
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />

              <label className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={type.isActive}
                  onChange={() =>
                    handleCustomerTypeActiveChange(index)
                  }
                  className="h-4 w-4"
                />

                Active
              </label>
            </div>
          ))}
        </div>

        {errors.customerTypes && (
          <p className="mt-2 text-sm text-red-600">
            {errors.customerTypes}
          </p>
        )}
      </section>

      {/* Customer Status */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Customer Status
        </h2>

        <div className="space-y-3">
          {formData.customerStatuses.map((status, index) => (
            <div
              key={status.id}
              className="grid gap-3 md:grid-cols-[1fr_2fr_auto] md:items-center"
            >
              <input
                type="text"
                value={status.name}
                placeholder="Customer status"
                onChange={(e) =>
                  handleCustomerStatusChange(
                    index,
                    'name',
                    e.target.value
                  )
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />

              <input
                type="text"
                value={status.description ?? ''}
                placeholder="Description"
                onChange={(e) =>
                  handleCustomerStatusChange(
                    index,
                    'description',
                    e.target.value
                  )
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />

              <label className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={status.isActive}
                  onChange={() =>
                    handleCustomerStatusActiveChange(index)
                  }
                  className="h-4 w-4"
                />

                Active
              </label>
            </div>
          ))}
        </div>

        {errors.customerStatuses && (
          <p className="mt-2 text-sm text-red-600">
            {errors.customerStatuses}
          </p>
        )}
      </section>

      {/* Default Customer Configuration */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Default Customer Configuration
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Default Customer Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Default Customer Type
            </label>

            <select
              value={formData.defaults.defaultCustomerType}
              onChange={(e) =>
                handleDefaultChange(
                  'defaultCustomerType',
                  e.target.value
                )
              }
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                Select customer type
              </option>

              {formData.customerTypes
                .filter((type) => type.isActive)
                .map((type) => (
                  <option
                    key={type.id}
                    value={type.name}
                  >
                    {type.name}
                  </option>
                ))}
            </select>

            {errors.defaultCustomerType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.defaultCustomerType}
              </p>
            )}
          </div>

          {/* Default Customer Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Default Customer Status
            </label>

            <select
              value={formData.defaults.defaultCustomerStatus}
              onChange={(e) =>
                handleDefaultChange(
                  'defaultCustomerStatus',
                  e.target.value
                )
              }
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                Select customer status
              </option>

              {formData.customerStatuses
                .filter((status) => status.isActive)
                .map((status) => (
                  <option
                    key={status.id}
                    value={status.name}
                  >
                    {status.name}
                  </option>
                ))}
            </select>

            {errors.defaultCustomerStatus && (
              <p className="mt-1 text-sm text-red-600">
                {errors.defaultCustomerStatus}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={updateCustomerSettings.isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updateCustomerSettings.isPending
            ? 'Saving...'
            : 'Save Changes'}
        </button>

        {updateCustomerSettings.isSuccess && (
          <p className="text-sm text-green-600">
            Customer settings saved successfully.
          </p>
        )}

        {updateCustomerSettings.isError && (
          <p className="text-sm text-red-600">
            Unable to save customer settings.
          </p>
        )}
      </div>
    </form>
  );
};
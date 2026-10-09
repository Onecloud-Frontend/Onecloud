import { quotationSettingsMockData } from "../mocks/quotationSettingsMockData";
import type { QuotationSettings } from "../types/quotationSettings.types";
import type { QuotationSettingsFormValues } from "../schemas/quotationSettings.schema";

const REQUEST_DELAY_MS = 300;

let quotationSettings: QuotationSettings = {
  ...quotationSettingsMockData,
  quoteStatuses: quotationSettingsMockData.quoteStatuses.map(
    (status) => ({ ...status }),
  ),
};

function simulateRequest<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, REQUEST_DELAY_MS);
  });
}

async function getQuotationSettings(): Promise<QuotationSettings> {
  return simulateRequest({
    ...quotationSettings,
    quoteStatuses: quotationSettings.quoteStatuses.map(
      (status) => ({ ...status }),
    ),
  });
}

async function updateQuotationSettings(
  values: QuotationSettingsFormValues,
): Promise<QuotationSettings> {
  quotationSettings = {
    ...quotationSettings,
    ...values,
    quoteStatuses: values.quoteStatuses.map(
      (status) => ({ ...status }),
    ),
    updatedAt: new Date().toISOString(),
    updatedBy: "VENNELA GOPICHAND",
  };

  return simulateRequest({
    ...quotationSettings,
    quoteStatuses: quotationSettings.quoteStatuses.map(
      (status) => ({ ...status }),
    ),
  });
}

export const quotationSettingsService = {
  getQuotationSettings,
  updateQuotationSettings,
};

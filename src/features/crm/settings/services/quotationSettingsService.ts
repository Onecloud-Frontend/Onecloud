import { quotationSettingsMockData } from "../mocks/quotationSettingsMockData";
import { quotationSettingsSchema } from "../schemas/quotationSettings.schema";
import type { QuotationSettingsFormValues } from "../schemas/quotationSettings.schema";
import type { QuotationSettings } from "../types/quotationSettings.types";

const REQUEST_DELAY_MS = 300;

let quotationSettings: QuotationSettings = cloneData(
  quotationSettingsMockData,
);

function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

function simulateRequest<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cloneData(data));
    }, REQUEST_DELAY_MS);
  });
}

const getQuotationSettings =
  async (): Promise<QuotationSettings> => {
    return simulateRequest(quotationSettings);
  };

const updateQuotationSettings = async (
  values: QuotationSettingsFormValues,
): Promise<QuotationSettings> => {
  const validatedValues =
    quotationSettingsSchema.parse(values);

  quotationSettings = {
    ...quotationSettings,
    ...validatedValues,
    quoteStatuses: validatedValues.quoteStatuses.map(
      (status) => ({
        ...status,
      }),
    ),
    updatedAt: new Date().toISOString(),
    updatedBy: "VENNELA GOPICHAND",
  };

  return simulateRequest(quotationSettings);
};

export const quotationSettingsService = {
  getQuotationSettings,
  updateQuotationSettings,
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  useFieldArray,
  useForm,
} from "react-hook-form";

import {
  quotationSettingsSchema,
  type QuotationSettingsFormValues,
} from "../schemas/quotationSettings.schema";

import type { QuotationSettings } from "../types/quotationSettings.types";

interface QuotationSettingsFormProps {
  initialValues?: QuotationSettings;
  isSubmitting: boolean;
  onSubmit: (
    values: QuotationSettingsFormValues,
  ) => Promise<void>;
  onCancel?: () => void;
}

const DEFAULT_FORM_VALUES: QuotationSettingsFormValues = {
  quoteNumberPrefix: "QT-",
  nextQuoteNumber: 1,
  quoteNumberFormat: "QT-{YYYY}-{####}",

  quoteStatuses: [
    {
      id: "quote-status-draft",
      name: "Draft",
      code: "draft",
      description:
        "Quotation is being prepared and has not been submitted.",
      active: true,
    },
    {
      id: "quote-status-sent",
      name: "Sent",
      code: "sent",
      description:
        "Quotation has been sent to the customer.",
      active: true,
    },
    {
      id: "quote-status-accepted",
      name: "Accepted",
      code: "accepted",
      description:
        "Customer has accepted the quotation.",
      active: true,
    },
    {
      id: "quote-status-rejected",
      name: "Rejected",
      code: "rejected",
      description:
        "Quotation has been rejected.",
      active: true,
    },
    {
      id: "quote-status-expired",
      name: "Expired",
      code: "expired",
      description:
        "Quotation is no longer valid.",
      active: true,
    },
  ],

  approvalRequired: true,
  approvalThreshold: 100000,

  defaultCurrency: "INR",
  defaultTaxRate: 18,
  allowDiscount: true,
  maximumDiscount: 20,
};

const inputClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50";

const selectClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50";

const textareaClassName =
  "w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50";

const labelClassName =
  "mb-1.5 block text-sm font-medium text-slate-700";

export function QuotationSettingsForm({
  initialValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: QuotationSettingsFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<QuotationSettingsFormValues>({
    resolver: zodResolver(quotationSettingsSchema),
    defaultValues:
      initialValues ?? DEFAULT_FORM_VALUES,
  });

  const { fields } = useFieldArray({
    control,
    name: "quoteStatuses",
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const submitForm = async (
    values: QuotationSettingsFormValues,
  ) => {
    await onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-6"
    >
      {/* Quote Numbering */}

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <span
                className="text-sm font-bold"
                aria-hidden="true"
              >
                #
              </span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Quote Numbering
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Configure how quotation numbers are
                generated.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 px-6 py-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="quoteNumberPrefix"
              className={labelClassName}
            >
              Quote Number Prefix
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="quoteNumberPrefix"
              type="text"
              placeholder="QT-"
              {...register("quoteNumberPrefix")}
              disabled={isSubmitting}
              className={inputClassName}
            />

            {errors.quoteNumberPrefix?.message && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.quoteNumberPrefix.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="nextQuoteNumber"
              className={labelClassName}
            >
              Next Quote Number
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="nextQuoteNumber"
              type="number"
              min={1}
              {...register("nextQuoteNumber", {
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
              className={inputClassName}
            />

            {errors.nextQuoteNumber?.message && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.nextQuoteNumber.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <label
              htmlFor="quoteNumberFormat"
              className={labelClassName}
            >
              Quote Number Format
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="quoteNumberFormat"
              type="text"
              placeholder="QT-{YYYY}-{####}"
              {...register("quoteNumberFormat")}
              disabled={isSubmitting}
              className={inputClassName}
            />

            {errors.quoteNumberFormat?.message && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.quoteNumberFormat.message}
              </p>
            )}

            <p className="mt-1.5 text-xs text-slate-500">
              Example: QT-2026-0007
            </p>
          </div>
        </div>
      </section>

      {/* Quote Statuses */}

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <span
                className="text-sm font-bold"
                aria-hidden="true"
              >
                ✓
              </span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Quote Statuses
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage the statuses available throughout
                the quotation lifecycle.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto px-6 py-6">
          <div className="min-w-[820px] overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full table-fixed">
              <thead className="bg-slate-50">
                <tr>
                  <th className="w-[17%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Code
                  </th>

                  <th className="w-[45%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Description
                  </th>

                  <th className="w-[15%] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Active
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                {fields.map((field, index) => (
                  <tr key={field.id}>
                    <td className="px-4 py-3 align-top">
                      <input
                        type="text"
                        {...register(
                          `quoteStatuses.${index}.name`,
                        )}
                        disabled={isSubmitting}
                        className={inputClassName}
                      />

                      {errors.quoteStatuses?.[index]?.name
                        ?.message && (
                        <p className="mt-1 text-xs text-red-600">
                          {
                            errors.quoteStatuses[index]?.name
                              ?.message
                          }
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-3 align-top">
                      <input
                        type="text"
                        {...register(
                          `quoteStatuses.${index}.code`,
                        )}
                        disabled
                        className={`${inputClassName} bg-slate-50 text-slate-500`}
                      />
                    </td>

                    <td className="px-4 py-3 align-top">
                      <textarea
                        rows={2}
                        {...register(
                          `quoteStatuses.${index}.description`,
                        )}
                        disabled={isSubmitting}
                        className={textareaClassName}
                      />

                      {errors.quoteStatuses?.[index]
                        ?.description?.message && (
                        <p className="mt-1 text-xs text-red-600">
                          {
                            errors.quoteStatuses[index]
                              ?.description?.message
                          }
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-3 align-top text-center">
                      <label className="inline-flex cursor-pointer items-center justify-center">
                        <input
                          type="checkbox"
                          {...register(
                            `quoteStatuses.${index}.active`,
                          )}
                          disabled={isSubmitting}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                        />

                        <span className="sr-only">
                          Active
                        </span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {errors.quoteStatuses?.message && (
            <p className="mt-2 text-xs text-red-600">
              {errors.quoteStatuses.message}
            </p>
          )}
        </div>
      </section>

      {/* Approval Configuration */}

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <span
                className="text-sm font-bold"
                aria-hidden="true"
              >
                A
              </span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Approval Configuration
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Define when quotations require approval
                before they can proceed.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 px-6 py-6 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                {...register("approvalRequired")}
                disabled={isSubmitting}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <span>
                <span className="block text-sm font-medium text-slate-800">
                  Require quotation approval
                </span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Quotations meeting the configured
                  threshold will require approval.
                </span>
              </span>
            </label>
          </div>

          <div>
            <label
              htmlFor="approvalThreshold"
              className={labelClassName}
            >
              Approval Threshold
            </label>

            <input
              id="approvalThreshold"
              type="number"
              min={0}
              step="0.01"
              {...register("approvalThreshold", {
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
              className={inputClassName}
            />

            {errors.approvalThreshold?.message && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.approvalThreshold.message}
              </p>
            )}

            <p className="mt-1.5 text-xs text-slate-500">
              Approval is required when the quotation
              reaches this amount.
            </p>
          </div>
        </div>
      </section>

      {/* Tax & Pricing */}

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <span
                className="text-sm font-bold"
                aria-hidden="true"
              >
                %
              </span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Tax &amp; Pricing
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Configure the default currency, tax and
                discount behaviour for quotations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 px-6 py-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="defaultCurrency"
              className={labelClassName}
            >
              Default Currency
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              id="defaultCurrency"
              {...register("defaultCurrency")}
              disabled={isSubmitting}
              className={selectClassName}
            >
              <option value="INR">
                INR - Indian Rupee
              </option>

              <option value="USD">
                USD - US Dollar
              </option>

              <option value="EUR">
                EUR - Euro
              </option>

              <option value="GBP">
                GBP - British Pound
              </option>
            </select>

            {errors.defaultCurrency?.message && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.defaultCurrency.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="defaultTaxRate"
              className={labelClassName}
            >
              Default Tax Rate (%)
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="defaultTaxRate"
              type="number"
              min={0}
              max={100}
              step="0.01"
              {...register("defaultTaxRate", {
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
              className={inputClassName}
            />

            {errors.defaultTaxRate?.message && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.defaultTaxRate.message}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                {...register("allowDiscount")}
                disabled={isSubmitting}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <span>
                <span className="block text-sm font-medium text-slate-800">
                  Allow Discount
                </span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Allow users to apply discounts to
                  quotations.
                </span>
              </span>
            </label>
          </div>

          <div>
            <label
              htmlFor="maximumDiscount"
              className={labelClassName}
            >
              Maximum Discount (%)
            </label>

            <input
              id="maximumDiscount"
              type="number"
              min={0}
              max={100}
              step="0.01"
              {...register("maximumDiscount", {
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
              className={inputClassName}
            />

            {errors.maximumDiscount?.message && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.maximumDiscount.message}
              </p>
            )}

            <p className="mt-1.5 text-xs text-slate-500">
              Maximum discount a user can apply.
            </p>
          </div>
        </div>
      </section>

      {/* Actions */}

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden="true"
            />
          )}

          {isSubmitting
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

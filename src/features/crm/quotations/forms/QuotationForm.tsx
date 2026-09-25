import { useEffect, useState } from "react";
import {
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  quotationFormSchema,
  type QuotationFormSchemaValues,
} from "../schemas/quotationFormSchema";

import type {
  CurrencyCode,
  QuotationFormValues,
  QuotationLineItem,
} from "../types/quotation.types";

interface QuotationFormProps {
  initialValues?: QuotationFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (
    values: QuotationFormValues,
  ) => Promise<void>;
  onCancel: () => void;
}

function createEmptyLineItem(): QuotationLineItem {
  return {
    id: crypto.randomUUID(),
    productId: "",
    productName: "",
    description: "",
    quantity: 1,
    unitPrice: 0,
    discountPercent: 0,
    taxRate: 18,
    discountAmount: 0,
    taxAmount: 0,
    subtotal: 0,
    total: 0,
  };
}

const DEFAULT_FORM_VALUES: QuotationFormSchemaValues = {
  customerId: "",
  opportunityId: "",
  quoteDate: new Date()
    .toISOString()
    .split("T")[0],
  validUntil: "",
  salespersonId: "",
  currency: "INR",
  paymentTerms: "",
  deliveryTerms: "",
  lineItems: [createEmptyLineItem()],
  notes: "",
};

function calculateLineItem(
  item: QuotationLineItem,
): QuotationLineItem {
  const quantity =
    Number(item.quantity) || 0;

  const unitPrice =
    Number(item.unitPrice) || 0;

  const discountPercent =
    Number(item.discountPercent) || 0;

  const taxRate =
    Number(item.taxRate) || 0;

  const subtotal =
    quantity * unitPrice;

  const discountAmount =
    subtotal *
    (discountPercent / 100);

  const taxableAmount =
    subtotal - discountAmount;

  const taxAmount =
    taxableAmount *
    (taxRate / 100);

  const total =
    taxableAmount + taxAmount;

  return {
    ...item,
    quantity,
    unitPrice,
    discountPercent,
    taxRate,
    subtotal,
    discountAmount,
    taxAmount,
    total,
  };
}

const customerOptions = [
  {
    id: "cust-001",
    name: "Acme Technologies",
  },
  {
    id: "cust-002",
    name: "GlobalTech Solutions",
  },
  {
    id: "cust-003",
    name: "Nova Retail Group",
  },
  {
    id: "cust-004",
    name: "Vertex Manufacturing Ltd",
  },
  {
    id: "cust-005",
    name: "BrightWave Digital Services",
  },
];

const opportunityOptions = [
  {
    id: "opp-001",
    name: "Acme Cloud Migration",
  },
  {
    id: "opp-002",
    name: "GlobalTech Infrastructure",
  },
  {
    id: "opp-003",
    name: "Nova Retail Expansion",
  },
  {
    id: "opp-004",
    name: "Vertex ERP Upgrade",
  },
];

const salespersonOptions = [
  {
    id: "sp-001",
    name: "Vennela Gopichand",
  },
  {
    id: "sp-002",
    name: "Rahul Sharma",
  },
  {
    id: "sp-003",
    name: "Priya Reddy",
  },
];

const currencyOptions: CurrencyCode[] = [
  "INR",
  "USD",
  "EUR",
  "GBP",
];

export function QuotationForm({
  initialValues,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}: QuotationFormProps) {
  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } =
    useForm<QuotationFormSchemaValues>({
      resolver:
        zodResolver(quotationFormSchema),
      defaultValues:
        initialValues ??
        DEFAULT_FORM_VALUES,
    });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
      setSubmitError(null);
    }
  }, [initialValues, reset]);

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "lineItems",
  });

  const watchedLineItems =
    useWatch({
      control,
      name: "lineItems",
    });

  const pricing =
    watchedLineItems.reduce(
      (summary, item) => {
        const calculated =
          calculateLineItem(item);

        summary.subtotal +=
          calculated.subtotal;

        summary.discount +=
          calculated.discountAmount;

        summary.tax +=
          calculated.taxAmount;

        summary.grandTotal +=
          calculated.total;

        return summary;
      },
      {
        subtotal: 0,
        discount: 0,
        tax: 0,
        grandTotal: 0,
      },
    );

  const formatAmount = (
    amount: number,
  ) =>
    new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  const submitForm = async (
    values: QuotationFormSchemaValues,
  ) => {
    setSubmitError(null);

    const calculatedLineItems =
      values.lineItems.map(
        calculateLineItem,
      );

    try {
      await onSubmit({
        ...values,
        lineItems: calculatedLineItems,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to save the quotation. Please try again.",
      );
    }
  };

  const inputClass =
    "h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

  const selectClass =
    "h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

  const labelClass =
    "mb-1.5 block text-xs font-medium text-slate-700";

  const errorClass =
    "mt-1 text-xs text-red-600";

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(
        submitForm,
      )}
      noValidate
    >
      {/* Submission error */}
      {submitError && (
        <div
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          role="alert"
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700"
            aria-hidden="true"
          >
            !
          </span>

          <div className="min-w-0 flex-1">
            <strong className="block text-sm font-semibold text-red-900">
              Unable to save quotation
            </strong>

            <p className="mt-0.5 text-sm text-red-700">
              {submitError}
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-md p-1 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() =>
              setSubmitError(null)
            }
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* Customer & quotation information */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Quotation information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Customer, opportunity and quotation
            details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
          {/* Customer */}
          <div>
            <label
              htmlFor="quotation-customer"
              className={labelClass}
            >
              Customer{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <select
              id="quotation-customer"
              className={selectClass}
              {...register("customerId")}
            >
              <option value="">
                Select customer
              </option>

              {customerOptions.map(
                (customer) => (
                  <option
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.name}
                  </option>
                ),
              )}
            </select>

            {errors.customerId && (
              <div className={errorClass}>
                {errors.customerId.message}
              </div>
            )}
          </div>

          {/* Opportunity */}
          <div>
            <label
              htmlFor="quotation-opportunity"
              className={labelClass}
            >
              Opportunity
            </label>

            <select
              id="quotation-opportunity"
              className={selectClass}
              {...register(
                "opportunityId",
              )}
            >
              <option value="">
                Select opportunity
              </option>

              {opportunityOptions.map(
                (opportunity) => (
                  <option
                    key={opportunity.id}
                    value={opportunity.id}
                  >
                    {opportunity.name}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Salesperson */}
          <div>
            <label
              htmlFor="quotation-salesperson"
              className={labelClass}
            >
              Salesperson{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <select
              id="quotation-salesperson"
              className={selectClass}
              {...register(
                "salespersonId",
              )}
            >
              <option value="">
                Select salesperson
              </option>

              {salespersonOptions.map(
                (salesperson) => (
                  <option
                    key={salesperson.id}
                    value={salesperson.id}
                  >
                    {salesperson.name}
                  </option>
                ),
              )}
            </select>

            {errors.salespersonId && (
              <div className={errorClass}>
                {errors.salespersonId.message}
              </div>
            )}
          </div>

          {/* Quote date */}
          <div>
            <label
              htmlFor="quotation-quote-date"
              className={labelClass}
            >
              Quote date{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <input
              id="quotation-quote-date"
              type="date"
              className={inputClass}
              {...register(
                "quoteDate",
              )}
            />

            {errors.quoteDate && (
              <div className={errorClass}>
                {errors.quoteDate.message}
              </div>
            )}
          </div>

          {/* Valid until */}
          <div>
            <label
              htmlFor="quotation-valid-until"
              className={labelClass}
            >
              Valid until{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <input
              id="quotation-valid-until"
              type="date"
              className={inputClass}
              {...register(
                "validUntil",
              )}
            />

            {errors.validUntil && (
              <div className={errorClass}>
                {errors.validUntil.message}
              </div>
            )}
          </div>

          {/* Currency */}
          <div>
            <label
              htmlFor="quotation-currency"
              className={labelClass}
            >
              Currency{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <select
              id="quotation-currency"
              className={selectClass}
              {...register(
                "currency",
              )}
            >
              {currencyOptions.map(
                (currency) => (
                  <option
                    key={currency}
                    value={currency}
                  >
                    {currency}
                  </option>
                ),
              )}
            </select>

            {errors.currency && (
              <div className={errorClass}>
                {errors.currency.message}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Commercial terms */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Commercial terms
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Payment and delivery conditions for
            the quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
          {/* Payment terms */}
          <div>
            <label
              htmlFor="quotation-payment-terms"
              className={labelClass}
            >
              Payment terms
            </label>

            <input
              id="quotation-payment-terms"
              type="text"
              className={inputClass}
              placeholder="e.g. Net 30"
              {...register(
                "paymentTerms",
              )}
            />

            {errors.paymentTerms && (
              <div className={errorClass}>
                {errors.paymentTerms.message}
              </div>
            )}
          </div>

          {/* Delivery terms */}
          <div>
            <label
              htmlFor="quotation-delivery-terms"
              className={labelClass}
            >
              Delivery terms
            </label>

            <input
              id="quotation-delivery-terms"
              type="text"
              className={inputClass}
              placeholder="e.g. Delivery within 15 days"
              {...register(
                "deliveryTerms",
              )}
            />

            {errors.deliveryTerms && (
              <div className={errorClass}>
                {errors.deliveryTerms.message}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Line items */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Line items
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Add products or services included in
            this quotation.
          </p>
        </div>

        {errors.lineItems?.root && (
          <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 sm:mx-6">
            {errors.lineItems.root.message}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[220px]" />
              <col className="w-[250px]" />
              <col className="w-[100px]" />
              <col className="w-[145px]" />
              <col className="w-[125px]" />
              <col className="w-[105px]" />
              <col className="w-[150px]" />
              <col className="w-[90px]" />
            </colgroup>

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Product / Service
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Qty
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Unit Price
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Discount %
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Tax %
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Total
                </th>

                <th className="px-4 py-3" />
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {fields.map(
                (
                  field,
                  index,
                ) => {
                  const item =
                    watchedLineItems?.[
                      index
                    ] ?? field;

                  const calculated =
                    calculateLineItem(
                      item,
                    );

                  const lineItemError =
                    errors.lineItems?.[
                      index
                    ];

                  return (
                    <tr
                      key={field.id}
                      className="align-top"
                    >
                      {/* Product */}
                      <td className="max-w-0 px-5 py-3">
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="Product / service"
                          {...register(
                            `lineItems.${index}.productName`,
                          )}
                        />

                        {lineItemError?.productName && (
                          <div className={errorClass}>
                            {
                              lineItemError
                                .productName
                                .message
                            }
                          </div>
                        )}
                      </td>

                      {/* Description */}
                      <td className="max-w-0 px-4 py-3">
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="Description"
                          {...register(
                            `lineItems.${index}.description`,
                          )}
                        />
                      </td>

                      {/* Quantity */}
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          className={`${inputClass} text-right`}
                          {...register(
                            `lineItems.${index}.quantity`,
                            {
                              valueAsNumber:
                                true,
                            },
                          )}
                        />

                        {lineItemError?.quantity && (
                          <div className={errorClass}>
                            {
                              lineItemError
                                .quantity
                                .message
                            }
                          </div>
                        )}
                      </td>

                      {/* Unit price */}
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className={`${inputClass} text-right`}
                          {...register(
                            `lineItems.${index}.unitPrice`,
                            {
                              valueAsNumber:
                                true,
                            },
                          )}
                        />

                        {lineItemError?.unitPrice && (
                          <div className={errorClass}>
                            {
                              lineItemError
                                .unitPrice
                                .message
                            }
                          </div>
                        )}
                      </td>

                      {/* Discount */}
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          className={`${inputClass} text-right`}
                          {...register(
                            `lineItems.${index}.discountPercent`,
                            {
                              valueAsNumber:
                                true,
                            },
                          )}
                        />

                        {lineItemError?.discountPercent && (
                          <div className={errorClass}>
                            {
                              lineItemError
                                .discountPercent
                                .message
                            }
                          </div>
                        )}
                      </td>

                      {/* Tax */}
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          className={`${inputClass} text-right`}
                          {...register(
                            `lineItems.${index}.taxRate`,
                            {
                              valueAsNumber:
                                true,
                            },
                          )}
                        />

                        {lineItemError?.taxRate && (
                          <div className={errorClass}>
                            {
                              lineItemError
                                .taxRate
                                .message
                            }
                          </div>
                        )}
                      </td>

                      {/* Total */}
                      <td className="px-4 py-3 text-right align-middle">
                        <div className="overflow-hidden pt-2 text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-800">
                          {formatAmount(
                            calculated.total,
                          )}
                        </div>
                      </td>

                      {/* Remove */}
                      <td className="px-4 py-3 text-right align-middle">
                        <button
                          type="button"
                          className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-red-200"
                          onClick={() =>
                            remove(index)
                          }
                          disabled={
                            fields.length === 1 ||
                            isSubmitting
                          }
                          aria-label={`Remove line item ${index + 1}`}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 px-5 py-4 sm:px-6">
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
            onClick={() =>
              append(
                createEmptyLineItem(),
              )
            }
            disabled={isSubmitting}
          >
            <span aria-hidden="true">
              +
            </span>
            Add line item
          </button>
        </div>
      </section>

      {/* Pricing */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Pricing summary
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Pricing is calculated automatically
            from the line items.
          </p>
        </div>

        <div className="flex justify-end px-5 py-5 sm:px-6">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-slate-500">
                Subtotal
              </span>

              <strong className="font-medium text-slate-800">
                {formatAmount(
                  pricing.subtotal,
                )}
              </strong>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-slate-500">
                Discount
              </span>

              <strong className="font-medium text-slate-800">
                -{" "}
                {formatAmount(
                  pricing.discount,
                )}
              </strong>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-slate-500">
                Tax
              </span>

              <strong className="font-medium text-slate-800">
                {formatAmount(
                  pricing.tax,
                )}
              </strong>
            </div>

            <div className="my-3 border-t border-slate-200" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">
                Grand Total
              </span>

              <strong className="text-lg font-semibold text-slate-900">
                {formatAmount(
                  pricing.grandTotal,
                )}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Notes
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Add any additional information for
            this quotation.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <textarea
            className="min-h-[120px] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-5 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Enter quotation notes..."
            {...register("notes")}
          />

          {errors.notes && (
            <div className={errorClass}>
              {errors.notes.message}
            </div>
          )}
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
}

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

import "../styles/quotation-form.css";

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

  /*
   * Edit mode:
   * quotation data arrives asynchronously,
   * so reset the form when initialValues
   * becomes available.
   */
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

  return (
    <form
      className="quotation-form"
      onSubmit={handleSubmit(
        submitForm,
      )}
      noValidate
    >
      {/* Submission error */}

      {submitError && (
        <div
          className="quotation-form-submit-error"
          role="alert"
        >
          <span
            className="quotation-form-submit-error-icon"
            aria-hidden="true"
          >
            !
          </span>

          <div>
            <strong>
              Unable to save quotation
            </strong>

            <p>
              {submitError}
            </p>
          </div>

          <button
            type="button"
            className="quotation-form-submit-error-close"
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

      <section className="form-section">
        <div className="form-section-header">
          <div>
            <h2 className="form-section-title">
              Quotation information
            </h2>

            <p className="form-section-description">
              Customer, opportunity and
              quotation details.
            </p>
          </div>
        </div>

        <div className="form-grid form-grid-three">
          <div className="form-field">
            <label className="form-label">
              Customer{" "}
              <span className="required">
                *
              </span>
            </label>

            <select
              className="form-select"
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
              <div className="form-error">
                {
                  errors.customerId
                    .message
                }
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              Opportunity
            </label>

            <select
              className="form-select"
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
                    value={
                      opportunity.id
                    }
                  >
                    {opportunity.name}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="form-field">
            <label className="form-label">
              Salesperson{" "}
              <span className="required">
                *
              </span>
            </label>

            <select
              className="form-select"
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
                    value={
                      salesperson.id
                    }
                  >
                    {salesperson.name}
                  </option>
                ),
              )}
            </select>

            {errors.salespersonId && (
              <div className="form-error">
                {
                  errors.salespersonId
                    .message
                }
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              Quote date{" "}
              <span className="required">
                *
              </span>
            </label>

            <input
              type="date"
              className="form-input"
              {...register(
                "quoteDate",
              )}
            />

            {errors.quoteDate && (
              <div className="form-error">
                {
                  errors.quoteDate
                    .message
                }
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              Valid until{" "}
              <span className="required">
                *
              </span>
            </label>

            <input
              type="date"
              className="form-input"
              {...register(
                "validUntil",
              )}
            />

            {errors.validUntil && (
              <div className="form-error">
                {
                  errors.validUntil
                    .message
                }
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              Currency{" "}
              <span className="required">
                *
              </span>
            </label>

            <select
              className="form-select"
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
              <div className="form-error">
                {
                  errors.currency
                    .message
                }
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Commercial terms */}

      <section className="form-section">
        <div className="form-section-header">
          <div>
            <h2 className="form-section-title">
              Commercial terms
            </h2>

            <p className="form-section-description">
              Payment and delivery
              conditions for the
              quotation.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">
              Payment terms
            </label>

            <input
              type="text"
              className="form-input"
              placeholder="e.g. Net 30"
              {...register(
                "paymentTerms",
              )}
            />

            {errors.paymentTerms && (
              <div className="form-error">
                {
                  errors.paymentTerms
                    .message
                }
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              Delivery terms
            </label>

            <input
              type="text"
              className="form-input"
              placeholder="e.g. Delivery within 15 days"
              {...register(
                "deliveryTerms",
              )}
            />

            {errors.deliveryTerms && (
              <div className="form-error">
                {
                  errors.deliveryTerms
                    .message
                }
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Line items */}

      <section className="form-section">
        <div className="form-section-header">
          <div>
            <h2 className="form-section-title">
              Line items
            </h2>

            <p className="form-section-description">
              Add products or services
              included in this
              quotation.
            </p>
          </div>
        </div>

        {errors.lineItems?.root && (
          <div className="form-error">
            {
              errors.lineItems.root
                .message
            }
          </div>
        )}

        <div className="line-items-wrapper">
          <table className="line-items-table">
            <thead>
              <tr>
                <th>
                  Product / Service
                </th>

                <th>
                  Description
                </th>

                <th>
                  Qty
                </th>

                <th>
                  Unit Price
                </th>

                <th>
                  Discount %
                </th>

                <th>
                  Tax %
                </th>

                <th>
                  Total
                </th>

                <th />
              </tr>
            </thead>

            <tbody>
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
                      key={
                        field.id
                      }
                    >
                      <td>
                        <input
                          type="text"
                          className="form-input line-item-product"
                          placeholder="Product / service"
                          {...register(
                            `lineItems.${index}.productName`,
                          )}
                        />

                        {lineItemError?.productName && (
                          <div className="form-error">
                            {
                              lineItemError
                                .productName
                                .message
                            }
                          </div>
                        )}
                      </td>

                      <td>
                        <input
                          type="text"
                          className="form-input line-item-description"
                          placeholder="Description"
                          {...register(
                            `lineItems.${index}.description`,
                          )}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          className="form-input line-item-number"
                          {...register(
                            `lineItems.${index}.quantity`,
                            {
                              valueAsNumber:
                                true,
                            },
                          )}
                        />

                        {lineItemError?.quantity && (
                          <div className="form-error">
                            {
                              lineItemError
                                .quantity
                                .message
                            }
                          </div>
                        )}
                      </td>

                      <td>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="form-input line-item-number"
                          {...register(
                            `lineItems.${index}.unitPrice`,
                            {
                              valueAsNumber:
                                true,
                            },
                          )}
                        />

                        {lineItemError?.unitPrice && (
                          <div className="form-error">
                            {
                              lineItemError
                                .unitPrice
                                .message
                            }
                          </div>
                        )}
                      </td>

                      <td>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          className="form-input line-item-number"
                          {...register(
                            `lineItems.${index}.discountPercent`,
                            {
                              valueAsNumber:
                                true,
                            },
                          )}
                        />

                        {lineItemError?.discountPercent && (
                          <div className="form-error">
                            {
                              lineItemError
                                .discountPercent
                                .message
                            }
                          </div>
                        )}
                      </td>

                      <td>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          className="form-input line-item-number"
                          {...register(
                            `lineItems.${index}.taxRate`,
                            {
                              valueAsNumber:
                                true,
                            },
                          )}
                        />

                        {lineItemError?.taxRate && (
                          <div className="form-error">
                            {
                              lineItemError
                                .taxRate
                                .message
                            }
                          </div>
                        )}
                      </td>

                      <td>
                        <div className="line-item-total">
                          {formatAmount(
                            calculated.total,
                          )}
                        </div>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() =>
                            remove(
                              index,
                            )
                          }
                          disabled={
                            fields.length ===
                            1
                          }
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

        <button
          type="button"
          className="btn btn-secondary btn-add-item"
          onClick={() =>
            append(
              createEmptyLineItem(),
            )
          }
          disabled={isSubmitting}
        >
          + Add line item
        </button>
      </section>

      {/* Pricing */}

      <section className="form-section">
        <div className="form-section-header">
          <div>
            <h2 className="form-section-title">
              Pricing summary
            </h2>

            <p className="form-section-description">
              Pricing is calculated
              automatically from the
              line items.
            </p>
          </div>
        </div>

        <div className="pricing-layout">
          <div className="pricing-summary">
            <div className="pricing-row">
              <span>
                Subtotal
              </span>

              <strong>
                {formatAmount(
                  pricing.subtotal,
                )}
              </strong>
            </div>

            <div className="pricing-row">
              <span>
                Discount
              </span>

              <strong>
                -{" "}
                {formatAmount(
                  pricing.discount,
                )}
              </strong>
            </div>

            <div className="pricing-row">
              <span>
                Tax
              </span>

              <strong>
                {formatAmount(
                  pricing.tax,
                )}
              </strong>
            </div>

            <div className="pricing-row pricing-total">
              <span>
                Grand Total
              </span>

              <strong>
                {formatAmount(
                  pricing.grandTotal,
                )}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}

      <section className="form-section">
        <div className="form-section-header">
          <div>
            <h2 className="form-section-title">
              Notes
            </h2>

            <p className="form-section-description">
              Add any additional
              information for this
              quotation.
            </p>
          </div>
        </div>

        <div className="form-field">
          <textarea
            className="form-textarea"
            placeholder="Enter quotation notes..."
            {...register("notes")}
          />

          {errors.notes && (
            <div className="form-error">
              {errors.notes.message}
            </div>
          )}
        </div>
      </section>

      {/* Actions */}

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
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
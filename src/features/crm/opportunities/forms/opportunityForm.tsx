import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  opportunitySchema,
  type OpportunityFormInput,
  type OpportunityFormValues,
} from "../schemas/opportunitySchema";
import {
  OPPORTUNITY_STAGES,
  OPPORTUNITY_SOURCES,
  CURRENCY_OPTIONS,
} from "../mocks/opportunityConstants";

interface OpportunityFormProps {
  initialValues?: Partial<OpportunityFormInput>;
  submitLabel: string;
  onSubmit: (values: OpportunityFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function OpportunityForm({
  initialValues,
  submitLabel,
  onSubmit,
  isSubmitting = false,
}: OpportunityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OpportunityFormInput, unknown, OpportunityFormValues>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      name: "",
      customerName: "",
      contactName: "",
      description: "",
      stage: "Prospecting",
      expectedRevenue: 0,
      probability: 20,
      expectedCloseDate: "",
      ownerName: "",
      competitor: "",
      source: "",
      currency: "INR",
      notes: "",
      ...initialValues,
    },
  });

  const inputClassName =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClassName = "mb-1 block text-sm font-medium text-gray-700";

  const errorClassName = "mt-1 text-xs text-red-600";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
    >
      {/* Basic Information */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Opportunity Name */}
          <div>
            <label className={labelClassName}>
              Opportunity Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter opportunity name"
              {...register("name")}
              className={inputClassName}
            />

            {errors.name && (
              <p className={errorClassName}>{errors.name.message}</p>
            )}
          </div>

          {/* Customer */}
          <div>
            <label className={labelClassName}>
              Customer <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter customer name"
              {...register("customerName")}
              className={inputClassName}
            />

            {errors.customerName && (
              <p className={errorClassName}>
                {errors.customerName.message}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className={labelClassName}>Contact</label>

            <input
              type="text"
              placeholder="Enter contact name"
              {...register("contactName")}
              className={inputClassName}
            />

            {errors.contactName && (
              <p className={errorClassName}>
                {errors.contactName.message}
              </p>
            )}
          </div>

          {/* Owner */}
          <div>
            <label className={labelClassName}>
              Owner <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter owner name"
              {...register("ownerName")}
              className={inputClassName}
            />

            {errors.ownerName && (
              <p className={errorClassName}>{errors.ownerName.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Opportunity Details */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Opportunity Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Stage */}
          <div>
            <label className={labelClassName}>
              Stage <span className="text-red-500">*</span>
            </label>

            <select {...register("stage")} className={inputClassName}>
              <option value="">Select stage</option>

              {OPPORTUNITY_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>

            {errors.stage && (
              <p className={errorClassName}>{errors.stage.message}</p>
            )}
          </div>

          {/* Source */}
          <div>
            <label className={labelClassName}>Lead Source</label>

            <select {...register("source")} className={inputClassName}>
              <option value="">Select source</option>

              {OPPORTUNITY_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>

            {errors.source && (
              <p className={errorClassName}>{errors.source.message}</p>
            )}
          </div>

          {/* Expected Revenue */}
          <div>
            <label className={labelClassName}>
              Expected Revenue <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              inputMode="decimal"
              placeholder="Enter amount, e.g. 850000"
              {...register("expectedRevenue", {
                setValueAs: (value) => {
                  if (value === "") return undefined;

                  const numericValue = Number(
                    String(value).replace(/,/g, "").trim()
                  );

                  return Number.isNaN(numericValue)
                    ? value
                    : numericValue;
                },
              })}
              className={inputClassName}
            />

            <p className="mt-1 text-xs text-gray-500">
              Type the amount directly. Example: 850000
            </p>

            {errors.expectedRevenue && (
              <p className={errorClassName}>
                {errors.expectedRevenue.message}
              </p>
            )}
          </div>

          {/* Currency */}
          <div>
            <label className={labelClassName}>
              Currency <span className="text-red-500">*</span>
            </label>

            <select {...register("currency")} className={inputClassName}>
              <option value="">Select currency</option>

              {CURRENCY_OPTIONS.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            {errors.currency && (
              <p className={errorClassName}>{errors.currency.message}</p>
            )}
          </div>

          {/* Probability */}
          <div>
            <label className={labelClassName}>
              Probability (%) <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              min="0"
              max="100"
              step="1"
              placeholder="Enter probability"
              {...register("probability", {
                valueAsNumber: true,
              })}
              className={inputClassName}
            />

            {errors.probability && (
              <p className={errorClassName}>
                {errors.probability.message}
              </p>
            )}
          </div>

          {/* Expected Close Date */}
          <div>
            <label className={labelClassName}>
              Expected Close Date <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              {...register("expectedCloseDate")}
              className={inputClassName}
            />

            {errors.expectedCloseDate && (
              <p className={errorClassName}>
                {errors.expectedCloseDate.message}
              </p>
            )}
          </div>

          {/* Competitor */}
          <div>
            <label className={labelClassName}>Competitor</label>

            <input
              type="text"
              placeholder="Enter competitor name"
              {...register("competitor")}
              className={inputClassName}
            />

            {errors.competitor && (
              <p className={errorClassName}>
                {errors.competitor.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Description
        </h2>

        <textarea
          rows={4}
          placeholder="Enter opportunity description"
          {...register("description")}
          className={inputClassName}
        />

        {errors.description && (
          <p className={errorClassName}>{errors.description.message}</p>
        )}
      </section>

      {/* Notes */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Notes</h2>

        <textarea
          rows={4}
          placeholder="Enter additional notes"
          {...register("notes")}
          className={inputClassName}
        />

        {errors.notes && (
          <p className={errorClassName}>{errors.notes.message}</p>
        )}
      </section>

      {/* Actions */}
      <div className="flex justify-end border-t border-gray-200 pt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
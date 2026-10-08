import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {opportunitySchema, type OpportunityFormInput, type OpportunityFormValues,} from "../schemas/opportunitySchema";
import {OPPORTUNITY_STAGES,OPPORTUNITY_SOURCES,} from "../mocks/opportunityConstants";
import { users } from "@/features/crm/shared/data/users";

interface OpportunityFormProps {
  initialValues?: Partial<OpportunityFormInput>;
  submitLabel: string;
  onSubmit: (
    values: OpportunityFormValues,
  ) => void | Promise<void>;
  isSubmitting?: boolean;
}

export default function OpportunityForm({
  initialValues,
  submitLabel,
  onSubmit,
  isSubmitting = false,
}: OpportunityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    OpportunityFormInput,
    unknown,
    OpportunityFormValues
  >({
    resolver: zodResolver(opportunitySchema),

    defaultValues: {
      name: "",
      customerId: "",
      contactId: "",
      leadId: "",
      stage: "QUALIFICATION",
      probability: 20,
      expectedRevenue: 0,
      amount: 0,
      expectedCloseDate: "",
      assignedTo: "",
      source: "",
      competitors: [],
      description: "",
      ...initialValues,
    },
  });

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1 block text-sm font-medium text-gray-700";

  const errorClass =
    "mt-1 text-xs text-red-600";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
    >
      {/* =====================================================
          BASIC INFORMATION
      ====================================================== */}

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Opportunity Name */}
          <div>
            <label className={labelClass}>
              Opportunity Name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter opportunity name"
              {...register("name")}
              className={inputClass}
            />

            {errors.name && (
              <p className={errorClass}>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Customer - MANUAL INPUT */}
          <div>
            <label className={labelClass}>
              Customer{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter customer name"
              {...register("customerId")}
              className={inputClass}
            />

            {errors.customerId && (
              <p className={errorClass}>
                {errors.customerId.message}
              </p>
            )}
          </div>

          {/* Contact - MANUAL INPUT */}
          <div>
            <label className={labelClass}>
              Contact
            </label>

            <input
              type="text"
              placeholder="Enter contact name"
              {...register("contactId")}
              className={inputClass}
            />

            {errors.contactId && (
              <p className={errorClass}>
                {errors.contactId.message}
              </p>
            )}
          </div>

          {/* Owner */}
          <div>
            <label className={labelClass}>
              Owner{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              {...register("assignedTo")}
              className={inputClass}
            >
              <option value="">
                Select owner
              </option>

              {users
                .filter((user) => user.isActive)
                .map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.firstName} {user.lastName}
                  </option>
                ))}
            </select>

            {errors.assignedTo && (
              <p className={errorClass}>
                {errors.assignedTo.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          OPPORTUNITY DETAILS
      ====================================================== */}

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Opportunity Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Stage */}
          <div>
            <label className={labelClass}>
              Stage{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              {...register("stage")}
              className={inputClass}
            >
              {OPPORTUNITY_STAGES.map((stage) => (
                <option
                  key={stage}
                  value={stage}
                >
                  {stage.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Lead Source */}
          <div>
            <label className={labelClass}>
              Lead Source
            </label>

            <select
              {...register("source")}
              className={inputClass}
            >
              <option value="">
                Select source
              </option>

              {OPPORTUNITY_SOURCES.map((source) => (
                <option
                  key={source}
                  value={source}
                >
                  {source.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Expected Revenue */}
          <div>
            <label className={labelClass}>
              Expected Revenue{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              inputMode="decimal"
              placeholder="2250000"
              {...register("expectedRevenue", {
                setValueAs: (value) => {
                  if (value === "") {
                    return undefined;
                  }

                  const number = Number(
                    String(value)
                      .replace(/,/g, "")
                      .trim(),
                  );

                  return Number.isNaN(number)
                    ? value
                    : number;
                },
              })}
              className={inputClass}
            />

            {errors.expectedRevenue && (
              <p className={errorClass}>
                {errors.expectedRevenue.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className={labelClass}>
              Amount{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              inputMode="decimal"
              placeholder="3000000"
              {...register("amount", {
                setValueAs: (value) => {
                  if (value === "") {
                    return undefined;
                  }

                  const number = Number(
                    String(value)
                      .replace(/,/g, "")
                      .trim(),
                  );

                  return Number.isNaN(number)
                    ? value
                    : number;
                },
              })}
              className={inputClass}
            />

            {errors.amount && (
              <p className={errorClass}>
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Probability */}
          <div>
            <label className={labelClass}>
              Probability (%){" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              min="0"
              max="100"
              step="1"
              {...register("probability", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />

            {errors.probability && (
              <p className={errorClass}>
                {errors.probability.message}
              </p>
            )}
          </div>

          {/* Expected Close Date */}
          <div>
            <label className={labelClass}>
              Expected Close Date{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              {...register("expectedCloseDate")}
              className={inputClass}
            />

            {errors.expectedCloseDate && (
              <p className={errorClass}>
                {errors.expectedCloseDate.message}
              </p>
            )}
          </div>

          {/* Competitors */}
          <div className="md:col-span-2">
            <label className={labelClass}>
              Competitors
            </label>

            <input
              type="text"
              placeholder="CloudAxis, SkyStack"
              {...register("competitors", {
                setValueAs: (value) =>
                  String(value)
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
              })}
              className={inputClass}
            />

            <p className="mt-1 text-xs text-gray-500">
              Enter multiple competitors separated by commas.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          DESCRIPTION
      ====================================================== */}

      <section>
        <label className={labelClass}>
          Description
        </label>

        <textarea
          rows={4}
          placeholder="Enter opportunity description"
          {...register("description")}
          className={inputClass}
        />
      </section>

      {/* =====================================================
          SUBMIT
      ====================================================== */}

      <div className="flex justify-end border-t border-gray-200 pt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
}
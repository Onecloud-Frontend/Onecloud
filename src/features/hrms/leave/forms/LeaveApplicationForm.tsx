import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import type { LeaveBalance } from "@/features/hrms/shared/types";
import { formatDate, humanizeEnum } from "@/features/hrms/shared/utils";
import {
  LEAVE_TYPE_VALUES,
  leaveApplicationSchema,
  type LeaveApplicationValues,
} from "../schemas/leaveApplicationSchema";

interface LeaveApplicationFormProps {
  /** Shown as read-only guidance only; balance enforcement is backend-owned. */
  balances?: LeaveBalance[];
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: LeaveApplicationValues) => void;
  onCancel: () => void;
}

const inputClass =
  "mt-1 h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-50 aria-invalid:border-red-400";
const labelClass = "text-sm font-medium text-gray-700";

const FieldError: React.FC<{ id: string; message?: string }> = ({
  id,
  message,
}) =>
  message ? (
    <p id={id} className="mt-1 text-xs text-red-600">
      {message}
    </p>
  ) : null;

export const LeaveApplicationForm: React.FC<LeaveApplicationFormProps> = ({
  balances = [],
  isSubmitting = false,
  errorMessage = null,
  onSubmit,
  onCancel,
}) => {
  // UI step only (not a form field): "review" shows a summary before the final submit.
  const [reviewValues, setReviewValues] =
    useState<LeaveApplicationValues | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LeaveApplicationValues>({
    resolver: zodResolver(leaveApplicationSchema),
    defaultValues: {
      leaveType: undefined,
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  const selectedType = useWatch({ control, name: "leaveType" });
  const startDate = useWatch({ control, name: "startDate" });
  const selectedBalance = balances.find((b) => b.leaveType === selectedType);

  if (reviewValues) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-base font-semibold text-gray-900">
            Review your request
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Confirm the details below. Your request will be sent for approval.
          </p>
        </div>
        <dl className="divide-y divide-gray-100 px-6">
          {[
            ["Leave type", `${humanizeEnum(reviewValues.leaveType)} Leave`],
            ["Start date", formatDate(reviewValues.startDate)],
            ["End date", formatDate(reviewValues.endDate)],
            ["Reason", reviewValues.reason],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-3 gap-3 py-3 text-sm">
              <dt className="font-medium text-gray-500">{label}</dt>
              <dd className="col-span-2 break-words text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
        {errorMessage && (
          <div
            role="alert"
            className="mx-6 mb-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span>{errorMessage}</span>
          </div>
        )}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setReviewValues(null)}
            disabled={isSubmitting}
            className="h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Back to edit
          </button>
          <button
            type="button"
            onClick={() => onSubmit(reviewValues)}
            disabled={isSubmitting}
            className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Submit Request"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => setReviewValues(values))}
      noValidate
      className="rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="border-b border-gray-100 px-6 py-5">
        <h2 className="text-base font-semibold text-gray-900">Leave details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Fields marked with <span className="text-red-600">*</span> are
          required.
        </p>
      </div>

      <div className="grid gap-x-5 gap-y-4 p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="leaveType" className={labelClass}>
            Leave type <span className="text-red-600">*</span>
          </label>
          <select
            id="leaveType"
            defaultValue=""
            aria-invalid={errors.leaveType ? true : undefined}
            aria-describedby={errors.leaveType ? "leaveType-error" : undefined}
            className={inputClass}
            {...register("leaveType")}
          >
            <option value="" disabled>
              Select a leave type
            </option>
            {LEAVE_TYPE_VALUES.map((type) => (
              <option key={type} value={type}>
                {humanizeEnum(type)} Leave
              </option>
            ))}
          </select>
          <FieldError
            id="leaveType-error"
            message={errors.leaveType?.message}
          />
          {selectedBalance && (
            <p className="mt-1.5 text-xs text-gray-500">
              Current balance: {selectedBalance.remaining} of{" "}
              {selectedBalance.total} days remaining. Availability is confirmed
              when the request is submitted.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="startDate" className={labelClass}>
            Start date <span className="text-red-600">*</span>
          </label>
          <input
            id="startDate"
            type="date"
            aria-invalid={errors.startDate ? true : undefined}
            aria-describedby={errors.startDate ? "startDate-error" : undefined}
            className={inputClass}
            {...register("startDate")}
          />
          <FieldError
            id="startDate-error"
            message={errors.startDate?.message}
          />
        </div>

        <div>
          <label htmlFor="endDate" className={labelClass}>
            End date <span className="text-red-600">*</span>
          </label>
          <input
            id="endDate"
            type="date"
            min={startDate || undefined}
            aria-invalid={errors.endDate ? true : undefined}
            aria-describedby={errors.endDate ? "endDate-error" : undefined}
            className={inputClass}
            {...register("endDate")}
          />
          <FieldError id="endDate-error" message={errors.endDate?.message} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="reason" className={labelClass}>
            Reason <span className="text-red-600">*</span>
          </label>
          <textarea
            id="reason"
            rows={4}
            aria-invalid={errors.reason ? true : undefined}
            aria-describedby={errors.reason ? "reason-error" : undefined}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 aria-invalid:border-red-400"
            placeholder="Briefly describe why you are requesting leave"
            {...register("reason")}
          />
          <FieldError id="reason-error" message={errors.reason?.message} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Review Request
        </button>
      </div>
    </form>
  );
};

export default LeaveApplicationForm;

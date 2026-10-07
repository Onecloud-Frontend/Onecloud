import { QuotationSettingsForm } from "../forms/QuotationSettingsForm";
import {
  useQuotationSettings,
  useUpdateQuotationSettings,
} from "../hooks/useQuotationSettings";
import type { QuotationSettingsFormValues } from "../schemas/quotationSettings.schema";

export function QuotationSettings() {
  const {
    data: quotationSettings,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuotationSettings();

  const updateQuotationSettings =
    useUpdateQuotationSettings();

  const handleSubmit = async (
    values: QuotationSettingsFormValues,
  ) => {
    await updateQuotationSettings.mutateAsync(values);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-56 rounded bg-slate-200" />
            <div className="h-4 w-96 rounded bg-slate-100" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-5">
            <div className="h-5 w-40 rounded bg-slate-200" />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="h-10 rounded-lg bg-slate-100" />
              <div className="h-10 rounded-lg bg-slate-100" />
              <div className="h-10 rounded-lg bg-slate-100" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-5">
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="h-40 rounded-lg bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <span
              className="text-sm font-bold"
              aria-hidden="true"
            >
              !
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-base font-semibold text-slate-900">
              Unable to load quotation settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              The quotation configuration could not be
              loaded. Please try again.
            </p>

            {error instanceof Error && (
              <p className="mt-2 text-xs text-slate-400">
                {error.message}
              </p>
            )}

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quotationSettings) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          No quotation settings are available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Quotation Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Configure quotation numbering, statuses,
          approvals, tax and pricing preferences.
        </p>
      </div>

      {updateQuotationSettings.isSuccess && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700"
            aria-hidden="true"
          >
            ✓
          </span>

          <p className="text-sm font-medium text-emerald-800">
            Quotation settings saved successfully.
          </p>
        </div>
      )}

      {updateQuotationSettings.isError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"
        >
          <p className="text-sm font-medium text-red-800">
            Unable to save quotation settings.
          </p>

          <p className="mt-1 text-xs text-red-600">
            Please review the values and try again.
          </p>
        </div>
      )}

      <QuotationSettingsForm
        initialValues={quotationSettings}
        isSubmitting={updateQuotationSettings.isPending}
        onSubmit={handleSubmit}
      />

      <div className="border-t border-slate-200 pt-4">
        <p className="text-xs text-slate-400">
          Last updated by{" "}
          <span className="font-medium text-slate-500">
            {quotationSettings.updatedBy}
          </span>{" "}
          on{" "}
          {new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(
            new Date(quotationSettings.updatedAt),
          )}
          .
        </p>
      </div>
    </div>
  );
}

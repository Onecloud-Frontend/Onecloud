import type {
  Quotation,
  QuotationFilters,
  QuotationFormValues,
  QuotationListResponse,
} from "../types/quotation.types";

import * as quotationRepository from "../mocks/quotationRepository";

export const DEFAULT_PAGE_SIZE = 10;

function simulateRequest<T>(
  data: T,
  delay = 300,
): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

function matchesSearch(
  quotation: Quotation,
  search?: string,
): boolean {
  if (!search?.trim()) {
    return true;
  }

  const normalizedSearch =
    search.trim().toLowerCase();

  return [
    quotation.quoteNumber,
    quotation.id,
    quotation.customerName,
    quotation.opportunityName,
    quotation.salespersonName,
  ]
    .filter(Boolean)
    .some((value) =>
      value!
        .toLowerCase()
        .includes(normalizedSearch),
    );
}

function matchesStatus(
  quotation: Quotation,
  status?: QuotationFilters["status"],
): boolean {
  if (!status || status === "all") {
    return true;
  }

  return quotation.status === status;
}

function matchesApprovalStatus(
  quotation: Quotation,
  approvalStatus?: QuotationFilters["approvalStatus"],
): boolean {
  if (
    !approvalStatus ||
    approvalStatus === "all"
  ) {
    return true;
  }

  return (
    quotation.approvalStatus ===
    approvalStatus
  );
}

function matchesCustomer(
  quotation: Quotation,
  customerId?: string,
): boolean {
  if (!customerId) {
    return true;
  }

  return quotation.customerId === customerId;
}

function matchesDateRange(
  quotation: Quotation,
  fromDate?: string,
  toDate?: string,
): boolean {
  const quoteDate =
    quotation.quoteDate;

  if (
    fromDate &&
    quoteDate < fromDate
  ) {
    return false;
  }

  if (
    toDate &&
    quoteDate > toDate
  ) {
    return false;
  }

  return true;
}

/* ---------------------------------------
   GET QUOTATIONS
--------------------------------------- */

export async function getQuotations(
  filters: QuotationFilters = {},
): Promise<QuotationListResponse> {
  const quotations =
    await quotationRepository.findAll();

  const filtered =
    quotations.filter(
      (quotation) =>
        matchesSearch(
          quotation,
          filters.search,
        ) &&
        matchesStatus(
          quotation,
          filters.status,
        ) &&
        matchesApprovalStatus(
          quotation,
          filters.approvalStatus,
        ) &&
        matchesCustomer(
          quotation,
          filters.customerId,
        ) &&
        matchesDateRange(
          quotation,
          filters.fromDate,
          filters.toDate,
        ),
    );

  const page =
    filters.page ?? 1;

  const pageSize =
    filters.pageSize ??
    DEFAULT_PAGE_SIZE;

  const total =
    filtered.length;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        total / pageSize,
      ),
    );

  const safePage =
    Math.min(
      page,
      totalPages,
    );

  const startIndex =
    (safePage - 1) *
    pageSize;

  const data =
    filtered.slice(
      startIndex,
      startIndex + pageSize,
    );

  return simulateRequest({
    data,
    total,
    page: safePage,
    pageSize,
    totalPages,
  });
}

/* ---------------------------------------
   GET SINGLE QUOTATION
--------------------------------------- */

export async function getQuotation(
  id: string,
): Promise<Quotation> {
  const quotation =
    await quotationRepository.findById(
      id,
    );

  if (!quotation) {
    throw new Error(
      "Quotation not found",
    );
  }

  return simulateRequest(
    quotation,
  );
}

/* ---------------------------------------
   CREATE QUOTATION
--------------------------------------- */

export async function createQuotation(
  values: QuotationFormValues,
): Promise<Quotation> {
  const quotation =
    await quotationRepository.create(
      values,
    );

  return simulateRequest(
    quotation,
  );
}

/* ---------------------------------------
   UPDATE QUOTATION
--------------------------------------- */

export async function updateQuotation(
  id: string,
  values: QuotationFormValues,
): Promise<Quotation> {
  const quotation =
    await quotationRepository.update(
      id,
      values,
    );

  return simulateRequest(
    quotation,
  );
}

/* ---------------------------------------
   SUBMIT FOR APPROVAL
--------------------------------------- */

export async function submitQuotationApproval(
  id: string,
): Promise<Quotation> {
  const quotation =
    await quotationRepository.submitApproval(
      id,
    );

  return simulateRequest(
    quotation,
  );
}

/* ---------------------------------------
   REVISE QUOTATION
--------------------------------------- */

export async function reviseQuotation(
  id: string,
): Promise<Quotation> {
  const quotation =
    await quotationRepository.revise(
      id,
    );

  return simulateRequest(
    quotation,
  );
}

/* ---------------------------------------
   QUOTATION SERVICE OBJECT
---------------------------------------

   Existing hooks in this project use:

   import { quotationService }
   from "../services/quotationService";

   Therefore we expose all quotation
   operations through this object.
--------------------------------------- */

export const quotationService = {
  getQuotations,
  getQuotation,
  createQuotation,
  updateQuotation,
  submitQuotationApproval,
  reviseQuotation,
};

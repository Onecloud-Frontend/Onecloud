import type {
  QuotationLineItem,
} from "../types/quotation.types";

const roundToTwo = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export interface LineItemCalculationInput {
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxRate: number;
}

export interface QuotationTotals {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
}

export const calculateLineItem = (
  input: LineItemCalculationInput,
) => {
  const quantity = Math.max(input.quantity, 0);
  const unitPrice = Math.max(input.unitPrice, 0);
  const discountPercent = Math.min(
    Math.max(input.discountPercent, 0),
    100,
  );
  const taxRate = Math.max(input.taxRate, 0);

  const subtotal = roundToTwo(
    quantity * unitPrice,
  );

  const discountAmount = roundToTwo(
    subtotal * (discountPercent / 100),
  );

  const taxableAmount = roundToTwo(
    subtotal - discountAmount,
  );

  const taxAmount = roundToTwo(
    taxableAmount * (taxRate / 100),
  );

  const total = roundToTwo(
    taxableAmount + taxAmount,
  );

  return {
    subtotal,
    discountAmount,
    taxAmount,
    total,
  };
};

export const calculateQuotationTotals = (
  lineItems: QuotationLineItem[],
): QuotationTotals => {
  const totals = lineItems.reduce(
    (result, item) => {
      result.subtotal += item.subtotal;
      result.discountAmount += item.discountAmount;
      result.taxAmount += item.taxAmount;
      result.grandTotal += item.total;

      return result;
    },
    {
      subtotal: 0,
      discountAmount: 0,
      taxAmount: 0,
      grandTotal: 0,
    },
  );

  return {
    subtotal: roundToTwo(totals.subtotal),
    discountAmount: roundToTwo(
      totals.discountAmount,
    ),
    taxAmount: roundToTwo(totals.taxAmount),
    grandTotal: roundToTwo(
      totals.grandTotal,
    ),
  };
};

export const calculateCompleteLineItem = (
  item: Omit<
    QuotationLineItem,
    | "subtotal"
    | "discountAmount"
    | "taxAmount"
    | "total"
  >,
): QuotationLineItem => {
  const calculations = calculateLineItem({
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    discountPercent: item.discountPercent,
    taxRate: item.taxRate,
  });

  return {
    ...item,
    ...calculations,
  };
};

/**
 * Display formatters shared by the report screens.
 * Values follow Indian conventions: rupee symbol, lakh/crore grouping and dd MMM yyyy dates.
 */

const RUPEE_SYMBOL = '\u20B9';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const compactFormatter = new Intl.NumberFormat('en-IN', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const numberFormatter = new Intl.NumberFormat('en-IN');

/** Full amount, e.g. "12,50,000" prefixed with the rupee symbol. */
export const formatCurrency = (value: number): string => currencyFormatter.format(value);

/** Short amount for tight spaces such as KPI cards and chart axes, e.g. "12.5L". */
export const formatCompactCurrency = (value: number): string =>
  `${RUPEE_SYMBOL}${compactFormatter.format(value)}`;

export const formatNumber = (value: number): string => numberFormatter.format(value);

/** Percentage values are already expressed on a 0-100 scale. */
export const formatPercent = (value: number): string => `${value}%`;

export const formatDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

/**
 * Client-side CSV export used by the report screens' export action.
 */

export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number;
}

/** Quotes a cell when it contains a delimiter, quote or line break, doubling embedded quotes. */
const escapeCell = (cell: string | number): string => {
  const text = String(cell);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export const buildCsv = <T>(columns: CsvColumn<T>[], rows: T[]): string => {
  const headerLine = columns.map((column) => escapeCell(column.header)).join(',');
  const dataLines = rows.map((row) => columns.map((column) => escapeCell(column.value(row))).join(','));
  return [headerLine, ...dataLines].join('\r\n');
};

/** Builds the CSV in memory and triggers a browser download. */
export const downloadCsv = <T>(filename: string, columns: CsvColumn<T>[], rows: T[]): void => {
  const blob = new Blob([buildCsv(columns, rows)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

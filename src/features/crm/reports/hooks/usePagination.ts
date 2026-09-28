import { useMemo, useState } from 'react';

interface UsePaginationResult<T> {
  pageRows: T[];
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

/**
 * Client-side pagination for a report table. Resets to page 1 whenever the
 * underlying row set changes (e.g. a filter narrows the results) so the
 * table never lands on an empty page.
 */
export const usePagination = <T,>(rows: T[], pageSize: number): UsePaginationResult<T> => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, safePage, pageSize]);

  return { pageRows, page: safePage, totalPages, setPage };
};

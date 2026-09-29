# Developer 9 — Reports Generation

This ZIP is a complete OneCloud frontend project with the Developer 9 HRMS Reports module integrated.

## Included

- `src/features/hrms/reports/pages/ReportsPage.tsx`
- `src/features/hrms/reports/components/ReportGeneratorForm.tsx`
- `src/features/hrms/reports/services/reportService.ts`
- `src/features/hrms/reports/types/report.types.ts`
- HRMS Reports route: `/hrms/reports`
- Existing HRMS Reports sidebar entry is already present in `AppLayout.tsx`

## Important backend constraint

The assignment requires the confirmed backend report API contract and backend-defined generation/download mechanism. The current repository does not define a report-generation API endpoint or response DTO, so this implementation does **not** invent one or fake PDF/Excel/CSV generation.

`reportService.generateReport()` is the integration boundary. Once the backend contract is confirmed, wire the real request/response/download behavior there.

## Run

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Open `/hrms/reports` after authentication.

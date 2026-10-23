# OneCloud Enterprise ERP — Master Developer Handoff Guide

Welcome to the **OneCloud Enterprise ERP** developer handoff workspace.

This document serves as the master onboarding and coordination guide for the **12-developer ERP engineering team**. It defines the verified architectural standards, existing foundation assets, prerequisite commands, baseline system limitations, and task allocations before distributed feature development begins.

---

## 1. Project Overview

### 1.1 What the ERP Demo Module Covers
The OneCloud Enterprise ERP module provides an enterprise-grade resource planning foundation for robotic automation manufacturing, covering five tightly integrated business pillars:
1. **Executive Dashboard & Command Center**: Real-time cross-module KPI cards, operational risk alerts, and live transaction ledger streams.
2. **Finance & General Ledger**: GAAP/IFRS 4-digit Chart of Accounts (`1000`–`5000`), double-entry journal vouchers with balanced debit/credit validation, departmental budget utilization, and operational expense tracking.
3. **Procurement & Sourcing**: Vendor master directory (Net 15–60 payment terms), multi-line purchase requisitions with approval authorization, commercial purchase orders, and physical dock Goods Received Notes (GRN).
4. **Inventory & Warehouse Management**: Multi-category product catalog (Components, Raw Materials, Finished Goods), multi-facility warehouse capacity monitoring (Chicago, Fremont, Rotterdam), stock balance ledgers, stock transfer movements, and automated low-stock reorder alerts.
5. **Sales Orders & Customer Invoicing**: CRM customer sales order capture, product fulfillment state tracking (`Unfulfilled` → `Partially Fulfilled` → `Fulfilled`), commercial invoice generation, payment receipts, and accounts receivable/payable aging.

---

### 1.2 Current Implementation Status vs Remaining Work

| Layer / Feature | Current Status | Implemented Files & Assets | Remaining Work for 12 Developers |
| :--- | :--- | :--- | :--- |
| **Foundation Types** | **Complete** (0 errors) | `src/features/erp/types/**` (6 modules, central barrel) | Implement feature-specific component prop types |
| **Authoritative Mocks**| **Complete** (Reconciled) | `src/features/erp/mocks/**` (6 domain datasets) | Extend local mock state stores for simulated mutations |
| **Domain Services** | **Foundation Ready** | `src/features/erp/services/**` (19 existing service methods) | Add missing feature-specific methods (e.g. `approveRequisition`, `recordPayment`) |
| **TanStack Hooks** | **Foundation Ready** | `src/features/erp/hooks/**` (19 existing query/mutation hooks) | Add local mutation hooks with query cache invalidation |
| **Executive Dashboard**| **Complete** | `src/features/erp/dashboard/DashboardPage.tsx` | Connect deep-links to developer feature pages once built |
| **ERP Navigation** | **Registered** | `AppLayout.tsx` & `navigation.config.ts` | No modifications allowed to shared app files |
| **Feature Screens** | **Placeholders Ready** | 5 placeholder routes (`/procurement`, `/vendors`, `/inventory`, `/warehouse`, `/sales`) | Replace placeholders with production-grade screens (Devs 2–11) |
| **Verification Suite** | **Complete** (55 tests) | `src/features/erp/tests/erpVerification.test.ts` | Run before opening feature PRs to guarantee zero regressions |

---

### 1.3 Application Context & Boundary Architecture
OneCloud is a multi-tenant enterprise application comprising HRMS, CRM, and ERP modules under a unified shell:
- **HRMS Boundary**: HRMS owns personnel, employment status, payroll, and recruitment. ERP consumes read-only employee projections (`HrmsEmployeeReference` in `common.types.ts`) for requisition creation, approval attribution, and warehouse operations. **ERP developers must never mutate or modify HRMS files.**
- **CRM Boundary**: CRM owns customer relationships, pipelines, and opportunities. ERP consumes read-only customer projections (`CrmCustomerReference` in `common.types.ts`) for sales order fulfillment and customer invoicing. **ERP developers must never mutate or modify CRM files.**
- **Shared App Shell**: Navigation items (`/erp/dashboard`, `/erp/procurement`, `/erp/vendors`, `/erp/inventory`, `/erp/warehouse`, `/erp/sales`) and top-bar branding are pre-wired. **ERP developers must not modify `AppLayout.tsx` or `navigation.config.ts`.**

---

### 1.4 Mock-Service Behavior vs Real Backend Integration
- **In-Memory Mock Store**: Services simulate network latency (250ms–350ms) and operate against in-memory mock datasets.
- **Simulated Mutations**: Service mutations (such as `createRequisition` or `createJournalEntry`) validate inputs, update the in-memory array, and return cloned records.
- **Reload Reset**: Because there is no persistent database or live backend integration at this stage, any browser reload resets data to initial fixtures. Developers must **never claim persistence across page reloads** or add external storage libraries.
- **Zero Real Backend Calls**: Direct `fetch` or `axios` calls to external endpoints are prohibited unless authorized by the project lead.

---

## 2. Current Architecture & Patterns

The ERP module enforces a strict four-layer architecture:

```text
┌────────────────────────────────────────────────────────┐
│  Page / UI Component (Presentation & User Interaction) │
└───────────────────────────┬────────────────────────────┘
                            │ Consumes TanStack Query hook
                            ▼
┌────────────────────────────────────────────────────────┐
│  React Query Hook (Cache Management & Invalidation)    │
└───────────────────────────┬────────────────────────────┘
                            │ Calls typed async method
                            ▼
┌────────────────────────────────────────────────────────┐
│  Domain Service Layer (Validation & Business Rules)    │
└───────────────────────────┬────────────────────────────┘
                            │ Reads / Updates in-memory store
                            ▼
┌────────────────────────────────────────────────────────┐
│  Authoritative Mocks (Typed Fixtures & In-Memory Store)│
└────────────────────────────────────────────────────────┘
```

### 2.1 File Organization & Registry
All ERP code is strictly isolated inside `src/features/erp/`:
- `src/features/erp/types/`: Single-source-of-truth TypeScript interfaces (`common`, `finance`, `procurement`, `inventory`, `sales`, `dashboard`).
- `src/features/erp/mocks/`: Authoritative datasets with reconciled cross-module IDs and mathematical consistency.
- `src/features/erp/services/`: Async domain services encapsulating business validation and simulated mutations.
- `src/features/erp/hooks/`: TanStack Query hooks using type-safe query keys.
- `src/features/erp/constants/`: Central query key registry (`ERP_QUERY_KEYS` in `erpQueryKeys.ts`).
- `src/features/erp/components/`: Reusable ERP widgets (`ErpKpiCard`, `ErpAlertList`, `ErpStatusBadge`, `ErpTransactionsTable`).
- `src/features/erp/dashboard/`: Connected executive dashboard page.
- `src/features/erp/index.ts`: Feature public contract exporting route pages, types, hooks, services, and components.
- `src/features/erp/docs/`: In-depth documentation including the 12-developer allocation guide.

### 2.2 Central Query Keys
Always use `ERP_QUERY_KEYS` from `src/features/erp/constants/erpQueryKeys.ts`:
```typescript
import { ERP_QUERY_KEYS } from '@/features/erp/constants/erpQueryKeys';

// Example: invalidating procurement purchase orders on mutation
queryClient.invalidateQueries({ queryKey: ERP_QUERY_KEYS.procurement.purchaseOrders });
```

### 2.3 Shared UI Component & Styling Standards
Developers must construct UI using existing project building blocks:
- **Shared Components**: Import from `@/shared/components/ui/` (`PageShell`, `PageContainer`, `Button`, `Input`, `Label`, `DropdownMenu`, `Tooltip`, `Avatar`, `ToastProvider`).
- **Icons**: Import exclusively from `lucide-react`.
- **CSS / Styling**: Use Tailwind CSS utility classes adhering to the project's slate palette, border radius (`rounded-xl`), and subtle elevation shadows (`shadow-xs`, `shadow-sm`). Never create custom CSS files or modify global styles.

---

## 3. Prerequisites & Development Commands

All commands must be executed using the existing repository configuration (`package.json`). Do not install new dependencies.

### 3.1 Runtime Requirements
- **Node.js**: `>=24.0.0 <25.0.0`
- **npm**: `>=11.0.0`

### 3.2 Standard Development Commands
```bash
# 1. Install dependencies using exact package lockfile
npm install

# 2. Run TypeScript check across entire workspace (Must pass with 0 errors)
npm run typecheck

# 3. Run ERP Foundation Verification Test Suite (55 automated domain tests)
node --loader file:///C:/Users/Lenovo/.gemini/antigravity-ide/brain/25246529-8d63-49af-9a97-005ed2a6132b/scratch/loader.mjs --experimental-strip-types src/features/erp/tests/erpVerification.test.ts

# 4. Attempt full application build (Documented failure baseline below)
npm run build
```

### 3.3 Known Baseline Issues & Limitations (Honest Disclosure)
- **TypeScript Check**: `npm run typecheck` passes with **zero errors**.
- **ERP Verification Suite**: All **55 assertions pass** across procurement, inventory, sales, finance, and dashboard calculations.
- **Production Build Baseline**: `npm run build` currently fails with **6 pre-existing JSX syntax errors** strictly located within CRM team files (`src/features/crm/customer-portal/pages/CustomerProfilePage.tsx:222`, `CustomerDashboardPage.tsx:289, 304`, `CustomerInvoicesPage.tsx:153`, `CustomerQuotationsPage.tsx:164`). **ERP developers are strictly prohibited from touching CRM files.**
- **Browser / Dev Server Verification**: The Vite dev server (`npm run dev`) terminates during dependency pre-bundling due to the same upstream CRM errors. Consequently, browser-based visual runtime verification remains **unverified** at this stage and must be executed once the CRM team resolves their build errors.

---

## 4. 12-Developer Task Directory & Quick Reference

Each developer has a strictly isolated directory boundary and authoritative contract ownership:

| Developer | Role & Assignment Title | Primary Directory Location | Canonical Contract Owned |
| :--- | :--- | :--- | :--- |
| **Developer 1** | [ERP Dashboard & Business Overview](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-1--erp-dashboard-and-business-overview) | `src/features/erp/dashboard/` | `dashboard.types.ts` |
| **Developer 2** | [Finance & Chart of Accounts](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-2--finance-and-chart-of-accounts) | `src/features/erp/finance/accounts/` | `Account` in `finance.types.ts` |
| **Developer 3** | [General Ledger & Journal Entries](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-3--general-ledger-and-journal-entries) | `src/features/erp/finance/journals/` | `JournalEntry` in `finance.types.ts` |
| **Developer 4** | [Budgeting & Expense Management](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-4--budgeting-and-expense-management) | `src/features/erp/finance/budgets/` | `Budget`, `Expense` in `finance.types.ts` |
| **Developer 5** | [Supplier & Vendor Management](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-5--supplier-and-vendor-management) | `src/features/erp/procurement/suppliers/` | `Supplier` in `procurement.types.ts` |
| **Developer 6** | [Purchase Requisitions & Approvals](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-6--purchase-requisitions-and-approvals) | `src/features/erp/procurement/requisitions/` | `PurchaseRequisition` in `procurement.types.ts` |
| **Developer 7** | [Purchase Orders & Goods Receiving](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-7--purchase-orders-and-goods-receiving) | `src/features/erp/procurement/orders/` | `PurchaseOrder`, `GoodsReceivedNote` in `procurement.types.ts` |
| **Developer 8** | [Products & Item Catalog](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-8--products-and-item-catalog) | `src/features/erp/inventory/products/` | `Product` in `inventory.types.ts` |
| **Developer 9** | [Inventory & Warehouse Management](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-9--inventory-and-warehouse-management) | `src/features/erp/warehouse/` | `Warehouse`, `StockBalance` in `inventory.types.ts` |
| **Developer 10**| [Sales Orders & Customer Billing](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-10--sales-orders-and-customer-billing) | `src/features/erp/sales/orders/` | `SalesOrder` in `sales.types.ts` |
| **Developer 11**| [Invoices, Payments & Financial Reporting](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-11--invoices-payments-and-financial-reporting) | `src/features/erp/sales/invoices/` | `Invoice`, `Payment` in `sales.types.ts` |
| **Developer 12**| [ERP Integration, Configuration & QA](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md#developer-12--erp-integration-configuration-and-quality-assurance) | `src/features/erp/` & `src/features/erp/docs/` | `common.types.ts`, `index.ts` |

---

## 5. Master Guide Links

For full developer specifications, file ownership boundaries, contract schemas, UI wireframe specs, concrete business rules, and acceptance checklists, proceed to the authoritative detailed specification guide:

👉 **[Detailed 12-Developer Architecture & Specification Guide](file:///d:/Onecloud/src/features/erp/docs/ERP_12_DEVELOPER_GUIDE.md)**

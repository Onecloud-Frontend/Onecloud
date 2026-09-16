# Enterprise Frontend Architecture Remediation Plan

This plan details the step-by-step remediation of the OneCloud Enterprise frontend codebase to achieve **100% compliance** with the frozen **Official Enterprise Frontend Architecture**.

## User Review Required

> [!IMPORTANT]
> - **Zero Business Behavior Change**: No routes, URLs, UI layouts, or business logic will be changed.
> - **Page File Relocations**: All 75 route-level page components currently located in single-file subdirectories (e.g., `features/hrms/leave/LeavePage.tsx`) will be moved to their official domain location `features/<domain>/pages/LeavePage.tsx` per Section 6.
> - **Obsolete Folder Pruning**: Because those subdirectories currently contain only that single page component and zero components/hooks/types, the empty folders will be removed in adherence to Rule 20 ("No unnecessary empty folders / no .gitkeep"). Future sub-domain components and hooks can be created when actually implemented.
> - **Public Contract Strictness**: Every one of the 19 domain modules will expose an explicit `index.ts` exporting only the route-level page components required by `app/router`. Wildcard exports are prohibited.
> - **Router Imports**: `src/app/router/index.tsx` will consume only feature public APIs (`@/features/<domain>`), completely eliminating deep imports.

---

## Proposed Changes

The remediation will be executed systematically in the exact order specified by the Master Instruction:

### 1. App Configuration Layer (`src/app/config`)

#### [NEW] [index.ts](file:///d:/frontend/src/app/config/index.ts)
Flatten `src/app/config/application/index.ts` directly into `src/app/config/index.ts`. Contains app-level configuration, environment variable types, and feature flag resolution placeholders.

#### [DELETE] [application/index.ts](file:///d:/frontend/src/app/config/application/index.ts)
Remove obsolete nested file and its containing folder after verifying zero references.

---

### 2. Feature Page Organization (`src/features/<domain>/pages/`)

Standardize all 75 route-level screens into their respective `features/<domain>/pages/` directories per Section 6 ("pages/ Route-level/page-level screens belonging to the feature"):

#### [MOVE] 19 Business Domains (75 Pages)
- **`ai`** (2 pages):
  - `copilot/AiCopilotPage.tsx` → `pages/AiCopilotPage.tsx`
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
- **`calendar`** (1 page):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
- **`crm`** (7 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `leads/LeadsPage.tsx` → `pages/LeadsPage.tsx`
  - `opportunities/OpportunitiesPage.tsx` → `pages/OpportunitiesPage.tsx`
  - `contacts/ContactsPage.tsx` → `pages/ContactsPage.tsx`
  - `sales-pipeline/SalesPipelinePage.tsx` → `pages/SalesPipelinePage.tsx`
  - `quotations/QuotationsPage.tsx` → `pages/QuotationsPage.tsx`
  - `customer-portal/CustomerPortalPage.tsx` → `pages/CustomerPortalPage.tsx`
- **`developer`** (2 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `api-keys/ApiKeysPage.tsx` → `pages/ApiKeysPage.tsx`
- **`dms`** (2 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `repository/DocumentRepositoryPage.tsx` → `pages/DocumentRepositoryPage.tsx`
- **`erp`** (6 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `procurement/ProcurementPage.tsx` → `pages/ProcurementPage.tsx`
  - `vendors/VendorsPage.tsx` → `pages/VendorsPage.tsx`
  - `inventory/InventoryPage.tsx` → `pages/InventoryPage.tsx`
  - `warehouse/WarehousePage.tsx` → `pages/WarehousePage.tsx`
  - `sales/SalesPage.tsx` → `pages/SalesPage.tsx`
- **`finance`** (8 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `general-ledger/GeneralLedgerPage.tsx` → `pages/GeneralLedgerPage.tsx`
  - `accounts-payable/AccountsPayablePage.tsx` → `pages/AccountsPayablePage.tsx`
  - `accounts-receivable/AccountsReceivablePage.tsx` → `pages/AccountsReceivablePage.tsx`
  - `banking/BankingPage.tsx` → `pages/BankingPage.tsx`
  - `expenses/ExpensesPage.tsx` → `pages/ExpensesPage.tsx`
  - `budgets/BudgetsPage.tsx` → `pages/BudgetsPage.tsx`
  - `taxation/TaxationPage.tsx` → `pages/TaxationPage.tsx`
- **`hrms`** (11 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `employees/EmployeesPage.tsx` → `pages/EmployeesPage.tsx`
  - `employees/EmployeeDetailsPage.tsx` → `pages/EmployeeDetailsPage.tsx`
  - `attendance/AttendancePage.tsx` → `pages/AttendancePage.tsx`
  - `leave/LeavePage.tsx` → `pages/LeavePage.tsx`
  - `payroll/PayrollPage.tsx` → `pages/PayrollPage.tsx`
  - `recruitment/RecruitmentPage.tsx` → `pages/RecruitmentPage.tsx`
  - `performance/PerformancePage.tsx` → `pages/PerformancePage.tsx`
  - `learning/LearningPage.tsx` → `pages/LearningPage.tsx`
  - `employee-self-service/EmployeeSelfServicePage.tsx` → `pages/EmployeeSelfServicePage.tsx`
  - `assets/AssetsPage.tsx` → `pages/AssetsPage.tsx`
- **`integrations`** (2 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `connectors/ConnectorsPage.tsx` → `pages/ConnectorsPage.tsx`
- **`monitoring`** (2 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `services/ServicesStatusPage.tsx` → `pages/ServicesStatusPage.tsx`
- **`notifications`** (2 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `templates/NotificationTemplatesPage.tsx` → `pages/NotificationTemplatesPage.tsx`
- **`platform-admin`** (14 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `tenants/TenantsPage.tsx` → `pages/TenantsPage.tsx`
  - `tenants/TenantDetailsPage.tsx` → `pages/TenantDetailsPage.tsx`
  - `organizations/OrganizationsPage.tsx` → `pages/OrganizationsPage.tsx`
  - `organizations/OrganizationDetailsPage.tsx` → `pages/OrganizationDetailsPage.tsx`
  - `users/UsersPage.tsx` → `pages/UsersPage.tsx`
  - `users/UserDetailsPage.tsx` → `pages/UserDetailsPage.tsx`
  - `roles-permissions/RolesPage.tsx` → `pages/RolesPage.tsx`
  - `roles-permissions/PermissionsPage.tsx` → `pages/PermissionsPage.tsx`
  - `authentication-security/AuthenticationSecurityPage.tsx` → `pages/AuthenticationSecurityPage.tsx`
  - `configuration/ConfigurationPage.tsx` → `pages/ConfigurationPage.tsx`
  - `branding/BrandingPage.tsx` → `pages/BrandingPage.tsx`
  - `licensing/LicensingPage.tsx` → `pages/LicensingPage.tsx`
  - `audit-compliance/AuditCompliancePage.tsx` → `pages/AuditCompliancePage.tsx`
- **`portals`** (3 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `customer/CustomerPortalAdminPage.tsx` → `pages/CustomerPortalAdminPage.tsx`
  - `partner/PartnerPortalPage.tsx` → `pages/PartnerPortalPage.tsx`
- **`reporting`** (2 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `reports/ReportsPage.tsx` → `pages/ReportsPage.tsx`
- **`revenue`** (2 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `recognition/RevenueRecognitionPage.tsx` → `pages/RevenueRecognitionPage.tsx`
- **`search`** (1 page):
  - `SearchPage.tsx` → `pages/SearchPage.tsx`
- **`security`** (2 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `data-privacy/DataPrivacyPage.tsx` → `pages/DataPrivacyPage.tsx`
- **`subscription`** (3 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `plans/PlansPage.tsx` → `pages/PlansPage.tsx`
  - `invoices/SubscriptionInvoicesPage.tsx` → `pages/SubscriptionInvoicesPage.tsx`
- **`workflow`** (3 pages):
  - `dashboard/DashboardPage.tsx` → `pages/DashboardPage.tsx`
  - `designer/WorkflowDesignerPage.tsx` → `pages/WorkflowDesignerPage.tsx`
  - `approvals/ApprovalsPage.tsx` → `pages/ApprovalsPage.tsx`

---

### 3. Establish Feature Public Contracts (`src/features/<domain>/index.ts`)

Create explicit `index.ts` files for all 19 feature domains exporting only the authorized public entry points:

#### [NEW] [features/ai/index.ts](file:///d:/frontend/src/features/ai/index.ts)
```typescript
export { default as AiDashboardPage } from './pages/DashboardPage';
export { default as AiCopilotPage } from './pages/AiCopilotPage';
```

#### [NEW] [features/calendar/index.ts](file:///d:/frontend/src/features/calendar/index.ts)
```typescript
export { default as CalendarDashboardPage } from './pages/DashboardPage';
```

#### [NEW] [features/crm/index.ts](file:///d:/frontend/src/features/crm/index.ts)
```typescript
export { default as CrmDashboardPage } from './pages/DashboardPage';
export { default as LeadsPage } from './pages/LeadsPage';
export { default as OpportunitiesPage } from './pages/OpportunitiesPage';
export { default as ContactsPage } from './pages/ContactsPage';
export { default as SalesPipelinePage } from './pages/SalesPipelinePage';
export { default as QuotationsPage } from './pages/QuotationsPage';
export { default as CrmCustomerPortalPage } from './pages/CustomerPortalPage';
```

#### [NEW] [features/developer/index.ts](file:///d:/frontend/src/features/developer/index.ts)
```typescript
export { default as DeveloperDashboardPage } from './pages/DashboardPage';
export { default as ApiKeysPage } from './pages/ApiKeysPage';
```

#### [NEW] [features/dms/index.ts](file:///d:/frontend/src/features/dms/index.ts)
```typescript
export { default as DmsDashboardPage } from './pages/DashboardPage';
export { default as DocumentRepositoryPage } from './pages/DocumentRepositoryPage';
```

#### [NEW] [features/erp/index.ts](file:///d:/frontend/src/features/erp/index.ts)
```typescript
export { default as ErpDashboardPage } from './pages/DashboardPage';
export { default as ProcurementPage } from './pages/ProcurementPage';
export { default as VendorsPage } from './pages/VendorsPage';
export { default as InventoryPage } from './pages/InventoryPage';
export { default as WarehousePage } from './pages/WarehousePage';
export { default as ErpSalesPage } from './pages/SalesPage';
```

#### [NEW] [features/finance/index.ts](file:///d:/frontend/src/features/finance/index.ts)
```typescript
export { default as FinanceDashboardPage } from './pages/DashboardPage';
export { default as GeneralLedgerPage } from './pages/GeneralLedgerPage';
export { default as AccountsPayablePage } from './pages/AccountsPayablePage';
export { default as AccountsReceivablePage } from './pages/AccountsReceivablePage';
export { default as BankingPage } from './pages/BankingPage';
export { default as ExpensesPage } from './pages/ExpensesPage';
export { default as BudgetsPage } from './pages/BudgetsPage';
export { default as TaxationPage } from './pages/TaxationPage';
```

#### [NEW] [features/hrms/index.ts](file:///d:/frontend/src/features/hrms/index.ts)
```typescript
export { default as HrmsDashboardPage } from './pages/DashboardPage';
export { default as EmployeesPage } from './pages/EmployeesPage';
export { default as EmployeeDetailsPage } from './pages/EmployeeDetailsPage';
export { default as AttendancePage } from './pages/AttendancePage';
export { default as LeavePage } from './pages/LeavePage';
export { default as PayrollPage } from './pages/PayrollPage';
export { default as RecruitmentPage } from './pages/RecruitmentPage';
export { default as PerformancePage } from './pages/PerformancePage';
export { default as LearningPage } from './pages/LearningPage';
export { default as EmployeeSelfServicePage } from './pages/EmployeeSelfServicePage';
export { default as HrmsAssetsPage } from './pages/AssetsPage';
```

#### [NEW] [features/integrations/index.ts](file:///d:/frontend/src/features/integrations/index.ts)
```typescript
export { default as IntegrationsDashboardPage } from './pages/DashboardPage';
export { default as ConnectorsPage } from './pages/ConnectorsPage';
```

#### [NEW] [features/monitoring/index.ts](file:///d:/frontend/src/features/monitoring/index.ts)
```typescript
export { default as MonitoringDashboardPage } from './pages/DashboardPage';
export { default as ServicesStatusPage } from './pages/ServicesStatusPage';
```

#### [NEW] [features/notifications/index.ts](file:///d:/frontend/src/features/notifications/index.ts)
```typescript
export { default as NotificationsDashboardPage } from './pages/DashboardPage';
export { default as NotificationTemplatesPage } from './pages/NotificationTemplatesPage';
```

#### [NEW] [features/platform-admin/index.ts](file:///d:/frontend/src/features/platform-admin/index.ts)
```typescript
export { default as AdminDashboardPage } from './pages/DashboardPage';
export { default as TenantsPage } from './pages/TenantsPage';
export { default as TenantDetailsPage } from './pages/TenantDetailsPage';
export { default as OrganizationsPage } from './pages/OrganizationsPage';
export { default as OrganizationDetailsPage } from './pages/OrganizationDetailsPage';
export { default as AdminUsersPage } from './pages/UsersPage';
export { default as UserDetailsPage } from './pages/UserDetailsPage';
export { default as RolesPage } from './pages/RolesPage';
export { default as PermissionsPage } from './pages/PermissionsPage';
export { default as AuthenticationSecurityPage } from './pages/AuthenticationSecurityPage';
export { default as ConfigurationPage } from './pages/ConfigurationPage';
export { default as BrandingPage } from './pages/BrandingPage';
export { default as LicensingPage } from './pages/LicensingPage';
export { default as AuditCompliancePage } from './pages/AuditCompliancePage';
```

#### [NEW] [features/portals/index.ts](file:///d:/frontend/src/features/portals/index.ts)
```typescript
export { default as PortalsDashboardPage } from './pages/DashboardPage';
export { default as CustomerPortalAdminPage } from './pages/CustomerPortalAdminPage';
export { default as PartnerPortalPage } from './pages/PartnerPortalPage';
```

#### [NEW] [features/reporting/index.ts](file:///d:/frontend/src/features/reporting/index.ts)
```typescript
export { default as ReportingDashboardPage } from './pages/DashboardPage';
export { default as ReportsPage } from './pages/ReportsPage';
```

#### [NEW] [features/revenue/index.ts](file:///d:/frontend/src/features/revenue/index.ts)
```typescript
export { default as RevenueDashboardPage } from './pages/DashboardPage';
export { default as RevenueRecognitionPage } from './pages/RevenueRecognitionPage';
```

#### [NEW] [features/search/index.ts](file:///d:/frontend/src/features/search/index.ts)
```typescript
export { default as SearchPage } from './pages/SearchPage';
```

#### [NEW] [features/security/index.ts](file:///d:/frontend/src/features/security/index.ts)
```typescript
export { default as SecurityDashboardPage } from './pages/DashboardPage';
export { default as DataPrivacyPage } from './pages/DataPrivacyPage';
```

#### [NEW] [features/subscription/index.ts](file:///d:/frontend/src/features/subscription/index.ts)
```typescript
export { default as SubscriptionDashboardPage } from './pages/DashboardPage';
export { default as PlansPage } from './pages/PlansPage';
export { default as SubscriptionInvoicesPage } from './pages/SubscriptionInvoicesPage';
```

#### [NEW] [features/workflow/index.ts](file:///d:/frontend/src/features/workflow/index.ts)
```typescript
export { default as WorkflowDashboardPage } from './pages/DashboardPage';
export { default as WorkflowDesignerPage } from './pages/WorkflowDesignerPage';
export { default as ApprovalsPage } from './pages/ApprovalsPage';
```

---

### 4. Router Refactoring (`src/app/router/index.tsx`)

#### [MODIFY] [index.tsx](file:///d:/frontend/src/app/router/index.tsx)
- Introduce `lazyFeature`:
  ```typescript
  const lazyFeature = <T extends React.ComponentType<any>>(
    importer: () => Promise<any>,
    name: string
  ) => {
    const Component = lazy(() => importer().then((mod) => ({ default: mod[name] })));
    return () => (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    );
  };
  ```
- Replace all 75 deep imports with `lazyFeature(() => import('@/features/<domain>'), '<ExportName>')`.
- Keep auth and error pages as local to `app`.
- Keep exact route structure, element bindings, and errorElement configurations completely intact.

---

## Verification Plan

### Automated Verification
1. **Typecheck**:
   ```powershell
   npm.cmd run typecheck
   ```
   Must pass with 0 errors (`tsc --noEmit`).
2. **Production Build**:
   ```powershell
   npm.cmd run build
   ```
   Must bundle cleanly with Vite.
3. **Deep Import Boundary Scan**:
   Run a ripgrep regex scan:
   ```powershell
   Get-ChildItem -Recurse -File -Path .\src | Select-String -Pattern "from ['\"].*features/[^'\"]+/[^'\"]+"
   ```
   Must return **zero** matches across the entire codebase.
4. **Directory Structure Verification**:
   Inspect directory tree to confirm:
   - Zero empty folders.
   - Zero `.gitkeep` files.
   - All feature pages reside in `src/features/<domain>/pages/`.
   - `src/app/config/index.ts` is flattened.

### Manual Verification
- Review generated route imports and bundle chunks to ensure clean code-splitting and identical runtime behavior.

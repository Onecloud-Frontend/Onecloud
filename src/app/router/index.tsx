import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// ─── Layouts ───────────────────────────────────────────────────────────────
import AuthLayout from '@/app/layouts/AuthLayout';
import AppLayout from '@/app/layouts/AppLayout';
import AdminLayout from '@/app/layouts/AdminLayout';

// ─── Error Pages ───────────────────────────────────────────────────────────
import NotFoundPage from '@/app/error-pages/404';
import GeneralErrorPage from '@/app/error-pages/GeneralErrorPage';

// ─── Simple fallback shown while lazy chunks load ─────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
  </div>
);

const lazy_ = (fn: () => Promise<{ default: React.ComponentType }>) => {
  const Component = lazy(fn);
  return () => (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

// ─── Auth Pages ────────────────────────────────────────────────────────────
const LoginPage             = lazy_(() => import('@/app/auth-pages/LoginPage'));
const RegisterPage          = lazy_(() => import('@/app/auth-pages/RegisterPage'));
const ForgotPasswordPage    = lazy_(() => import('@/app/auth-pages/ForgotPasswordPage'));
const OAuth2CallbackPage    = lazy_(() => import('@/app/auth-pages/OAuth2CallbackPage'));

// ─── Platform Admin Pages ──────────────────────────────────────────────────
const AdminDashboardPage          = lazy_(() => import('@/features/platform-admin/dashboard/DashboardPage'));
const TenantsPage                 = lazy_(() => import('@/features/platform-admin/tenants/TenantsPage'));
const TenantDetailsPage           = lazy_(() => import('@/features/platform-admin/tenants/TenantDetailsPage'));
const OrganizationsPage           = lazy_(() => import('@/features/platform-admin/organizations/OrganizationsPage'));
const OrganizationDetailsPage     = lazy_(() => import('@/features/platform-admin/organizations/OrganizationDetailsPage'));
const AdminUsersPage              = lazy_(() => import('@/features/platform-admin/users/UsersPage'));
const UserDetailsPage             = lazy_(() => import('@/features/platform-admin/users/UserDetailsPage'));
const RolesPage                   = lazy_(() => import('@/features/platform-admin/roles-permissions/RolesPage'));
const PermissionsPage             = lazy_(() => import('@/features/platform-admin/roles-permissions/PermissionsPage'));
const AuthenticationSecurityPage  = lazy_(() => import('@/features/platform-admin/authentication-security/AuthenticationSecurityPage'));
const ConfigurationPage           = lazy_(() => import('@/features/platform-admin/configuration/ConfigurationPage'));
const BrandingPage                = lazy_(() => import('@/features/platform-admin/branding/BrandingPage'));
const LicensingPage               = lazy_(() => import('@/features/platform-admin/licensing/LicensingPage'));
const AuditCompliancePage         = lazy_(() => import('@/features/platform-admin/audit-compliance/AuditCompliancePage'));
const ServicesPage                = lazy_(() => import('@/features/platform-admin/services/ServicesPage'));

// ─── HRMS Pages ────────────────────────────────────────────────────────────
const HrmsDashboardPage           = lazy_(() => import('@/features/hrms/dashboard/pages/DashboardPage'));
const EmployeesPage               = lazy_(() => import('@/features/hrms/employees/pages/EmployeesPage'));
const EmployeeDetailsPage         = lazy_(() => import('@/features/hrms/employees/pages/EmployeeDetailsPage'));
const AttendancePage              = lazy_(() => import('@/features/hrms/attendance/pages/AttendancePage'));
const LeavePage                   = lazy_(() => import('@/features/hrms/leave/pages/LeavePage'));
const PayrollPage                 = lazy_(() => import('@/features/hrms/payroll/pages/PayrollPage'));
const RecruitmentPage             = lazy_(() => import('@/features/hrms/recruitment/pages/RecruitmentPage'));
const PerformancePage             = lazy_(() => import('@/features/hrms/performance/pages/PerformancePage'));
const LearningPage                = lazy_(() => import('@/features/hrms/learning/pages/LearningPage'));
const EmployeeSelfServicePage     = lazy_(() => import('@/features/hrms/employee-self-service/pages/EmployeeSelfServicePage'));
const HrmsAssetsPage              = lazy_(() => import('@/features/hrms/assets/pages/AssetsPage'));
const HrmsSettingsPage            = lazy_(() => import('@/features/hrms/settings/pages/SettingsPage'));

// ─── CRM Pages ─────────────────────────────────────────────────────────────
const CrmDashboardPage            = lazy_(() => import('@/features/crm/dashboard/pages/DashboardPage'));
const LeadsPage                   = lazy_(() => import('@/features/crm/leads/pages/LeadsPage'));
const OpportunitiesPage           = lazy_(() => import('@/features/crm/opportunities/pages/OpportunitiesPage'));
const ContactsPage                = lazy_(() => import('@/features/crm/contacts/pages/ContactsPage'));
const SalesPipelinePage           = lazy_(() => import('@/features/crm/sales-pipeline/pages/SalesPipelinePage'));
const QuotationsPage              = lazy_(() => import('@/features/crm/quotations/pages/QuotationsPage'));
const CrmCustomerPortalPage       = lazy_(() => import('@/features/crm/customer-portal/pages/CustomerPortalPage'));
const CrmSettingsPage             = lazy_(() => import('@/features/crm/settings/pages/SettingsPage'));

// ─── ERP Pages ─────────────────────────────────────────────────────────────
const ErpDashboardPage            = lazy_(() => import('@/features/erp/dashboard/DashboardPage'));
const ProcurementPage             = lazy_(() => import('@/features/erp/procurement/ProcurementPage'));
const VendorsPage                 = lazy_(() => import('@/features/erp/vendors/VendorsPage'));
const InventoryPage               = lazy_(() => import('@/features/erp/inventory/InventoryPage'));
const WarehousePage               = lazy_(() => import('@/features/erp/warehouse/WarehousePage'));
const ErpSalesPage                = lazy_(() => import('@/features/erp/sales/SalesPage'));

// ─── Finance Pages ─────────────────────────────────────────────────────────
const FinanceDashboardPage        = lazy_(() => import('@/features/finance/dashboard/DashboardPage'));
const GeneralLedgerPage           = lazy_(() => import('@/features/finance/general-ledger/GeneralLedgerPage'));
const AccountsPayablePage         = lazy_(() => import('@/features/finance/accounts-payable/AccountsPayablePage'));
const AccountsReceivablePage      = lazy_(() => import('@/features/finance/accounts-receivable/AccountsReceivablePage'));
const BankingPage                 = lazy_(() => import('@/features/finance/banking/BankingPage'));
const ExpensesPage                = lazy_(() => import('@/features/finance/expenses/ExpensesPage'));
const BudgetsPage                 = lazy_(() => import('@/features/finance/budgets/BudgetsPage'));
const TaxationPage                = lazy_(() => import('@/features/finance/taxation/TaxationPage'));

// ─── Workflow Pages ────────────────────────────────────────────────────────
const WorkflowDashboardPage       = lazy_(() => import('@/features/workflow/dashboard/DashboardPage'));
const WorkflowDesignerPage        = lazy_(() => import('@/features/workflow/designer/WorkflowDesignerPage'));
const ApprovalsPage               = lazy_(() => import('@/features/workflow/approvals/ApprovalsPage'));

// ─── DMS Pages ─────────────────────────────────────────────────────────────
const DmsDashboardPage            = lazy_(() => import('@/features/dms/dashboard/DashboardPage'));
const DocumentRepositoryPage      = lazy_(() => import('@/features/dms/repository/DocumentRepositoryPage'));

// ─── Subscription Pages ────────────────────────────────────────────────────
const SubscriptionDashboardPage   = lazy_(() => import('@/features/subscription/dashboard/DashboardPage'));
const PlansPage                   = lazy_(() => import('@/features/subscription/plans/PlansPage'));
const SubscriptionInvoicesPage    = lazy_(() => import('@/features/subscription/invoices/SubscriptionInvoicesPage'));

// ─── Revenue Pages ─────────────────────────────────────────────────────────
const RevenueDashboardPage        = lazy_(() => import('@/features/revenue/dashboard/DashboardPage'));
const RevenueRecognitionPage      = lazy_(() => import('@/features/revenue/recognition/RevenueRecognitionPage'));

// ─── Reporting Pages ───────────────────────────────────────────────────────
const ReportingDashboardPage      = lazy_(() => import('@/features/reporting/dashboard/DashboardPage'));
const ReportsPage                 = lazy_(() => import('@/features/reporting/reports/ReportsPage'));

// ─── AI Pages ──────────────────────────────────────────────────────────────
const AiDashboardPage             = lazy_(() => import('@/features/ai/dashboard/DashboardPage'));
const AiCopilotPage               = lazy_(() => import('@/features/ai/copilot/AiCopilotPage'));

// ─── Notifications Pages ───────────────────────────────────────────────────
const NotificationsDashboardPage  = lazy_(() => import('@/features/notifications/dashboard/DashboardPage'));
const NotificationTemplatesPage   = lazy_(() => import('@/features/notifications/templates/NotificationTemplatesPage'));

// ─── Calendar Pages ────────────────────────────────────────────────────────
const CalendarDashboardPage       = lazy_(() => import('@/features/calendar/dashboard/DashboardPage'));

// ─── Integrations Pages ────────────────────────────────────────────────────
const IntegrationsDashboardPage   = lazy_(() => import('@/features/integrations/dashboard/DashboardPage'));
const ConnectorsPage              = lazy_(() => import('@/features/integrations/connectors/ConnectorsPage'));

// ─── Search ────────────────────────────────────────────────────────────────
const SearchPage                  = lazy_(() => import('@/features/search/SearchPage'));

// ─── Developer Pages ───────────────────────────────────────────────────────
const DeveloperDashboardPage      = lazy_(() => import('@/features/developer/dashboard/DashboardPage'));
const ApiKeysPage                 = lazy_(() => import('@/features/developer/api-keys/ApiKeysPage'));

// ─── Monitoring Pages ──────────────────────────────────────────────────────
const MonitoringDashboardPage     = lazy_(() => import('@/features/monitoring/dashboard/DashboardPage'));
const ServicesStatusPage          = lazy_(() => import('@/features/monitoring/services/ServicesStatusPage'));

// ─── Security Pages ────────────────────────────────────────────────────────
const SecurityDashboardPage       = lazy_(() => import('@/features/security/dashboard/DashboardPage'));
const DataPrivacyPage             = lazy_(() => import('@/features/security/data-privacy/DataPrivacyPage'));

// ─── Portals Pages ─────────────────────────────────────────────────────────
const PortalsDashboardPage        = lazy_(() => import('@/features/portals/dashboard/DashboardPage'));
const CustomerPortalAdminPage     = lazy_(() => import('@/features/portals/customer/CustomerPortalAdminPage'));
const PartnerPortalPage           = lazy_(() => import('@/features/portals/partner/PartnerPortalPage'));

// ═══════════════════════════════════════════════════════════════════════════
// ROUTE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export const router = createBrowserRouter([
  // ── Root redirect ────────────────────────────────────────────────────────
  {
    index: true,
    path: '/',
    element: <Navigate to="/login" replace />,
    errorElement: <GeneralErrorPage />,
  },

  // ── Authentication routes ─────────────────────────────────────────────────
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <GeneralErrorPage />,
    children: [
      { path: 'login',            element: <LoginPage /> },
      { path: 'register',         element: <RegisterPage /> },
      { path: 'forgot-password',  element: <ForgotPasswordPage /> },
      { path: 'oauth2/redirect',  element: <OAuth2CallbackPage /> },
    ],
  },

  // ── Platform Administration (Super Admin) ─────────────────────────────────
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <GeneralErrorPage />,
    children: [
      { index: true,                            element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard',                      element: <AdminDashboardPage /> },
      { path: 'tenants',                        element: <TenantsPage /> },
      { path: 'tenants/:id',                    element: <TenantDetailsPage /> },
      { path: 'organizations',                  element: <OrganizationsPage /> },
      { path: 'organizations/:id',              element: <OrganizationDetailsPage /> },
      { path: 'users',                          element: <AdminUsersPage /> },
      { path: 'users/:id',                      element: <UserDetailsPage /> },
      { path: 'roles',                          element: <RolesPage /> },
      { path: 'permissions',                    element: <PermissionsPage /> },
      { path: 'authentication-security',        element: <AuthenticationSecurityPage /> },
      { path: 'configuration',                  element: <ConfigurationPage /> },
      { path: 'branding',                       element: <BrandingPage /> },
      { path: 'licensing',                      element: <LicensingPage /> },
      { path: 'audit-compliance',              element: <AuditCompliancePage /> },
      { path: 'services',                       element: <ServicesPage /> },
    ],
  },

  // ── Application routes (authenticated business domains) ───────────────────
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <GeneralErrorPage />,
    children: [

      // HRMS
      { path: 'hrms',                   element: <Navigate to="/hrms/dashboard" replace /> },
      { path: 'hrms/dashboard',         element: <HrmsDashboardPage /> },
      { path: 'hrms/employees',         element: <EmployeesPage /> },
      { path: 'hrms/employees/:id',     element: <EmployeeDetailsPage /> },
      { path: 'hrms/attendance',        element: <AttendancePage /> },
      { path: 'hrms/leave',             element: <LeavePage /> },
      { path: 'hrms/payroll',           element: <PayrollPage /> },
      { path: 'hrms/recruitment',       element: <RecruitmentPage /> },
      { path: 'hrms/performance',       element: <PerformancePage /> },
      { path: 'hrms/learning',          element: <LearningPage /> },
      { path: 'hrms/ess',               element: <EmployeeSelfServicePage /> },
      { path: 'hrms/assets',            element: <HrmsAssetsPage /> },
      { path: 'hrms/settings',          element: <HrmsSettingsPage /> },

      // CRM
      { path: 'crm',                    element: <Navigate to="/crm/dashboard" replace /> },
      { path: 'crm/dashboard',          element: <CrmDashboardPage /> },
      { path: 'crm/leads',              element: <LeadsPage /> },
      { path: 'crm/opportunities',      element: <OpportunitiesPage /> },
      { path: 'crm/contacts',           element: <ContactsPage /> },
      { path: 'crm/pipeline',           element: <SalesPipelinePage /> },
      { path: 'crm/quotations',         element: <QuotationsPage /> },
      { path: 'crm/customer-portal',    element: <CrmCustomerPortalPage /> },
      { path: 'crm/settings',           element: <CrmSettingsPage /> },

      // ERP
      { path: 'erp',                    element: <Navigate to="/erp/dashboard" replace /> },
      { path: 'erp/dashboard',          element: <ErpDashboardPage /> },
      { path: 'erp/procurement',        element: <ProcurementPage /> },
      { path: 'erp/vendors',            element: <VendorsPage /> },
      { path: 'erp/inventory',          element: <InventoryPage /> },
      { path: 'erp/warehouse',          element: <WarehousePage /> },
      { path: 'erp/sales',              element: <ErpSalesPage /> },

      // Finance
      { path: 'finance',                        element: <Navigate to="/finance/dashboard" replace /> },
      { path: 'finance/dashboard',              element: <FinanceDashboardPage /> },
      { path: 'finance/general-ledger',         element: <GeneralLedgerPage /> },
      { path: 'finance/accounts-payable',       element: <AccountsPayablePage /> },
      { path: 'finance/accounts-receivable',    element: <AccountsReceivablePage /> },
      { path: 'finance/banking',                element: <BankingPage /> },
      { path: 'finance/expenses',               element: <ExpensesPage /> },
      { path: 'finance/budgets',                element: <BudgetsPage /> },
      { path: 'finance/taxation',               element: <TaxationPage /> },

      // Workflow
      { path: 'workflow',                       element: <Navigate to="/workflow/dashboard" replace /> },
      { path: 'workflow/dashboard',             element: <WorkflowDashboardPage /> },
      { path: 'workflow/designer',              element: <WorkflowDesignerPage /> },
      { path: 'workflow/approvals',             element: <ApprovalsPage /> },

      // DMS
      { path: 'dms',                            element: <Navigate to="/dms/dashboard" replace /> },
      { path: 'dms/dashboard',                  element: <DmsDashboardPage /> },
      { path: 'dms/repository',                 element: <DocumentRepositoryPage /> },

      // Subscription
      { path: 'subscription',                   element: <Navigate to="/subscription/dashboard" replace /> },
      { path: 'subscription/dashboard',         element: <SubscriptionDashboardPage /> },
      { path: 'subscription/plans',             element: <PlansPage /> },
      { path: 'subscription/invoices',          element: <SubscriptionInvoicesPage /> },

      // Revenue
      { path: 'revenue',                        element: <Navigate to="/revenue/dashboard" replace /> },
      { path: 'revenue/dashboard',              element: <RevenueDashboardPage /> },
      { path: 'revenue/recognition',            element: <RevenueRecognitionPage /> },

      // Reporting
      { path: 'reporting',                      element: <Navigate to="/reporting/dashboard" replace /> },
      { path: 'reporting/dashboard',            element: <ReportingDashboardPage /> },
      { path: 'reporting/reports',              element: <ReportsPage /> },

      // AI
      { path: 'ai',                             element: <Navigate to="/ai/dashboard" replace /> },
      { path: 'ai/dashboard',                   element: <AiDashboardPage /> },
      { path: 'ai/copilot',                     element: <AiCopilotPage /> },

      // Notifications
      { path: 'notifications',                  element: <Navigate to="/notifications/dashboard" replace /> },
      { path: 'notifications/dashboard',        element: <NotificationsDashboardPage /> },
      { path: 'notifications/templates',        element: <NotificationTemplatesPage /> },

      // Calendar
      { path: 'calendar',                       element: <Navigate to="/calendar/dashboard" replace /> },
      { path: 'calendar/dashboard',             element: <CalendarDashboardPage /> },

      // Integrations
      { path: 'integrations',                   element: <Navigate to="/integrations/dashboard" replace /> },
      { path: 'integrations/dashboard',         element: <IntegrationsDashboardPage /> },
      { path: 'integrations/connectors',        element: <ConnectorsPage /> },

      // Search
      { path: 'search',                         element: <SearchPage /> },

      // Developer
      { path: 'developer',                      element: <Navigate to="/developer/dashboard" replace /> },
      { path: 'developer/dashboard',            element: <DeveloperDashboardPage /> },
      { path: 'developer/api-keys',             element: <ApiKeysPage /> },

      // Monitoring
      { path: 'monitoring',                     element: <Navigate to="/monitoring/dashboard" replace /> },
      { path: 'monitoring/dashboard',           element: <MonitoringDashboardPage /> },
      { path: 'monitoring/services',            element: <ServicesStatusPage /> },

      // Security
      { path: 'security',                       element: <Navigate to="/security/dashboard" replace /> },
      { path: 'security/dashboard',             element: <SecurityDashboardPage /> },
      { path: 'security/data-privacy',          element: <DataPrivacyPage /> },

      // Portals
      { path: 'portals',                        element: <Navigate to="/portals/dashboard" replace /> },
      { path: 'portals/dashboard',              element: <PortalsDashboardPage /> },
      { path: 'portals/customer',               element: <CustomerPortalAdminPage /> },
      { path: 'portals/partner',                element: <PartnerPortalPage /> },
    ],
  },

  // ── 404 catch-all ─────────────────────────────────────────────────────────
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);


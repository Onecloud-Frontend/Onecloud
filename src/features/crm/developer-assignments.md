# OneCloud CRM Developer Assignments & GitHub Issues

This document defines the precise folder ownership, branch names, and GitHub Issues for each of the 11 CRM developers.

## 1. CRM Subdomain Scope
- Dashboard (`dashboard/`)
- Leads (`leads/`)
- Contacts (`contacts/`)
- Opportunities (`opportunities/`)
- Sales Pipeline (`sales-pipeline/`)
- Quotations (`quotations/`)
- Customer Portal (`customer-portal/`)

## Developer 1: CRM Foundation & Integration Coordinator (P0)
- **Branch**: `feature/crm-101-core-foundation`
- **Ownership**: `src/features/crm/shared/`
- **Responsibility**: Scaffold shared CRM types (`Lead`, `Contact`), wire mock interceptor, collate route definitions.

## Developer 2: Leads List & Board (P1)
- **Branch**: `feature/crm-201-leads-list`
- **Ownership**: `src/features/crm/leads/`
- **Responsibility**: `LeadsPage`, `LeadsKanbanBoard`, lead status transitions.

## Developer 3: Lead Details & Conversion (P1)
- **Branch**: `feature/crm-202-lead-details`
- **Ownership**: `src/features/crm/leads/`
- **Responsibility**: `LeadDetailsPage`, `LeadConversionForm`.

## Developer 4: Contacts Management (P1)
- **Branch**: `feature/crm-301-contacts`
- **Ownership**: `src/features/crm/contacts/`
- **Responsibility**: `ContactsPage`, `ContactTable`, Contact creation workflows.

## Developer 5: Opportunities List (P1)
- **Branch**: `feature/crm-401-opportunities`
- **Ownership**: `src/features/crm/opportunities/`
- **Responsibility**: `OpportunitiesPage`, `OpportunityList`.

## Developer 6: Opportunity Details & Tracking (P1)
- **Branch**: `feature/crm-402-opportunity-details`
- **Ownership**: `src/features/crm/opportunities/`
- **Responsibility**: `OpportunityDetailsPage`, tracking activity logs.

## Developer 7: Sales Pipeline Visualization (P1)
- **Branch**: `feature/crm-501-sales-pipeline`
- **Ownership**: `src/features/crm/sales-pipeline/`
- **Responsibility**: `SalesPipelinePage`, interactive funnel components.

## Developer 8: Quotations Generation (P1)
- **Branch**: `feature/crm-601-quotations`
- **Ownership**: `src/features/crm/quotations/`
- **Responsibility**: `QuotationsPage`, Quote generation forms.

## Developer 9: Customer Portal - Auth & Dashboard (P1)
- **Branch**: `feature/crm-701-portal-dashboard`
- **Ownership**: `src/features/crm/customer-portal/`
- **Responsibility**: `CustomerPortalPage`, client-facing dashboards.

## Developer 10: Customer Portal - Admin Views (P1)
- **Branch**: `feature/crm-702-portal-admin`
- **Ownership**: `src/features/crm/customer-portal/`
- **Responsibility**: `CustomerPortalAdminPage`, configuring portal access.

## Developer 11: CRM Global Dashboard & Analytics (P2)
- **Branch**: `feature/crm-801-global-dashboard`
- **Ownership**: `src/features/crm/dashboard/`
- **Responsibility**: `DashboardPage`, conversion rate metrics, revenue forecasts.

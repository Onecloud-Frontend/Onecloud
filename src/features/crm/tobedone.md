# OneCloud CRM — Complete Development Flow

The CRM team should follow this lifecycle:

```text
PHASE 0
CRM Specification Freeze
        ↓
PHASE 1
CRM Architecture & Ownership
        ↓
PHASE 2
CRM Foundation
        ↓
PHASE 3
CRM Contracts + Mock Data
        ↓
PHASE 4
Parallel Feature Development
        ↓
PHASE 5
Feature PR → dev
        ↓
PHASE 6
CRM Integration
        ↓
PHASE 7
QA / UAT
        ↓
PHASE 8
Backend API Integration
        ↓
PHASE 9
Integration Testing
        ↓
PHASE 10
Production Release
```

The key principle is:

> **Do not allow 11 developers to independently invent architecture. Architecture and contracts are established first; implementation then happens in parallel.**

---

# PHASE 0 — CRM Specification Freeze

### Objective

Before writing code, freeze exactly what CRM v1 contains.

Your CRM team should confirm:

```text
CRM
├── Dashboard
├── Contacts
├── Leads
├── Opportunities
├── Pipeline
├── Quotations
├── Customer Portal
└── Future CRM modules
```

For every module, define:

```text
Pages
Components
Forms
Hooks
Services
Types
Schemas
Mocks
Routes
API contracts
Acceptance criteria
```

Example:

```text
Leads
├── pages/
│   ├── LeadsPage.tsx
│   ├── LeadDetailsPage.tsx
│   └── LeadCreatePage.tsx
│
├── components/
├── forms/
├── hooks/
├── services/
├── types/
├── schemas/
└── mocks/
```

### Deliverable

A frozen:

```text
src/features/crm/developer-assignments.md
```

and CRM module specification.

---

# PHASE 1 — CRM Architecture & Ownership

Before developers code, establish ownership.

With 11 developers, use:

```text
Developer 1  → CRM Foundation / Integration
Developer 2  → Contacts
Developer 3  → Leads
Developer 4  → Lead Details / Lead Workflow
Developer 5  → Opportunities
Developer 6  → Pipeline
Developer 7  → Quotations
Developer 8  → Customer Portal
Developer 9  → CRM Dashboard
Developer 10 → CRM Reports / Analytics
Developer 11 → CRM Integration / Supporting Module
```

The exact assignment should follow the approved CRM assignment document already created in the repository.

### Folder ownership

Each developer gets an isolated area:

```text
src/features/crm/
│
├── contacts/       → Dev 2
├── leads/          → Dev 3/4
├── opportunities/  → Dev 5
├── pipeline/       → Dev 6
├── quotations/     → Dev 7
├── portal/         → Dev 8
├── dashboard/      → Dev 9
└── ...
```

### Protected areas

CRM developers should **not independently modify**:

```text
src/app/router/
src/app/layouts/
src/app/providers/
src/core/
src/styles/
package.json
vite.config.*
tsconfig.*
```

Unless specifically assigned through a Core issue.

---

# PHASE 2 — CRM Foundation

This is the equivalent of HRMS `#101`.

**Developer 1 starts first.**

Example:

```text
feature/crm-101-core-foundation
```

### Foundation responsibilities

Establish:

```text
CRM shared contracts
CRM query-key conventions
CRM API/service conventions
CRM mock integration
Common CRM types
```

For example:

```text
src/features/crm/shared/
├── types/
│   ├── contact.types.ts
│   ├── lead.types.ts
│   ├── opportunity.types.ts
│   └── quotation.types.ts
└── constants/
```

### Important

Don't put feature-specific implementation into `crm/shared`.

For example:

```text
crm/shared/
└── types/
    └── lead.types.ts        ✅
```

but:

```text
crm/shared/
└── leadService.ts           ❌
```

The service belongs to:

```text
crm/leads/services/
```

---

# PHASE 3 — CRM Contract + Mock Layer

Once the foundation is established, every feature must define its data contract.

The development pattern is:

```text
TYPE
 ↓
MOCK DATA
 ↓
SERVICE
 ↓
HOOK
 ↓
COMPONENT
 ↓
PAGE
```

## Example — Leads

### Step 1 — Type

```text
leads/types/lead.types.ts
```

Define:

```text
Lead
LeadStatus
LeadSource
LeadFilters
LeadPagination
LeadResponse
```

---

### Step 2 — Mock

```text
leads/mocks/leadsMockData.ts
```

Create realistic records.

Example:

```text
L-1001
Acme Corporation
John
Email
NEW
```

Mock data must conform to the TypeScript contract.

---

### Step 3 — Service

```text
leads/services/leadService.ts
```

Responsible for API communication.

```text
leadService
├── getLeads()
├── getLead()
├── createLead()
├── updateLead()
└── deleteLead()
```

The UI should never call Axios directly.

---

### Step 4 — Hook

```text
leads/hooks/useLeads.ts
```

TanStack Query manages:

```text
Fetching
Caching
Loading
Error
Refetch
Invalidation
Mutations
```

Example query-key convention:

```text
['crm', 'leads']
['crm', 'leads', filters]
['crm', 'lead', id]
```

---

# PHASE 4 — Parallel Feature Development

Once CRM Foundation is merged into `dev`, release the feature tickets.

```text
                    CRM FOUNDATION
                         │
                         ▼
                     merge → dev
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
   Contacts            Leads          Opportunities
       │                 │                 │
       ▼                 ▼                 ▼
    Pipeline         Quotations      Customer Portal
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
                     Dashboard
                         │
                         ▼
                      Reports
```

The developers work **in parallel**, but inside their own folders.

---

# PHASE 5 — Individual Feature Implementation

Every developer follows the same internal lifecycle.

## Example: Contacts

```text
contacts/
├── pages/
├── components/
├── forms/
├── hooks/
├── services/
├── types/
├── schemas/
└── mocks/
```

Development:

```text
Contact Type
     ↓
Contact Mock Data
     ↓
contactService
     ↓
useContacts
     ↓
ContactTable
     ↓
ContactsPage
```

---

# PHASE 6 — UI Implementation

After the data layer is established, developers build UI.

### Page

The page is the composition layer.

```text
ContactsPage
     │
     ├── useContacts()
     │
     ├── ContactFilters
     │
     ├── ContactTable
     │
     └── Pagination
```

### Component

Components should primarily handle presentation.

```text
ContactTable
      ↓
props
      ↓
render UI
```

Avoid putting API calls inside it.

---

# PHASE 7 — Forms

Any complex CRM form follows:

```text
Form
 ↓
React Hook Form
 ↓
Zod Schema
 ↓
Mutation Hook
 ↓
Service
 ↓
Mock API
```

Example:

```text
LeadForm
   ↓
leadSchema
   ↓
useCreateLead()
   ↓
leadService.createLead()
   ↓
Mock infrastructure
```

Validation belongs to the schema.

For example:

```text
Email
Required fields
Phone
Expected dates
Amounts
Enum values
Business-form validation
```

---

# PHASE 8 — Feature-Level Testing

Before opening a PR, each developer must test their own module.

### Test:

```text
Happy path
Loading
Error
Empty
Validation
Pagination
Search
Filtering
Sorting
Create
Edit
Delete
Navigation
Responsive UI
```

For example, Leads:

```text
Open Leads
      ↓
Loading state
      ↓
Data loaded
      ↓
Search lead
      ↓
Filter status
      ↓
Open lead
      ↓
Edit
      ↓
Save
      ↓
List refresh
```

---

# PHASE 9 — PR Process

Every developer creates:

```text
feature/crm-XXX-description
```

Then:

```text
Developer branch
      ↓
Local testing
      ↓
git push
      ↓
Pull Request
      ↓
dev
```

Never:

```text
feature → main ❌
```

---

# PHASE 10 — PR Review

CRM reviewer checks:

```text
☑ Correct folder
☑ Correct branch
☑ No unrelated files
☑ No architecture changes
☑ No cross-feature imports
☑ No direct Axios in components
☑ TanStack Query used
☑ RHF + Zod used
☑ Mock infrastructure reused
☑ Correct API contract
☑ Loading state
☑ Error state
☑ Empty state
☑ Responsive
☑ TypeScript passes
☑ Build passes
☑ No console errors
```

---

# PHASE 11 — Integration into `dev`

Don't merge everything blindly.

Recommended order:

```text
CRM Foundation
      ↓
Contacts
      ↓
Leads
      ↓
Lead Workflow
      ↓
Opportunities
      ↓
Pipeline
      ↓
Quotations
      ↓
Customer Portal
      ↓
Dashboard
      ↓
Reports / Analytics
```

However, once the foundation is merged, **independent feature PRs can be reviewed in parallel**. The order above is an integration sequence, not a requirement that every developer wait for the previous feature.

---

# PHASE 12 — CRM Integration Testing

Once all feature PRs are in `dev`, test CRM as one application.

```text
                    CRM
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
   Contacts        Leads      Opportunities
       │             │             │
       └─────────────┼─────────────┘
                     ▼
                  Pipeline
                     │
                     ▼
                Quotations
                     │
                     ▼
               Customer Portal
```

Test cross-module journeys.

### Example

```text
Create Contact
      ↓
Create Lead
      ↓
Convert / progress lead
      ↓
Create Opportunity
      ↓
Move opportunity through pipeline
      ↓
Generate Quotation
```

This is where integration defects become visible.

---

# PHASE 13 — Backend Integration

Only after the frontend mock implementation is stable should the team switch to the real Spring Boot APIs.

Current:

```text
Page
 ↓
Hook
 ↓
Service
 ↓
Core API
 ↓
Mock
```

Future:

```text
Page
 ↓
Hook
 ↓
Service
 ↓
Core API Client
 ↓
API Gateway
 ↓
Spring Boot
 ↓
Database
```

The major advantage is that:

```text
Page
Component
Hook
```

should require little or no architectural change.

The service/API contract becomes the primary integration boundary.

---

# PHASE 14 — API Contract Validation

For every CRM endpoint verify:

```text
HTTP Method
Endpoint
Path Parameters
Query Parameters
Request Body
Response Body
HTTP Status
Error Response
Pagination
Filtering
Sorting
Authentication
Authorization
```

Example:

```text
GET /api/crm/leads

Query:
page
limit
search
status
source
sortBy
sortOrder
```

Frontend should implement against the **agreed contract**, not assumptions about the Spring Boot implementation.

---

# PHASE 15 — End-to-End QA

Run:

```text
Authentication
      ↓
CRM Dashboard
      ↓
Contacts
      ↓
Leads
      ↓
Opportunities
      ↓
Pipeline
      ↓
Quotations
      ↓
Portal
      ↓
Reports
```

Check:

### Functional

```text
Create
Read
Update
Delete
Search
Filter
Sort
Pagination
Navigation
Forms
Validation
Downloads
```

### Technical

```text
TypeScript
Build
Console
Network requests
Query caching
Error handling
Responsive UI
Accessibility
Performance
```

---

# PHASE 16 — Release

Only after QA approval:

```text
dev
 ↓
QA
 ↓
Release Candidate
 ↓
Final verification
 ↓
main
 ↓
Deployment
```

---

# 🔥 The Complete CRM Developer Flow

Give this exact flow to your 11 developers:

```text
                    ┌─────────────────────┐
                    │  CRM SPECIFICATION  │
                    │       FREEZE        │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ ARCHITECTURE +      │
                    │ OWNERSHIP FREEZE    │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ CRM FOUNDATION      │
                    │ Developer 1         │
                    └──────────┬──────────┘
                               ↓
                         MERGE → DEV
                               ↓
             ┌─────────────────┴─────────────────┐
             │                                   │
             ▼                                   ▼
      PARALLEL DEVELOPMENT                 PARALLEL DEVELOPMENT
             │                                   │
     ┌───────┼────────┐                  ┌───────┼────────┐
     ▼       ▼        ▼                  ▼       ▼        ▼
 Contacts   Leads  Opportunities       Pipeline Quotations Portal
     │       │        │                  │       │        │
     └───────┴────────┴──────────────────┴───────┴────────┘
                               ↓
                         FEATURE PRs
                               ↓
                         CODE REVIEW
                               ↓
                         MERGE → DEV
                               ↓
                     CRM INTEGRATION QA
                               ↓
                     MOCK → REAL API
                               ↓
                    BACKEND INTEGRATION
                               ↓
                       E2E TESTING
                               ↓
                           UAT
                               ↓
                          RELEASE
                               ↓
                            MAIN
```

## Most important rule for the team

Every developer should remember this:

> **Own your module. Respect the contract. Don't touch another developer's folder. Don't touch Core without approval. Don't put API calls in UI. Don't invent architecture.**

And the implementation pattern stays:

```text
TYPE
  ↓
MOCK
  ↓
SERVICE
  ↓
TANSTACK QUERY HOOK
  ↓
COMPONENT
  ↓
PAGE
  ↓
ROUTE
  ↓
PR
  ↓
DEV
  ↓
QA
  ↓
BACKEND API
```

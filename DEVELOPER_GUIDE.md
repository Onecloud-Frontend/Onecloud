# OneCloud Enterprise Frontend — Developer Guide

Welcome to the OneCloud Enterprise Frontend! This guide explains the core architectural principles, the folder structure, and how to build features within this codebase.

Our architecture is designed for **scale, strict boundaries, and multi-team development**. It separates global application orchestration, core infrastructure, reusable UI components, and encapsulated business domains.

---

## 1. Top-Level Directory Structure

The `src/` directory is divided into strict architectural layers:

```text
src/
├── app/          # Application orchestration, routing, and global UI (No business logic)
├── core/         # Pure infrastructure, singleton services, security (UI independent)
├── features/     # Encapsulated business domains (HRMS, CRM, Finance, etc.)
├── shared/       # Domain-agnostic reusable UI components, types, and utilities
├── styles/       # Global CSS and Tailwind themes
└── assets/       # Static assets like images and fonts
```

### Layer Responsibilities
- **`app/`**: Bootstraps the application. Contains the router, layout wrappers, route guards (checking permissions/tenants), and global error/authentication pages.
- **`core/`**: The heavy lifting of the platform. Contains the API client (Axios/Fetch), TanStack Query global configurations, tenant resolution, RBAC/ABAC evaluators, and session management. **No UI components belong here.**
- **`shared/`**: "Dumb" UI components (buttons, modals, tables) and generic utilities (date formatting). **No business logic or domain-specific types belong here.**
- **`features/`**: Where feature teams live. Each folder here represents a distinct business domain. 


---

## 2. Dependency Rules

To prevent spaghetti code, strict dependency directions are enforced:

- ✅ **`app`** may import from `core`, `shared`, and the *public APIs* of `features`.
- ✅ **`features`** may import from `core` and `shared`.
- ❌ **`core`** must **never** import from `features` or `shared/components`. It is UI-independent.
- ❌ **`shared`** must **never** import from `features`.
- ❌ **`features/hrms`** must **never** deep-import from the internal folders of another feature like `features/crm`. 

---

## 3. Feature Structure Deep Dive: HRMS

The `features/` directory does not map 1:1 to backend microservices. Instead, it maps to **business domains and user workflows**. 

Let's look at what a fully populated feature module looks like, using `hrms` (Human Resources Management System) as an example.

```text
features/hrms/
├── api/                  # API calls specific to HRMS (e.g., fetchEmployees)
├── components/           # HRMS-specific UI components (e.g., EmployeeTable)
│   ├── EmployeeTable.tsx
│   └── EmployeeTable.test.tsx  # Co-located unit tests
├── hooks/                # HRMS-specific React hooks & TanStack Query hooks
│   └── useEmployees.ts
├── pages/                # Route entry points for the HRMS domain
│   ├── DashboardPage.tsx
│   └── EmployeesPage.tsx
├── schemas/              # Zod/Yup validation schemas for HRMS forms
├── types/                # TypeScript interfaces (e.g., Employee, Department)
├── constants/            # HRMS-specific constants (e.g., EMPLOYEE_STATUSES)
└── index.ts              # THE PUBLIC API CONTRACT
```

### Understanding the Feature Folders

- **Optional Folders**: Folders like `schemas/`, `constants/`, or `types/` should only be created if the feature actually needs them. Don't create empty folders just to match a template.
- **Encapsulation**: If `EmployeeTable` is only used within HRMS, it lives in `features/hrms/components/`. If a component is genuinely used across HRMS, CRM, and Finance, it should be promoted to `shared/components/`.
- **Co-located State**: Data fetching logic (TanStack Query) for employees lives inside `features/hrms/hooks/useEmployees.ts`, **not** in a global data fetching folder.

---

## 4. The Feature Public Contract (`index.ts`)

Every feature must contain an `index.ts` file at its root. **This is the Public API for the feature.** 

It should intentionally export *only* what the rest of the application (usually the `app/router`) needs to see.

**Correct (`features/hrms/index.ts`):**
```typescript
// Exporting pages for the router
export { default as EmployeesPage } from './pages/EmployeesPage';
export { default as HrmsDashboardPage } from './pages/DashboardPage';

// Exporting a cross-domain widget explicitly contracted for use in other features
export { EmployeeSelectWidget } from './components/EmployeeSelectWidget';
```

**Incorrect:**
```typescript
// Do not export internal types, raw API functions, or internal hooks 
// unless strictly necessary for a cross-domain contract.
export * from './types';
export * from './api';
```

When importing from a feature, **always** import from the root, never deep-import.
- ✅ `import { EmployeesPage } from '@/features/hrms';`
- ❌ `import { EmployeesPage } from '@/features/hrms/pages/EmployeesPage';`

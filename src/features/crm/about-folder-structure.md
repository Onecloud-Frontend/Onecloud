# CRM Subdomain Folder Structure Guide

Every active subdomain in the CRM module (e.g., `leads`, `contacts`, `opportunities`) follows a strict internal folder structure. This document explains exactly what belongs in each folder to maintain isolation and keep our architecture clean.

## The Directory Tree

```text
src/features/crm/<subdomain>/
├── pages/       # Route-level screens
├── components/  # Subdomain-specific UI
├── forms/       # React Hook Form + Zod integrations
├── hooks/       # TanStack Query hooks (Server State)
├── services/    # API interaction layer
├── types/       # TypeScript models
├── schemas/     # Zod validation schemas
└── mocks/       # Mock data responses
```

---

## 1. `pages/`
**What goes here?** 
The top-level React components that map directly to a URL route (e.g., `/crm/leads` -> `LeadsPage.tsx`).
**Rules:**
- Pages should be mostly "glue" code. They fetch data using custom hooks and pass it down to components.
- **NEVER** write `axios` or `fetch` calls here.
- **NEVER** write complex UI logic here. Delegate to `components/`.

## 2. `components/`
**What goes here?**
Dumb, presentational React components that are specific to this subdomain (e.g., `LeadKanbanBoard.tsx`, `LeadStatusBadge.tsx`).
**Rules:**
- If a component is used across multiple subdomains, it belongs in `src/features/crm/shared/components/` or `src/shared/components/`.
- Try to avoid fetching data inside these components; accept data via props from the Page.

## 3. `forms/`
**What goes here?**
Complex form components using `react-hook-form` and `@hookform/resolvers/zod` (e.g., `LeadConversionForm.tsx`).
**Rules:**
- Keep form state strictly controlled by React Hook Form. Do not arbitrarily use `useState` for form fields.

## 4. `hooks/`
**What goes here?**
TanStack Query (`react-query`) hooks for data fetching and mutations (e.g., `useLeads.ts`, `useUpdateLead.ts`).
**Rules:**
- All query keys must be prefixed with the domain (e.g., `['crm', 'leads']`).
- This is the only place `useQuery` or `useMutation` should be called.

## 5. `services/`
**What goes here?**
The Axios/API interaction layer (e.g., `leadService.ts`).
**Rules:**
- These are plain TypeScript files (not React hooks).
- All functions should return Promises typed with the interfaces from `types/`.

## 6. `types/`
**What goes here?**
TypeScript interfaces and types representing the data models (e.g., `Lead`, `LeadStatus`).
**Rules:**
- Define the exact shape of your API contracts here.

## 7. `schemas/`
**What goes here?**
Zod schemas used for form validation (e.g., `leadConversionSchema.ts`).
**Rules:**
- Separate validation logic from the React components.

## 8. `mocks/`
**What goes here?**
Hardcoded mock data that matches your `types/` exactly (e.g., `leadMockData.ts`).
**Rules:**
- Do not build a mock transport/server here. Just export raw data arrays/objects. The actual interception is handled by `src/core/api/mock/`.

---

## What comes next?
1. Check the `developer-assignments.md` to see your assigned subdomain.
2. Define your API contract in `types/` and `mocks/`.
3. Build your `services/` and `hooks/`.
4. Build the UI in `components/` and `pages/`.

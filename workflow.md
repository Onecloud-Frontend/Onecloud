# OneCloud Frontend Development Workflow

This document outlines the standard Git and Pull Request workflows for the OneCloud Frontend repository.

## 1. Branch Naming Convention
All feature branches must be created from `dev` and follow the naming format:
`feature/<domain>-<ticket-id>-<short-description>`

Examples:
- `feature/hrms-101-employee-table`
- `feature/crm-205-lead-status`
- `feature/core-401-auth-interceptor`

## 2. Protected Branches
- `main`: Production-ready code only. Direct commits are blocked.
- `dev`: Active integration branch. Direct commits are blocked. Features merge here.
- `QA`: Testing branch.

## 3. Pull Request Process
1. Push your branch and open a PR against `dev`.
2. Ensure your PR has one clearly defined purpose.
3. Your PR must pass all CI checks (Typecheck, Lint, Build).
4. Do not include unrelated changes outside your assigned feature folder.
5. If UI changes are present, include screenshots in the PR description.
6. Obtain at least one approval from a Core/Platform team member if your PR modifies `src/app`, `src/core`, `src/shared`, or the central router.

## 4. Definition of Done
Before requesting a review, verify:
- [ ] No unauthorized changes outside owned folders
- [ ] No cross-module imports (e.g., HRMS importing from CRM)
- [ ] No unnecessary shared-component creation
- [ ] No unrelated formatting/refactoring outside ownership
- [ ] Uses existing shared components where appropriate
- [ ] No direct Axios/fetch from UI (must flow through TanStack Query hooks)
- [ ] Uses React Hook Form + Zod for complex forms
- [ ] Loading state implemented
- [ ] Error state implemented
- [ ] Empty state implemented
- [ ] Responsive on mobile/desktop
- [ ] No console errors
- [ ] TypeScript errors resolved
- [ ] Existing functionality unaffected
- [ ] Tested locally

/**
 * MOCK-ONLY identity for the leave workflow.
 *
 * The repository has no link between the authenticated user (AuthUser.id, e.g. "user-1")
 * and an HRMS employee record (Employee.employeeId, e.g. "emp-5"). Until the backend
 * contract defines how the current employee is resolved, the mock layer uses this constant.
 *
 * Do NOT use this in real API branches.
 */
export const MOCK_CURRENT_EMPLOYEE_ID = "emp-5";

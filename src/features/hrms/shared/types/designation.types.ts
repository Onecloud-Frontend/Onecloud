export interface Designation {
  id: string;
  title: string;
  level: number; // e.g., 1 for Junior, 5 for C-level
  departmentId: string | null; // Nullable if designation spans departments
  createdAt: string;
  updatedAt: string;
}

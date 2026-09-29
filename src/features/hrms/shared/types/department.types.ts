export interface Department {
  id: string;
  name: string;
  description: string;
  headId: string | null; // Refers to an Employee ID
  parentDepartmentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
  parentId: number | null;
}

export interface Designation {
  id: number;
  name: string;
  code: string;
  description: string;
}

export interface DepartmentTreeNode extends Department {
  children: DepartmentTreeNode[];
}
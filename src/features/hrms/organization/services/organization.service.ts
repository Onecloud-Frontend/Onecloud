import type {
  Department,
  Designation,
} from "../types/organization.types";

const departments: Department[] = [
  {
    id: 1,
    name: "Human Resources",
    code: "HR",
    description: "Human Resources department",
    parentId: null,
  },
  {
    id: 2,
    name: "Engineering",
    code: "ENG",
    description: "Engineering department",
    parentId: null,
  },
  {
    id: 3,
    name: "Frontend Development",
    code: "FE",
    description: "Frontend development team",
    parentId: 2,
  },
  {
    id: 4,
    name: "Backend Development",
    code: "BE",
    description: "Backend development team",
    parentId: 2,
  },
  {
    id: 5,
    name: "Finance",
    code: "FIN",
    description: "Finance department",
    parentId: null,
  },
  {
    id: 6,
    name: "Recruitment",
    code: "REC",
    description: "Recruitment team",
    parentId: 1,
  },
];

const designations: Designation[] = [
  {
    id: 1,
    name: "HR Executive",
    code: "HRE",
    description: "Human resources executive",
  },
  {
    id: 2,
    name: "Software Engineer",
    code: "SE",
    description: "Software engineering role",
  },
  {
    id: 3,
    name: "Senior Software Engineer",
    code: "SSE",
    description: "Senior software engineering role",
  },
  {
    id: 4,
    name: "Engineering Manager",
    code: "EM",
    description: "Engineering management role",
  },
  {
    id: 5,
    name: "Finance Executive",
    code: "FE",
    description: "Finance executive role",
  },
];

export async function getDepartments(): Promise<Department[]> {
  return Promise.resolve([...departments]);
}

export async function getDesignations(): Promise<Designation[]> {
  return Promise.resolve([...designations]);
}
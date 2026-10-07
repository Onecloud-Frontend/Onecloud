import type { Employee } from "../../shared/types/employee.types";

export const mockDepartments = [
  {
    id: "DEPT001",
    name: "Engineering",
  },
  {
    id: "DEPT002",
    name: "Human Resources",
  },
  {
    id: "DEPT003",
    name: "Finance",
  },
  {
    id: "DEPT004",
    name: "Sales",
  },
];

export const mockDesignations = [
  {
    id: "DES001",
    name: "Software Engineer",
  },
  {
    id: "DES002",
    name: "Senior Software Engineer",
  },
  {
    id: "DES003",
    name: "HR Manager",
  },
  {
    id: "DES004",
    name: "Finance Manager",
  },
];

export const mockEmployees: Employee[] = [
  {
    employeeId: "EMP001",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    departmentId: "DEPT001",
    designationId: "DES001",
    managerId: null,
    joiningDate: "2024-01-15",
    employmentType: "FULL_TIME",
    status: "ACTIVE",
  },

  {
    employeeId: "EMP002",
    firstName: "Priya",
    lastName: "Patil",
    email: "priya.patil@example.com",
    phone: "9876543211",
    departmentId: "DEPT002",
    designationId: "DES003",
    managerId: null,
    joiningDate: "2023-08-10",
    employmentType: "FULL_TIME",
    status: "ACTIVE",
  },

  {
    employeeId: "EMP003",
    firstName: "Amit",
    lastName: "Deshmukh",
    email: "amit.deshmukh@example.com",
    phone: "9876543212",
    departmentId: "DEPT003",
    designationId: "DES004",
    managerId: null,
    joiningDate: "2022-06-20",
    employmentType: "FULL_TIME",
    status: "ACTIVE",
  },

  {
    employeeId: "EMP004",
    firstName: "Sneha",
    lastName: "Kulkarni",
    email: "sneha.kulkarni@example.com",
    phone: "9876543213",
    departmentId: "DEPT001",
    designationId: "DES002",
    managerId: "EMP001",
    joiningDate: "2024-03-05",
    employmentType: "FULL_TIME",
    status: "PROBATION",
  },

  {
    employeeId: "EMP005",
    firstName: "Vikas",
    lastName: "Joshi",
    email: "vikas.joshi@example.com",
    phone: "9876543214",
    departmentId: "DEPT004",
    designationId: "DES001",
    managerId: null,
    joiningDate: "2023-11-01",
    employmentType: "CONTRACT",
    status: "ACTIVE",
  },

  {
    employeeId: "EMP006",
    firstName: "Neha",
    lastName: "Shinde",
    email: "neha.shinde@example.com",
    phone: "9876543215",
    departmentId: "DEPT001",
    designationId: "DES001",
    managerId: "EMP001",
    joiningDate: "2024-05-12",
    employmentType: "FULL_TIME",
    status: "ACTIVE",
  },

  {
    employeeId: "EMP007",
    firstName: "Rohit",
    lastName: "More",
    email: "rohit.more@example.com",
    phone: "9876543216",
    departmentId: "DEPT003",
    designationId: "DES004",
    managerId: "EMP003",
    joiningDate: "2023-02-18",
    employmentType: "PART_TIME",
    status: "ON_LEAVE",
  },

  {
    employeeId: "EMP008",
    firstName: "Pooja",
    lastName: "Jadhav",
    email: "pooja.jadhav@example.com",
    phone: "9876543217",
    departmentId: "DEPT002",
    designationId: "DES003",
    managerId: "EMP002",
    joiningDate: "2022-09-25",
    employmentType: "FULL_TIME",
    status: "ACTIVE",
  },
];
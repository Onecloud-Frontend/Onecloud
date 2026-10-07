import type {
  Employee,
  EmployeeFilters,
  PaginatedEmployees,
} from "../../shared/types/employee.types";

import { mockEmployees } from "../mocks/employeesMockData";

import type {
  EmployeeFormValues,
} from "../schemas/employeeFormSchema";

class EmployeeService {
  async getEmployees(
    filters?: EmployeeFilters
  ): Promise<PaginatedEmployees> {
    await this.delay(300);

    let filteredData = [...mockEmployees];

    if (filters?.search) {
      const searchLower =
        filters.search.toLowerCase().trim();

      filteredData = filteredData.filter(
        (employee) =>
          employee.firstName
            .toLowerCase()
            .includes(searchLower) ||
          employee.lastName
            .toLowerCase()
            .includes(searchLower) ||
          employee.email
            .toLowerCase()
            .includes(searchLower) ||
          employee.employeeId
            .toLowerCase()
            .includes(searchLower)
      );
    }

    if (filters?.departmentId) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.departmentId ===
          filters.departmentId
      );
    }

    if (filters?.designationId) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.designationId ===
          filters.designationId
      );
    }

    if (filters?.status) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.status ===
          filters.status
      );
    }

    if (filters?.sortBy) {
      filteredData.sort((a, b) => {
        const valueA =
          a[filters.sortBy as keyof Employee];

        const valueB =
          b[filters.sortBy as keyof Employee];

        if (valueA == null) {
          return 1;
        }

        if (valueB == null) {
          return -1;
        }

        if (valueA < valueB) {
          return filters.sortOrder === "desc"
            ? 1
            : -1;
        }

        if (valueA > valueB) {
          return filters.sortOrder === "desc"
            ? -1
            : 1;
        }

        return 0;
      });
    }

    const page = filters?.page || 1;

    const limit = filters?.limit || 10;

    const startIndex =
      (page - 1) * limit;

    const endIndex =
      startIndex + limit;

    const paginatedData =
      filteredData.slice(
        startIndex,
        endIndex
      );

    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(
        filteredData.length / limit
      ),
    };
  }

  async getEmployeeById(
    id: string
  ): Promise<Employee> {
    await this.delay(300);

    const employee =
      mockEmployees.find(
        (item) =>
          item.employeeId === id
      );

    if (!employee) {
      throw new Error(
        `Employee with ID ${id} not found`
      );
    }

    return {
      ...employee,
    };
  }

  async createEmployee(
    data: EmployeeFormValues
  ): Promise<Employee> {
    await this.delay(400);

    const employeeId =
      this.generateEmployeeId();

    const employee: Employee = {
      employeeId,

      firstName: data.firstName,

      lastName: data.lastName,

      email: data.email,

      phone: data.phone,

      departmentId:
        data.departmentId,

      designationId:
        data.designationId,

      managerId:
        data.managerId || null,

      joiningDate:
        data.joiningDate,

      employmentType:
        data.employmentType,

      status:
        data.status,
    };

    mockEmployees.push(employee);

    return {
      ...employee,
    };
  }

  async updateEmployee(
    id: string,
    data: EmployeeFormValues
  ): Promise<Employee> {
    await this.delay(400);

    const index =
      mockEmployees.findIndex(
        (employee) =>
          employee.employeeId === id
      );

    if (index === -1) {
      throw new Error(
        `Employee with ID ${id} not found`
      );
    }

    const updatedEmployee: Employee = {
      employeeId: id,

      firstName: data.firstName,

      lastName: data.lastName,

      email: data.email,

      phone: data.phone,

      departmentId:
        data.departmentId,

      designationId:
        data.designationId,

      managerId:
        data.managerId || null,

      joiningDate:
        data.joiningDate,

      employmentType:
        data.employmentType,

      status:
        data.status,
    };

    mockEmployees[index] =
      updatedEmployee;

    return {
      ...updatedEmployee,
    };
  }

  async deleteEmployee(
    id: string
  ): Promise<void> {
    await this.delay(300);

    const index =
      mockEmployees.findIndex(
        (employee) =>
          employee.employeeId === id
      );

    if (index === -1) {
      throw new Error(
        `Employee with ID ${id} not found`
      );
    }

    mockEmployees.splice(index, 1);
  }

  private generateEmployeeId(): string {
    const numbers =
      mockEmployees
        .map((employee) =>
          Number(
            employee.employeeId.replace(
              "EMP",
              ""
            )
          )
        )
        .filter(
          (number) =>
            !Number.isNaN(number)
        );

    const nextNumber =
      numbers.length > 0
        ? Math.max(...numbers) + 1
        : 1;

    return `EMP${String(
      nextNumber
    ).padStart(3, "0")}`;
  }

  private delay(
    milliseconds: number
  ): Promise<void> {
    return new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          milliseconds
        )
    );
  }
}

export const employeeService =
  new EmployeeService();
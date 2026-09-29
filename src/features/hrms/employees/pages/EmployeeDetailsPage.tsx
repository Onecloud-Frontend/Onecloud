import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import type {
  Employee,
} from "../../shared/types/employee.types";

import {
  employeeService,
} from "../services/employeeService";

const EmployeeDetailsPage = () => {
  const { employeeId } = useParams<{
    employeeId: string;
  }>();

  const navigate = useNavigate();

  const [employee, setEmployee] =
    useState<Employee | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadEmployee = async () => {
      if (!employeeId) {
        setError("Employee ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await employeeService.getEmployeeById(
            employeeId
          );

        setEmployee(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load employee"
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [employeeId]);

  const handleDelete = async () => {
    if (!employeeId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await employeeService.deleteEmployee(
        employeeId
      );

      navigate("/hrms/employees");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete employee"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading employee...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>

        <Link
          to="/hrms/employees"
          className="mt-4 inline-block text-blue-600"
        >
          Back to Employees
        </Link>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6">
        <p>Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Employee Details
          </h1>

          <p className="mt-1 text-gray-600">
            {employee.firstName}{" "}
            {employee.lastName}
          </p>
        </div>

        <div className="flex gap-3">

          <Link
            to={`/hrms/employees/${employee.employeeId}/edit`}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Edit Employee
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>

        </div>
      </div>

      {/* Employee Information */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Personal Information */}

        <section className="rounded-lg border bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Personal Information
          </h2>

          <div className="space-y-4">

            <DetailRow
              label="Employee ID"
              value={employee.employeeId}
            />

            <DetailRow
              label="First Name"
              value={employee.firstName}
            />

            <DetailRow
              label="Last Name"
              value={employee.lastName}
            />

            <DetailRow
              label="Email"
              value={employee.email}
            />

            <DetailRow
              label="Phone"
              value={employee.phone}
            />

          </div>

        </section>

        {/* Employment Information */}

        <section className="rounded-lg border bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Employment Information
          </h2>

          <div className="space-y-4">

            <DetailRow
              label="Department ID"
              value={employee.departmentId}
            />

            <DetailRow
              label="Designation ID"
              value={employee.designationId}
            />

            <DetailRow
              label="Manager ID"
              value={
                employee.managerId ?? "-"
              }
            />

            <DetailRow
              label="Joining Date"
              value={employee.joiningDate}
            />

            <DetailRow
              label="Employment Type"
              value={formatValue(
                employee.employmentType
              )}
            />

            <DetailRow
              label="Status"
              value={formatValue(
                employee.status
              )}
            />

          </div>

        </section>

      </div>

    </div>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({
  label,
  value,
}: DetailRowProps) => {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-medium">
        {value}
      </p>
    </div>
  );
};

const formatValue = (value: string) => {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
};

export default EmployeeDetailsPage;
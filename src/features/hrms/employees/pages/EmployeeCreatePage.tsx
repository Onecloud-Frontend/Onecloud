import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";

import type {
  EmployeeFormValues,
} from "../schemas/employeeFormSchema";

import {
  employeeService,
} from "../services/employeeService";

const EmployeeCreatePage = () => {
  const navigate = useNavigate();

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const handleSubmit = async (
    values: EmployeeFormValues
  ) => {
    try {
      setIsSubmitting(true);

      setError(null);

      const employee =
        await employeeService.createEmployee(
          values
        );

      navigate(
        `/hrms/employees/${employee.employeeId}`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create employee"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Create Employee
        </h1>

        <p className="mt-1 text-gray-600">
          Add a new employee to the HRMS.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <EmployeeForm
          onSubmit={handleSubmit}
          submitLabel="Create Employee"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EmployeeCreatePage;
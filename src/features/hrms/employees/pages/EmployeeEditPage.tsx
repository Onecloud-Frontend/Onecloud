import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";

import type {
  EmployeeFormValues,
} from "../schemas/employeeFormSchema";

import {
  employeeService,
} from "../services/employeeService";

const EmployeeEditPage = () => {
  const {
    employeeId,
  } = useParams<{
    employeeId: string;
  }>();

  const navigate = useNavigate();

  const [
    employee,
    setEmployee,
  ] = useState<EmployeeFormValues | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

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

        setEmployee({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          departmentId: data.departmentId,
          designationId: data.designationId,
          managerId: data.managerId,
          joiningDate: data.joiningDate,
          employmentType: data.employmentType,
          status: data.status,
        });
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

  const handleSubmit = async (
    values: EmployeeFormValues
  ) => {
    if (!employeeId) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await employeeService.updateEmployee(
        employeeId,
        values
      );

      navigate(
        `/hrms/employees/${employeeId}`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update employee"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading employee...
      </div>
    );
  }

  if (error && !employee) {
    return (
      <div className="p-6">
        <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6">
        Employee not found.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Edit Employee
        </h1>

        <p className="mt-1 text-gray-600">
          Update employee information.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <EmployeeForm
          defaultValues={employee}
          onSubmit={handleSubmit}
          submitLabel="Update Employee"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EmployeeEditPage;
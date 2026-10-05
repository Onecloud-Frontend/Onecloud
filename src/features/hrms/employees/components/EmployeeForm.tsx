import {
  useEffect,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  employeeFormSchema,
  type EmployeeFormValues,
} from "../schemas/employeeFormSchema";

interface EmployeeFormProps {
  defaultValues?: Partial<EmployeeFormValues>;

  onSubmit: (
    values: EmployeeFormValues
  ) => void | Promise<void>;

  submitLabel?: string;

  isSubmitting?: boolean;
}

const defaultFormValues: EmployeeFormValues = {
  firstName: "",

  lastName: "",

  email: "",

  phone: "",

  departmentId: "",

  designationId: "",

  managerId: null,

  joiningDate: "",

  employmentType: "FULL_TIME",

  status: "ACTIVE",

  address: "",

  city: "",

  state: "",

  country: "",

  postalCode: "",
};

const EmployeeForm = ({
  defaultValues,
  onSubmit,
  submitLabel = "Save Employee",
  isSubmitting = false,
}: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } =
    useForm<EmployeeFormValues>({
      resolver:
        zodResolver(
          employeeFormSchema
        ),

      defaultValues: {
        ...defaultFormValues,
        ...defaultValues,
      },
    });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultFormValues,
        ...defaultValues,
      });
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* First Name */}

        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 font-medium"
          >
            First Name *
          </label>

          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter first name"
          />

          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}

        <div>
          <label
            htmlFor="lastName"
            className="block mb-2 font-medium"
          >
            Last Name *
          </label>

          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter last name"
          />

          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium"
          >
            Email *
          </label>

          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter email"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-medium"
          >
            Phone *
          </label>

          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter phone number"
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Department */}

        <div>
          <label
            htmlFor="departmentId"
            className="block mb-2 font-medium"
          >
            Department *
          </label>

          <select
            id="departmentId"
            {...register("departmentId")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">
              Select department
            </option>

            <option value="DEPT001">
              Engineering
            </option>

            <option value="DEPT002">
              Human Resources
            </option>

            <option value="DEPT003">
              Finance
            </option>
          </select>

          {errors.departmentId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.departmentId.message}
            </p>
          )}
        </div>

        {/* Designation */}

        <div>
          <label
            htmlFor="designationId"
            className="block mb-2 font-medium"
          >
            Designation *
          </label>

          <select
            id="designationId"
            {...register("designationId")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">
              Select designation
            </option>

            <option value="DES001">
              Software Developer
            </option>

            <option value="DES002">
              HR Executive
            </option>

            <option value="DES003">
              Senior Developer
            </option>
          </select>

          {errors.designationId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.designationId.message}
            </p>
          )}
        </div>

        {/* Manager */}

        <div>
          <label
            htmlFor="managerId"
            className="block mb-2 font-medium"
          >
            Manager
          </label>

          <select
            id="managerId"
            {...register("managerId")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">
              No Manager
            </option>

            <option value="EMP001">
              Rahul Sharma
            </option>

            <option value="EMP002">
              Priya Patil
            </option>
          </select>
        </div>

        {/* Joining Date */}

        <div>
          <label
            htmlFor="joiningDate"
            className="block mb-2 font-medium"
          >
            Joining Date *
          </label>

          <input
            id="joiningDate"
            type="date"
            {...register("joiningDate")}
            className="w-full rounded border px-3 py-2"
          />

          {errors.joiningDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.joiningDate.message}
            </p>
          )}
        </div>

        {/* Employment Type */}

        <div>
          <label
            htmlFor="employmentType"
            className="block mb-2 font-medium"
          >
            Employment Type *
          </label>

          <select
            id="employmentType"
            {...register(
              "employmentType"
            )}
            className="w-full rounded border px-3 py-2"
          >
            <option value="FULL_TIME">
              Full Time
            </option>

            <option value="PART_TIME">
              Part Time
            </option>

            <option value="CONTRACT">
              Contract
            </option>
          </select>

          {errors.employmentType && (
            <p className="mt-1 text-sm text-red-600">
              {
                errors.employmentType
                  .message
              }
            </p>
          )}
        </div>

        {/* Status */}

        <div>
          <label
            htmlFor="status"
            className="block mb-2 font-medium"
          >
            Status *
          </label>

          <select
            id="status"
            {...register("status")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="ACTIVE">
              Active
            </option>

            <option value="PROBATION">
              Probation
            </option>

            <option value="TERMINATED">
              Terminated
            </option>

            <option value="ON_LEAVE">
              On Leave
            </option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-600">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Address */}

        <div className="md:col-span-2">
          <label
            htmlFor="address"
            className="block mb-2 font-medium"
          >
            Address
          </label>

          <textarea
            id="address"
            {...register("address")}
            rows={3}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter address"
          />
        </div>

        {/* City */}

        <div>
          <label
            htmlFor="city"
            className="block mb-2 font-medium"
          >
            City
          </label>

          <input
            id="city"
            type="text"
            {...register("city")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter city"
          />
        </div>

        {/* State */}

        <div>
          <label
            htmlFor="state"
            className="block mb-2 font-medium"
          >
            State
          </label>

          <input
            id="state"
            type="text"
            {...register("state")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter state"
          />
        </div>

        {/* Country */}

        <div>
          <label
            htmlFor="country"
            className="block mb-2 font-medium"
          >
            Country
          </label>

          <input
            id="country"
            type="text"
            {...register("country")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter country"
          />
        </div>

        {/* Postal Code */}

        <div>
          <label
            htmlFor="postalCode"
            className="block mb-2 font-medium"
          >
            Postal Code
          </label>

          <input
            id="postalCode"
            type="text"
            {...register("postalCode")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter postal code"
          />
        </div>
      </div>

      {/* Submit */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
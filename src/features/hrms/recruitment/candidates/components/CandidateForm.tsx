import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  candidateFormSchema,
  type CandidateFormValues,
} from "../schemas/candidateFormSchema";

interface CandidateFormProps {
  defaultValues?: Partial<CandidateFormValues>;

  onSubmit: (
    values: CandidateFormValues
  ) => void | Promise<void>;

  submitLabel?: string;

  isSubmitting?: boolean;
}

const defaultFormValues: CandidateFormValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
  currentCompany: "",
  experience: 0,
  skills: [],
  currentPosition: "",
  source: "CAREER_PAGE",
  appliedPosition: "",
  status: "NEW",
};

const CandidateForm = ({
  defaultValues,
  onSubmit,
  submitLabel = "Save Candidate",
  isSubmitting = false,
}: CandidateFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateFormSchema),
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

        {/* Name */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-medium"
          >
            Name *
          </label>

          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter candidate name"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-medium"
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
            className="mb-2 block font-medium"
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

        {/* Location */}

        <div>
          <label
            htmlFor="location"
            className="mb-2 block font-medium"
          >
            Location *
          </label>

          <input
            id="location"
            type="text"
            {...register("location")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter location"
          />

          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Current Company */}

        <div>
          <label
            htmlFor="currentCompany"
            className="mb-2 block font-medium"
          >
            Current Company *
          </label>

          <input
            id="currentCompany"
            type="text"
            {...register("currentCompany")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter current company"
          />

          {errors.currentCompany && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentCompany.message}
            </p>
          )}
        </div>

        {/* Experience */}

        <div>
          <label
            htmlFor="experience"
            className="mb-2 block font-medium"
          >
            Experience (Years) *
          </label>

          <input
            id="experience"
            type="number"
            min="0"
            step="0.1"
            {...register("experience", {
              valueAsNumber: true,
            })}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter experience"
          />

          {errors.experience && (
            <p className="mt-1 text-sm text-red-600">
              {errors.experience.message}
            </p>
          )}
        </div>

        {/* Current Position */}

        <div>
          <label
            htmlFor="currentPosition"
            className="mb-2 block font-medium"
          >
            Current Position *
          </label>

          <input
            id="currentPosition"
            type="text"
            {...register("currentPosition")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter current position"
          />

          {errors.currentPosition && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPosition.message}
            </p>
          )}
        </div>

        {/* Skills */}

        <div>
          <label
            htmlFor="skills"
            className="mb-2 block font-medium"
          >
            Skills *
          </label>

          <input
            id="skills"
            type="text"
            defaultValue={
              defaultValues?.skills?.join(", ") ?? ""
            }
            {...register("skills", {
              setValueAs: (
                value: string | string[]
              ) => {
                if (Array.isArray(value)) {
                  return value;
                }

                return value
                  .split(",")
                  .map((skill) =>
                    skill.trim()
                  )
                  .filter(Boolean);
              },
            })}
            className="w-full rounded border px-3 py-2"
            placeholder="React, TypeScript, JavaScript"
          />

          <p className="mt-1 text-xs text-gray-500">
            Enter skills separated by commas.
          </p>

          {errors.skills && (
            <p className="mt-1 text-sm text-red-600">
              {errors.skills.message}
            </p>
          )}
        </div>

        {/* Applied Position */}

        <div>
          <label
            htmlFor="appliedPosition"
            className="mb-2 block font-medium"
          >
            Applied Position *
          </label>

          <input
            id="appliedPosition"
            type="text"
            {...register("appliedPosition")}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter applied position"
          />

          {errors.appliedPosition && (
            <p className="mt-1 text-sm text-red-600">
              {errors.appliedPosition.message}
            </p>
          )}
        </div>

        {/* Source */}

        <div>
          <label
            htmlFor="source"
            className="mb-2 block font-medium"
          >
            Source *
          </label>

          <select
            id="source"
            {...register("source")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="CAREER_PAGE">
              Career Page
            </option>

            <option value="LINKEDIN">
              LinkedIn
            </option>

            <option value="REFERRAL">
              Referral
            </option>

            <option value="JOB_PORTAL">
              Job Portal
            </option>

            <option value="AGENCY">
              Agency
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>

          {errors.source && (
            <p className="mt-1 text-sm text-red-600">
              {errors.source.message}
            </p>
          )}
        </div>

        {/* Status */}

        <div>
          <label
            htmlFor="status"
            className="mb-2 block font-medium"
          >
            Status *
          </label>

          <select
            id="status"
            {...register("status")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="NEW">
              New
            </option>

            <option value="SCREENING">
              Screening
            </option>

            <option value="SHORTLISTED">
              Shortlisted
            </option>

            <option value="INTERVIEW">
              Interview
            </option>

            <option value="OFFERED">
              Offered
            </option>

            <option value="HIRED">
              Hired
            </option>

            <option value="REJECTED">
              Rejected
            </option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-600">
              {errors.status.message}
            </p>
          )}
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

export default CandidateForm;
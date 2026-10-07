import {
  EmploymentType,
  JobOpeningFormData,
  JobOpeningStatus,
} from "../types/jobOpening.types";

export interface JobOpeningValidationErrors {
  jobTitle?: string;
  requisitionId?: string;
  requisitionTitle?: string;
  department?: string;
  location?: string;
  employmentType?: string;
  experience?: string;
  skills?: string;
  positions?: string;
  closingDate?: string;
  status?: string;
}

export const validateJobOpening = (
  data: JobOpeningFormData
): JobOpeningValidationErrors => {
  const errors: JobOpeningValidationErrors = {};

  if (!data.jobTitle.trim()) {
    errors.jobTitle = "Job title is required";
  }

  if (!data.requisitionId) {
    errors.requisitionId = "Requisition is required";
  }

  if (!data.requisitionTitle.trim()) {
    errors.requisitionTitle = "Requisition title is required";
  }

  if (!data.department.trim()) {
    errors.department = "Department is required";
  }

  if (!data.location.trim()) {
    errors.location = "Location is required";
  }

  const employmentTypes: EmploymentType[] = [
    "Full Time",
    "Part Time",
    "Contract",
    "Internship",
  ];

  if (!employmentTypes.includes(data.employmentType)) {
    errors.employmentType = "Select a valid employment type";
  }

  if (!data.experience.trim()) {
    errors.experience = "Experience is required";
  }

  if (data.skills.length === 0) {
    errors.skills = "At least one skill is required";
  }

  if (!data.positions || data.positions < 1) {
    errors.positions = "Positions must be at least 1";
  }

  if (!data.closingDate) {
    errors.closingDate = "Closing date is required";
  }

  const statuses: JobOpeningStatus[] = [
    "Open",
    "Paused",
    "Closed",
  ];

  if (!statuses.includes(data.status)) {
    errors.status = "Select a valid status";
  }

  return errors;
};

export const hasValidationErrors = (
  errors: JobOpeningValidationErrors
): boolean => {
  return Object.keys(errors).length > 0;
};
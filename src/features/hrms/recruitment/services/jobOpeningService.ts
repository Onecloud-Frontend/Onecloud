import { jobOpeningsMock } from "../mocks/jobOpenings.mock";
import {
  JobOpening,
  JobOpeningFormData,
  JobOpeningStatus,
} from "../types/jobOpening.types";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const jobOpeningService = {
  async getJobOpenings(): Promise<JobOpening[]> {
    await delay(400);

    return [...jobOpeningsMock];
  },

  async getJobOpening(id: number): Promise<JobOpening> {
    await delay(300);

    const jobOpening = jobOpeningsMock.find((item) => item.id === id);

    if (!jobOpening) {
      throw new Error("Job opening not found");
    }

    return jobOpening;
  },

  async createJobOpening(
    data: JobOpeningFormData
  ): Promise<JobOpening> {
    await delay(400);

    const newJobOpening: JobOpening = {
      id: Date.now(),
      ...data,
      createdDate: new Date().toISOString().split("T")[0],
    };

    jobOpeningsMock.push(newJobOpening);

    return newJobOpening;
  },

  async updateJobOpening(
    id: number,
    data: JobOpeningFormData
  ): Promise<JobOpening> {
    await delay(400);

    const index = jobOpeningsMock.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      throw new Error("Job opening not found");
    }

    const updatedJobOpening: JobOpening = {
      ...jobOpeningsMock[index],
      ...data,
    };

    jobOpeningsMock[index] = updatedJobOpening;

    return updatedJobOpening;
  },

  async updateStatus(
    id: number,
    status: JobOpeningStatus
  ): Promise<JobOpening> {
    await delay(300);

    const index = jobOpeningsMock.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      throw new Error("Job opening not found");
    }

    jobOpeningsMock[index] = {
      ...jobOpeningsMock[index],
      status,
    };

    return jobOpeningsMock[index];
  },

  async deleteJobOpening(id: number): Promise<void> {
    await delay(300);

    const index = jobOpeningsMock.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      throw new Error("Job opening not found");
    }

    jobOpeningsMock.splice(index, 1);
  },
};
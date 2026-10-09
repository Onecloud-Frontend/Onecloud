import type {
  Application,
  ApplicationFilters,
  ApplicationStatus,
  PaginatedApplications,
} from '../types/application.types';

import { mockApplications } from '../mocks/applications.mock';

class ApplicationService {
  async getApplications(
    filters?: ApplicationFilters
  ): Promise<PaginatedApplications> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    let filteredData = [...mockApplications];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();

        filteredData = filteredData.filter(
          (application) =>
            application.candidateName
              .toLowerCase()
              .includes(searchLower) ||
            application.candidateEmail
              .toLowerCase()
              .includes(searchLower) ||
            application.jobTitle.toLowerCase().includes(searchLower)
        );
      }

      if (filters.status) {
        filteredData = filteredData.filter(
          (application) => application.status === filters.status
        );
      }

      if (filters.recruiterId) {
        filteredData = filteredData.filter(
          (application) => application.recruiterId === filters.recruiterId
        );
      }

      if (filters.jobOpeningId) {
        filteredData = filteredData.filter(
          (application) => application.jobOpeningId === filters.jobOpeningId
        );
      }

      if (filters.sortBy) {
        filteredData.sort((a, b) => {
          const valueA = a[filters.sortBy as keyof Application];
          const valueB = b[filters.sortBy as keyof Application];

          if (valueA < valueB) {
            return filters.sortOrder === 'desc' ? 1 : -1;
          }

          if (valueA > valueB) {
            return filters.sortOrder === 'desc' ? -1 : 1;
          }

          return 0;
        });
      }
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
    };
  }

  async getApplicationById(id: string): Promise<Application> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const application = mockApplications.find(
      (item) => item.id === id
    );

    if (!application) {
      throw new Error(`Application with ID ${id} not found`);
    }

    return application;
  }


  

  async updateApplicationStatus(
    id: string,
    status: ApplicationStatus
  ): Promise<Application> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const application = mockApplications.find(
      (item) => item.id === id
    );

    if (!application) {
      throw new Error(`Application with ID ${id} not found`);
    }

    application.status = status;

    return application;
  }
}

export const applicationService = new ApplicationService();
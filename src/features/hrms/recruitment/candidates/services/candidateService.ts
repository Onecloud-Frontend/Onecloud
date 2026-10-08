import type {
  Candidate,
  CandidateFilters,
  PaginatedCandidates,
} from "../types/candidate.types";

import { mockCandidates } from "../mocks/candidates.mock";

class CandidateService {
  async getCandidates(
    filters?: CandidateFilters
  ): Promise<PaginatedCandidates> {
    await this.delay(300);

    let filteredData = [...mockCandidates];

    // Search
    if (filters?.search) {
      const searchLower = filters.search
        .toLowerCase()
        .trim();

      filteredData = filteredData.filter(
        (candidate) =>
          candidate.name
            .toLowerCase()
            .includes(searchLower) ||
          candidate.email
            .toLowerCase()
            .includes(searchLower) ||
          candidate.phone
            .toLowerCase()
            .includes(searchLower) ||
          candidate.candidateId
            .toLowerCase()
            .includes(searchLower) ||
          candidate.currentCompany
            .toLowerCase()
            .includes(searchLower) ||
          candidate.currentPosition
            .toLowerCase()
            .includes(searchLower) ||
          candidate.appliedPosition
            .toLowerCase()
            .includes(searchLower)
      );
    }

    // Status filter
    if (filters?.status) {
      filteredData = filteredData.filter(
        (candidate) =>
          candidate.status === filters.status
      );
    }

    // Source filter
    if (filters?.source) {
      filteredData = filteredData.filter(
        (candidate) =>
          candidate.source === filters.source
      );
    }

    // Applied position filter
    if (filters?.appliedPosition) {
      const positionFilter =
        filters.appliedPosition
          .toLowerCase()
          .trim();

      filteredData = filteredData.filter(
        (candidate) =>
          candidate.appliedPosition
            .toLowerCase()
            .includes(positionFilter)
      );
    }

    // Sorting
    if (filters?.sortBy) {
      filteredData.sort((a, b) => {
        const valueA =
          a[filters.sortBy as keyof Candidate];

        const valueB =
          b[filters.sortBy as keyof Candidate];

        if (valueA == null) {
          return 1;
        }

        if (valueB == null) {
          return -1;
        }

        const stringA = String(valueA);
        const stringB = String(valueB);

        if (stringA < stringB) {
          return filters.sortOrder === "desc"
            ? 1
            : -1;
        }

        if (stringA > stringB) {
          return filters.sortOrder === "desc"
            ? -1
            : 1;
        }

        return 0;
      });
    }

    // Pagination
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

  async getCandidateById(
    id: string
  ): Promise<Candidate> {
    await this.delay(300);

    const candidate =
      mockCandidates.find(
        (item) =>
          item.candidateId === id
      );

    if (!candidate) {
      throw new Error(
        `Candidate with ID ${id} not found`
      );
    }

    return {
      ...candidate,
    };
  }

  async createCandidate(
    data: Omit<
      Candidate,
      "candidateId" |
      "createdAt" |
      "updatedAt"
    >
  ): Promise<Candidate> {
    await this.delay(400);

    const candidateId =
      this.generateCandidateId();

    const now =
      new Date().toISOString();

    const candidate: Candidate = {
      candidateId,
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    mockCandidates.push(candidate);

    return {
      ...candidate,
    };
  }

  async updateCandidate(
    id: string,
    data: Omit<
      Candidate,
      "candidateId" |
      "createdAt" |
      "updatedAt"
    >
  ): Promise<Candidate> {
    await this.delay(400);

    const index =
      mockCandidates.findIndex(
        (candidate) =>
          candidate.candidateId === id
      );

    if (index === -1) {
      throw new Error(
        `Candidate with ID ${id} not found`
      );
    }

    const updatedCandidate: Candidate = {
      candidateId: id,
      ...data,
      createdAt:
        mockCandidates[index].createdAt,
      updatedAt:
        new Date().toISOString(),
    };

    mockCandidates[index] =
      updatedCandidate;

    return {
      ...updatedCandidate,
    };
  }

  async deleteCandidate(
    id: string
  ): Promise<void> {
    await this.delay(300);

    const index =
      mockCandidates.findIndex(
        (candidate) =>
          candidate.candidateId === id
      );

    if (index === -1) {
      throw new Error(
        `Candidate with ID ${id} not found`
      );
    }

    mockCandidates.splice(index, 1);
  }

  private generateCandidateId(): string {
    const numbers =
      mockCandidates
        .map((candidate) =>
          Number(
            candidate.candidateId.replace(
              "CAN",
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

    return `CAN${String(
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

export const candidateService =
  new CandidateService();
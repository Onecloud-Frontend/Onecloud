import {
  useEffect,
  useState,
} from "react";

import {
  useQueryClient,
} from "@tanstack/react-query";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useCandidates,
} from "../hooks/useCandidates";

import {
  candidateService,
} from "../services/candidateService";

import CandidateForm from "../components/CandidateForm";

import type {
  Candidate,
  CandidateFilters,
  CandidateStatus,
  CandidateSource,
} from "../types/candidate.types";

import type {
  CandidateFormValues,
} from "../schemas/candidateFormSchema";

const CandidatesPage = () => {
  const queryClient = useQueryClient();

  const location = useLocation();

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<CandidateStatus | "">("");

  const [source, setSource] =
    useState<CandidateSource | "">("");

  const [appliedPosition, setAppliedPosition] =
    useState("");

  const [page, setPage] = useState(1);

  // Popup state
  const [showCandidateModal, setShowCandidateModal] =
    useState(false);

  const [editingCandidate, setEditingCandidate] =
    useState<Candidate | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [formError, setFormError] =
    useState<string | null>(null);

  /*
   * Open the edit popup when coming from
   * Candidate Details page.
   */
  useEffect(() => {
    const state = location.state as {
      editCandidate?: Candidate;
    } | null;

    if (state?.editCandidate) {
      setEditingCandidate(
        state.editCandidate
      );

      setFormError(null);
      setShowCandidateModal(true);

      /*
       * Clear the navigation state from browser
       * history so the popup does not reopen
       * unexpectedly after refresh/back navigation.
       */
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }
  }, [location.state]);

  const filters: CandidateFilters = {
    search: search || undefined,
    status: status || undefined,
    source: source || undefined,
    appliedPosition:
      appliedPosition || undefined,
    page,
    limit: 5,
  };

  const {
    data,
    isLoading,
    isError,
    error,
  } = useCandidates(filters);

  const candidates = data?.data ?? [];

  const handleSearch = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (
    value: CandidateStatus | ""
  ) => {
    setStatus(value);
    setPage(1);
  };

  const handleSourceChange = (
    value: CandidateSource | ""
  ) => {
    setSource(value);
    setPage(1);
  };

  const handlePositionChange = (
    value: string
  ) => {
    setAppliedPosition(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setSource("");
    setAppliedPosition("");
    setPage(1);
  };

  // Open popup for creating a candidate
  const handleAddCandidate = () => {
    setEditingCandidate(null);
    setFormError(null);
    setShowCandidateModal(true);
  };

  // Open same popup for editing a candidate
  const handleEditCandidate = (
    candidate: Candidate
  ) => {
    setEditingCandidate(candidate);
    setFormError(null);
    setShowCandidateModal(true);
  };

  // Close popup
  const handleCloseModal = () => {
    if (isSubmitting) {
      return;
    }

    setShowCandidateModal(false);
    setEditingCandidate(null);
    setFormError(null);
  };

  // Create or update candidate
  const handleCandidateSubmit = async (
    values: CandidateFormValues
  ) => {
    try {
      setIsSubmitting(true);
      setFormError(null);

      if (editingCandidate) {
        await candidateService.updateCandidate(
          editingCandidate.candidateId,
          values
        );
      } else {
        await candidateService.createCandidate(
          values
        );
      }

      // Refresh candidate list
      await queryClient.invalidateQueries({
        queryKey: ["hrms", "candidates"],
      });

      // Close popup
      setShowCandidateModal(false);
      setEditingCandidate(null);
      setFormError(null);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : editingCandidate
            ? "Failed to update candidate"
            : "Failed to create candidate"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete candidate
  const handleDelete = async (
    candidateId: string,
    candidateName: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${candidateName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await candidateService.deleteCandidate(
        candidateId
      );

      await queryClient.invalidateQueries({
        queryKey: ["hrms", "candidates"],
      });
    } catch (err) {
      window.alert(
        err instanceof Error
          ? err.message
          : "Failed to delete candidate"
      );
    }
  };

  // Convert candidate data into CandidateForm values
  const editDefaultValues:
    | Partial<CandidateFormValues>
    | undefined = editingCandidate
    ? {
        name: editingCandidate.name,
        email: editingCandidate.email,
        phone: editingCandidate.phone,
        location: editingCandidate.location,
        currentCompany:
          editingCandidate.currentCompany,
        experience: editingCandidate.experience,
        skills: editingCandidate.skills,
        currentPosition:
          editingCandidate.currentPosition,
        source: editingCandidate.source,
        appliedPosition:
          editingCandidate.appliedPosition,
        status: editingCandidate.status,
      }
    : undefined;

  return (
    <div className="p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold">
            Candidates
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage recruitment candidates and
            applicant information.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddCandidate}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Candidate
        </button>

      </div>

      {/* Filters */}

      <div className="mb-6 rounded-lg border bg-white p-4">

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* Search */}

          <div>
            <label
              htmlFor="candidate-search"
              className="mb-1 block text-sm font-medium"
            >
              Search
            </label>

            <input
              id="candidate-search"
              type="text"
              value={search}
              onChange={(event) =>
                handleSearch(
                  event.target.value
                )
              }
              placeholder="Name, email, phone..."
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}

          <div>
            <label
              htmlFor="candidate-status"
              className="mb-1 block text-sm font-medium"
            >
              Status
            </label>

            <select
              id="candidate-status"
              value={status}
              onChange={(event) =>
                handleStatusChange(
                  event.target.value as CandidateStatus | ""
                )
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">
                All Statuses
              </option>

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
          </div>

          {/* Source */}

          <div>
            <label
              htmlFor="candidate-source"
              className="mb-1 block text-sm font-medium"
            >
              Source
            </label>

            <select
              id="candidate-source"
              value={source}
              onChange={(event) =>
                handleSourceChange(
                  event.target.value as CandidateSource | ""
                )
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">
                All Sources
              </option>

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
          </div>

          {/* Applied Position */}

          <div>
            <label
              htmlFor="candidate-position"
              className="mb-1 block text-sm font-medium"
            >
              Applied Position
            </label>

            <input
              id="candidate-position"
              type="text"
              value={appliedPosition}
              onChange={(event) =>
                handlePositionChange(
                  event.target.value
                )
              }
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Clear Filters */}

        <div className="mt-4">
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>

      </div>

      {/* Candidate Table */}

      <div className="overflow-hidden rounded-lg border bg-white">

        {isLoading && (
          <div className="p-8 text-center text-sm text-gray-500">
            Loading candidates...
          </div>
        )}

        {isError && (
          <div className="p-8 text-center text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Failed to load candidates."}
          </div>
        )}

        {!isLoading &&
          !isError &&
          candidates.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">
              No candidates found.
            </div>
          )}

        {!isLoading &&
          !isError &&
          candidates.length > 0 && (

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead className="border-b bg-gray-50">

                  <tr>

                    <th className="px-4 py-3 font-medium">
                      Candidate
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Contact
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Current Position
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Experience
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Applied Position
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Source
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Status
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y">

                  {candidates.map(
                    (candidate) => (
                      <tr
                        key={
                          candidate.candidateId
                        }
                        className="hover:bg-gray-50"
                      >

                        {/* Candidate */}

                        <td className="px-4 py-3">

                          <Link
                            to={`/hrms/recruitment/candidates/${candidate.candidateId}`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {candidate.name}
                          </Link>

                          <div className="text-xs text-gray-500">
                            {
                              candidate.candidateId
                            }
                          </div>

                        </td>

                        {/* Contact */}

                        <td className="px-4 py-3">

                          <div>
                            {candidate.email}
                          </div>

                          <div className="text-xs text-gray-500">
                            {candidate.phone}
                          </div>

                          <div className="text-xs text-gray-500">
                            {candidate.location}
                          </div>

                        </td>

                        {/* Current Position */}

                        <td className="px-4 py-3">

                          <div>
                            {
                              candidate.currentPosition
                            }
                          </div>

                          <div className="text-xs text-gray-500">
                            {
                              candidate.currentCompany
                            }
                          </div>

                        </td>

                        {/* Experience */}

                        <td className="px-4 py-3">
                          {candidate.experience} years
                        </td>

                        {/* Applied Position */}

                        <td className="px-4 py-3">
                          {
                            candidate.appliedPosition
                          }
                        </td>

                        {/* Source */}

                        <td className="px-4 py-3">
                          {candidate.source}
                        </td>

                        {/* Status */}

                        <td className="px-4 py-3">

                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
                            {candidate.status}
                          </span>

                        </td>

                        {/* Actions */}

                        <td className="px-4 py-3">

                          <div className="flex gap-2">

                            {/* View */}

                            <Link
                              to={`/hrms/recruitment/candidates/${candidate.candidateId}`}
                              className="rounded border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                            >
                              View
                            </Link>

                            {/* Edit */}

                            <button
                              type="button"
                              onClick={() =>
                                handleEditCandidate(
                                  candidate
                                )
                              }
                              className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                            >
                              Edit
                            </button>

                            {/* Delete */}

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  candidate.candidateId,
                                  candidate.name
                                )
                              }
                              className="rounded bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

      </div>

      {/* Pagination */}

      {data && data.totalPages > 1 && (

        <div className="mt-4 flex items-center justify-between">

          <p className="text-sm text-gray-500">
            Showing page {data.page} of{" "}
            {data.totalPages}
          </p>

          <div className="flex gap-2">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((current) =>
                  Math.max(
                    1,
                    current - 1
                  )
                )
              }
              className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                page === data.totalPages
              }
              onClick={() =>
                setPage((current) =>
                  Math.min(
                    data.totalPages,
                    current + 1
                  )
                )
              }
              className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>

      )}

      {/* Create / Edit Candidate Popup */}

      {showCandidateModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="candidate-modal-title"
        >

          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b px-6 py-4">

              <div>
                <h2
                  id="candidate-modal-title"
                  className="text-xl font-semibold"
                >
                  {editingCandidate
                    ? "Edit Candidate"
                    : "Create Candidate"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingCandidate
                    ? "Update candidate information."
                    : "Add a new candidate to the recruitment system."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="rounded-md px-3 py-2 text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close"
              >
                ×
              </button>

            </div>

            {/* Form Error */}

            {formError && (

              <div className="mx-6 mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {formError}
              </div>

            )}

            {/* Candidate Form */}

            <div className="p-6">

              <CandidateForm
                key={
                  editingCandidate
                    ? editingCandidate.candidateId
                    : "new-candidate"
                }
                defaultValues={
                  editDefaultValues
                }
                onSubmit={
                  handleCandidateSubmit
                }
                submitLabel={
                  editingCandidate
                    ? "Update Candidate"
                    : "Create Candidate"
                }
                isSubmitting={
                  isSubmitting
                }
              />

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default CandidatesPage;
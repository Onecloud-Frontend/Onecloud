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
  Candidate,
} from "../types/candidate.types";

import {
  candidateService,
} from "../services/candidateService";

const CandidateDetailsPage = () => {
  const { candidateId } = useParams<{
    candidateId: string;
  }>();

  const navigate = useNavigate();

  const [candidate, setCandidate] =
    useState<Candidate | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadCandidate = async () => {
      if (!candidateId) {
        setError("Candidate ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await candidateService.getCandidateById(
            candidateId
          );

        setCandidate(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load candidate"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCandidate();
  }, [candidateId]);

  const handleDelete = async () => {
    if (!candidateId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await candidateService.deleteCandidate(
        candidateId
      );

      navigate("/hrms/recruitment/candidates");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete candidate"
      );
    }
  };

  const handleEdit = () => {
    if (!candidate) {
      return;
    }

    navigate(
      "/hrms/recruitment/candidates",
      {
        state: {
          editCandidate: candidate,
        },
      }
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading candidate...</p>
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
          to="/hrms/recruitment/candidates"
          className="mt-4 inline-block rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          ← Back to Candidates
        </Link>

      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="p-6">

        <p>Candidate not found.</p>

        <Link
          to="/hrms/recruitment/candidates"
          className="mt-4 inline-block rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          ← Back to Candidates
        </Link>

      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Candidate Details
          </h1>

          <p className="mt-1 text-gray-600">
            {candidate.name}
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* Back to Candidates */}

          <Link
            to="/hrms/recruitment/candidates"
            className="rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            ← Back to Candidates
          </Link>

          {/* Edit Candidate */}

          <button
            type="button"
            onClick={handleEdit}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit Candidate
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={handleDelete}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

      {/* Candidate Information */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Personal Information */}

        <section className="rounded-lg border bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Personal Information
          </h2>

          <div className="space-y-4">

            <DetailRow
              label="Candidate ID"
              value={candidate.candidateId}
            />

            <DetailRow
              label="Name"
              value={candidate.name}
            />

            <DetailRow
              label="Email"
              value={candidate.email}
            />

            <DetailRow
              label="Phone"
              value={candidate.phone}
            />

            <DetailRow
              label="Location"
              value={candidate.location}
            />

          </div>

        </section>

        {/* Professional Information */}

        <section className="rounded-lg border bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Professional Information
          </h2>

          <div className="space-y-4">

            <DetailRow
              label="Current Company"
              value={candidate.currentCompany}
            />

            <DetailRow
              label="Current Position"
              value={candidate.currentPosition}
            />

            <DetailRow
              label="Experience"
              value={`${candidate.experience} years`}
            />

            <DetailRow
              label="Skills"
              value={candidate.skills.join(", ")}
            />

          </div>

        </section>

        {/* Recruitment Information */}

        <section className="rounded-lg border bg-white p-6 shadow-sm lg:col-span-2">

          <h2 className="mb-4 text-lg font-semibold">
            Recruitment Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <DetailRow
              label="Applied Position"
              value={candidate.appliedPosition}
            />

            <DetailRow
              label="Source"
              value={formatValue(candidate.source)}
            />

            <DetailRow
              label="Status"
              value={formatValue(candidate.status)}
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

export default CandidateDetailsPage;
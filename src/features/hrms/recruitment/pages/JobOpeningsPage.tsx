import { useMemo, useState } from "react";

import JobOpeningCard from "../components/JobOpeningCard";
import {
  useDeleteJobOpening,
  useJobOpenings,
  useUpdateJobOpeningStatus,
} from "../hooks/useJobOpenings";

import {
  JobOpening,
  JobOpeningStatus,
} from "../types/jobOpening.types";

import "./JobOpeningsPage.css";

const JobOpeningsPage = () => {
  const {
    data: jobOpenings = [],
    isLoading,
    isError,
    refetch,
  } = useJobOpenings();

  const deleteMutation = useDeleteJobOpening();
  const statusMutation = useUpdateJobOpeningStatus();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | JobOpeningStatus>(
    "All"
  );

  const [selectedJob, setSelectedJob] =
    useState<JobOpening | null>(null);

  const [showDetails, setShowDetails] = useState(false);

  const filteredJobOpenings = useMemo(() => {
    return jobOpenings.filter((job) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        job.jobTitle.toLowerCase().includes(searchText) ||
        job.department.toLowerCase().includes(searchText) ||
        job.location.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "All" || job.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [jobOpenings, search, status]);

  const handleView = (job: JobOpening) => {
    setSelectedJob(job);
    setShowDetails(true);
  };

  const handleEdit = (job: JobOpening) => {
    console.log("Edit job opening:", job);
  };

  const handleDelete = (job: JobOpening) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.jobTitle}"?`
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(job.id);
  };

  const handleStatusChange = (job: JobOpening) => {
    let newStatus: JobOpeningStatus;

    if (job.status === "Open") {
      newStatus = "Paused";
    } else if (job.status === "Paused") {
      newStatus = "Open";
    } else {
      newStatus = "Open";
    }

    statusMutation.mutate({
      id: job.id,
      status: newStatus,
    });
  };

  if (isLoading) {
    return (
      <div className="job-openings-state">
        <p>Loading job openings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="job-openings-state error-state">
        <h3>Unable to load job openings</h3>

        <button onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="job-openings-page">
      <div className="job-openings-header">
        <div>
          <h1>Job Openings</h1>

          <p>
            Manage available job openings and hiring positions.
          </p>
        </div>

        <button className="create-job-button">
          + Create Job Opening
        </button>
      </div>

      <div className="job-openings-toolbar">
        <input
          type="text"
          placeholder="Search job title, department or location..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as
                | "All"
                | JobOpeningStatus
            )
          }
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="Paused">Paused</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="job-openings-summary">
        <div>
          <span>Total</span>
          <strong>{jobOpenings.length}</strong>
        </div>

        <div>
          <span>Open</span>
          <strong>
            {
              jobOpenings.filter(
                (job) => job.status === "Open"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Paused</span>
          <strong>
            {
              jobOpenings.filter(
                (job) => job.status === "Paused"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Closed</span>
          <strong>
            {
              jobOpenings.filter(
                (job) => job.status === "Closed"
              ).length
            }
          </strong>
        </div>
      </div>

      {filteredJobOpenings.length === 0 ? (
        <div className="job-openings-empty">
          <h3>No job openings found</h3>
          <p>
            Try changing your search or status filter.
          </p>
        </div>
      ) : (
        <div className="job-openings-grid">
          {filteredJobOpenings.map((job) => (
            <JobOpeningCard
              key={job.id}
              job={job}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {showDetails && selectedJob && (
        <div
          className="job-details-overlay"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="job-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="job-details-header">
              <div>
                <h2>{selectedJob.jobTitle}</h2>
                <p>
                  Requisition #{selectedJob.requisitionId}
                </p>
              </div>

              <button
                onClick={() => setShowDetails(false)}
              >
                ×
              </button>
            </div>

            <div className="job-details-content">
              <div>
                <strong>Department</strong>
                <span>{selectedJob.department}</span>
              </div>

              <div>
                <strong>Location</strong>
                <span>{selectedJob.location}</span>
              </div>

              <div>
                <strong>Employment Type</strong>
                <span>{selectedJob.employmentType}</span>
              </div>

              <div>
                <strong>Experience</strong>
                <span>{selectedJob.experience}</span>
              </div>

              <div>
                <strong>Positions</strong>
                <span>{selectedJob.positions}</span>
              </div>

              <div>
                <strong>Closing Date</strong>
                <span>{selectedJob.closingDate}</span>
              </div>

              <div>
                <strong>Status</strong>
                <span>{selectedJob.status}</span>
              </div>

              <div className="job-details-skills">
                <strong>Skills</strong>

                <div>
                  {selectedJob.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobOpeningsPage;
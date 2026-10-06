import { JobOpening } from "../types/jobOpening.types";
import "./JobOpeningCard.css";

interface JobOpeningCardProps {
  job: JobOpening;
  onView: (job: JobOpening) => void;
  onEdit: (job: JobOpening) => void;
  onDelete: (job: JobOpening) => void;
  onStatusChange: (job: JobOpening) => void;
}

const JobOpeningCard = ({
  job,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: JobOpeningCardProps) => {
  return (
    <div className="job-opening-card">
      <div className="job-opening-card-header">
        <div>
          <h3>{job.jobTitle}</h3>

          <span className="job-requisition">
            Req #{job.requisitionId}
          </span>
        </div>

        <span
          className={`job-status job-status-${job.status.toLowerCase()}`}
        >
          {job.status}
        </span>
      </div>

      <div className="job-opening-card-body">
        <div className="job-info">
          <span className="job-info-label">Department</span>
          <span>{job.department}</span>
        </div>

        <div className="job-info">
          <span className="job-info-label">Location</span>
          <span>{job.location}</span>
        </div>

        <div className="job-info">
          <span className="job-info-label">Employment</span>
          <span>{job.employmentType}</span>
        </div>

        <div className="job-info">
          <span className="job-info-label">Experience</span>
          <span>{job.experience}</span>
        </div>

        <div className="job-info">
          <span className="job-info-label">Positions</span>
          <span>{job.positions}</span>
        </div>

        <div className="job-info">
          <span className="job-info-label">Closing Date</span>
          <span>{job.closingDate}</span>
        </div>
      </div>

      <div className="job-skills">
        {job.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="job-opening-actions">
        <button onClick={() => onView(job)}>
          View
        </button>

        <button onClick={() => onEdit(job)}>
          Edit
        </button>

        <button onClick={() => onStatusChange(job)}>
          Status
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(job)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobOpeningCard;
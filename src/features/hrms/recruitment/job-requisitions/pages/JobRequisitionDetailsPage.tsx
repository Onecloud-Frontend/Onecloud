import React from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  GraduationCap,
  Layers,
  Loader2,
  MapPin,
  Sparkles,
  Tag,
  User,
  Users,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, PageContainer } from '@/shared/components/ui';
import { useJobRequisition } from '../hooks/useJobRequisition';
import type { JobRequisitionStatus, RequisitionPriority } from '../types/jobRequisition.types';
import { JobRequisitionStatusBadge } from '../components/JobRequisitionStatusBadge';

const priorityStyles: Record<RequisitionPriority, string> = {
  URGENT: 'bg-rose-50 text-rose-700 border-rose-200',
  HIGH: 'bg-amber-50 text-amber-700 border-amber-200',
  MEDIUM: 'bg-blue-50 text-blue-700 border-blue-200',
  LOW: 'bg-slate-50 text-slate-700 border-slate-200',
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const formatDateTime = (dateStr?: string) => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
};

const formatEmploymentType = (type: string) => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

const STAGES: Array<{ key: JobRequisitionStatus; label: string; desc: string }> = [
  { key: 'DRAFT', label: 'Draft', desc: 'Requisition draft created' },
  { key: 'PENDING_APPROVAL', label: 'Pending Approval', desc: 'Submitted for management review' },
  { key: 'APPROVED', label: 'Approved', desc: 'Requisition formally approved' },
  { key: 'JOB_OPENING', label: 'Job Opening', desc: 'Active job opening initiated' },
];

const stageIndex = (status: JobRequisitionStatus) => {
  switch (status) {
    case 'DRAFT':
      return 0;
    case 'PENDING_APPROVAL':
      return 1;
    case 'APPROVED':
      return 2;
    case 'JOB_OPENING':
      return 3;
    default:
      return 0;
  }
};

export const JobRequisitionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: requisition, isLoading, isError, error } = useJobRequisition(id);

  if (isLoading) {
    return (
      <PageContainer className="py-12">
        <div className="rounded-xl border border-slate-200/70 bg-white p-12 text-center shadow-sm">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-blue-600" />
          <p className="mt-3 text-sm font-medium text-slate-700">Loading job requisition details…</p>
        </div>
      </PageContainer>
    );
  }

  if (isError || !requisition) {
    return (
      <PageContainer className="py-12">
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-8 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-rose-600" />
          <h1 className="mt-3 text-base font-bold text-rose-900">Job Requisition Not Found</h1>
          <p className="mt-1 text-xs text-rose-700">
            {error instanceof Error ? error.message : `Unable to find requisition with ID: ${id}`}
          </p>
          <div className="mt-5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate('/hrms/recruitment/job-requisitions')}
            >
              Back to Requisitions
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  const currentStageIdx = stageIndex(requisition.status);

  return (
    <PageContainer className="pb-12 pt-2 space-y-6">
      {/* Header with back navigation & actions */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate('/hrms/recruitment/job-requisitions')}
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Requisitions
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            HRMS / Recruitment / Job Requisitions / {requisition.id}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#0b1f4d]">
              {requisition.jobTitle}
            </h1>
            <JobRequisitionStatusBadge status={requisition.status} />
            <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-slate-600">
              {requisition.id}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Created on {formatDate(requisition.createdAt)} • Last updated on {formatDate(requisition.updatedAt)}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate(`/hrms/recruitment/job-requisitions/${requisition.id}/edit`)}
            className="h-9 gap-1.5 text-xs text-slate-700 hover:border-blue-300 hover:text-blue-600"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit Requisition
          </Button>
        </div>
      </div>

      {/* Workflow Progress Banner */}
      <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Workflow Status Progress
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx <= currentStageIdx;
            const isCurrent = idx === currentStageIdx;

            return (
              <div
                key={stage.key}
                className={`relative rounded-lg border p-3.5 transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500'
                    : isCompleted
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-slate-200 bg-slate-50/50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  ) : (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                      {idx + 1}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900">{stage.label}</p>
                    <p className="text-[10px] text-slate-500 truncate">{stage.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Details Grid: 2 Columns */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols): Basic Info & Requirements */}
        <div className="space-y-6 lg:col-span-2">
          {/* Section 1: Basic Information */}
          <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Building2 className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-bold text-[#0b1f4d]">Basic Information</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Job Title</span>
                <p className="mt-0.5 text-sm font-semibold text-slate-800">{requisition.jobTitle}</p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Department</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">{requisition.department}</p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Location</span>
                <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-slate-800">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {requisition.location}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Employment Type</span>
                <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-slate-800">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                  {formatEmploymentType(requisition.employmentType)}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Number of Positions</span>
                <p className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-blue-600">
                  <Users className="h-3.5 w-3.5 text-blue-500" />
                  {requisition.numberOfPositions} {requisition.numberOfPositions === 1 ? 'Open Position' : 'Open Positions'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Role Requirements */}
          <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <GraduationCap className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-bold text-[#0b1f4d]">Role Requirements & Skills</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Experience Required</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">{requisition.experience}</p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Minimum Education</span>
                <p className="mt-0.5 text-sm font-medium text-slate-800">{requisition.education}</p>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Key Required Skills</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {requisition.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    <Tag className="h-3 w-3 text-slate-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Job Description & Responsibilities</span>
              <div className="mt-2 rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 whitespace-pre-line border border-slate-100">
                {requisition.description}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Hiring & Timeline, Audit Trail */}
        <div className="space-y-6">
          {/* Section 3: Hiring & Timeline */}
          <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <User className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-bold text-[#0b1f4d]">Hiring & Timeline</h2>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Hiring Manager</span>
                <p className="mt-0.5 text-sm font-semibold text-slate-800">{requisition.hiringManager}</p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Requisition Priority</span>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                      priorityStyles[requisition.priority] ?? priorityStyles.MEDIUM
                    }`}
                  >
                    {requisition.priority}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Expected Joining Date</span>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-slate-800">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {formatDate(requisition.expectedJoiningDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Workflow Audit History */}
          <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Clock className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-bold text-[#0b1f4d]">Audit & Timestamps</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-slate-500">Created:</span>
                <span className="font-medium text-slate-800 text-right">{formatDateTime(requisition.createdAt)}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-slate-500">Last Updated:</span>
                <span className="font-medium text-slate-800 text-right">{formatDateTime(requisition.updatedAt)}</span>
              </div>

              {requisition.submittedAt && (
                <div className="flex items-start justify-between">
                  <span className="text-slate-500">Submitted for Approval:</span>
                  <span className="font-medium text-amber-700 text-right">{formatDateTime(requisition.submittedAt)}</span>
                </div>
              )}

              {requisition.approvedAt && (
                <div className="flex items-start justify-between">
                  <span className="text-slate-500">Approved at:</span>
                  <span className="font-medium text-emerald-700 text-right">{formatDateTime(requisition.approvedAt)}</span>
                </div>
              )}

              {requisition.jobOpeningCreatedAt && (
                <div className="flex items-start justify-between">
                  <span className="text-slate-500">Job Opening Created:</span>
                  <span className="font-medium text-blue-700 text-right">{formatDateTime(requisition.jobOpeningCreatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default JobRequisitionDetailsPage;

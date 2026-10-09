import { useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, PageContainer } from '@/shared/components/ui';
import {
  useCreateJobRequisition,
  useJobRequisition,
  useUpdateJobRequisition,
  useUpdateJobRequisitionStatus,
} from '../hooks/useJobRequisition';
import { JobRequisitionForm } from '../components/JobRequisitionForm';
import type { JobRequisitionFormValues } from '../types/jobRequisition.types';
import { JobRequisitionStatusBadge } from '../components/JobRequisitionStatusBadge';

const JobRequisitionFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const [successMessage, setSuccessMessage] = useState('');

  const requisitionQuery = useJobRequisition(id);
  const createMutation = useCreateJobRequisition();
  const updateMutation = useUpdateJobRequisition(id ?? '');
  const statusMutation = useUpdateJobRequisitionStatus();

  const requisition = requisitionQuery.data;
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isStatusUpdating = statusMutation.isPending;

  const showError = requisitionQuery.isError || createMutation.isError || updateMutation.isError || statusMutation.isError;
  const errorMessage =
    (requisitionQuery.error instanceof Error && requisitionQuery.error.message) ||
    (createMutation.error instanceof Error && createMutation.error.message) ||
    (updateMutation.error instanceof Error && updateMutation.error.message) ||
    (statusMutation.error instanceof Error && statusMutation.error.message);

  const handleSaveDraft = async (values: JobRequisitionFormValues) => {
    if (requisition) {
      await updateMutation.mutateAsync(values);
      setSuccessMessage('Job requisition draft saved successfully.');
      return;
    }

    const created = await createMutation.mutateAsync(values);
    setSuccessMessage('Job requisition draft created successfully.');
    navigate(`/hrms/recruitment/job-requisitions/${created.id}/edit`, { replace: true });
  };

  const handleSubmitForApproval = async (values: JobRequisitionFormValues) => {
    if (requisition) {
      await updateMutation.mutateAsync(values);
      await statusMutation.mutateAsync({ id: requisition.id, status: 'PENDING_APPROVAL' });
      setSuccessMessage('Job requisition submitted for approval.');
      return;
    }

    const created = await createMutation.mutateAsync(values);
    await statusMutation.mutateAsync({ id: created.id, status: 'PENDING_APPROVAL' });
    setSuccessMessage('Job requisition submitted for approval.');
    navigate(`/hrms/recruitment/job-requisitions/${created.id}/edit`, { replace: true });
  };

  const handleApprove = async () => {
    if (!id) return;
    await statusMutation.mutateAsync({ id, status: 'APPROVED' });
    setSuccessMessage('Job requisition approved successfully.');
  };

  const handleCreateJobOpening = async () => {
    if (!id) return;
    await statusMutation.mutateAsync({ id, status: 'JOB_OPENING' });
    setSuccessMessage('Job requisition moved to Job Opening successfully.');
  };

  if (isEdit && requisitionQuery.isLoading) {
    return (
      <PageContainer className="py-8">
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-600" />
          <p className="mt-3 text-sm font-medium text-slate-700">Loading requisition…</p>
        </div>
      </PageContainer>
    );
  }

  if (isEdit && requisitionQuery.isError) {
    return (
      <PageContainer className="py-8">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center">
          <AlertCircle className="mx-auto h-7 w-7 text-rose-600" />
          <h1 className="mt-3 text-base font-bold text-rose-900">Unable to load requisition</h1>
          <p className="mt-1 text-sm text-rose-700">{requisitionQuery.error instanceof Error ? requisitionQuery.error.message : 'Requisition could not be loaded.'}</p>
          <Button type="button" variant="outline" className="mt-5" onClick={() => navigate('/hrms/recruitment')}>
            Back to Recruitment
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="pb-10 pt-2">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">HRMS / Recruitment / Job Requisition</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0b1f4d]">
            {isEdit ? 'Edit Job Requisition' : 'Create Job Requisition'}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Create and move a hiring request through the approval workflow without leaving the requisition.
          </p>
        </div>

        {requisition && (
          <div className="flex items-center gap-2">
            <JobRequisitionStatusBadge status={requisition.status} />
            <span className="text-xs font-medium text-slate-500">{requisition.id}</span>
          </div>
        )}
      </div>

      {successMessage && !showError && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="font-medium">{successMessage}</p>
        </div>
      )}

      {showError && errorMessage && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Action could not be completed</p>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {requisition?.status === 'JOB_OPENING' && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Job opening stage reached</p>
            <p className="mt-0.5">This requisition is approved and has been moved to the Job Opening stage for the next recruitment workflow.</p>
          </div>
        </div>
      )}

      <div className="mt-5">
        <JobRequisitionForm
          requisition={requisition}
          isSubmitting={isSaving}
          isStatusUpdating={isStatusUpdating}
          onSaveDraft={handleSaveDraft}
          onSubmitForApproval={handleSubmitForApproval}
          onApprove={handleApprove}
          onCreateJobOpening={handleCreateJobOpening}
          onCancel={() => navigate(-1)}
        />
      </div>
    </PageContainer>
  );
};

export default JobRequisitionFormPage;

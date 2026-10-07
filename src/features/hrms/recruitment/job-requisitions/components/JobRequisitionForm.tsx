import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, Check, ChevronRight, Plus, Save, Send, X } from 'lucide-react';
import { Button, Input, Label } from '@/shared/components/ui';
import { jobRequisitionSchema } from '../schemas/jobRequisition.schema';
import type {
  EmploymentType,
  JobRequisition,
  JobRequisitionFormValues,
  RequisitionPriority,
} from '../types/jobRequisition.types';
import { JobRequisitionStatusBadge } from './JobRequisitionStatusBadge';

interface JobRequisitionFormProps {
  requisition?: JobRequisition;
  isSubmitting?: boolean;
  isStatusUpdating?: boolean;
  onSaveDraft: (values: JobRequisitionFormValues) => Promise<void>;
  onSubmitForApproval: (values: JobRequisitionFormValues) => Promise<void>;
  onApprove: () => Promise<void>;
  onCreateJobOpening: () => Promise<void>;
  onCancel: () => void;
}

const defaultValues: JobRequisitionFormValues = {
  jobTitle: '',
  department: '',
  location: '',
  employmentType: 'FULL_TIME',
  numberOfPositions: 1,
  experience: '',
  skills: [],
  education: '',
  description: '',
  hiringManager: '',
  priority: 'MEDIUM',
  expectedJoiningDate: '',
};

const employmentTypeLabels: Record<EmploymentType, string> = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  CONTRACT: 'Contract',
  TEMPORARY: 'Temporary',
};

const priorityLabels: Record<RequisitionPriority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
};

const inputClass =
  'mt-1.5 h-10 rounded-lg border-slate-200 bg-white text-sm shadow-sm focus-visible:border-blue-500 focus-visible:ring-blue-500/20';

const textareaClass =
  'mt-1.5 min-h-32 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-rose-600">{message}</p>;
}

export function JobRequisitionForm({
  requisition,
  isSubmitting = false,
  isStatusUpdating = false,
  onSaveDraft,
  onSubmitForApproval,
  onApprove,
  onCreateJobOpening,
  onCancel,
}: JobRequisitionFormProps) {
  const [skillInput, setSkillInput] = useState('');

  const formDefaults = useMemo<JobRequisitionFormValues>(
    () =>
      requisition
        ? {
            jobTitle: requisition.jobTitle,
            department: requisition.department,
            location: requisition.location,
            employmentType: requisition.employmentType,
            numberOfPositions: requisition.numberOfPositions,
            experience: requisition.experience,
            skills: requisition.skills,
            education: requisition.education,
            description: requisition.description,
            hiringManager: requisition.hiringManager,
            priority: requisition.priority,
            expectedJoiningDate: requisition.expectedJoiningDate,
          }
        : defaultValues,
    [requisition],
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<JobRequisitionFormValues>({
    resolver: zodResolver(jobRequisitionSchema),
    defaultValues: formDefaults,
    mode: 'onBlur',
  });

  useEffect(() => {
    reset(formDefaults);
  }, [formDefaults, reset]);

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;

    const current = getValues('skills');
    if (!current.some((skill) => skill.toLowerCase() === value.toLowerCase())) {
      const next = [...current, value];
      reset({ ...getValues(), skills: next });
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    reset({
      ...getValues(),
      skills: getValues('skills').filter((skill) => skill !== skillToRemove),
    });
  };

  const canEdit = !requisition || requisition.status === 'DRAFT' || requisition.status === 'PENDING_APPROVAL';
  const showSubmit = !requisition || requisition.status === 'DRAFT';
  const showApprove = requisition?.status === 'PENDING_APPROVAL';
  const showJobOpening = requisition?.status === 'APPROVED';

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-bold text-slate-900">Basic Information</h2>
          <p className="mt-1 text-xs text-slate-500">Define the position and where it will be based.</p>
        </div>
        <div className="grid gap-5 p-5 md:grid-cols-2">
          <div>
            <Label htmlFor="jobTitle">Job Title <span className="text-rose-500">*</span></Label>
            <Input id="jobTitle" disabled={!canEdit} className={inputClass} {...register('jobTitle')} />
            <FieldError message={errors.jobTitle?.message} />
          </div>

          <div>
            <Label htmlFor="department">Department <span className="text-rose-500">*</span></Label>
            <Input id="department" disabled={!canEdit} className={inputClass} {...register('department')} />
            <FieldError message={errors.department?.message} />
          </div>

          <div>
            <Label htmlFor="location">Location <span className="text-rose-500">*</span></Label>
            <Input id="location" disabled={!canEdit} className={inputClass} {...register('location')} />
            <FieldError message={errors.location?.message} />
          </div>

          <div>
            <Label htmlFor="employmentType">Employment Type <span className="text-rose-500">*</span></Label>
            <select
              id="employmentType"
              disabled={!canEdit}
              className={`${inputClass} w-full border px-3 outline-none`}
              {...register('employmentType')}
            >
              {(Object.keys(employmentTypeLabels) as EmploymentType[]).map((value) => (
                <option key={value} value={value}>{employmentTypeLabels[value]}</option>
              ))}
            </select>
            <FieldError message={errors.employmentType?.message} />
          </div>

          <div>
            <Label htmlFor="numberOfPositions">Number of Positions <span className="text-rose-500">*</span></Label>
            <Input
              id="numberOfPositions"
              type="number"
              min={1}
              disabled={!canEdit}
              className={inputClass}
              {...register('numberOfPositions', { valueAsNumber: true })}
            />
            <FieldError message={errors.numberOfPositions?.message} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-bold text-slate-900">Requirements</h2>
          <p className="mt-1 text-xs text-slate-500">Capture the experience, skills, education, and role summary.</p>
        </div>
        <div className="space-y-5 p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="experience">Experience <span className="text-rose-500">*</span></Label>
              <Input id="experience" disabled={!canEdit} className={inputClass} {...register('experience')} />
              <FieldError message={errors.experience?.message} />
            </div>

            <div>
              <Label htmlFor="education">Education <span className="text-rose-500">*</span></Label>
              <Input id="education" disabled={!canEdit} className={inputClass} {...register('education')} />
              <FieldError message={errors.education?.message} />
            </div>
          </div>

          <div>
            <Label htmlFor="skillInput">Skills <span className="text-rose-500">*</span></Label>
            {canEdit && (
              <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
                <Input
                  id="skillInput"
                  value={skillInput}
                  placeholder="e.g. Java"
                  className="h-10 flex-1 rounded-lg border-slate-200"
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  <Plus className="h-4 w-4" /> Add Skill
                </Button>
              </div>
            )}
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <div className="mt-3 flex flex-wrap gap-2">
                  {field.value.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                    >
                      {skill}
                      {canEdit && (
                        <button
                          type="button"
                          aria-label={`Remove ${skill}`}
                          className="rounded-full p-0.5 hover:bg-blue-100"
                          onClick={() => removeSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              )}
            />
            <FieldError message={errors.skills?.message as string | undefined} />
          </div>

          <div>
            <Label htmlFor="description">Description <span className="text-rose-500">*</span></Label>
            <textarea id="description" disabled={!canEdit} className={textareaClass} {...register('description')} />
            <FieldError message={errors.description?.message} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-bold text-slate-900">Hiring</h2>
          <p className="mt-1 text-xs text-slate-500">Assign ownership, urgency, and the target joining date.</p>
        </div>
        <div className="grid gap-5 p-5 md:grid-cols-2">
          <div>
            <Label htmlFor="hiringManager">Hiring Manager <span className="text-rose-500">*</span></Label>
            <Input id="hiringManager" disabled={!canEdit} className={inputClass} {...register('hiringManager')} />
            <FieldError message={errors.hiringManager?.message} />
          </div>

          <div>
            <Label htmlFor="priority">Priority <span className="text-rose-500">*</span></Label>
            <select
              id="priority"
              disabled={!canEdit}
              className={`${inputClass} w-full border px-3 outline-none`}
              {...register('priority')}
            >
              {(Object.keys(priorityLabels) as RequisitionPriority[]).map((value) => (
                <option key={value} value={value}>{priorityLabels[value]}</option>
              ))}
            </select>
            <FieldError message={errors.priority?.message} />
          </div>

          <div>
            <Label htmlFor="expectedJoiningDate">Expected Joining Date <span className="text-rose-500">*</span></Label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="expectedJoiningDate"
                type="date"
                disabled={!canEdit}
                className={`${inputClass} pr-10`}
                {...register('expectedJoiningDate')}
              />
            </div>
            <FieldError message={errors.expectedJoiningDate?.message} />
          </div>
        </div>
      </section>

      {requisition && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Workflow Status</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <JobRequisitionStatusBadge status={requisition.status} />
                {requisition.id && <span className="text-xs font-medium text-slate-500">{requisition.id}</span>}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <span className={requisition.status === 'DRAFT' ? 'font-semibold text-blue-600' : ''}>Draft</span>
              <ChevronRight className="h-4 w-4" />
              <span className={requisition.status === 'PENDING_APPROVAL' ? 'font-semibold text-amber-600' : ''}>Pending Approval</span>
              <ChevronRight className="h-4 w-4" />
              <span className={requisition.status === 'APPROVED' ? 'font-semibold text-emerald-600' : ''}>Approved</span>
              <ChevronRight className="h-4 w-4" />
              <span className={requisition.status === 'JOB_OPENING' ? 'font-semibold text-blue-600' : ''}>Job Opening</span>
            </div>
          </div>
        </section>
      )}

      <div className="sticky bottom-0 z-10 -mx-1 flex flex-col gap-3 border-t border-slate-200 bg-slate-50/95 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4" /> Cancel
        </Button>

        <div className="flex flex-col gap-2 sm:flex-row">
          {canEdit && (
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => void handleSubmit(onSaveDraft)()}
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Saving…' : 'Save Draft'}
            </Button>
          )}

          {showSubmit && (
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={() => void handleSubmit(onSubmitForApproval)()}
            >
              <Send className="h-4 w-4" /> Submit for Approval
            </Button>
          )}

          {showApprove && (
            <Button
              type="button"
              disabled={isStatusUpdating}
              onClick={() => void onApprove()}
            >
              <Check className="h-4 w-4" />
              {isStatusUpdating ? 'Approving…' : 'Approve Requisition'}
            </Button>
          )}

          {showJobOpening && (
            <Button
              type="button"
              disabled={isStatusUpdating}
              onClick={() => void onCreateJobOpening()}
            >
              <ChevronRight className="h-4 w-4" />
              {isStatusUpdating ? 'Creating…' : 'Create Job Opening'}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

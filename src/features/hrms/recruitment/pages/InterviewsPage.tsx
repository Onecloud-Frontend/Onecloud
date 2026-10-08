import { useState } from 'react';
import {
  useInterviews,
  useUpcomingInterviews,
  useCreateInterview,
  useUpdateInterview,
  useCancelInterview,
} from '../hooks/useInterviews';
import { interviewSchema } from '../schemas/interview.schema';
import { candidateOptions, jobOptions, interviewerOptions } from '../mocks/interviews.mock';
import {
  INTERVIEW_TYPES,
  INTERVIEW_STATUSES,
  type Interview,
  type InterviewFilters,
  type InterviewInput,
  type InterviewStatus,
} from '../types/interview.types';

/*
 * Styling uses Tailwind-style classes as a placeholder. Swap for the Onecloud design-system
 * classes/components. Local StatusBadge/Modal below should be replaced by D13's shared
 * RecruitmentStatusBadge / RecruitmentModal / ConfirmationDialog once they exist.
 */

const statusStyles: Record<InterviewStatus, string> = {
  Scheduled: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const StatusBadge = ({ status }: { status: InterviewStatus }) => (
  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}>{status}</span>
);

const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">✕</button>
      </div>
      {children}
    </div>
  </div>
);

const emptyForm: InterviewInput = {
  candidateId: '',
  jobOpeningId: '',
  round: 1,
  type: 'Video',
  date: '',
  time: '',
  durationMinutes: 60,
  interviewers: [],
  location: '',
  meetingLink: '',
  notes: '',
};

/* ---------------- Schedule / Edit form ---------------- */
interface FormProps {
  initial?: Interview;
  submitting: boolean;
  serverError?: string;
  onSubmit: (values: InterviewInput) => void;
  onCancel: () => void;
}

const InterviewForm = ({ initial, submitting, serverError, onSubmit, onCancel }: FormProps) => {
  const [values, setValues] = useState<InterviewInput>(
    initial
      ? {
          candidateId: initial.candidateId,
          jobOpeningId: initial.jobOpeningId,
          round: initial.round,
          type: initial.type,
          date: initial.date,
          time: initial.time,
          durationMinutes: initial.durationMinutes,
          interviewers: initial.interviewers,
          location: initial.location ?? '',
          meetingLink: initial.meetingLink ?? '',
          notes: initial.notes ?? '',
        }
      : emptyForm,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof InterviewInput>(key: K, value: InterviewInput[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const toggleInterviewer = (name: string) =>
    set('interviewers', values.interviewers.includes(name) ? values.interviewers.filter((n) => n !== name) : [...values.interviewers, name]);

  const handleSubmit = () => {
    const result = interviewSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        if (!next[key]) next[key] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    onSubmit(result.data as InterviewInput);
  };

  const input = 'w-full rounded border border-gray-300 px-3 py-2 text-sm';
  const err = (k: string) => (errors[k] ? <p className="mt-1 text-xs text-red-600">{errors[k]}</p> : null);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">Candidate
          <select className={input} value={values.candidateId} onChange={(e) => set('candidateId', e.target.value)}>
            <option value="">Select candidate</option>
            {candidateOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {err('candidateId')}
        </label>
        <label className="text-sm">Job Opening
          <select className={input} value={values.jobOpeningId} onChange={(e) => set('jobOpeningId', e.target.value)}>
            <option value="">Select job</option>
            {jobOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {err('jobOpeningId')}
        </label>
        <label className="text-sm">Round
          <input type="number" min={1} max={10} className={input} value={values.round} onChange={(e) => set('round', Number(e.target.value))} />
          {err('round')}
        </label>
        <label className="text-sm">Interview Type
          <select className={input} value={values.type} onChange={(e) => set('type', e.target.value as InterviewInput['type'])}>
            {INTERVIEW_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="text-sm">Date
          <input type="date" className={input} value={values.date} onChange={(e) => set('date', e.target.value)} />
          {err('date')}
        </label>
        <label className="text-sm">Time
          <input type="time" className={input} value={values.time} onChange={(e) => set('time', e.target.value)} />
          {err('time')}
        </label>
        <label className="text-sm">Duration (minutes)
          <input type="number" step={15} className={input} value={values.durationMinutes} onChange={(e) => set('durationMinutes', Number(e.target.value))} />
          {err('durationMinutes')}
        </label>
      </div>

      <fieldset className="text-sm">
        <legend className="mb-1">Interviewers</legend>
        <div className="flex flex-wrap gap-3">
          {interviewerOptions.map((name) => (
            <label key={name} className="flex items-center gap-1">
              <input type="checkbox" checked={values.interviewers.includes(name)} onChange={() => toggleInterviewer(name)} />
              {name}
            </label>
          ))}
        </div>
        {err('interviewers')}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">Location
          <input className={input} placeholder="Room / address" value={values.location} onChange={(e) => set('location', e.target.value)} />
          {err('location')}
        </label>
        <label className="text-sm">Meeting Link
          <input className={input} placeholder="https://..." value={values.meetingLink} onChange={(e) => set('meetingLink', e.target.value)} />
          {err('meetingLink')}
        </label>
      </div>

      <label className="block text-sm">Notes
        <textarea rows={3} className={input} value={values.notes} onChange={(e) => set('notes', e.target.value)} />
      </label>

      {serverError && <p className="rounded bg-red-50 p-2 text-sm text-red-700">{serverError}</p>}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded border px-4 py-2 text-sm">Cancel</button>
        <button type="button" onClick={handleSubmit} disabled={submitting} className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50">
          {submitting ? 'Saving…' : initial ? 'Update Interview' : 'Schedule Interview'}
        </button>
      </div>
    </div>
  );
};

/* ---------------- Details ---------------- */
const Detail = ({ label, value }: { label: string; value?: React.ReactNode }) => (
  <div>
    <dt className="text-xs uppercase text-gray-500">{label}</dt>
    <dd className="text-sm">{value || '—'}</dd>
  </div>
);

const InterviewDetails = ({ interview }: { interview: Interview }) => (
  <dl className="grid gap-4 sm:grid-cols-2">
    <Detail label="Candidate" value={interview.candidateName} />
    <Detail label="Job" value={interview.jobTitle} />
    <Detail label="Round" value={`Round ${interview.round}`} />
    <Detail label="Type" value={interview.type} />
    <Detail label="Date" value={interview.date} />
    <Detail label="Time" value={interview.time} />
    <Detail label="Duration" value={`${interview.durationMinutes} min`} />
    <Detail label="Status" value={<StatusBadge status={interview.status} />} />
    <Detail label="Interviewers" value={interview.interviewers.join(', ')} />
    <Detail label="Location" value={interview.location} />
    <Detail
      label="Meeting Link"
      value={interview.meetingLink && <a className="text-blue-600 underline" href={interview.meetingLink} target="_blank" rel="noreferrer">Join meeting</a>}
    />
    <Detail label="Notes" value={interview.notes} />
  </dl>
);

/* ---------------- Page ---------------- */
type Tab = 'all' | 'upcoming';
type ModalState = { mode: 'schedule' } | { mode: 'edit'; interview: Interview } | { mode: 'view'; interview: Interview } | null;

const InterviewsPage = () => {
  const [tab, setTab] = useState<Tab>('all');
  const [filters, setFilters] = useState<InterviewFilters>({ search: '', type: '', status: '' });
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<string>('');

  const allQuery = useInterviews(filters);
  const upcomingQuery = useUpcomingInterviews(tab === 'upcoming');
  const active = tab === 'all' ? allQuery : upcomingQuery;
  const rows = active.data ?? [];

  const createMutation = useCreateInterview();
  const updateMutation = useUpdateInterview();
  const cancelMutation = useCancelInterview();

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = (values: InterviewInput) => {
    if (modal?.mode === 'edit') {
      updateMutation.mutate(
        { id: modal.interview.id, input: values },
        { onSuccess: () => { setModal(null); flash('Interview updated'); } },
      );
    } else {
      createMutation.mutate(values, { onSuccess: () => { setModal(null); flash('Interview scheduled'); } });
    }
  };

  const handleCancel = (i: Interview) => {
    // Replace with shared ConfirmationDialog from D13 when available.
    if (window.confirm(`Cancel interview with ${i.candidateName}?`)) {
      cancelMutation.mutate(i.id, { onSuccess: () => flash('Interview cancelled') });
    }
  };

  const formError = (modal?.mode === 'edit' ? updateMutation.error : createMutation.error)?.message;

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Interviews</h1>
        <button
          onClick={() => { createMutation.reset(); setModal({ mode: 'schedule' }); }}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
        >
          + Schedule Interview
        </button>
      </div>

      {toast && <div className="rounded bg-green-50 p-2 text-sm text-green-700">{toast}</div>}

      <div className="flex gap-2 border-b">
        {(['all', 'upcoming'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm ${tab === t ? 'border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          >
            {t === 'all' ? 'All Interviews' : 'Upcoming'}
          </button>
        ))}
      </div>

      {tab === 'all' && (
        <div className="flex flex-wrap gap-2">
          <input
            className="rounded border px-3 py-2 text-sm"
            placeholder="Search candidate or job"
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          />
          <select className="rounded border px-3 py-2 text-sm" value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value as InterviewFilters['type'] }))}>
            <option value="">All types</option>
            {INTERVIEW_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select className="rounded border px-3 py-2 text-sm" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as InterviewFilters['status'] }))}>
            <option value="">All statuses</option>
            {INTERVIEW_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      )}

      {active.isLoading && <p className="text-sm text-gray-500">Loading interviews…</p>}
      {active.isError && <p className="rounded bg-red-50 p-2 text-sm text-red-700">Failed to load interviews. <button className="underline" onClick={() => active.refetch()}>Retry</button></p>}
      {!active.isLoading && !active.isError && rows.length === 0 && (
        <p className="rounded border border-dashed p-8 text-center text-sm text-gray-500">No interviews found.</p>
      )}

      {rows.length > 0 && (
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                {['Candidate', 'Job', 'Round', 'Type', 'Date & Time', 'Duration', 'Interviewers', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-3 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.id} className="border-t">
                  <td className="px-3 py-2">{i.candidateName}</td>
                  <td className="px-3 py-2">{i.jobTitle}</td>
                  <td className="px-3 py-2">R{i.round}</td>
                  <td className="px-3 py-2">{i.type}</td>
                  <td className="px-3 py-2">{i.date} {i.time}</td>
                  <td className="px-3 py-2">{i.durationMinutes}m</td>
                  <td className="px-3 py-2">{i.interviewers.join(', ')}</td>
                  <td className="px-3 py-2"><StatusBadge status={i.status} /></td>
                  <td className="space-x-2 px-3 py-2">
                    <button className="text-blue-600" onClick={() => setModal({ mode: 'view', interview: i })}>View</button>
                    {i.status === 'Scheduled' && (
                      <>
                        <button className="text-blue-600" onClick={() => { updateMutation.reset(); setModal({ mode: 'edit', interview: i }); }}>Reschedule</button>
                        <button className="text-red-600" onClick={() => handleCancel(i)}>Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal
          title={modal.mode === 'schedule' ? 'Schedule Interview' : modal.mode === 'edit' ? 'Reschedule Interview' : 'Interview Details'}
          onClose={() => setModal(null)}
        >
          {modal.mode === 'view' ? (
            <InterviewDetails interview={modal.interview} />
          ) : (
            <InterviewForm
              initial={modal.mode === 'edit' ? modal.interview : undefined}
              submitting={createMutation.isPending || updateMutation.isPending}
              serverError={formError}
              onSubmit={handleSubmit}
              onCancel={() => setModal(null)}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default InterviewsPage;
import type { Interview, SelectOption } from '../types/interview.types';

const day = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

// TODO (after D4/D5 merge): replace these lightweight options with useJobOpenings() / useCandidates().
export const candidateOptions: SelectOption[] = [
  { value: 'cand-1', label: 'Aarav Sharma' },
  { value: 'cand-2', label: 'Priya Reddy' },
  { value: 'cand-3', label: 'Rahul Verma' },
  { value: 'cand-4', label: 'Sneha Iyer' },
];

export const jobOptions: SelectOption[] = [
  { value: 'job-1', label: 'Frontend Developer' },
  { value: 'job-2', label: 'Backend Developer' },
  { value: 'job-3', label: 'HR Executive' },
];

export const interviewerOptions: string[] = ['Anil Kumar', 'Meera Nair', 'Suresh Rao', 'Divya Menon'];

export const interviewsMock: Interview[] = [
  {
    id: 'int-1', candidateId: 'cand-1', candidateName: 'Aarav Sharma', jobOpeningId: 'job-1', jobTitle: 'Frontend Developer',
    round: 1, type: 'Technical', date: day(1), time: '10:30', durationMinutes: 60, interviewers: ['Anil Kumar'],
    meetingLink: 'https://meet.example.com/abc-123', status: 'Scheduled', createdAt: new Date().toISOString(),
  },
  {
    id: 'int-2', candidateId: 'cand-2', candidateName: 'Priya Reddy', jobOpeningId: 'job-2', jobTitle: 'Backend Developer',
    round: 2, type: 'Managerial', date: day(2), time: '14:00', durationMinutes: 45, interviewers: ['Meera Nair', 'Suresh Rao'],
    location: 'Conference Room B, 3rd Floor', status: 'Scheduled', createdAt: new Date().toISOString(),
  },
  {
    id: 'int-3', candidateId: 'cand-3', candidateName: 'Rahul Verma', jobOpeningId: 'job-3', jobTitle: 'HR Executive',
    round: 1, type: 'HR', date: day(-2), time: '11:00', durationMinutes: 30, interviewers: ['Divya Menon'],
    meetingLink: 'https://meet.example.com/xyz-789', status: 'Completed', createdAt: new Date().toISOString(),
  },
  {
    id: 'int-4', candidateId: 'cand-4', candidateName: 'Sneha Iyer', jobOpeningId: 'job-1', jobTitle: 'Frontend Developer',
    round: 1, type: 'Phone', date: day(-1), time: '16:00', durationMinutes: 20, interviewers: ['Anil Kumar'],
    status: 'Cancelled', createdAt: new Date().toISOString(),
  },
];
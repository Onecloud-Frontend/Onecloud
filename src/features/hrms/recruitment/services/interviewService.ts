import { interviewsMock, candidateOptions, jobOptions } from '../mocks/interviews.mock';
import type { Interview, InterviewFilters, InterviewInput } from '../types/interview.types';

/**
 * Service boundary: pages/hooks never touch mocks directly.
 * When the backend is ready, replace the bodies with axios/fetch calls and keep the signatures.
 */
let db: Interview[] = [...interviewsMock];
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

function findConflict(input: InterviewInput, ignoreId?: string): Interview | undefined {
  const start = toMinutes(input.time);
  const end = start + input.durationMinutes;
  return db.find((i) => {
    if (i.id === ignoreId || i.status === 'Cancelled' || i.date !== input.date) return false;
    if (!i.interviewers.some((p) => input.interviewers.includes(p))) return false;
    const s = toMinutes(i.time);
    const e = s + i.durationMinutes;
    return start < e && s < end;
  });
}

function resolveNames(input: InterviewInput) {
  const candidate = candidateOptions.find((c) => c.value === input.candidateId);
  const job = jobOptions.find((j) => j.value === input.jobOpeningId);
  return { candidateName: candidate?.label ?? 'Unknown', jobTitle: job?.label ?? 'Unknown' };
}

export const interviewService = {
  async getInterviews(filters: InterviewFilters = {}): Promise<Interview[]> {
    await delay();
    const q = filters.search?.trim().toLowerCase();
    return db
      .filter((i) => !q || i.candidateName.toLowerCase().includes(q) || i.jobTitle.toLowerCase().includes(q))
      .filter((i) => !filters.type || i.type === filters.type)
      .filter((i) => !filters.status || i.status === filters.status)
      .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));
  },

  async getUpcomingInterviews(): Promise<Interview[]> {
    await delay();
    const now = new Date();
    return db
      .filter((i) => i.status === 'Scheduled' && new Date(`${i.date}T${i.time}`) >= now)
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  },

  async getInterviewById(id: string): Promise<Interview> {
    await delay(150);
    const found = db.find((i) => i.id === id);
    if (!found) throw new Error('Interview not found');
    return found;
  },

  async createInterview(input: InterviewInput): Promise<Interview> {
    await delay();
    const clash = findConflict(input);
    if (clash) throw new Error(`Interviewer already booked at ${clash.time} on ${clash.date}`);
    const created: Interview = {
      ...input,
      ...resolveNames(input),
      id: `int-${Date.now()}`,
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
    };
    db = [created, ...db];
    return created;
  },

  async updateInterview(id: string, input: InterviewInput): Promise<Interview> {
    await delay();
    const existing = db.find((i) => i.id === id);
    if (!existing) throw new Error('Interview not found');
    const clash = findConflict(input, id);
    if (clash) throw new Error(`Interviewer already booked at ${clash.time} on ${clash.date}`);
    const updated: Interview = { ...existing, ...input, ...resolveNames(input) };
    db = db.map((i) => (i.id === id ? updated : i));
    return updated;
  },

  async cancelInterview(id: string): Promise<Interview> {
    await delay();
    const existing = db.find((i) => i.id === id);
    if (!existing) throw new Error('Interview not found');
    const updated: Interview = { ...existing, status: 'Cancelled' };
    db = db.map((i) => (i.id === id ? updated : i));
    return updated;
  },
};
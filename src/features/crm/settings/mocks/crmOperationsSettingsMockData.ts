import type {
  CrmOperationsSettings,
  LeadScoreBand,
  LeadScoringRule,
  LeadSourceConfig,
  LeadStatusConfig,
  NumberingSequence,
} from '../types/crmOperationsSettings.types';

/**
 * Seed data for the CRM Operations settings section. Mirrors the shared
 * LeadStatus / LeadSource codes used by the Leads feature so the configured
 * labels line up with real lead records.
 */

const leadStatuses: LeadStatusConfig[] = [
  { id: 'st-1', order: 1, name: 'New', code: 'NEW', description: 'Newly created leads', color: '#2f6bff', active: true },
  { id: 'st-2', order: 2, name: 'Contacted', code: 'CONTACTED', description: 'Initial contact made', color: '#f59e0b', active: true },
  { id: 'st-3', order: 3, name: 'Qualified', code: 'QUALIFIED', description: 'Qualified prospect', color: '#16a34a', active: true },
  { id: 'st-4', order: 4, name: 'Proposal', code: 'PROPOSAL', description: 'Proposal sent', color: '#8b5cf6', active: true },
  { id: 'st-5', order: 5, name: 'Negotiation', code: 'NEGOTIATION', description: 'In active negotiation', color: '#0ea5e9', active: true },
  { id: 'st-6', order: 6, name: 'Won', code: 'WON', description: 'Converted to opportunity', color: '#059669', active: true },
  { id: 'st-7', order: 7, name: 'Lost', code: 'LOST', description: 'Not a potential customer', color: '#dc2626', active: true },
];

const leadSources: LeadSourceConfig[] = [
  { id: 'src-1', order: 1, name: 'Website', code: 'WEBSITE', active: true },
  { id: 'src-2', order: 2, name: 'Referral', code: 'REFERRAL', active: true },
  { id: 'src-3', order: 3, name: 'Cold Call', code: 'COLD_CALL', active: true },
  { id: 'src-4', order: 4, name: 'Conference', code: 'CONFERENCE', active: true },
  { id: 'src-5', order: 5, name: 'Partner', code: 'PARTNER', active: true },
];

const scoringRules: LeadScoringRule[] = [
  { id: 'rule-1', criterion: 'source', label: 'Source = Referral', points: 20, active: true },
  { id: 'rule-2', criterion: 'source', label: 'Source = Website', points: 5, active: true },
  { id: 'rule-3', criterion: 'jobTitle', label: 'Job title contains "Manager" or higher', points: 15, active: true },
  { id: 'rule-4', criterion: 'companySize', label: 'Company size over 200 employees', points: 10, active: true },
  { id: 'rule-5', criterion: 'emailEngagement', label: 'Opened 3 or more emails', points: 10, active: true },
  { id: 'rule-6', criterion: 'websiteVisits', label: 'Visited pricing page', points: 15, active: true },
  { id: 'rule-7', criterion: 'formSubmission', label: 'Submitted a demo request form', points: 25, active: true },
];

const scoreBands: LeadScoreBand[] = [
  { id: 'band-1', label: 'Cold', minScore: 0, maxScore: 29, color: '#94a3b8' },
  { id: 'band-2', label: 'Warm', minScore: 30, maxScore: 59, color: '#f59e0b' },
  { id: 'band-3', label: 'Hot', minScore: 60, maxScore: 100, color: '#dc2626' },
];

const numberingSequences: NumberingSequence[] = [
  { id: 'seq-1', entity: 'lead', entityLabel: 'Lead', prefix: 'LD', padding: 4, nextNumber: 1102, resetYearly: false },
  { id: 'seq-2', entity: 'customer', entityLabel: 'Customer', prefix: 'CUST', padding: 4, nextNumber: 521, resetYearly: false },
  { id: 'seq-3', entity: 'opportunity', entityLabel: 'Opportunity', prefix: 'OPP', padding: 4, nextNumber: 87, resetYearly: false },
  { id: 'seq-4', entity: 'quotation', entityLabel: 'Quotation', prefix: 'QT', padding: 4, nextNumber: 3011, resetYearly: true },
];

export const crmOperationsSettingsSeed: CrmOperationsSettings = {
  leadManagement: {
    general: {
      autoAssignLeads: true,
      requirePhoneOnCreate: true,
      requireEmailOnCreate: true,
      duplicateDetectionEnabled: true,
      staleLeadThresholdDays: 7,
    },
    statuses: leadStatuses,
    sources: leadSources,
  },
  leadScoring: {
    enabled: true,
    rules: scoringRules,
    bands: scoreBands,
  },
  numbering: {
    sequences: numberingSequences,
  },
};

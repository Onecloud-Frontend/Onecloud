/**
 * Type contracts for the CRM Operations settings section: Lead Management,
 * Lead Scoring, and Numbering & Sequences. These are admin-configurable
 * records that drive dropdown options and display elsewhere in the CRM;
 * they do not replace the fixed LeadStatus/LeadSource union types used by
 * the Leads feature itself.
 */

/* ---------- Lead Management ---------- */

export interface LeadStatusConfig {
  id: string;
  order: number;
  name: string;
  /** Machine-readable code stored on lead records, e.g. "QUALIFIED". */
  code: string;
  description: string;
  /** Hex color used for the status badge. */
  color: string;
  active: boolean;
}

export interface LeadSourceConfig {
  id: string;
  order: number;
  name: string;
  code: string;
  active: boolean;
}

export interface LeadGeneralSettings {
  autoAssignLeads: boolean;
  requirePhoneOnCreate: boolean;
  requireEmailOnCreate: boolean;
  duplicateDetectionEnabled: boolean;
  /** Days before an unactioned new lead is flagged as stale. */
  staleLeadThresholdDays: number;
}

export interface LeadManagementSettings {
  general: LeadGeneralSettings;
  statuses: LeadStatusConfig[];
  sources: LeadSourceConfig[];
}

/* ---------- Lead Scoring ---------- */

export type LeadScoringCriterion =
  | 'source'
  | 'jobTitle'
  | 'companySize'
  | 'emailEngagement'
  | 'websiteVisits'
  | 'formSubmission';

export interface LeadScoringRule {
  id: string;
  criterion: LeadScoringCriterion;
  /** Human-readable condition, e.g. "Source = Referral". */
  label: string;
  points: number;
  active: boolean;
}

export interface LeadScoreBand {
  id: string;
  /** Display label for this score range, e.g. "Hot". */
  label: string;
  minScore: number;
  maxScore: number;
  color: string;
}

export interface LeadScoringSettings {
  enabled: boolean;
  rules: LeadScoringRule[];
  bands: LeadScoreBand[];
}

/* ---------- Numbering & Sequences ---------- */

export type NumberedEntity = 'lead' | 'customer' | 'opportunity' | 'quotation';

export interface NumberingSequence {
  id: string;
  entity: NumberedEntity;
  entityLabel: string;
  prefix: string;
  /** Number of digits the running number is padded to, e.g. 4 -> "0007". */
  padding: number;
  /** Next number that will be issued. */
  nextNumber: number;
  /** Whether the sequence resets to 1 at the start of each year. */
  resetYearly: boolean;
}

export interface NumberingSettingsData {
  sequences: NumberingSequence[];
}

/* ---------- Combined section state ---------- */

export interface CrmOperationsSettings {
  leadManagement: LeadManagementSettings;
  leadScoring: LeadScoringSettings;
  numbering: NumberingSettingsData;
}

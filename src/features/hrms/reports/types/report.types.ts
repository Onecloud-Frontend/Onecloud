export type ReportStatus = 'draft' | 'ready' | 'failed';

export interface ReportDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface ReportFilters {
  reportId: string;
  startDate: string;
  endDate: string;
}

export interface ReportGenerationRequest extends ReportFilters {}

export interface GeneratedReport {
  id: string;
  name: string;
  generatedAt: string;
  status: ReportStatus;
  downloadUrl?: string;
}

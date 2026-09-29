export interface DashboardMetric {
  value: number;
  label: string;
  trend: number; // Percentage change (positive or negative)
  trendLabel: string; // e.g., "vs last month"
  prefix?: string; // e.g., "$" or "₹"
  suffix?: string; // e.g., "%"
}

export interface RevenueTrend {
  month: string;
  revenue: number;
  target: number;
}

export interface PipelineStage {
  id: string;
  name: string;
  count: number;
  value: number;
  color: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Lost';

export interface RecentLead {
  id: string;
  name: string;
  company: string;
  status: LeadStatus;
  value: number;
  createdAt: string;
}

export interface DashboardMetrics {
  totalRevenue: DashboardMetric;
  activeLeads: DashboardMetric;
  winRate: DashboardMetric;
  activeOpportunityValue: DashboardMetric;
  revenueTrend: RevenueTrend[];
  pipelineStages: PipelineStage[];
  recentLeads: RecentLead[];
}

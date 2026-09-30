export interface DashboardMetric {
  value: number;
  label: string;
  trend: number;
  trendLabel: string;
  prefix?: string;
  suffix?: string;
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

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal'
  | 'Lost';

export interface RecentLead {
  id: string;
  name: string;
  company: string;
  status: LeadStatus;
  value: number;
  createdAt: string;
}

export type ActivityType =
  | 'Call'
  | 'Email'
  | 'Meeting'
  | 'Task'
  | 'Follow-up';

export interface RecentActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  user: string;
  createdAt: string;
}

export interface SalesPerformance {
  id: string;
  name: string;
  deals: number;
  revenue: number;
  target: number;
  achievement: number;
}

export interface DashboardMetrics {
  totalRevenue: DashboardMetric;
  activeLeads: DashboardMetric;
  qualifiedLeads: DashboardMetric;
  activeOpportunities: DashboardMetric;
  winRate: DashboardMetric;
  pipelineValue: DashboardMetric;

  revenueTrend: RevenueTrend[];
  pipelineStages: PipelineStage[];
  recentLeads: RecentLead[];
  recentActivities: RecentActivity[];
  salesPerformance: SalesPerformance[];
}
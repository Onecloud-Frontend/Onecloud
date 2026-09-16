import { DashboardMetrics } from '../types/dashboard.types';

export const dashboardMockData: DashboardMetrics = {
  totalRevenue: {
    value: 1240000,
    label: 'Total Revenue',
    trend: 12.4,
    trendLabel: 'vs last month',
    prefix: '₹',
  },
  activeLeads: {
    value: 248,
    label: 'Active Leads',
    trend: 5.2,
    trendLabel: 'vs last month',
  },
  winRate: {
    value: 32.4,
    label: 'Win Rate',
    trend: -1.2,
    trendLabel: 'vs last month',
    suffix: '%',
  },
  activeOpportunityValue: {
    value: 4820000,
    label: 'Active Opportunities',
    trend: 18.7,
    trendLabel: 'vs last month',
    prefix: '₹',
  },
  revenueTrend: [
    { month: 'Jan', revenue: 800000, target: 900000 },
    { month: 'Feb', revenue: 950000, target: 900000 },
    { month: 'Mar', revenue: 1100000, target: 1000000 },
    { month: 'Apr', revenue: 1050000, target: 1100000 },
    { month: 'May', revenue: 1200000, target: 1100000 },
    { month: 'Jun', revenue: 1240000, target: 1200000 },
  ],
  pipelineStages: [
    { id: '1', name: 'Lead', count: 124, value: 1240000, color: 'bg-slate-200' },
    { id: '2', name: 'Contacted', count: 86, value: 1800000, color: 'bg-blue-200' },
    { id: '3', name: 'Qualified', count: 42, value: 2400000, color: 'bg-indigo-200' },
    { id: '4', name: 'Proposal', count: 18, value: 3100000, color: 'bg-violet-200' },
    { id: '5', name: 'Won', count: 8, value: 1240000, color: 'bg-emerald-200' },
  ],
  recentLeads: [
    {
      id: 'L-1001',
      name: 'John Smith',
      company: 'Acme Corporation',
      status: 'Qualified',
      value: 240000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 'L-1002',
      name: 'Sarah Connor',
      company: 'Cyberdyne Systems',
      status: 'New',
      value: 120000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
    {
      id: 'L-1003',
      name: 'Michael Scott',
      company: 'Dunder Mifflin',
      status: 'Contacted',
      value: 85000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      id: 'L-1004',
      name: 'Bruce Wayne',
      company: 'Wayne Enterprises',
      status: 'Proposal',
      value: 1500000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    },
    {
      id: 'L-1005',
      name: 'Tony Stark',
      company: 'Stark Industries',
      status: 'Lost',
      value: 950000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    },
  ],
};

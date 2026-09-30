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
  qualifiedLeads: {
  value: 42,
  label: 'Qualified Leads',
  trend: 8.6,
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
  pipelineValue: {
  value: 8540000,
  label: 'Pipeline Value',
  trend: 14.8,
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
  recentActivities: [
  {
    id: 'A-1001',
    type: 'Call',
    title: 'Follow-up call completed',
    description: 'Discussed proposal with Acme Corporation',
    user: 'Deepika',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'A-1002',
    type: 'Email',
    title: 'Proposal email sent',
    description: 'Proposal shared with Cyberdyne Systems',
    user: 'Rahul',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'A-1003',
    type: 'Meeting',
    title: 'Client meeting completed',
    description: 'Product demo completed with Dunder Mifflin',
    user: 'Priya',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
],
salesPerformance: [
  {
    id: 'S-1001',
    name: 'Deepika',
    deals: 12,
    revenue: 1850000,
    target: 2000000,
    achievement: 92.5,
  },
  {
    id: 'S-1002',
    name: 'Rahul',
    deals: 10,
    revenue: 1620000,
    target: 1800000,
    achievement: 90,
  },
  {
    id: 'S-1003',
    name: 'Priya',
    deals: 8,
    revenue: 1340000,
    target: 1500000,
    achievement: 89.3,
  },
],
};

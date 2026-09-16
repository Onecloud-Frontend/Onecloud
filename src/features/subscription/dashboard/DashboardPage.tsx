import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /subscription/dashboard */
const SubscriptionDashboardPage: React.FC = () => (
  <PageShell domain="Subscription Management" title="Subscription Dashboard" description="Active subscriptions, MRR, churn, and billing cycle overview." />
);
export default SubscriptionDashboardPage;

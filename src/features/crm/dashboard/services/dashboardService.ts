import { DashboardMetrics } from '../types/dashboard.types';
import {
  activities,
  customers,
  invoices,
  leads,
  opportunities,
  quotations,
  users,
} from '../../shared/data';

class DashboardService {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalRevenue = invoices.reduce(
          (total, invoice) => total + invoice.totalAmount,
          0,
        );

        const activeLeads = leads.filter(
          (lead) =>
            lead.status !== 'CONVERTED' &&
            lead.status !== 'LOST',
        );

        const qualifiedLeads = leads.filter(
          (lead) => lead.status === 'QUALIFIED',
        );

        const openOpportunities = opportunities.filter(
          (opportunity) =>
            opportunity.stage !== 'CLOSED_WON' &&
            opportunity.stage !== 'CLOSED_LOST',
        );

        const pipelineValue = openOpportunities.reduce(
          (total, opportunity) => total + opportunity.amount,
          0,
        );

        const wonOpportunities = opportunities.filter(
          (opportunity) => opportunity.stage === 'CLOSED_WON',
        );

        const wonRevenue = wonOpportunities.reduce(
          (total, opportunity) => total + opportunity.amount,
          0,
        );

        const pendingQuotations = quotations.filter(
          (quotation) => quotation.status === 'PENDING_APPROVAL',
        );

        const winRate =
          opportunities.length > 0
            ? (wonOpportunities.length / opportunities.length) * 100
            : 0;

        const recentLeads = [...leads]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime(),
          )
          .slice(0, 5)
          .map((lead) => ({
            id: lead.id,
            name: `${lead.firstName} ${lead.lastName}`,
            company: lead.companyName,
            status:
              lead.status === 'CONVERTED'
                ? 'Qualified'
                : lead.status === 'UNQUALIFIED'
                  ? 'Lost'
                  : (lead.status.charAt(0) +
                      lead.status.slice(1).toLowerCase()) as
                      | 'New'
                      | 'Contacted'
                      | 'Qualified'
                      | 'Proposal'
                      | 'Lost',
            value: lead.estimatedValue,
            createdAt: lead.createdAt,
          }));

        const recentActivities = [...activities]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime(),
          )
          .slice(0, 5)
          .map((activity) => {
            const user = users.find(
              (item) => item.id === activity.assignedTo,
            );

            return {
              id: activity.id,
              type:
                activity.type === 'CALL'
                  ? 'Call'
                  : activity.type === 'EMAIL'
                    ? 'Email'
                    : activity.type === 'MEETING'
                      ? 'Meeting'
                      : activity.type === 'TASK'
                        ? 'Task'
                        : 'Follow-up',
              title: activity.title,
              description: activity.description ?? '',
              user: user
                ? `${user.firstName} ${user.lastName}`
                : 'Unknown User',
              createdAt: activity.createdAt,
            };
          });

        const pipelineStages = [
          'QUALIFICATION',
          'DISCOVERY',
          'PROPOSAL',
          'NEGOTIATION',
          'CLOSED_WON',
        ].map((stage) => {
          const stageOpportunities = opportunities.filter(
            (opportunity) => opportunity.stage === stage,
          );

          return {
            id: stage,
            name:
              stage === 'CLOSED_WON'
                ? 'Won'
                : stage.charAt(0) +
                  stage.slice(1).toLowerCase(),
            count: stageOpportunities.length,
            value: stageOpportunities.reduce(
              (total, opportunity) =>
                total + opportunity.amount,
              0,
            ),
            color:
              stage === 'CLOSED_WON'
                ? '#16a34a'
                : '#2563eb',
          };
        });

        const revenueTrend = invoices.reduce<
          { month: string; revenue: number; target: number }[]
        >((trend, invoice) => {
          const month = new Date(
            invoice.invoiceDate,
          ).toLocaleString('en-US', {
            month: 'short',
          });

          const existingMonth = trend.find(
            (item) => item.month === month,
          );

          if (existingMonth) {
            existingMonth.revenue += invoice.totalAmount;
          } else {
            trend.push({
              month,
              revenue: invoice.totalAmount,
              target: 0,
            });
          }

          return trend;
        }, []);

        resolve({
          totalRevenue: {
            value: totalRevenue,
            label: 'Total Revenue',
            trend: 0,
            trendLabel: 'from invoices',
            prefix: '₹',
          },

          totalCustomers: {
            value: customers.length,
            label: 'Total Customers',
            trend: 0,
            trendLabel: 'from CRM data',
          },

          activeLeads: {
            value: activeLeads.length,
            label: 'Active Leads',
            trend: 0,
            trendLabel: 'from CRM data',
          },

          qualifiedLeads: {
            value: qualifiedLeads.length,
            label: 'Qualified Leads',
            trend: 0,
            trendLabel: 'from CRM data',
          },

          wonRevenue: {
            value: wonRevenue,
            label: 'Won Revenue',
            trend: 0,
            trendLabel: 'from won opportunities',
            prefix: '₹',
          },

          pendingQuotations: {
            value: pendingQuotations.length,
            label: 'Pending Quotations',
            trend: 0,
            trendLabel: 'from CRM data',
          },

          activeOpportunityValue: {
            value: openOpportunities.reduce(
              (total, opportunity) =>
                total + opportunity.expectedRevenue,
              0,
            ),
            label: 'Active Opportunities',
            trend: 0,
            trendLabel: 'from CRM data',
            prefix: '₹',
          },

          winRate: {
            value: Number(winRate.toFixed(1)),
            label: 'Win Rate',
            trend: 0,
            trendLabel: 'from opportunities',
            suffix: '%',
          },

          pipelineValue: {
            value: pipelineValue,
            label: 'Pipeline Value',
            trend: 0,
            trendLabel: 'from open opportunities',
            prefix: '₹',
          },

          revenueTrend,
          pipelineStages,
          recentLeads,
          recentActivities,

          salesPerformance: users
            .filter((user) => user.isActive)
            .map((user) => {
              const userOpportunities =
                opportunities.filter(
                  (opportunity) =>
                    opportunity.assignedTo === user.id,
                );

              const revenue = userOpportunities
                .filter(
                  (opportunity) =>
                    opportunity.stage === 'CLOSED_WON',
                )
                .reduce(
                  (total, opportunity) =>
                    total + opportunity.amount,
                  0,
                );

              return {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                deals: userOpportunities.length,
                revenue,
                target: 0,
                achievement: 0,
              };
            }),
        });
      }, 600);
    });
  }
}

export const dashboardService = new DashboardService();
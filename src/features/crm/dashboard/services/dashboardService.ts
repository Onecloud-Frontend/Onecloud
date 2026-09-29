import { DashboardMetrics } from '../types/dashboard.types';
import { dashboardMockData } from '../mocks/dashboardMockData';

/**
 * Service to handle CRM Dashboard API calls.
 * Currently uses mock data, but the signature matches the future API contract.
 */
class DashboardService {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    // Simulate network latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dashboardMockData);
      }, 600);
    });
  }
}

export const dashboardService = new DashboardService();

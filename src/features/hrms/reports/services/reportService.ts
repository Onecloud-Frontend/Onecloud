import type { GeneratedReport, ReportDefinition, ReportGenerationRequest } from '../types/report.types';

/**
 * Report service boundary.
 *
 * The HRMS assignment requires the confirmed backend report contract to be
 * integrated, but this repository does not currently contain a report API
 * endpoint or response DTO. Do not invent an endpoint here.
 *
 * Once the backend contract is confirmed, implement generateReport() here and
 * keep ReportsPage/ReportGeneratorForm unchanged.
 */
class ReportService {
  async getDefinitions(): Promise<ReportDefinition[]> {
    // These are navigation metadata only; they are not generated report data.
    return [
      {
        id: 'employee-report',
        name: 'Employee Report',
        description: 'Employee directory and workforce information.',
        category: 'HRMS',
      },
      {
        id: 'attendance-report',
        name: 'Attendance Report',
        description: 'Attendance information for the selected period.',
        category: 'HRMS',
      },
      {
        id: 'leave-report',
        name: 'Leave Report',
        description: 'Leave information for the selected period.',
        category: 'HRMS',
      },
      {
        id: 'payroll-report',
        name: 'Payroll Report',
        description: 'Payroll information for the selected period.',
        category: 'HRMS',
      },
    ];
  }

  async generateReport(_request: ReportGenerationRequest): Promise<GeneratedReport> {
    throw new Error(
      'Report generation is blocked until the backend report API contract is confirmed. No report endpoint is defined in the current repository.'
    );
  }
}

export const reportService = new ReportService();

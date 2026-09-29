import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { reportsService } from '../services/reportsService';
import type {
  LeadConversionReportData,
  OpportunityReportData,
  QuoteAnalysisData,
  ReportFilterOptions,
  ReportFilters,
  ReportsDashboardData,
  SalesPerformanceData,
} from '../types/reports.types';

/** Query keys are scoped by report and filter values so each filter combination is cached separately. */
export const reportKeys = {
  all: ['crm', 'reports'] as const,
  filterOptions: () => [...reportKeys.all, 'filter-options'] as const,
  dashboard: (filters: ReportFilters) => [...reportKeys.all, 'dashboard', filters] as const,
  leadConversion: (filters: ReportFilters) => [...reportKeys.all, 'lead-conversion', filters] as const,
  opportunities: (filters: ReportFilters) => [...reportKeys.all, 'opportunities', filters] as const,
  salesPerformance: (filters: ReportFilters) => [...reportKeys.all, 'sales-performance', filters] as const,
  quotations: (filters: ReportFilters) => [...reportKeys.all, 'quotations', filters] as const,
};

const STALE_TIME_MS = 2 * 60 * 1000;

export const useReportFilterOptions = () =>
  useQuery<ReportFilterOptions, Error>({
    queryKey: reportKeys.filterOptions(),
    queryFn: () => reportsService.getFilterOptions(),
    staleTime: Infinity,
  });

// placeholderData keeps the previous result on screen while a new filter combination loads,
// which avoids the page flashing back to the loading state on every filter change.
export const useReportsDashboard = (filters: ReportFilters) =>
  useQuery<ReportsDashboardData, Error>({
    queryKey: reportKeys.dashboard(filters),
    queryFn: () => reportsService.getReportsDashboard(filters),
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME_MS,
  });

export const useLeadConversionReport = (filters: ReportFilters) =>
  useQuery<LeadConversionReportData, Error>({
    queryKey: reportKeys.leadConversion(filters),
    queryFn: () => reportsService.getLeadConversionReport(filters),
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME_MS,
  });

export const useOpportunityReport = (filters: ReportFilters) =>
  useQuery<OpportunityReportData, Error>({
    queryKey: reportKeys.opportunities(filters),
    queryFn: () => reportsService.getOpportunityReport(filters),
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME_MS,
  });

export const useSalesPerformance = (filters: ReportFilters) =>
  useQuery<SalesPerformanceData, Error>({
    queryKey: reportKeys.salesPerformance(filters),
    queryFn: () => reportsService.getSalesPerformance(filters),
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME_MS,
  });

export const useQuoteAnalysis = (filters: ReportFilters) =>
  useQuery<QuoteAnalysisData, Error>({
    queryKey: reportKeys.quotations(filters),
    queryFn: () => reportsService.getQuoteAnalysis(filters),
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME_MS,
  });

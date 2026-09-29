import React, { useEffect, useState } from 'react';
import { AlertCircle, FileBarChart2, RefreshCw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import ReportGeneratorForm from '../components/ReportGeneratorForm';
import { reportService } from '../services/reportService';
import type { ReportDefinition, ReportGenerationRequest } from '../types/report.types';

const ReportsPage: React.FC = () => {
  const [definitions, setDefinitions] = useState<ReportDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const loadDefinitions = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setDefinitions(await reportService.getDefinitions());
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Unable to load report definitions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDefinitions();
  }, []);

  const handleGenerate = async (request: ReportGenerationRequest) => {
    setGenerating(true);
    setGenerationError(null);
    try {
      await reportService.generateReport(request);
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : 'Unable to generate the report.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <main className="min-h-full bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <PageContainer className="space-y-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">HRMS / Reports</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">Reports</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Generate HRMS reports for an approved reporting period using the configured backend contract.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
              <FileBarChart2 className="h-4 w-4 text-blue-600" />
              Report generation
            </div>
          </div>
        </header>

        {loadError ? (
          <section className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-red-900">Unable to load report definitions</h2>
                <p className="mt-1 text-sm text-red-700">{loadError}</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => void loadDefinitions()}>
                <RefreshCw className="h-4 w-4" />
                Retry
              </Button>
            </div>
          </section>
        ) : loading ? (
          <section className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <p className="mt-3 text-sm text-slate-500">Loading report definitions…</p>
          </section>
        ) : definitions.length === 0 ? (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <FileBarChart2 className="mx-auto h-8 w-8 text-slate-400" />
            <h2 className="mt-3 font-semibold text-slate-900">No reports available</h2>
            <p className="mt-1 text-sm text-slate-500">No report definitions are currently configured.</p>
          </section>
        ) : (
          <>
            <ReportGeneratorForm
              definitions={definitions}
              loading={generating}
              error={generationError}
              onSubmit={handleGenerate}
            />

            <section className="grid gap-4 md:grid-cols-2">
              {definitions.map((definition) => (
                <article key={definition.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">{definition.category}</p>
                      <h2 className="mt-1 font-semibold text-slate-900">{definition.name}</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{definition.description}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 text-slate-600">
                      <FileBarChart2 className="h-5 w-5" />
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </PageContainer>
    </main>
  );
};

export default ReportsPage;

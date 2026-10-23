import React from 'react';
import {
  Boxes,
  CircleDollarSign,
  FileCheck2,
  Layers,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  Warehouse,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import PageShell from '@/shared/components/ui/PageShell';
import { ErpAlertList, ErpKpiCard, ErpTransactionsTable } from '../components';
import { useErpDashboard } from '../hooks/useErpDashboard';

/**
 * Route: /erp/dashboard
 *
 * Connected Enterprise ERP Dashboard
 * Consumes typed services and hooks (Page → Hook → Service → Mock)
 */
const ErpDashboardPage: React.FC = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useErpDashboard();

  const kpiIcons: Record<string, React.ReactNode> = {
    'kpi-po-pending': <ShoppingCart className="h-5 w-5" />,
    'kpi-low-stock': <Boxes className="h-5 w-5" />,
    'kpi-receivables': <TrendingUp className="h-5 w-5" />,
    'kpi-payables': <CircleDollarSign className="h-5 w-5" />,
    'kpi-sales-orders': <FileCheck2 className="h-5 w-5" />,
    'kpi-budget-utilization': <Layers className="h-5 w-5" />,
  };

  return (
    <PageShell
      domain="ERP"
      title="ERP Enterprise Business Overview"
      description="Live cross-module operations: Procurement, inventory balances, sales fulfillment, and financial ledger."
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Connected Foundation • 12 Developers Architecture
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
              {isFetching ? 'Syncing...' : 'Sync Live Mocks'}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-slate-200/70" />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-rose-800">
            <p className="font-semibold text-sm">Failed to load ERP dashboard data</p>
            <p className="text-xs mt-1 text-rose-600">{(error as Error)?.message || 'Unknown service error'}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Success / Loaded Data */}
        {data && (
          <>
            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.kpis.map((kpi) => (
                <ErpKpiCard key={kpi.id} data={kpi} icon={kpiIcons[kpi.id]} />
              ))}
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <NavLink
                to="/erp/procurement"
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-blue-400 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-50 p-2.5 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Procurement
                    </h4>
                    <p className="text-[11px] text-slate-500">Requisitions, POs & GRN</p>
                  </div>
                </div>
              </NavLink>

              <NavLink
                to="/erp/inventory"
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-blue-400 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Boxes className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Inventory Balances
                    </h4>
                    <p className="text-[11px] text-slate-500">Item catalog & stock levels</p>
                  </div>
                </div>
              </NavLink>

              <NavLink
                to="/erp/warehouse"
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-blue-400 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Warehouse className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Warehouses
                    </h4>
                    <p className="text-[11px] text-slate-500">Logistics hubs & bins</p>
                  </div>
                </div>
              </NavLink>

              <NavLink
                to="/erp/sales"
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-blue-400 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Sales Orders
                    </h4>
                    <p className="text-[11px] text-slate-500">Fulfillment & Invoices</p>
                  </div>
                </div>
              </NavLink>
            </div>

            {/* Split Grid: Operational Alerts + Recent Transactions */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column: Operational Alerts */}
              <div className="lg:col-span-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Operational Alerts</h3>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-700">
                    {data.alerts.length} Action Required
                  </span>
                </div>
                <ErpAlertList alerts={data.alerts} />
              </div>

              {/* Right Column: Recent Transactions Table */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Recent Enterprise Transactions</h3>
                  <span className="text-xs font-medium text-slate-500">Synchronized Ledger View</span>
                </div>
                <ErpTransactionsTable transactions={data.recentTransactions} />
              </div>
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
};

export default ErpDashboardPage;

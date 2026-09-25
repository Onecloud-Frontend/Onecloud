import React from 'react';
import { useNavigate } from 'react-router-dom';

import PayslipTable from '../components/PayslipTable';
import { usePayrollSummary, usePayslips } from '../hooks/usePayroll';

const PayrollPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = usePayrollSummary();

  const {
    data: payslips = [],
    isLoading: isPayslipsLoading,
    isError: isPayslipsError,
    refetch: refetchPayslips,
  } = usePayslips();

  const isLoading = isSummaryLoading || isPayslipsLoading;
  const isError = isSummaryError || isPayslipsError;

  const handleRetry = () => {
    refetchSummary();
    refetchPayslips();
  };

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Payroll Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View payroll summaries and employee payslips.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-medium text-gray-600">
            Loading payroll data...
          </p>
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-sm font-semibold text-red-800">
            Unable to load payroll data
          </h2>

          <p className="mt-1 text-sm text-red-600">
            Something went wrong while loading the payroll information.
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Payroll content */}
      {!isLoading && !isError && summary && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Employees
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {summary.totalEmployees}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Payroll
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                ₹{summary.totalPayroll.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Pending Payments
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {summary.pendingPayments}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Processed Payroll
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {summary.processedPayroll}
              </p>
            </div>
          </div>

          {/* Payslips */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Employee Payslips
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View generated and processed employee payslips.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/hrms/payroll/payslips/pay-1')}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                View Sample Payslip
              </button>
            </div>

            <PayslipTable payslips={payslips} />
          </div>
        </>
      )}
    </div>
  );
};

export default PayrollPage;
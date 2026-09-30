import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { usePayslip } from '../hooks/usePayroll';

const PayslipViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: payslip,
    isLoading,
    isError,
    refetch,
  } = usePayslip(id ?? '');

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">
            Loading payslip...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to load payslip
          </h2>

          <p className="mt-2 text-sm text-red-600">
            Something went wrong while loading the payslip.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!payslip) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Payslip not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The requested payslip does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate('/hrms/payroll')}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to Payroll
          </button>
        </div>
      </div>
    );
  }

  const earnings = payslip.lines.filter(
    (line) => line.type === 'EARNING'
  );

  const deductions = payslip.lines.filter(
    (line) => line.type === 'DEDUCTION'
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate('/hrms/payroll')}
            className="mb-3 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Payroll
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            Payslip
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Employee: {payslip.employeeId}
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${
            payslip.status === 'PAID'
              ? 'bg-green-100 text-green-700'
              : payslip.status === 'GENERATED'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
          }`}
        >
          {payslip.status}
        </span>
      </div>

      {/* Payslip Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-gray-500">
              Employee ID
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {payslip.employeeId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Pay Period
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {payslip.month}/{payslip.year}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Generated At
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {new Date(payslip.generatedAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Paid At
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {payslip.paidAt
                ? new Date(payslip.paidAt).toLocaleDateString()
                : 'Not paid'}
            </p>
          </div>
        </div>
      </div>

      {/* Earnings and Deductions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Earnings */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">
              Earnings
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {earnings.length > 0 ? (
              earnings.map((line) => (
                <div
                  key={line.label}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <span className="text-sm text-gray-600">
                    {line.label}
                  </span>

                  <span className="text-sm font-medium text-gray-900">
                    {payslip.currency}{' '}
                    {line.amount.toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="px-6 py-4 text-sm text-gray-500">
                No earnings available.
              </p>
            )}
          </div>
        </div>

        {/* Deductions */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">
              Deductions
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {deductions.length > 0 ? (
              deductions.map((line) => (
                <div
                  key={line.label}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <span className="text-sm text-gray-600">
                    {line.label}
                  </span>

                  <span className="text-sm font-medium text-gray-900">
                    {payslip.currency}{' '}
                    {line.amount.toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="px-6 py-4 text-sm text-gray-500">
                No deductions available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Salary Summary */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-5 font-semibold text-gray-900">
          Salary Summary
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Gross Pay
            </span>

            <span className="font-semibold text-gray-900">
              {payslip.currency}{' '}
              {payslip.grossPay.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-sm text-gray-600">
              Net Pay
            </span>

            <span className="text-xl font-bold text-green-600">
              {payslip.currency}{' '}
              {payslip.netPay.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipViewPage;

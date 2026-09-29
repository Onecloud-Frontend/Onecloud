import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Payslip } from '@/features/hrms/shared/types';

interface PayslipTableProps {
  payslips: Payslip[];
}

const PayslipTable: React.FC<PayslipTableProps> = ({ payslips }) => {
  const navigate = useNavigate();

  if (payslips.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">
          No payslips available.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Employee
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Month
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Gross Pay
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Net Pay
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {payslips.map((payslip) => (
              <tr key={payslip.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {payslip.employeeId}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {payslip.month}/{payslip.year}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {payslip.currency} {payslip.grossPay.toLocaleString()}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {payslip.currency} {payslip.netPay.toLocaleString()}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      payslip.status === 'PAID'
                        ? 'bg-green-100 text-green-700'
                        : payslip.status === 'GENERATED'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {payslip.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/hrms/payroll/payslips/${payslip.id}`)
                    }
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipTable;
import React from 'react';

import type { Application } from '../types/application.types';

import RecruitmentStatusBadge from './RecruitmentStatusBadge';

interface RecruitmentTableProps {
  applications: Application[];
  onView: (application: Application) => void;
}

const RecruitmentTable: React.FC<RecruitmentTableProps> = ({
  applications,
  onView,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[1000px] text-left">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">
              Candidate
            </th>

            <th className="px-4 py-3 text-xs font-semibold text-slate-600">
              Job
            </th>

            <th className="px-4 py-3 text-xs font-semibold text-slate-600">
              Applied Date
            </th>

            <th className="px-4 py-3 text-xs font-semibold text-slate-600">
              Recruiter
            </th>

            <th className="px-4 py-3 text-xs font-semibold text-slate-600">
              Status
            </th>

            <th className="px-4 py-3 text-xs font-semibold text-slate-600">
              Current Stage
            </th>

            <th className="px-4 py-3 text-xs font-semibold text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {applications.map((application) => (
            <tr
              key={application.id}
              className="transition-colors hover:bg-slate-50"
            >
              <td className="px-4 py-4">
                <div>
                  <p className="font-medium text-slate-800">
                    {application.candidateName}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {application.candidateEmail}
                  </p>
                </div>
              </td>

              <td className="px-4 py-4 text-sm text-slate-700">
                {application.jobTitle}
              </td>

              <td className="px-4 py-4 text-sm text-slate-600">
                {application.appliedDate}
              </td>

              <td className="px-4 py-4 text-sm text-slate-700">
                {application.recruiterName}
              </td>

              <td className="px-4 py-4">
                <RecruitmentStatusBadge status={application.status} />
              </td>

              <td className="px-4 py-4 text-sm text-slate-700">
                {application.currentStage}
              </td>

              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => onView(application)}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruitmentTable;
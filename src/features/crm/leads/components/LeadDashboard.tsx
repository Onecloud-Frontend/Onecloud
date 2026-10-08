import React from "react";
import { useNavigate } from "react-router-dom";
import { mockLeads } from "../mocks/leadsMockData";

const LeadDashboard: React.FC = () => {
  const navigate = useNavigate();

  const totalLeads = mockLeads.length;

  const newLeads = mockLeads.filter(
    (lead) => lead.status === "NEW"
  ).length;

  const qualifiedLeads = mockLeads.filter(
    (lead) => lead.status === "QUALIFIED"
  ).length;

  const wonLeads = mockLeads.filter(
    (lead) => lead.status === "WON"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Lead Dashboard
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track your leads
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-600">
              Total Leads
            </p>

            <h3 className="mt-2 text-3xl font-semibold text-blue-700">
              {totalLeads}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              All leads
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-600">
              New Leads
            </p>

            <h3 className="mt-2 text-3xl font-semibold text-blue-700">
              {newLeads}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Newly created leads
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-600">
              Qualified Leads
            </p>

            <h3 className="mt-2 text-3xl font-semibold text-blue-700">
              {qualifiedLeads}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Qualified leads
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-600">
              Won Leads
            </p>

            <h3 className="mt-2 text-3xl font-semibold text-blue-700">
              {wonLeads}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Successfully converted
            </p>
          </div>

        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Lead Management
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            <button
              onClick={() => navigate("/crm/leads/new")}
              className="group rounded-xl border border-blue-100 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16M4 12h16"
                    />
                  </svg>
                </div>

                <span className="text-xl text-blue-400">
                  →
                </span>
              </div>

              <h4 className="text-lg font-semibold text-blue-700">
                Create Lead
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                Add a new lead to the system
              </p>
            </button>

            <button
              onClick={() =>
                navigate(`/crm/leads/${mockLeads[0].id}`)
              }
              className="group rounded-xl border border-blue-100 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                <span className="text-xl text-blue-400">
                  →
                </span>
              </div>

              <h4 className="text-lg font-semibold text-blue-700">
                Lead Details
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                View detailed lead information
              </p>
            </button>

            <button
              onClick={() =>
                navigate(`/crm/leads/${mockLeads[0].id}/edit`)
              }
              className="group rounded-xl border border-blue-100 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                </div>

                <span className="text-xl text-blue-400">
                  →
                </span>
              </div>

              <h4 className="text-lg font-semibold text-blue-700">
                Edit Lead
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                Update existing lead information
              </p>
            </button>

          </div>
        </div>

        <div className="mt-8 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Leads
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Recently added leads
            </p>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-blue-50">
                  <th className="px-4 py-3 font-semibold text-blue-700">
                    Lead ID
                  </th>

                  <th className="px-4 py-3 font-semibold text-blue-700">
                    Name
                  </th>

                  <th className="px-4 py-3 font-semibold text-blue-700">
                    Company
                  </th>

                  <th className="px-4 py-3 font-semibold text-blue-700">
                    Status
                  </th>

                  <th className="px-4 py-3 font-semibold text-blue-700">
                    Source
                  </th>

                  <th className="px-4 py-3 font-semibold text-blue-700">
                    Value
                  </th>
                </tr>
              </thead>

              <tbody>
                {mockLeads.slice(0, 5).map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b transition-colors hover:bg-blue-50"
                  >
                    <td className="px-4 py-3 font-medium text-blue-600">
                      {lead.id}
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {lead.firstName} {lead.lastName}
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {lead.company}
                    </td>

                    <td className="px-4 py-3 font-medium text-blue-600">
                      {lead.status}
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {lead.source}
                    </td>

                    <td className="px-4 py-3 font-medium text-blue-600">
                      ${lead.estimatedValue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeadDashboard;
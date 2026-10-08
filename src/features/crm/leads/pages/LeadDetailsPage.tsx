import React from "react";
import { useNavigate } from "react-router-dom";
import { mockLeads } from "../mocks/leadsMockData";

export const LeadDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate("/crm/leads")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            ← Back
          </button>

          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Lead Details
            </h1>
            <p className="mt-1 text-gray-600">
              Complete details of all companies
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {mockLeads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl bg-white p-6 shadow"
            >
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-blue-600">
                    {lead.company}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {lead.id}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  {lead.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {lead.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {lead.firstName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {lead.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {lead.company}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {lead.jobTitle}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {lead.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {lead.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="mt-1 font-medium text-blue-600">
                    {lead.status}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Source</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {lead.source}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Estimated Value</p>
                  <p className="mt-1 font-medium text-green-600">
                    ${lead.estimatedValue.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {lead.assignedTo}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Updated At</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {new Date(lead.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsPage;
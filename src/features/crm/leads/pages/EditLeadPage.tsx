import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockLeads } from "../mocks/leadsMockData";
import { Lead } from "../../shared/types/lead.types";
import { leadService } from "../services/leadService";

export const EditLeadPage: React.FC = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const handleChange = (
    id: string,
    field: keyof Lead,
    value: string
  ) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === id
          ? {
            ...lead,
            [field]:
              field === "estimatedValue"
                ? Number(value)
                : value,
          }
          : lead
      )
    );
  };

  const handleUpdate = async (lead: Lead) => {
    await leadService.updateLead(lead.id, lead);
    alert(`${lead.id} updated successfully`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate("/crm/leads")}
        className="mb-6 rounded-lg border bg-white px-5 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-100"
      >
        ← Back to Leads
      </button>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-blue-700">
            Edit Leads
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Edit all lead information
          </p>
        </div>

        <div className="space-y-6">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl bg-white p-6 shadow"
            >
              <div className="mb-5 border-b pb-4">
                <h2 className="text-xl font-semibold text-blue-700">
                  {lead.id}
                </h2>
                <p className="text-sm text-gray-500">
                  {lead.company}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Lead ID
                  </label>
                  <input
                    value={lead.id}
                    disabled
                    className="w-full rounded-lg border bg-gray-100 px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    value={lead.firstName}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "firstName",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    value={lead.lastName}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "lastName",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Company
                  </label>
                  <input
                    value={lead.company}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "company",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Job Title
                  </label>
                  <input
                    value={lead.jobTitle}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={lead.email}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "email",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    value={lead.phone}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "phone",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Status
                  </label>
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "status",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="QUALIFIED">QUALIFIED</option>
                    <option value="PROPOSAL">PROPOSAL</option>
                    <option value="NEGOTIATION">NEGOTIATION</option>
                    <option value="WON">WON</option>
                    <option value="LOST">LOST</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Source
                  </label>
                  <select
                    value={lead.source}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "source",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  >
                    <option value="WEBSITE">WEBSITE</option>
                    <option value="CONFERENCE">CONFERENCE</option>
                    <option value="REFERRAL">REFERRAL</option>
                    <option value="PARTNER">PARTNER</option>
                    <option value="COLD_CALL">COLD_CALL</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Estimated Value
                  </label>
                  <input
                    type="number"
                    value={lead.estimatedValue}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "estimatedValue",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Assigned To
                  </label>
                  <input
                    value={lead.assignedTo}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "assignedTo",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Created Date
                  </label>
                  <input
                    value={lead.createdAt}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "createdAt",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Updated Date
                  </label>
                  <input
                    value={lead.updatedAt}
                    onChange={(e) =>
                      handleChange(
                        lead.id,
                        "updatedAt",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleUpdate(lead)}
                  className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Update {lead.id}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/crm/leads")}
          className="mt-6 rounded-lg border bg-white px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Back to Leads
        </button>
      </div>
    </div>
  );
};

export default EditLeadPage;
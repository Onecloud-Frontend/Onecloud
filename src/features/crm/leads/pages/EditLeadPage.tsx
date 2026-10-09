import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockLeads } from "../mocks/leadsMockData";

export const EditLeadPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const lead = mockLeads.find((item) => item.id === id);

  const [formData, setFormData] = useState({
    firstName: lead?.firstName || "",
    lastName: lead?.lastName || "",
    company: lead?.company || "",
    jobTitle: lead?.jobTitle || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    status: lead?.status || "NEW",
    source: lead?.source || "WEBSITE",
    estimatedValue: lead?.estimatedValue || 0,
    assignedTo: lead?.assignedTo || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "estimatedValue" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      ...lead,
      ...formData,
      updatedAt: new Date().toISOString(),
    });

    navigate("/crm/leads");
  };

  if (!lead) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <button
          onClick={() => navigate("/crm/leads")}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          ← Back
        </button>

        <p className="mt-6 text-red-600">Lead not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/crm/leads")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            ← Back
          </button>

          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Edit Lead
            </h1>
            <p className="mt-1 text-gray-600">
              Update lead information
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-6 shadow"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Lead Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="PROPOSAL">PROPOSAL</option>
                <option value="NEGOTIATION">NEGOTIATION</option>
                <option value="LOST">LOST</option>
                <option value="WON">WON</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Lead Source
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="WEBSITE">WEBSITE</option>
                <option value="CONFERENCE">CONFERENCE</option>
                <option value="REFERRAL">REFERRAL</option>
                <option value="PARTNER">PARTNER</option>
                <option value="COLD_CALL">COLD_CALL</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Estimated Value
              </label>
              <input
                type="number"
                name="estimatedValue"
                value={formData.estimatedValue}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Assigned To
              </label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/crm/leads")}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
            >
              Update Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeadPage;
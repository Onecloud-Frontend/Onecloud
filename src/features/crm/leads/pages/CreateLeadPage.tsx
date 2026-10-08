import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateLeadPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    source: "WEBSITE",
    status: "NEW",
    estimatedValue: "",
    assignedTo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    navigate("/crm/leads");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Create Lead</h1>
          <p className="text-gray-500">Create a new lead</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-white p-6 shadow"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name *
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name *
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Company Name *
              </label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Designation
              </label>
              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Lead Source *
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="WEBSITE">Website</option>
                <option value="CONFERENCE">Conference</option>
                <option value="REFERRAL">Referral</option>
                <option value="PARTNER">Partner</option>
                <option value="COLD_CALL">Cold Call</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Lead Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="PROPOSAL">Proposal</option>
                <option value="NEGOTIATION">Negotiation</option>
                <option value="LOST">Lost</option>
                <option value="WON">Won</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Lead Score
              </label>
              <input
                type="number"
                name="estimatedValue"
                value={formData.estimatedValue}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Lead Owner *
              </label>
              <input
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/crm/leads")}
              className="rounded-md border border-gray-300 px-5 py-2 text-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-blue-600 px-5 py-2 text-white"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadPage;
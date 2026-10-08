import React, { useMemo, useState } from "react";
import { Plus, Search, Pencil, Eye } from "lucide-react";
import { useOffers } from "../hooks/useOffers";
import type {
  Offer,
  OfferStatus,
  EmploymentType,
} from "../types/offer.types";

const STATUS_OPTIONS: OfferStatus[] = [
  "Draft",
  "Pending Approval",
  "Sent",
  "Accepted",
  "Rejected",
  "Expired",
];

const EMPLOYMENT_TYPES: EmploymentType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const BENEFIT_OPTIONS = [
  "Health Insurance",
  "Paid Leave",
  "Performance Bonus",
  "Work From Home",
  "Meal Allowance",
];

const OffersPage: React.FC = () => {
  const {
    offers,
    isLoading,
    isError,
    createOffer,
    isCreating,
    updateOffer,
    isUpdating,
  } = useOffers();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OfferStatus | "All">("All");

  const [showForm, setShowForm] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const [form, setForm] = useState({
    candidateName: "",
    candidateEmail: "",
    position: "",
    department: "",
    joiningDate: "",
    employmentType: "Full-time" as EmploymentType,
    salary: "",
    benefits: [] as string[],
    offerExpiry: "",
    status: "Draft" as OfferStatus,
  });

  const filteredOffers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return offers.filter((offer) => {
      const matchesSearch =
        !searchValue ||
        offer.candidateName.toLowerCase().includes(searchValue) ||
        offer.position.toLowerCase().includes(searchValue) ||
        offer.department.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || offer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [offers, search, statusFilter]);

  const resetForm = () => {
    setForm({
      candidateName: "",
      candidateEmail: "",
      position: "",
      department: "",
      joiningDate: "",
      employmentType: "Full-time",
      salary: "",
      benefits: [],
      offerExpiry: "",
      status: "Draft",
    });

    setSelectedOffer(null);
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    const newOffer: Offer = {
      id: `OFF-${String(offers.length + 1).padStart(3, "0")}`,
      candidateName: form.candidateName,
      candidateEmail: form.candidateEmail,
      position: form.position,
      department: form.department,
      joiningDate: form.joiningDate,
      employmentType: form.employmentType,
      salary: Number(form.salary),
      benefits: form.benefits,
      offerExpiry: form.offerExpiry,
      status: form.status,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    await createOffer(newOffer);

    resetForm();
    setShowForm(false);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedOffer) {
      return;
    }

    const updatedOffer: Offer = {
      ...selectedOffer,
      candidateName: form.candidateName,
      candidateEmail: form.candidateEmail,
      position: form.position,
      department: form.department,
      joiningDate: form.joiningDate,
      employmentType: form.employmentType,
      salary: Number(form.salary),
      benefits: form.benefits,
      offerExpiry: form.offerExpiry,
      status: form.status,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    await updateOffer(updatedOffer);

    resetForm();
    setShowForm(false);
  };

  const openEdit = (offer: Offer) => {
    setSelectedOffer(offer);

    setForm({
      candidateName: offer.candidateName,
      candidateEmail: offer.candidateEmail,
      position: offer.position,
      department: offer.department,
      joiningDate: offer.joiningDate,
      employmentType: offer.employmentType,
      salary: String(offer.salary),
      benefits: offer.benefits,
      offerExpiry: offer.offerExpiry,
      status: offer.status,
    });

    setShowForm(true);
  };

  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const toggleBenefit = (benefit: string) => {
    setForm((current) => ({
      ...current,
      benefits: current.benefits.includes(benefit)
        ? current.benefits.filter((item) => item !== benefit)
        : [...current.benefits, benefit],
    }));
  };

  const statusClass = (status: OfferStatus) => {
    switch (status) {
      case "Draft":
        return "bg-slate-100 text-slate-700";

      case "Pending Approval":
        return "bg-amber-100 text-amber-700";

      case "Sent":
        return "bg-blue-100 text-blue-700";

      case "Accepted":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Expired":
        return "bg-gray-200 text-gray-600";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">HRMS</p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Offer Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, approve, send, and track employee offers.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Create Offer
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search candidate, position, or department..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as OfferStatus | "All")
            }
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>

            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={selectedOffer ? handleUpdate : handleCreate}
          className="rounded-xl border border-slate-200 bg-white p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {selectedOffer ? "Edit Offer" : "Create Offer"}
              </h2>

              <p className="text-sm text-slate-500">
                Enter the offer details below.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="text-sm text-slate-500 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Candidate */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Candidate Name
              </label>

              <input
                required
                value={form.candidateName}
                onChange={(event) =>
                  setForm({
                    ...form,
                    candidateName: event.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Candidate Email
              </label>

              <input
                required
                type="email"
                value={form.candidateEmail}
                onChange={(event) =>
                  setForm({
                    ...form,
                    candidateEmail: event.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              />
            </div>

            {/* Position */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Position
              </label>

              <input
                required
                value={form.position}
                onChange={(event) =>
                  setForm({
                    ...form,
                    position: event.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              />
            </div>

            {/* Department */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Department
              </label>

              <input
                required
                value={form.department}
                onChange={(event) =>
                  setForm({
                    ...form,
                    department: event.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Joining Date
              </label>

              <input
                required
                type="date"
                value={form.joiningDate}
                onChange={(event) =>
                  setForm({
                    ...form,
                    joiningDate: event.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Employment Type
              </label>

              <select
                value={form.employmentType}
                onChange={(event) =>
                  setForm({
                    ...form,
                    employmentType: event.target.value as EmploymentType,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              >
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Salary
              </label>

              <input
                required
                type="number"
                min="1"
                value={form.salary}
                onChange={(event) =>
                  setForm({
                    ...form,
                    salary: event.target.value,
                  })
                }
                placeholder="Annual salary"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              />
            </div>

            {/* Offer Expiry */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Offer Expiry
              </label>

              <input
                required
                type="date"
                value={form.offerExpiry}
                onChange={(event) =>
                  setForm({
                    ...form,
                    offerExpiry: event.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Benefits
            </label>

            <div className="flex flex-wrap gap-2">
              {BENEFIT_OPTIONS.map((benefit) => {
                const selected = form.benefits.includes(benefit);

                return (
                  <button
                    key={benefit}
                    type="button"
                    onClick={() => toggleBenefit(benefit)}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {benefit}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div className="mt-5 max-w-sm">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={form.status}
              onChange={(event) =>
                setForm({
                  ...form,
                  status: event.target.value as OfferStatus,
                })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCreating || isUpdating
                ? "Saving..."
                : selectedOffer
                  ? "Update Offer"
                  : "Create Offer"}
            </button>
          </div>
        </form>
      )}

      {/* Offers Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-semibold text-slate-900">Offers</h2>

          <p className="text-sm text-slate-500">
            {filteredOffers.length} offer
            {filteredOffers.length !== 1 ? "s" : ""}
          </p>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Loading offers...
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-sm text-red-600">
            Failed to load offers.
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            No offers found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">
                    Candidate
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">
                    Position
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">
                    Department
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">
                    Joining Date
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">
                    Salary
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOffers.map((offer) => (
                  <tr
                    key={offer.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {offer.candidateName}
                        </p>

                        <p className="text-xs text-slate-500">
                          {offer.candidateEmail}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {offer.position}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {offer.department}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {offer.joiningDate}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      ₹{offer.salary.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(
                          offer.status,
                        )}`}
                      >
                        {offer.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          title="View offer"
                          onClick={() => setSelectedOffer(offer)}
                          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Edit offer"
                          onClick={() => openEdit(offer)}
                          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Offer Details */}
      {selectedOffer && !showForm && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-blue-600">
                {selectedOffer.id}
              </p>

              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                {selectedOffer.candidateName}
              </h2>

              <p className="text-sm text-slate-500">
                {selectedOffer.position} · {selectedOffer.department}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOffer(null)}
              className="text-sm text-slate-500 hover:text-slate-900"
            >
              Close
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-slate-500">Employment Type</p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {selectedOffer.employmentType}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Joining Date</p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {selectedOffer.joiningDate}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Offer Expiry</p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {selectedOffer.offerExpiry}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Salary</p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                ₹{selectedOffer.salary.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Status</p>
              <span
                className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(
                  selectedOffer.status,
                )}`}
              >
                {selectedOffer.status}
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-500">Benefits</p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {selectedOffer.benefits.join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersPage;
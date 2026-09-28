import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCustomers } from "../hooks/useCustomers";

export const CustomersPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: customers = [], isLoading, isError } = useCustomers();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      customer.customerId.toLowerCase().includes(searchValue) ||
      customer.customerName.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue) ||
      customer.phone.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "" || customer.status === statusFilter;

    const matchesOwner = ownerFilter === "" || customer.owner === ownerFilter;

    const matchesType =
      typeFilter === "" || customer.customerType === typeFilter;

    return matchesSearch && matchesStatus && matchesOwner && matchesType;
  });

  // Get unique owners for owner filter
  const owners = [...new Set(customers.map((customer) => customer.owner))];

  // Format revenue
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (date: string) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN");
  };

  // Loading
  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading customers...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="p-6">
        <p>Unable to load customers.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Customers</h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage CRM customers
        </p>
      </div>

      {/* Search and Filters */}

      <div className="mb-6 flex flex-wrap gap-3">
        {/* Search */}

        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded border px-3 py-2 text-sm"
        />

        {/* Status Filter */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded border px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Owner Filter */}

        <select
          value={ownerFilter}
          onChange={(e) => setOwnerFilter(e.target.value)}
          className="rounded border px-3 py-2 text-sm"
        >
          <option value="">All Owners</option>

          {owners.map((owner) => (
            <option key={owner} value={owner}>
              {owner}
            </option>
          ))}
        </select>

        {/* Customer Type Filter */}

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded border px-3 py-2 text-sm"
        >
          <option value="">All Types</option>

          <option value="Individual">Individual</option>

          <option value="Business">Business</option>

          <option value="Enterprise">Enterprise</option>
        </select>
      </div>

      {/* Customer Table */}

      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Customer ID</th>

              <th className="px-4 py-3 text-left">Customer Name</th>

              <th className="px-4 py-3 text-left">Customer Type</th>

              <th className="px-4 py-3 text-left">Industry</th>

              <th className="px-4 py-3 text-left">Primary Contact</th>

              <th className="px-4 py-3 text-left">Email</th>

              <th className="px-4 py-3 text-left">Phone</th>

              <th className="px-4 py-3 text-left">Owner</th>

              <th className="px-4 py-3 text-left">Status</th>

              <th className="px-4 py-3 text-left">Total Opportunities</th>

              <th className="px-4 py-3 text-left">Total Revenue</th>

              <th className="px-4 py-3 text-left">Created Date</th>

              <th className="px-4 py-3 text-left">Last Activity</th>

              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => navigate(`/crm/customers/${customer.id}`)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                {/* Customer ID */}

                <td className="whitespace-nowrap px-4 py-3">
                  {customer.customerId}
                </td>

                {/* Customer Name */}

                <td className="whitespace-nowrap px-4 py-3 font-medium">
                  {customer.customerName}
                </td>

                {/* Customer Type */}

                <td className="whitespace-nowrap px-4 py-3">
                  {customer.customerType}
                </td>

                {/* Industry */}

                <td className="whitespace-nowrap px-4 py-3">
                  {customer.industry || "-"}
                </td>

                {/* Primary Contact */}

                <td className="whitespace-nowrap px-4 py-3">
                  {customer.primaryContact || "-"}
                </td>

                {/* Email */}

                <td className="whitespace-nowrap px-4 py-3">
                  {customer.email || "-"}
                </td>

                {/* Phone */}

                <td className="whitespace-nowrap px-4 py-3">
                  {customer.phone || "-"}
                </td>

                {/* Owner */}

                <td className="whitespace-nowrap px-4 py-3">
                  {customer.owner}
                </td>

                {/* Status */}

                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                {/* Total Opportunities */}

                <td className="whitespace-nowrap px-4 py-3 text-center">
                  {customer.totalOpportunities}
                </td>

                {/* Total Revenue */}

                <td className="whitespace-nowrap px-4 py-3">
                  {formatCurrency(customer.totalRevenue)}
                </td>

                {/* Created Date */}

                <td className="whitespace-nowrap px-4 py-3">
                  {formatDate(customer.createdDate)}
                </td>

                {/* Last Activity */}

                <td className="whitespace-nowrap px-4 py-3">
                  {formatDate(customer.lastActivity)}
                </td>

                {/* Actions */}

                <td className="whitespace-nowrap px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/crm/customers/${customer.id}/edit`)
                    }
                    className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {/* No Customers */}

            {filteredCustomers.length === 0 && (
              <tr>
                <td
                  colSpan={14}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Customer Count */}

      <div className="mt-3 text-sm text-gray-500">
        Showing {filteredCustomers.length} of {customers.length} customers
      </div>
    </div>
  );
};

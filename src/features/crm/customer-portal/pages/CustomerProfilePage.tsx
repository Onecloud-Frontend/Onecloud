import React from "react";

import { customers } from "../../shared/data/customers";

type CustomerStatus = "PROSPECT" | "ACTIVE" | "INACTIVE" | "CHURNED";

interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Customer {
  id: string;
  customerCode: string;
  companyName: string;
  industry: string;
  email: string;
  phone: string;
  website?: string;
  status: CustomerStatus;
  ownerId: string;
  billingAddress: Address;
  shippingAddress: Address;
  annualRevenue?: number;
  employeeCount?: number;
  createdAt: string;
  updatedAt: string;
}

const statusStyles: Record<CustomerStatus, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  INACTIVE: "bg-gray-100 text-gray-600 border-gray-200",
  PROSPECT: "bg-amber-50 text-amber-700 border-amber-200",
  CHURNED: "bg-red-50 text-red-700 border-red-200",
};

const StatusBadge: React.FC<{ status: CustomerStatus }> = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
      statusStyles[status]
    }`}
  >
    {status}
  </span>
);

const formatAddress = (address: Address) =>
  [
    address.addressLine1,
    address.addressLine2,
    `${address.city}, ${address.state} ${address.postalCode}`,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");

const Field: React.FC<{
  label: string;
  value: React.ReactNode;
}> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 text-sm text-gray-800">{value || "—"}</p>
  </div>
);

const SectionCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="rounded-lg border border-gray-200 bg-white">
    <div className="border-b border-gray-100 px-4 py-3">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
    </div>

    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {children}
    </div>
  </div>
);

const CustomerProfilePage: React.FC = () => {
  /*
   * Customer data comes from the centralized CRM dataset.
   *
   * No customer data is hardcoded in this page.
   *
   * Replace this selection with the customer ID coming from
   * your route/parent component when customer routing is wired.
   */
  const customer: Customer | undefined = customers[0];

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleEditAddress = () => {
    console.log("Edit address clicked");
  };

  if (!customer) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          No customer profile found.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {customer.companyName}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Customer Code: {customer.customerCode}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={customer.status} />

          <button
            onClick={handleEditProfile}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit profile
          </button>
        </div>
      </div>

      {/* Company Information */}
      <SectionCard title="Company Information">
        <Field
          label="Customer Code"
          value={customer.customerCode}
        />

        <Field
          label="Industry"
          value={customer.industry}
        />

        <Field
          label="Customer Status"
          value={customer.status}
        />

        <Field
          label="Owner ID"
          value={customer.ownerId}
        />

        <Field
          label="Annual Revenue"
          value={
            customer.annualRevenue !== undefined
              ? customer.annualRevenue.toLocaleString("en-IN")
              : "—"
          }
        />

        <Field
          label="Employee Count"
          value={customer.employeeCount}
        />
      </SectionCard>

      {/* Contact Information */}
      <SectionCard title="Contact Information">
        <Field
          label="Email"
          value={customer.email}
        />

        <Field
          label="Phone"
          value={customer.phone}
        />

        <Field
          label="Website"
          value={customer.website}
        />
      </SectionCard>

      {/* Addresses */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Addresses
          </h2>

          <button
            onClick={handleEditAddress}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit address
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          <Field
            label="Billing Address"
            value={formatAddress(customer.billingAddress)}
          />

          <Field
            label="Shipping Address"
            value={formatAddress(customer.shippingAddress)}
          />
        </div>
      </div>
    </div>
  );
};

export { CustomerProfilePage };
import React, { useEffect, useState } from "react";

type AccountStatus = "Active" | "Inactive" | "Suspended" | "Pending";

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface CustomerProfile {
  customerName: string;
  accountId: string;
  customerType: "Enterprise" | "SMB" | "Individual";
  industry: string;
  email: string;
  phone: string;
  website: string;
  primaryContact: string;
  billingAddress: Address;
  shippingAddress: Address;
  taxGstNumber: string;
  paymentTerms: string;
  currency: string;
  accountStatus: AccountStatus;
}

async function fetchCustomerProfile(): Promise<CustomerProfile> {
  // TODO: replace with real API call, e.g. api.get(`/customer-portal/profile`)
  return {
    customerName: "Meridian Logistics Pvt Ltd",
    accountId: "ACC-10492",
    customerType: "Enterprise",
    industry: "Logistics & Supply Chain",
    email: "accounts@meridianlogistics.com",
    phone: "+91 98765 43210",
    website: "www.meridianlogistics.com",
    primaryContact: "Rahul Menon",
    billingAddress: {
      line1: "Plot 14, Industrial Estate",
      line2: "Guindy",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600032",
      country: "India",
    },
    shippingAddress: {
      line1: "Warehouse 3, Logistics Park",
      line2: "Sriperumbudur",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "602105",
      country: "India",
    },
    taxGstNumber: "33AAECM1234F1Z5",
    paymentTerms: "Net 30",
    currency: "INR",
    accountStatus: "Active",
  };
}

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactive: "bg-gray-100 text-gray-600 border-gray-200",
  Suspended: "bg-red-50 text-red-700 border-red-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
      statusStyles[status] ?? "bg-gray-100 text-gray-600 border-gray-200"
    }`}
  >
    {status}
  </span>
);

const formatAddress = (a: Address) =>
  [a.line1, a.line2, `${a.city}, ${a.state} ${a.postalCode}`, a.country].filter(Boolean).join(", ");

const Field: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 text-sm text-gray-800">{value}</p>
  </div>
);

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-lg border border-gray-200 bg-white">
    <div className="border-b border-gray-100 px-4 py-3">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">{children}</div>
  </div>
);

const CustomerProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchCustomerProfile()
      .then((result) => {
        if (isMounted) setProfile(result);
      })
      .catch(() => {
        if (isMounted) setError("Could not load profile. Please try again.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleEditAddress = () => {
    // TODO: navigate to address edit form
    console.log("Edit address clicked");
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-400">Loading profile…</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-600">{error ?? "Something went wrong."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{profile.customerName}</h1>
          <p className="mt-1 text-sm text-gray-500">Account ID: {profile.accountId}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={profile.accountStatus} />
          <button
            onClick={handleEditProfile}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit profile
          </button>
        </div>
      </div>

      <SectionCard title="Account Details">
        <Field label="Customer Type" value={profile.customerType} />
        <Field label="Industry" value={profile.industry} />
        <Field label="Payment Terms" value={profile.paymentTerms} />
        <Field label="Currency" value={profile.currency} />
        <Field label="Tax / GST Number" value={profile.taxGstNumber} />
      </SectionCard>

      <SectionCard title="Contact Information">
        <Field label="Primary Contact" value={profile.primaryContact} />
        <Field label="Email" value={profile.email} />
        <Field label="Phone" value={profile.phone} />
        <Field label="Website" value={profile.website} />
      </SectionCard>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-800">Addresses</h2>
          <button
            onClick={handleEditAddress}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit address
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          <Field label="Billing Address" value={formatAddress(profile.billingAddress)} />
          <Field label="Shipping Address" value={formatAddress(profile.shippingAddress)} />
        </div>
      </div>
    </div>
  );
};

export {CustomerProfilePage}

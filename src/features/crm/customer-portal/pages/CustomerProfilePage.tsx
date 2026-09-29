<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Edit3, Save, ShieldCheck, UserRound } from 'lucide-react';
import { customerProfile, type CustomerProfile } from '../types/data';
import { PageHeader, PortalNav, DetailRow, portalStatus } from '../components/PortalUi';

const STORAGE_KEY='onecloud_customer_portal_profile_v1';
const loadProfile=():CustomerProfile=>{try{const saved=localStorage.getItem(STORAGE_KEY);return saved?{...customerProfile,...JSON.parse(saved)}:customerProfile}catch{return customerProfile}};
export const CustomerProfilePage: React.FC = () => {
 const [profile,setProfile]=useState<CustomerProfile>(loadProfile); const [draft,setDraft]=useState<CustomerProfile>(loadProfile); const [editing,setEditing]=useState(false); const [saved,setSaved]=useState(false);
 useEffect(()=>{if(saved){const timer=window.setTimeout(()=>setSaved(false),2500);return()=>window.clearTimeout(timer)}},[saved]);
 const save=()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(draft));setProfile(draft);setEditing(false);setSaved(true)};
 const field=(label:keyof CustomerProfile, title:string, type='text')=><label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-500">{title}</span><input type={type} value={String(draft[label])} onChange={e=>setDraft({...draft,[label]:e.target.value})} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" /></label>;
 return <div className="p-5 md:p-7"><PageHeader title="Customer Profile" description="Manage your customer contact, company, tax, billing and communication preferences." action={!editing?<button onClick={()=>setEditing(true)} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"><Edit3 size={16}/> Edit Profile</button>:<div className="flex gap-2"><button onClick={()=>{setDraft(profile);setEditing(false)}} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold">Cancel</button><button onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"><Save size={16}/> Save Changes</button></div>}/><PortalNav/>{saved&&<div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">Profile updated successfully. Changes are stored locally for this demo portal.</div>}
 <div className="grid gap-5 xl:grid-cols-[1fr_360px]"><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-3 border-b border-slate-100 pb-5"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><UserRound size={25}/></div><div><h2 className="text-lg font-bold text-slate-900">{profile.companyName}</h2><p className="text-xs text-slate-500">Customer code · {profile.customerCode}</p></div></div>{editing?<div className="mt-5 grid gap-4 md:grid-cols-2">{field('companyName','Company Name')}{field('primaryContact','Primary Contact')}{field('email','Email','email')}{field('phone','Phone')}{field('alternatePhone','Alternate Phone')}{field('website','Website')}{field('billingAddress','Billing Address')}{field('shippingAddress','Shipping Address')}{field('gstin','GSTIN')}{field('pan','PAN')}<label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-500">Preferred Contact</span><select value={draft.preferredContact} onChange={e=>setDraft({...draft,preferredContact:e.target.value as CustomerProfile['preferredContact']})} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option>Email</option><option>Phone</option><option>Portal</option></select></label></div>:<dl className="mt-3 grid gap-x-8 md:grid-cols-2"><DetailRow label="Primary Contact" value={profile.primaryContact}/><DetailRow label="Email" value={profile.email}/><DetailRow label="Phone" value={profile.phone}/><DetailRow label="Alternate Phone" value={profile.alternatePhone}/><DetailRow label="Website" value={profile.website}/><DetailRow label="Billing Address" value={profile.billingAddress}/><DetailRow label="Shipping Address" value={profile.shippingAddress}/><DetailRow label="GSTIN" value={profile.gstin}/><DetailRow label="PAN" value={profile.pan}/><DetailRow label="Preferred Contact" value={profile.preferredContact}/></dl>}</section>
 <aside className="space-y-5"><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="flex items-center gap-2 font-bold text-slate-900"><ShieldCheck size={18} className="text-emerald-600"/> Account Preferences</h3><dl className="mt-3"><DetailRow label="Payment Terms" value={profile.paymentTerms}/><DetailRow label="Account Manager" value={profile.accountManager}/><DetailRow label="Status" value={<span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus('Active')}`}>Active</span>}/></dl></section><section className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><h3 className="font-bold text-blue-900">Profile security</h3><p className="mt-2 text-sm leading-6 text-blue-800">For production use, profile and tax information should be updated through authenticated APIs and audited server-side.</p></section></aside></div></div>;
};
=======
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
>>>>>>> origin/dev

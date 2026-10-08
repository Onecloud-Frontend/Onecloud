import React, { useEffect, useState } from "react";
import { Edit3, Save, ShieldCheck, UserRound } from "lucide-react";
import { customerProfile, type CustomerProfile } from "../types/data";
import {
  PageHeader,
  PortalNav,
  DetailRow,
  portalStatus,
} from "../components/PortalUi";

const STORAGE_KEY = "onecloud_customer_portal_profile_v1";
const loadProfile = (): CustomerProfile => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? { ...customerProfile, ...JSON.parse(saved) }
      : customerProfile;
  } catch {
    return customerProfile;
  }
};
export const CustomerProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<CustomerProfile>(loadProfile);
  const [draft, setDraft] = useState<CustomerProfile>(loadProfile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (saved) {
      const timer = window.setTimeout(() => setSaved(false), 2500);
      return () => window.clearTimeout(timer);
    }
  }, [saved]);
  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setProfile(draft);
    setEditing(false);
    setSaved(true);
  };
  const field = (
    label: keyof CustomerProfile,
    title: string,
    type = "text",
  ) => (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">
        {title}
      </span>
      <input
        type={type}
        value={String(draft[label])}
        onChange={(e) => setDraft({ ...draft, [label]: e.target.value })}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
  return (
    <div className="p-5 md:p-7">
      <PageHeader
        title="Customer Profile"
        description="Manage your customer contact, company, tax, billing and communication preferences."
        action={
          !editing ? (
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDraft(profile);
                  setEditing(false);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          )
        }
      />
      <PortalNav />
      {saved && (
        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Profile updated successfully. Changes are stored locally for this demo
          portal.
        </div>
      )}
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <UserRound size={25} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {profile.companyName}
              </h2>
              <p className="text-xs text-slate-500">
                Customer code · {profile.customerCode}
              </p>
            </div>
          </div>
          {editing ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {field("companyName", "Company Name")}
              {field("primaryContact", "Primary Contact")}
              {field("email", "Email", "email")}
              {field("phone", "Phone")}
              {field("alternatePhone", "Alternate Phone")}
              {field("website", "Website")}
              {field("billingAddress", "Billing Address")}
              {field("shippingAddress", "Shipping Address")}
              {field("gstin", "GSTIN")}
              {field("pan", "PAN")}
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                  Preferred Contact
                </span>
                <select
                  value={draft.preferredContact}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      preferredContact: e.target
                        .value as CustomerProfile["preferredContact"],
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                >
                  <option>Email</option>
                  <option>Phone</option>
                  <option>Portal</option>
                </select>
              </label>
            </div>
          ) : (
            <dl className="mt-3 grid gap-x-8 md:grid-cols-2">
              <DetailRow
                label="Primary Contact"
                value={profile.primaryContact}
              />
              <DetailRow label="Email" value={profile.email} />
              <DetailRow label="Phone" value={profile.phone} />
              <DetailRow
                label="Alternate Phone"
                value={profile.alternatePhone}
              />
              <DetailRow label="Website" value={profile.website} />
              <DetailRow
                label="Billing Address"
                value={profile.billingAddress}
              />
              <DetailRow
                label="Shipping Address"
                value={profile.shippingAddress}
              />
              <DetailRow label="GSTIN" value={profile.gstin} />
              <DetailRow label="PAN" value={profile.pan} />
              <DetailRow
                label="Preferred Contact"
                value={profile.preferredContact}
              />
            </dl>
          )}
        </section>
        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck size={18} className="text-emerald-600" /> Account
              Preferences
            </h3>
            <dl className="mt-3">
              <DetailRow label="Payment Terms" value={profile.paymentTerms} />
              <DetailRow
                label="Account Manager"
                value={profile.accountManager}
              />
              <DetailRow
                label="Status"
                value={
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${portalStatus("Active")}`}
                  >
                    Active
                  </span>
                }
              />
            </dl>
          </section>
          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="font-bold text-blue-900">Profile security</h3>
            <p className="mt-2 text-sm leading-6 text-blue-800">
              For production use, profile and tax information should be updated
              through authenticated APIs and audited server-side.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
};

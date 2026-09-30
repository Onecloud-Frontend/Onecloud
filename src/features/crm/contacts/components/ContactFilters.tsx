
import { Search } from 'lucide-react';
import React from 'react';

interface ContactFiltersProps {
  search: string;
  customer: string;
  designation: string;
  owner: string;
  customers: string[];
  designations: string[];
  owners: string[];
  onSearchChange: (value: string) => void;
  onCustomerChange: (value: string) => void;
  onDesignationChange: (value: string) => void;
  onOwnerChange: (value: string) => void;
}

const ContactFilters: React.FC<ContactFiltersProps> = ({
  search,
  customer,
  designation,
  owner,
  customers,
  designations,
  owners,
  onSearchChange,
  onCustomerChange,
  onDesignationChange,
  onOwnerChange,
}) => {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
      <label className="relative block">
        <span className="sr-only">Search contacts</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        placeholder="Search by name, customer or email"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
      </label>

      <select value={customer} onChange={(event) => onCustomerChange(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
        <option value="">All customers</option>

        {customers.map((customerOption) => (
          <option key={customerOption} value={customerOption}>
            {customerOption}
          </option>
        ))}
      </select>

      <select value={designation} onChange={(event) => onDesignationChange(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
        <option value="">All designations</option>

        {designations.map((designationOption) => (
          <option key={designationOption} value={designationOption}>
            {designationOption}
          </option>
        ))}
      </select>

      <select value={owner} onChange={(event) => onOwnerChange(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
        <option value="">All owners</option>

        {owners.map((ownerOption) => (
          <option key={ownerOption} value={ownerOption}>
            {ownerOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContactFilters;

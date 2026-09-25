import React from "react";
import { Building2, Contact, Handshake, UserRound } from "lucide-react";
import type { Activity } from "../types/activity.types";
interface ActivityRelatedRecordsProps {
  activity: Activity;
}
const ActivityRelatedRecords: React.FC<ActivityRelatedRecordsProps> = ({
  activity,
}) => {
  const records = [
    {
      label: "Lead",
      value: activity.relatedLead,
      icon: UserRound,
    },
    {
      label: "Customer",
      value: activity.relatedCustomer,
      icon: Building2,
    },
    {
      label: "Contact",
      value: activity.relatedContact,
      icon: Contact,
    },
    {
      label: "Opportunity",
      value: activity.relatedOpportunity,
      icon: Handshake,
    },
  ].filter((record) => record.value);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900">
          Related Records
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          CRM records associated with this activity.
        </p>
      </div>
      {records.length > 0 ? (
        <div className="space-y-3">
          {records.map((record) => {
            const Icon = record.icon;
            return (
              <div
                key={record.label}
                className="flex items-center gap-3 rounded-lg border border-slate-100 p-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
                  <Icon className="h-4 w-4 text-slate-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">{record.label}</p>
                  <p className="truncate text-sm font-medium text-slate-800">
                    {record.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No related records.</p>
      )}
    </div>
  );
};
export default ActivityRelatedRecords;

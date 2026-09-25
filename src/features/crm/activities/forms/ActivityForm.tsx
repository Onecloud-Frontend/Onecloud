import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  activitySchema,
  type ActivityFormValues,
} from "../schemas/activitySchema";
interface ActivityFormProps {
  defaultValues?: Partial<ActivityFormValues>;
  onSubmit: (values: ActivityFormValues) => void;
  submitting?: boolean;
  submitLabel?: string;
}
const ActivityForm: React.FC<ActivityFormProps> = ({
  defaultValues,
  onSubmit,
  submitting = false,
  submitLabel = "Create Activity",
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      activityType: "CALL",
      subject: "",
      description: "",
      relatedLead: "",
      relatedCustomer: "",
      relatedContact: "",
      relatedOpportunity: "",
      owner: "",
      priority: "MEDIUM",
      status: "PENDING",
      startDate: "",
      endDate: "",
      dueDate: "",
      reminder: false,
      location: "",
      notes: "",
      ...defaultValues,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Activity Information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter the basic details for this activity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Activity Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("activityType")}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
            >
              <option value="CALL">Call</option>
              <option value="MEETING">Meeting</option>
              <option value="TASK">Task</option>
              <option value="NOTE">Note</option>
              <option value="EMAIL">Email</option>
            </select>
            {errors.activityType && (
              <p className="mt-1 text-xs text-red-600">
                {errors.activityType.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Subject <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("subject")}
              placeholder="Enter activity subject"
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-600">
                {errors.subject.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Enter activity description"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-[3px] focus:ring-ring/50"
            />
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Related Records
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Connect this activity to CRM records.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Related Lead
            </label>
            <Input {...register("relatedLead")} placeholder="Lead ID" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Related Customer
            </label>
            <Input {...register("relatedCustomer")} placeholder="Customer ID" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Related Contact
            </label>
            <Input {...register("relatedContact")} placeholder="Contact ID" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Related Opportunity
            </label>
            <Input
              {...register("relatedOpportunity")}
              placeholder="Opportunity ID"
            />
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Assignment & Status
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Owner <span className="text-red-500">*</span>
            </label>
            <Input {...register("owner")} placeholder="Employee ID" />
            {errors.owner && (
              <p className="mt-1 text-xs text-red-600">
                {errors.owner.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              {...register("priority")}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              {...register("status")}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Schedule</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Start Date <span className="text-red-500">*</span>
            </label>
            <Input type="datetime-local" {...register("startDate")} />
            {errors.startDate && (
              <p className="mt-1 text-xs text-red-600">
                {errors.startDate.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              End Date
            </label>
            <Input type="datetime-local" {...register("endDate")} />
            {errors.endDate && (
              <p className="mt-1 text-xs text-red-600">
                {errors.endDate.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Due Date
            </label>
            <Input type="datetime-local" {...register("dueDate")} />
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Additional Information
          </h2>
        </div>
        <div className="space-y-5">
          <Controller
            name="reminder"
            control={control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={field.value ?? false}
                  onChange={(event) => field.onChange(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">
                  Set reminder
                </span>
              </label>
            )}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Location
            </label>
            <Input {...register("location")} placeholder="Enter location" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Notes
            </label>
            <textarea
              {...register("notes")}
              rows={4}
              placeholder="Enter additional notes"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-[3px] focus:ring-ring/50"
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};
export default ActivityForm;

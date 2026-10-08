export type ActivityType =
  | "CALL"
  | "MEETING"
  | "EMAIL"
  | "TASK"
  | "NOTE"
  | "REMINDER";

export type ActivityStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "OVERDUE";

export interface Activity {
  id: string;
  activityCode: string;
  type: ActivityType;
  title: string;
  description?: string;

  customerId?: string;
  contactId?: string;
  leadId?: string;
  opportunityId?: string;

  assignedTo: string;
  status: ActivityStatus;

  startAt?: string;
  dueAt?: string;
  completedAt?: string;

  createdAt: string;
  updatedAt: string;
}
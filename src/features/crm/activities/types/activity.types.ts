export type ActivityType = "CALL" | "MEETING" | "TASK" | "NOTE" | "EMAIL";
export type ActivityStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
export type ActivityPriority = "LOW" | "MEDIUM" | "HIGH";
export interface Activity {
  id: string;
  activityType: ActivityType;
  subject: string;
  description: string;
  relatedLead?: string;
  relatedCustomer?: string;
  relatedContact?: string;
  relatedOpportunity?: string;
  owner: string;
  priority: ActivityPriority;
  status: ActivityStatus;
  startDate: string;
  endDate?: string;
  dueDate?: string;
  reminder?: boolean;
  location?: string;
  notes?: string;
  createdDate: string;
  updatedDate?: string;
}
export interface ActivityFilters {
  page?: number;
  limit?: number;
  search?: string;
  activityType?: ActivityType;
  status?: ActivityStatus;
  owner?: string;
  dueDate?: string;
}
export interface PaginatedActivities {
  data: Activity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

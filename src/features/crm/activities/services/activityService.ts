import type {
  Activity,
  ActivityFilters,
  PaginatedActivities,
} from "../types/activity.types";
import type { ActivityFormValues } from "../schemas/activitySchema";
import { mockActivities } from "../mocks/activitiesMockData";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
class ActivityService {
  async getActivities(filters: ActivityFilters): Promise<PaginatedActivities> {
    await delay(500);
    let filteredData = [...mockActivities];
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredData = filteredData.filter((activity) =>
        [
          activity.id,
          activity.subject,
          activity.description,
          activity.owner,
          activity.relatedLead,
          activity.relatedCustomer,
          activity.relatedContact,
          activity.relatedOpportunity,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(search)),
      );
    }
    if (filters.activityType) {
      filteredData = filteredData.filter(
        (activity) => activity.activityType === filters.activityType,
      );
    }
    if (filters.status) {
      filteredData = filteredData.filter(
        (activity) => activity.status === filters.status,
      );
    }
    if (filters.owner) {
      filteredData = filteredData.filter(
        (activity) => activity.owner === filters.owner,
      );
    }
    if (filters.dueDate) {
      filteredData = filteredData.filter(
        (activity) => activity.dueDate === filters.dueDate,
      );
    }
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
    };
  }
  async getActivityById(id: string): Promise<Activity> {
    await delay(300);
    const activity = mockActivities.find((activity) => activity.id === id);
    if (!activity) {
      throw new Error("Activity not found");
    }
    return activity;
  }
  async createActivity(values: ActivityFormValues): Promise<Activity> {
    await delay(500);
    const activity: Activity = {
      id: `ACT-${String(mockActivities.length + 1).padStart(3, "0")}`,
      ...values,
      description: values.description ?? "",
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    mockActivities.unshift(activity);
    return activity;
  }
  async updateActivity(
    id: string,
    values: Partial<Activity>,
  ): Promise<Activity> {
    await delay(500);
    const index = mockActivities.findIndex((activity) => activity.id === id);
    if (index === -1) {
      throw new Error("Activity not found");
    }
    const updatedActivity = {
      ...mockActivities[index],
      ...values,
      updatedDate: new Date().toISOString(),
    };
    mockActivities[index] = updatedActivity;
    return updatedActivity;
  }
  async completeActivity(id: string): Promise<Activity> {
    return this.updateActivity(id, {
      status: "COMPLETED",
    });
  }
}
export const activityService = new ActivityService();

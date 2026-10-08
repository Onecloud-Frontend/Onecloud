import {
  customerActivities,
  customerNotifications,
  type CustomerActivity,
  type CustomerNotification,
} from '../types/data';

const ACTIVITY_KEY = 'onecloud_customer_portal_activities_v1';
const NOTIFICATION_KEY = 'onecloud_customer_portal_notifications_v1';

const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

const save = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getCustomerActivities = (): CustomerActivity[] => {
  const stored = readStored<CustomerActivity[] | null>(ACTIVITY_KEY, null);
  if (!stored || stored.length < customerActivities.length) {
    const seedIds = new Set(customerActivities.map(activity => activity.id));
    const customActivities = (stored ?? []).filter(activity => !seedIds.has(activity.id));
    const upgraded = [...customerActivities, ...customActivities];
    saveCustomerActivities(upgraded);
    return upgraded;
  }
  return stored;
};

export const saveCustomerActivities = (activities: CustomerActivity[]) =>
  save(ACTIVITY_KEY, activities);

export const addCustomerActivity = (
  input: Omit<CustomerActivity, 'id'>,
): CustomerActivity => {
  const activities = getCustomerActivities();
  const maxId = Math.max(
    2200,
    ...activities.map(activity => Number(activity.id.replace(/\D/g, ''))).filter(Number.isFinite),
  );
  const activity = { ...input, id: `ACT-${maxId + 1}` };
  saveCustomerActivities([activity, ...activities]);
  return activity;
};

export const updateCustomerActivity = (
  id: string,
  patch: Partial<CustomerActivity>,
) => {
  const updated = getCustomerActivities().map(activity =>
    activity.id === id ? { ...activity, ...patch } : activity,
  );
  saveCustomerActivities(updated);
  return updated.find(activity => activity.id === id);
};

export const getCustomerNotifications = (): CustomerNotification[] => {
  const stored = readStored<CustomerNotification[] | null>(NOTIFICATION_KEY, null);
  if (!stored || stored.length < customerNotifications.length) {
    const seedIds = new Set(customerNotifications.map(notification => notification.id));
    const customNotifications = (stored ?? []).filter(notification => !seedIds.has(notification.id));
    const upgraded = [...customerNotifications, ...customNotifications];
    saveCustomerNotifications(upgraded);
    return upgraded;
  }
  return stored;
};

export const saveCustomerNotifications = (notifications: CustomerNotification[]) =>
  save(NOTIFICATION_KEY, notifications);

export const markCustomerNotificationRead = (id: string) => {
  const updated = getCustomerNotifications().map(notification =>
    notification.id === id ? { ...notification, read: true } : notification,
  );
  saveCustomerNotifications(updated);
  return updated;
};

export const markAllCustomerNotificationsRead = () => {
  const updated = getCustomerNotifications().map(notification => ({
    ...notification,
    read: true,
  }));
  saveCustomerNotifications(updated);
  return updated;
};

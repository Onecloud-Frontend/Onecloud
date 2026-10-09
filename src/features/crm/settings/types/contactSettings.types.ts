export const contactStatuses = ['Active', 'Inactive'] as const;

export type ContactStatus = (typeof contactStatuses)[number];

export interface ContactTypeOption {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface ContactFieldOption {
  field: string;
  label: string;
  required: boolean;
}

export interface ContactDefaults {
  contactType: string;
  owner: string;
  status: ContactStatus;
}

export interface ContactSettings {
  contactTypes: ContactTypeOption[];
  requiredFields: ContactFieldOption[];
  defaults: ContactDefaults;
}

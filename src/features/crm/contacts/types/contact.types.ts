export interface ContactActivity {
  id: string;
  title: string;
  date: string;
}

export interface Communication {
  id: string;
  date: string;
  type: string;
  summary: string;
}

export interface Opportunity {
  id: string;
  name: string;
  value: number;
  stage: string;
  closeDate: string;
}

export interface Contact {
  contactId: string;
  firstName: string;
  lastName: string;
  customer: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  mobile: string;
  contactType: string;
  owner: string;
  status: string;
  dateOfBirth: string;
  lastContactedDate: string;
  createdDate: string;

  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  linkedIn: string;

  communicationHistory: Communication[];
  appointments: ContactActivity[];
  tasks: ContactActivity[];
  notes: string;
  relatedOpportunities: Opportunity[];

  updatedDate: string;
}

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  customer: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  mobile: string;
  contactType: string;
  owner: string;
  status: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  linkedIn: string;
  notes: string;
}

export type UpdateContactInput = Partial<CreateContactInput>;

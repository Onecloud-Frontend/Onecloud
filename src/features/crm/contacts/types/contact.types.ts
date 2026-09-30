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

  communicationHistory: unknown[];
  appointments: unknown[];
  tasks: unknown[];
  notes: string;
  relatedOpportunities: unknown[];

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

export interface UpdateContactInput {
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
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  linkedIn: string;
  notes: string;
}

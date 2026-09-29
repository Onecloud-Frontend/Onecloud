import type {
  Contact,
  CreateContactInput,
  UpdateContactInput,
} from '../types/contact.types';
import { contactMockData } from '../mocks/contactMockData';

class ContactService {
  async getContacts(): Promise<Contact[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(contactMockData);
      }, 600);
    });
  }

  async getContactById(contactId: string): Promise<Contact | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          contactMockData.find(
            (contact) => contact.contactId === contactId
          )
        );
      }, 600);
    });
  }

  async createContact(input: CreateContactInput): Promise<Contact> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date().toISOString().split('T')[0];

        const newContact: Contact = {
          contactId: `CON-${String(Math.max(0, ...contactMockData.map((contact) => Number(contact.contactId.replace('CON-', '')) || 0)) + 1).padStart(3, '0')}`,
          firstName: input.firstName,
          lastName: input.lastName,
          customer: input.customer,
          designation: input.designation,
          department: input.department,
          email: input.email,
          phone: input.phone,
          mobile: input.mobile,
          contactType: input.contactType,
          owner: input.owner,
          status: input.status,
          dateOfBirth: input.dateOfBirth,
          lastContactedDate: '',
          createdDate: now,

          address: input.address,
          city: input.city,
          state: input.state,
          country: input.country,
          postalCode: input.postalCode,
          linkedIn: input.linkedIn,

          communicationHistory: [],
          appointments: [],
          tasks: [],
          notes: input.notes,
          relatedOpportunities: [],

          updatedDate: now,
        };

        contactMockData.push(newContact);

        resolve(newContact);
      }, 600);
    });
  }

  async updateContact(
    contactId: string,
    input: UpdateContactInput
  ): Promise<Contact> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contact = contactMockData.find(
          (item) => item.contactId === contactId
        );

        if (!contact) {
          throw new Error('Contact not found');
        }

        Object.assign(contact, {
          firstName: input.firstName,
          lastName: input.lastName,
          customer: input.customer,
          designation: input.designation,
          department: input.department,
          email: input.email,
          phone: input.phone,
          mobile: input.mobile,
          contactType: input.contactType,
          owner: input.owner,
          status: input.status,
          address: input.address,
          city: input.city,
          state: input.state,
          country: input.country,
          postalCode: input.postalCode,
          linkedIn: input.linkedIn,
          notes: input.notes,
          updatedDate: new Date().toISOString().split('T')[0],
        });

        resolve(contact);
      }, 600);
    });
  }

    async addContactActivity(
    contactId: string,
    type: 'appointment' | 'task',
    title: string,
    date: string
  ): Promise<Contact> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const contact = contactMockData.find(
          (item) => item.contactId === contactId
        );

        if (!contact) {
          reject(new Error('Contact not found'));
          return;
        }

        const activity = {
          id: `ACT-${Date.now()}`,
          title,
          date,
        };

        if (type === 'appointment') {
          contact.appointments.push(activity);
        } else {
          contact.tasks.push(activity);
        }

        contact.updatedDate = new Date().toISOString().split('T')[0];

        resolve(contact);
      }, 600);
    });
  }

  async updateContactStatus(
    contactId: string,
    status: string
  ): Promise<Contact> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contact = contactMockData.find(
          (item) => item.contactId === contactId
        );

        if (!contact) {
          throw new Error('Contact not found');
        }

        contact.status = status;
        contact.updatedDate = new Date().toISOString().split('T')[0];

        resolve(contact);
      }, 600);
    });
  }
}

export const contactService = new ContactService();

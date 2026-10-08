import type { ContactSettings } from '../types/contactSettings.types';
import { contactSettingsMockData } from '../mocks/contactSettingsMockData';

let contactSettings: ContactSettings = structuredClone(contactSettingsMockData);

class ContactSettingsService {
  async getContactSettings(): Promise<ContactSettings> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(structuredClone(contactSettings));
      }, 500);
    });
  }

  async updateContactSettings(
    settings: ContactSettings
  ): Promise<ContactSettings> {
    return new Promise((resolve) => {
      setTimeout(() => {
        contactSettings = structuredClone(settings);
        resolve(structuredClone(contactSettings));
      }, 500);
    });
  }
}

export const contactSettingsService = new ContactSettingsService();
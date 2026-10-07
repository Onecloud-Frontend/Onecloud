import { z } from 'zod';
import { contactStatuses } from '../types/contactSettings.types';

export const contactTypeOptionSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, 'Contact type name is required'),
  description: z.string().trim(),
  isActive: z.boolean(),
});

export const contactFieldOptionSchema = z.object({
  field: z.string().min(1),
  label: z.string().min(1),
  required: z.boolean(),
});

export const contactDefaultsSchema = z.object({
  contactType: z.string().trim().min(1, 'Select a default contact type'),
  owner: z.string().trim(),
  status: z.enum(contactStatuses),
});

export const contactSettingsSchema = z
  .object({
    contactTypes: z
      .array(contactTypeOptionSchema)
      .min(1, 'Add at least one contact type'),
    requiredFields: z
      .array(contactFieldOptionSchema)
      .min(1, 'Configure at least one contact field'),
    defaults: contactDefaultsSchema,
  })
  .superRefine(({ contactTypes, defaults }, context) => {
    const normalizedNames = new Set<string>();

    contactTypes.forEach((contactType, index) => {
      const normalizedName = contactType.name.toLocaleLowerCase();

      if (normalizedNames.has(normalizedName)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['contactTypes', index, 'name'],
          message: 'Contact type names must be unique',
        });
      }

      normalizedNames.add(normalizedName);
    });

    const defaultContactType = contactTypes.find(
      (contactType) => contactType.name === defaults.contactType
    );

    if (!defaultContactType) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['defaults', 'contactType'],
        message: 'The default contact type must be in the contact type list',
      });
      return;
    }

    if (!defaultContactType.isActive) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['defaults', 'contactType'],
        message: 'The default contact type must be active',
      });
    }
  });

export type ContactSettingsFormValues = z.infer<typeof contactSettingsSchema>;

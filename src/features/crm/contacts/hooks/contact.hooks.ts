import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactService } from '../services/contact.service';
import type {
  CreateContactInput,
  UpdateContactInput,
} from '../types/contact.types';

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: () => contactService.getContacts(),
  });
};

export const useContact = (contactId: string) => {
  return useQuery({
    queryKey: ['contacts', contactId],
    queryFn: () => contactService.getContactById(contactId),
    enabled: Boolean(contactId),
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateContactInput) =>
      contactService.createContact(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      contactId,
      input,
    }: {
      contactId: string;
      input: UpdateContactInput;
    }) => contactService.updateContact(contactId, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['contacts', variables.contactId],
      });
    },
  });
};

export const useAddContactActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      contactId,
      type,
      title,
      date,
    }: {
      contactId: string;
      type: 'appointment' | 'task';
      title: string;
      date: string;
    }) =>
      contactService.addContactActivity(
        contactId,
        type,
        title,
        date
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['contacts', variables.contactId],
      });
    },
  });
};

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      contactId,
      status,
    }: {
      contactId: string;
      status: string;
    }) => contactService.updateContactStatus(contactId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['contacts', variables.contactId],
      });
    },
  });
};
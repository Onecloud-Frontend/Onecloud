import { supportTickets, type SupportTicket, type TicketStatus, type Priority } from '../types/data';

const STORAGE_KEY = 'onecloud_customer_portal_support_tickets_v1';

const timestamp = () =>
  new Date().toLocaleString('en-IN', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const getSupportTickets = (): SupportTicket[] => {
  const stored = readStored<SupportTicket[] | null>(STORAGE_KEY, null);
  if (!stored || stored.length < supportTickets.length) {
    // Upgrade older browser data so the newly seeded support tickets are visible.
    // Preserve any user-created tickets that are not part of the seed data.
    const seedIds = new Set(supportTickets.map(ticket => ticket.id));
    const customTickets = (stored ?? []).filter(ticket => !seedIds.has(ticket.id));
    const upgraded = [...supportTickets, ...customTickets];
    saveSupportTickets(upgraded);
    return upgraded;
  }
  return stored;
};

export const saveSupportTickets = (tickets: SupportTicket[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
};

export const addSupportTicket = (
  input: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdDate' | 'updatedDate' | 'conversation'>,
): SupportTicket => {
  const tickets = getSupportTickets();
  const numericIds = tickets
    .map(ticket => Number(ticket.id.replace(/\D/g, '')))
    .filter(Number.isFinite);
  const numericNumbers = tickets
    .map(ticket => Number(ticket.ticketNumber.replace(/\D/g, '')))
    .filter(Number.isFinite);

  const nextId = Math.max(1000, ...numericIds) + 1;
  const nextNumber = Math.max(124, ...numericNumbers) + 1;
  const now = timestamp();

  const ticket: SupportTicket = {
    ...input,
    id: `TCK-${nextId}`,
    ticketNumber: `SUP-2026-${String(nextNumber).padStart(5, '0')}`,
    createdDate: now,
    updatedDate: now,
    conversation: [],
  };

  saveSupportTickets([ticket, ...tickets]);
  return ticket;
};

export const updateSupportTicketStatus = (ids: string[], status: TicketStatus) => {
  const selected = new Set(ids);
  const now = timestamp();
  const updated = getSupportTickets().map(ticket =>
    selected.has(ticket.id) ? { ...ticket, status, updatedDate: now } : ticket,
  );
  saveSupportTickets(updated);
  return updated;
};

export const updateSupportTicketPriority = (ids: string[], priority: Priority) => {
  const selected = new Set(ids);
  const now = timestamp();
  const updated = getSupportTickets().map(ticket =>
    selected.has(ticket.id) ? { ...ticket, priority, updatedDate: now } : ticket,
  );
  saveSupportTickets(updated);
  return updated;
};

export const updateSupportTicket = (
  id: string,
  patch: Partial<Pick<SupportTicket, 'status' | 'priority' | 'assignedTo' | 'expectedResolutionDate' | 'resolutionNotes'>>,
) => {
  const now = timestamp();
  const updated = getSupportTickets().map(ticket =>
    ticket.id === id ? { ...ticket, ...patch, updatedDate: now } : ticket,
  );
  saveSupportTickets(updated);
  return updated.find(ticket => ticket.id === id);
};

export const addSupportConversation = (
  id: string,
  message: string,
  role: 'Customer' | 'Support' = 'Customer',
  author = role === 'Customer' ? 'Rohan Mehta' : 'Priya Nair',
) => {
  const now = timestamp();
  const updated = getSupportTickets().map(ticket =>
    ticket.id === id
      ? {
          ...ticket,
          updatedDate: now,
          conversation: [
            ...ticket.conversation,
            { id: `conversation-${Date.now()}`, author, role, message, date: now },
          ],
        }
      : ticket,
  );
  saveSupportTickets(updated);
  return updated.find(ticket => ticket.id === id);
};

export const addSupportAttachment = (
  id: string,
  attachment: { name: string; size: string; type: string },
) => {
  const now = timestamp();
  const updated = getSupportTickets().map(ticket =>
    ticket.id === id
      ? { ...ticket, updatedDate: now, attachments: [...ticket.attachments, attachment] }
      : ticket,
  );
  saveSupportTickets(updated);
  return updated.find(ticket => ticket.id === id);
};

export const resetSupportTickets = () => {
  localStorage.removeItem(STORAGE_KEY);
  return supportTickets;
};

import { supportTickets, type SupportTicket, type TicketStatus, type Priority } from '../types/data';

const STORAGE_KEY = 'onecloud_customer_portal_support_tickets_v1';

export const getSupportTickets = (): SupportTicket[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as SupportTicket[];
  } catch {
    // Fall back to bundled demo data when browser storage is unavailable/corrupt.
  }
  return supportTickets;
};

export const saveSupportTickets = (tickets: SupportTicket[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
};

export const addSupportTicket = (input: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdDate' | 'updatedDate' | 'conversation'>): SupportTicket => {
  const tickets = getSupportTickets();
  const now = new Date();
  const stamp = now.toLocaleString('en-IN', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const nextNumber = 125 + tickets.length;
  const ticket: SupportTicket = {
    ...input,
    id: `TCK-${1001 + tickets.length}`,
    ticketNumber: `SUP-2026-${String(nextNumber).padStart(5, '0')}`,
    createdDate: stamp,
    updatedDate: stamp,
    conversation: [],
  };
  saveSupportTickets([ticket, ...tickets]);
  return ticket;
};

export const updateSupportTicketStatus = (ids: string[], status: TicketStatus) => {
  const selected = new Set(ids);
  const now = new Date();
  const stamp = now.toLocaleString('en-IN', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const updated = getSupportTickets().map(ticket => selected.has(ticket.id) ? { ...ticket, status, updatedDate: stamp } : ticket);
  saveSupportTickets(updated);
  return updated;
};

export const updateSupportTicketPriority = (ids: string[], priority: Priority) => {
  const selected = new Set(ids);
  const now = new Date();
  const stamp = now.toLocaleString('en-IN', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const updated = getSupportTickets().map(ticket => selected.has(ticket.id) ? { ...ticket, priority, updatedDate: stamp } : ticket);
  saveSupportTickets(updated);
  return updated;
};

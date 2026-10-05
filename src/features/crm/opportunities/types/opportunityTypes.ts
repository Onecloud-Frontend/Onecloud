export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  contactId?: string;
  contactName?: string;
  leadId?: string;
  description?: string;
  stage: string;
  expectedRevenue: number;
  probability: number;
  expectedCloseDate: string;
  ownerId: string;
  ownerName: string;
  competitor?: string;
  source?: string;
  currency: string;
  status: "Open" | "Won" | "Lost";
  notes?: string;
  createdAt: string;
  updatedAt: string;
  lastActivityDate?: string;
}
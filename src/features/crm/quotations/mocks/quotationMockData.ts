import type {
  ApprovalHistoryItem,
  Quotation,
  QuotationLineItem,
} from "../types/quotation.types";

const createLineItem = (
  item: Omit<
    QuotationLineItem,
    | "discountAmount"
    | "taxAmount"
    | "subtotal"
    | "total"
  >,
): QuotationLineItem => {
  const subtotal = item.quantity * item.unitPrice;

  const discountAmount =
    subtotal * (item.discountPercent / 100);

  const taxableAmount = subtotal - discountAmount;

  const taxAmount =
    taxableAmount * (item.taxRate / 100);

  const total = taxableAmount + taxAmount;

  return {
    ...item,
    subtotal,
    discountAmount,
    taxAmount,
    total,
  };
};

const approvalHistory = (
  history: ApprovalHistoryItem[],
): ApprovalHistoryItem[] => history;

export const quotationMockData: Quotation[] = [
  {
    id: "QUO-1001",
    quoteNumber: "QT-2026-001",
    customerId: "CUS-1001",
    customerName: "Acme Technologies Pvt Ltd",
    customerAddress: "HITEC City, Hyderabad, Telangana",
    contactId: "CON-1001",
    contactName: "Priya Sharma",

    opportunityId: "OPP-2001",
    opportunityName: "Enterprise CRM Implementation",

    quoteDate: "2026-09-02",
    validUntil: "2026-09-30",

    salespersonId: "USR-101",
    salespersonName: "Arjun Mehta",

    currency: "INR",

    paymentTerms: "Net 30",
    deliveryTerms: "Delivery within 10 business days",

    lineItems: [
      createLineItem({
        id: "LI-1001",
        productId: "PRD-101",
        productName: "CRM Enterprise License",
        description: "Annual enterprise CRM subscription",
        quantity: 25,
        unitPrice: 48000,
        discountPercent: 5,
        taxRate: 18,
      }),
      createLineItem({
        id: "LI-1002",
        productId: "PRD-102",
        productName: "Implementation Services",
        description: "CRM implementation and configuration",
        quantity: 1,
        unitPrice: 350000,
        discountPercent: 0,
        taxRate: 18,
      }),
    ],

    subtotal: 1550000,
    discountAmount: 60000,
    taxAmount: 268200,
    grandTotal: 1758200,

    status: "sent",
    approvalStatus: "approved",

    approvalHistory: approvalHistory([
      {
        id: "APR-1001",
        status: "pending",
        actionBy: "Arjun Mehta",
        comment: "Quotation submitted for approval.",
        createdAt: "2026-09-03T10:30:00Z",
      },
      {
        id: "APR-1002",
        status: "approved",
        actionBy: "Meera Krishnan",
        comment: "Commercial terms approved.",
        createdAt: "2026-09-03T15:45:00Z",
      },
    ]),

    notes: "Enterprise implementation quotation.",
    createdAt: "2026-09-02T09:15:00Z",
    updatedAt: "2026-09-03T15:45:00Z",
  },

  {
    id: "QUO-1002",
    quoteNumber: "QT-2026-002",
    customerId: "CUS-1002",
    customerName: "GlobalTech Solutions",
    customerAddress: "Whitefield, Bengaluru, Karnataka",
    contactId: "CON-1004",
    contactName: "Rahul Verma",

    opportunityId: "OPP-2004",
    opportunityName: "Data Analytics Platform",

    quoteDate: "2026-09-05",
    validUntil: "2026-10-05",

    salespersonId: "USR-104",
    salespersonName: "Neha Kapoor",

    currency: "INR",

    paymentTerms: "50% advance, 50% on delivery",
    deliveryTerms: "Delivery within 15 business days",

    lineItems: [
      createLineItem({
        id: "LI-1003",
        productId: "PRD-201",
        productName: "Analytics Platform",
        description: "Business analytics platform subscription",
        quantity: 10,
        unitPrice: 75000,
        discountPercent: 8,
        taxRate: 18,
      }),
      createLineItem({
        id: "LI-1004",
        productId: "PRD-202",
        productName: "Data Integration Package",
        description: "Initial data integration services",
        quantity: 1,
        unitPrice: 225000,
        discountPercent: 5,
        taxRate: 18,
      }),
    ],

    subtotal: 975000,
    discountAmount: 71250,
    taxAmount: 162675,
    grandTotal: 1066425,

    status: "draft",
    approvalStatus: "not_submitted",

    notes: "Awaiting internal review before submission.",
    createdAt: "2026-09-05T11:20:00Z",
    updatedAt: "2026-09-05T14:10:00Z",
  },

  {
    id: "QUO-1003",
    quoteNumber: "QT-2026-003",
    customerId: "CUS-1003",
    customerName: "Nova Retail Group",
    customerAddress: "T. Nagar, Chennai, Tamil Nadu",
    contactId: "CON-1007",
    contactName: "Ananya Iyer",

    opportunityId: "OPP-2007",
    opportunityName: "Retail Operations Suite",

    quoteDate: "2026-08-18",
    validUntil: "2026-09-17",

    salespersonId: "USR-108",
    salespersonName: "Vikram Rao",

    currency: "INR",

    paymentTerms: "Net 45",
    deliveryTerms: "Phased delivery",

    lineItems: [
      createLineItem({
        id: "LI-1005",
        productId: "PRD-301",
        productName: "Retail Operations Suite",
        description: "Multi-location retail management platform",
        quantity: 5,
        unitPrice: 125000,
        discountPercent: 10,
        taxRate: 18,
      }),
      createLineItem({
        id: "LI-1006",
        productId: "PRD-302",
        productName: "Training Package",
        description: "On-site administrator training",
        quantity: 2,
        unitPrice: 40000,
        discountPercent: 0,
        taxRate: 18,
      }),
    ],

    subtotal: 705000,
    discountAmount: 62500,
    taxAmount: 115650,
    grandTotal: 758150,

    status: "accepted",
    approvalStatus: "approved",

    approvalHistory: approvalHistory([
      {
        id: "APR-1003",
        status: "pending",
        actionBy: "Vikram Rao",
        comment: "Submitted for commercial approval.",
        createdAt: "2026-08-19T09:30:00Z",
      },
      {
        id: "APR-1004",
        status: "approved",
        actionBy: "Meera Krishnan",
        comment: "Approved for customer submission.",
        createdAt: "2026-08-19T13:20:00Z",
      },
    ]),

    notes: "Customer accepted the commercial proposal.",
    createdAt: "2026-08-18T08:45:00Z",
    updatedAt: "2026-08-28T16:30:00Z",
  },

  {
    id: "QUO-1004",
    quoteNumber: "QT-2026-004",
    customerId: "CUS-1004",
    customerName: "Vertex Manufacturing Ltd",
    customerAddress: "Sriperumbudur, Tamil Nadu",
    contactId: "CON-1011",
    contactName: "Sanjay Menon",

    opportunityId: "OPP-2010",
    opportunityName: "Manufacturing ERP Integration",

    quoteDate: "2026-08-12",
    validUntil: "2026-09-11",

    salespersonId: "USR-112",
    salespersonName: "Rohan Desai",

    currency: "INR",

    paymentTerms: "Net 30",
    deliveryTerms: "Delivery within 20 business days",

    lineItems: [
      createLineItem({
        id: "LI-1007",
        productId: "PRD-401",
        productName: "ERP Integration Services",
        description: "ERP integration and workflow configuration",
        quantity: 1,
        unitPrice: 620000,
        discountPercent: 7,
        taxRate: 18,
      }),
      createLineItem({
        id: "LI-1008",
        productId: "PRD-402",
        productName: "Support Package",
        description: "One-year technical support",
        quantity: 1,
        unitPrice: 180000,
        discountPercent: 0,
        taxRate: 18,
      }),
    ],

    subtotal: 800000,
    discountAmount: 43400,
    taxAmount: 136188,
    grandTotal: 892788,

    status: "rejected",
    approvalStatus: "rejected",

    approvalHistory: approvalHistory([
      {
        id: "APR-1005",
        status: "pending",
        actionBy: "Rohan Desai",
        comment: "Submitted for approval.",
        createdAt: "2026-08-13T10:00:00Z",
      },
      {
        id: "APR-1006",
        status: "rejected",
        actionBy: "Meera Krishnan",
        comment: "Discount exceeds the approved commercial limit.",
        createdAt: "2026-08-13T14:25:00Z",
      },
    ]),

    notes: "Quotation requires commercial revision.",
    createdAt: "2026-08-12T10:10:00Z",
    updatedAt: "2026-08-13T14:25:00Z",
  },

  {
    id: "QUO-1005",
    quoteNumber: "QT-2026-005",
    customerId: "CUS-1005",
    customerName: "BrightWave Digital Services",
    customerAddress: "Gachibowli, Hyderabad, Telangana",
    contactId: "CON-1015",
    contactName: "Karthik Reddy",

    opportunityId: "OPP-2013",
    opportunityName: "Cloud Migration Services",

    quoteDate: "2026-07-01",
    validUntil: "2026-07-31",

    salespersonId: "USR-115",
    salespersonName: "Aisha Khan",

    currency: "INR",

    paymentTerms: "Net 30",
    deliveryTerms: "Project-based delivery",

    lineItems: [
      createLineItem({
        id: "LI-1009",
        productId: "PRD-501",
        productName: "Cloud Migration Assessment",
        description: "Infrastructure assessment and migration planning",
        quantity: 1,
        unitPrice: 95000,
        discountPercent: 0,
        taxRate: 18,
      }),
      createLineItem({
        id: "LI-1010",
        productId: "PRD-502",
        productName: "Cloud Migration Services",
        description: "Application and infrastructure migration",
        quantity: 1,
        unitPrice: 480000,
        discountPercent: 5,
        taxRate: 18,
      }),
    ],

    subtotal: 575000,
    discountAmount: 24000,
    taxAmount: 99180,
    grandTotal: 650180,

    status: "expired",
    approvalStatus: "approved",

    approvalHistory: approvalHistory([
      {
        id: "APR-1007",
        status: "approved",
        actionBy: "Meera Krishnan",
        comment: "Approved.",
        createdAt: "2026-07-02T12:15:00Z",
      },
    ]),

    notes: "Quote validity period has ended.",
    createdAt: "2026-07-01T09:00:00Z",
    updatedAt: "2026-07-31T23:59:00Z",
  },

  {
    id: "QUO-1006",
    quoteNumber: "QT-2026-006",
    customerId: "CUS-1006",
    customerName: "Apex Healthcare Systems",
    customerAddress: "Madhapur, Hyderabad, Telangana",
    contactId: "CON-1018",
    contactName: "Sneha Rao",

    opportunityId: "OPP-2017",
    opportunityName: "Healthcare Workflow Automation",

    quoteDate: "2026-09-10",
    validUntil: "2026-10-10",

    salespersonId: "USR-119",
    salespersonName: "Aditya Nair",

    currency: "INR",

    paymentTerms: "Net 30",
    deliveryTerms: "Delivery within 12 business days",

    lineItems: [
      createLineItem({
        id: "LI-1011",
        productId: "PRD-601",
        productName: "Workflow Automation Suite",
        description: "Healthcare workflow automation platform",
        quantity: 8,
        unitPrice: 68000,
        discountPercent: 3,
        taxRate: 18,
      }),
    ],

    subtotal: 544000,
    discountAmount: 16320,
    taxAmount: 94982.4,
    grandTotal: 622662.4,

    status: "sent",
    approvalStatus: "pending",

    approvalHistory: approvalHistory([
      {
        id: "APR-1008",
        status: "pending",
        actionBy: "Aditya Nair",
        comment: "Submitted for approval.",
        createdAt: "2026-09-10T11:30:00Z",
      },
    ]),

    notes: "Awaiting commercial approval.",
    createdAt: "2026-09-10T10:15:00Z",
    updatedAt: "2026-09-10T11:30:00Z",
  },
];

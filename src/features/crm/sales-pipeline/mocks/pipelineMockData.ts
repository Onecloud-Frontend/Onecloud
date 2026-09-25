import type {
  PipelineActivity,
  PipelineOpportunity,
  PipelineStageConfig,
} from "../types/pipeline.types";

/*
|--------------------------------------------------------------------------
| Pipeline Stages
|--------------------------------------------------------------------------
| These values exactly match Rajarajan's confirmed Opportunity stage values.
*/

export const pipelineStages: PipelineStageConfig[] = [
  {
    id: "Prospecting",
    label: "Prospecting",
    probability: 10,
  },
  {
    id: "Qualification",
    label: "Qualification",
    probability: 30,
  },
  {
    id: "Proposal",
    label: "Proposal",
    probability: 50,
  },
  {
    id: "Negotiation",
    label: "Negotiation",
    probability: 75,
  },
  {
    id: "Closed Won",
    label: "Closed Won",
    probability: 100,
  },
  {
    id: "Closed Lost",
    label: "Closed Lost",
    probability: 0,
  },
];

/*
|--------------------------------------------------------------------------
| Activities
|--------------------------------------------------------------------------
| Activity structure is aligned with the Activity module contract.
*/

export const pipelineMockActivities: PipelineActivity[] = [
  {
    id: "ACT-001",
    activityType: "CALL",
    subject: "Initial discovery call",
    description: "Initial discussion with the customer about CRM requirements.",
    relatedOpportunity: "OPP-1001",
    owner: "Rajarajan P",
    priority: "HIGH",
    status: "COMPLETED",
    startDate: "2026-09-10T10:00:00",
    endDate: "2026-09-10T10:30:00",
    dueDate: "2026-09-10",
    reminder: true,
    location: "Phone",
    notes: "Customer showed interest in CRM implementation.",
    createdDate: "2026-09-09",
  },

  {
    id: "ACT-002",
    activityType: "MEETING",
    subject: "Requirement gathering meeting",
    description:
      "Discuss customer requirements and existing business processes.",
    relatedOpportunity: "OPP-1002",
    owner: "Kakarla Pavan Kumar Reddy",
    priority: "HIGH",
    status: "COMPLETED",
    startDate: "2026-09-15T11:00:00",
    endDate: "2026-09-15T12:00:00",
    dueDate: "2026-09-15",
    reminder: true,
    location: "Online",
    notes: "Requirements collected successfully.",
    createdDate: "2026-09-14",
  },

  {
    id: "ACT-003",
    activityType: "EMAIL",
    subject: "Proposal shared with customer",
    description:
      "CRM proposal and pricing details were shared with the customer.",
    relatedOpportunity: "OPP-1003",
    owner: "Rajarajan P",
    priority: "MEDIUM",
    status: "COMPLETED",
    startDate: "2026-09-18T14:00:00",
    endDate: "2026-09-18T14:15:00",
    dueDate: "2026-09-18",
    reminder: false,
    location: "Email",
    notes: "Waiting for customer feedback.",
    createdDate: "2026-09-18",
  },

  {
    id: "ACT-004",
    activityType: "MEETING",
    subject: "Pricing negotiation meeting",
    description: "Discuss pricing, implementation timeline and contract terms.",
    relatedOpportunity: "OPP-1004",
    owner: "Kakarla Pavan Kumar Reddy",
    priority: "HIGH",
    status: "PENDING",
    startDate: "2026-09-25T15:00:00",
    endDate: "2026-09-25T16:00:00",
    dueDate: "2026-09-25",
    reminder: true,
    location: "Online",
    notes: "Customer requested pricing revision.",
    createdDate: "2026-09-24",
  },

  {
    id: "ACT-005",
    activityType: "CALL",
    subject: "Implementation confirmation call",
    description: "Final confirmation call before CRM implementation.",
    relatedOpportunity: "OPP-1005",
    owner: "Rajarajan P",
    priority: "HIGH",
    status: "COMPLETED",
    startDate: "2026-09-20T10:00:00",
    endDate: "2026-09-20T10:30:00",
    dueDate: "2026-09-20",
    reminder: true,
    location: "Phone",
    notes: "Customer confirmed implementation.",
    createdDate: "2026-09-20",
  },

  {
    id: "ACT-006",
    activityType: "EMAIL",
    subject: "Follow-up after lost opportunity",
    description: "Follow-up email sent to understand customer decision.",
    relatedOpportunity: "OPP-1006",
    owner: "Kakarla Pavan Kumar Reddy",
    priority: "LOW",
    status: "COMPLETED",
    startDate: "2026-09-19T16:00:00",
    endDate: "2026-09-19T16:15:00",
    dueDate: "2026-09-19",
    reminder: false,
    location: "Email",
    notes: "Customer selected another solution.",
    createdDate: "2026-09-19",
  },
];

/*
|--------------------------------------------------------------------------
| Pipeline Opportunities
|--------------------------------------------------------------------------
| One opportunity is provided for each pipeline stage.
*/

export const pipelineMockOpportunities: PipelineOpportunity[] = [
  /*
  |--------------------------------------------------------------------------
  | 1. Prospecting
  |--------------------------------------------------------------------------
  */

  {
    id: "OPP-1001",
    name: "Enterprise CRM Implementation",
    customer: "Acme Corporation",
    contact: "John Smith",
    owner: "Rajarajan P",

    stage: "Prospecting",
    status: "Open",

    expectedRevenue: 85000,
    probability: 10,
    expectedCloseDate: "2026-10-15",

    competitor: "Salesforce",
    source: "Website",
    currency: "USD",

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",

    lastActivityDate: "2026-09-10",
    nextActivityDate: "2026-09-28",

    daysInStage: 24,

    notes: "Initial enterprise CRM discussion with the customer.",

    activities: [pipelineMockActivities[0]],

    stageHistory: [
      {
        stage: "Prospecting",
        enteredAt: "2026-09-01",
        daysInStage: 24,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | 2. Qualification
  |--------------------------------------------------------------------------
  */

  {
    id: "OPP-1002",
    name: "Cloud Migration",
    customer: "TechNova Solutions",
    contact: "Priya Sharma",
    owner: "Kakarla Pavan Kumar Reddy",

    stage: "Qualification",
    status: "Open",

    expectedRevenue: 120000,
    probability: 30,
    expectedCloseDate: "2026-11-20",

    competitor: "AWS Partner",
    source: "Referral",
    currency: "USD",

    createdAt: "2026-08-28",
    updatedAt: "2026-09-15",

    lastActivityDate: "2026-09-15",
    nextActivityDate: "2026-09-30",

    daysInStage: 14,

    notes: "Customer is evaluating cloud migration requirements.",

    activities: [pipelineMockActivities[1]],

    stageHistory: [
      {
        stage: "Prospecting",
        enteredAt: "2026-08-28",
        exitedAt: "2026-09-11",
        daysInStage: 14,
      },
      {
        stage: "Qualification",
        enteredAt: "2026-09-11",
        daysInStage: 14,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | 3. Proposal
  |--------------------------------------------------------------------------
  */

  {
    id: "OPP-1003",
    name: "Customer Support Platform",
    customer: "Global Industries",
    contact: "Michael Brown",
    owner: "Rajarajan P",

    stage: "Proposal",
    status: "Open",

    expectedRevenue: 95000,
    probability: 50,
    expectedCloseDate: "2026-12-10",

    competitor: "Zendesk",
    source: "Referral",
    currency: "USD",

    createdAt: "2026-08-15",
    updatedAt: "2026-09-18",

    lastActivityDate: "2026-09-18",
    nextActivityDate: "2026-09-29",

    daysInStage: 19,

    notes:
      "Proposal has been shared with the customer and feedback is pending.",

    activities: [pipelineMockActivities[2]],

    stageHistory: [
      {
        stage: "Prospecting",
        enteredAt: "2026-08-15",
        exitedAt: "2026-08-23",
        daysInStage: 8,
      },
      {
        stage: "Qualification",
        enteredAt: "2026-08-23",
        exitedAt: "2026-09-01",
        daysInStage: 9,
      },
      {
        stage: "Proposal",
        enteredAt: "2026-09-01",
        daysInStage: 19,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | 4. Negotiation
  |--------------------------------------------------------------------------
  */

  {
    id: "OPP-1004",
    name: "Marketing Automation Platform",
    customer: "Bright Solutions",
    contact: "Sarah Wilson",
    owner: "Kakarla Pavan Kumar Reddy",

    stage: "Negotiation",
    status: "Open",

    expectedRevenue: 70000,
    probability: 75,
    expectedCloseDate: "2026-12-20",

    competitor: "HubSpot",
    source: "Website",
    currency: "USD",

    createdAt: "2026-08-10",
    updatedAt: "2026-09-20",

    lastActivityDate: "2026-09-24",
    nextActivityDate: "2026-09-25",

    daysInStage: 9,

    notes: "Customer is negotiating pricing and implementation terms.",

    activities: [pipelineMockActivities[3]],

    stageHistory: [
      {
        stage: "Prospecting",
        enteredAt: "2026-08-10",
        exitedAt: "2026-08-18",
        daysInStage: 8,
      },
      {
        stage: "Qualification",
        enteredAt: "2026-08-18",
        exitedAt: "2026-08-28",
        daysInStage: 10,
      },
      {
        stage: "Proposal",
        enteredAt: "2026-08-28",
        exitedAt: "2026-09-15",
        daysInStage: 18,
      },
      {
        stage: "Negotiation",
        enteredAt: "2026-09-15",
        daysInStage: 9,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | 5. Closed Won
  |--------------------------------------------------------------------------
  */

  {
    id: "OPP-1005",
    name: "CRM Analytics Solution",
    customer: "Vertex Technologies",
    contact: "David Miller",
    owner: "Rajarajan P",

    stage: "Closed Won",
    status: "Won",

    expectedRevenue: 95000,
    probability: 100,
    expectedCloseDate: "2026-09-20",

    competitor: "Microsoft Dynamics",
    source: "Referral",
    currency: "USD",

    createdAt: "2026-07-15",
    updatedAt: "2026-09-20",

    lastActivityDate: "2026-09-20",
    nextActivityDate: undefined,

    daysInStage: 0,

    notes:
      "Customer accepted the proposal and confirmed the CRM analytics implementation.",

    activities: [pipelineMockActivities[4]],

    stageHistory: [
      {
        stage: "Prospecting",
        enteredAt: "2026-07-15",
        exitedAt: "2026-07-25",
        daysInStage: 10,
      },
      {
        stage: "Qualification",
        enteredAt: "2026-07-25",
        exitedAt: "2026-08-05",
        daysInStage: 11,
      },
      {
        stage: "Proposal",
        enteredAt: "2026-08-05",
        exitedAt: "2026-08-25",
        daysInStage: 20,
      },
      {
        stage: "Negotiation",
        enteredAt: "2026-08-25",
        exitedAt: "2026-09-20",
        daysInStage: 26,
      },
      {
        stage: "Closed Won",
        enteredAt: "2026-09-20",
        daysInStage: 0,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | 6. Closed Lost
  |--------------------------------------------------------------------------
  */

  {
    id: "OPP-1006",
    name: "Customer Engagement Platform",
    customer: "Nova Retail",
    contact: "Robert Taylor",
    owner: "Kakarla Pavan Kumar Reddy",

    stage: "Closed Lost",
    status: "Lost",

    expectedRevenue: 70000,
    probability: 0,
    expectedCloseDate: "2026-09-19",

    competitor: "HubSpot",
    source: "Website",
    currency: "USD",

    createdAt: "2026-07-20",
    updatedAt: "2026-09-19",

    lastActivityDate: "2026-09-19",
    nextActivityDate: undefined,

    daysInStage: 0,

    lossReason: "Customer selected a competing solution.",

    notes: "Customer decided to proceed with another CRM platform.",

    activities: [pipelineMockActivities[5]],

    stageHistory: [
      {
        stage: "Prospecting",
        enteredAt: "2026-07-20",
        exitedAt: "2026-07-30",
        daysInStage: 10,
      },
      {
        stage: "Qualification",
        enteredAt: "2026-07-30",
        exitedAt: "2026-08-10",
        daysInStage: 11,
      },
      {
        stage: "Proposal",
        enteredAt: "2026-08-10",
        exitedAt: "2026-08-25",
        daysInStage: 15,
      },
      {
        stage: "Negotiation",
        enteredAt: "2026-08-25",
        exitedAt: "2026-09-19",
        daysInStage: 25,
      },
      {
        stage: "Closed Lost",
        enteredAt: "2026-09-19",
        daysInStage: 0,
      },
    ],
  },
];

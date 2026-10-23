/**
 * OneCloud Enterprise ERP — Suppliers & Vendors Mock Fixtures
 *
 * Owned by Developer 5 (Supplier and Vendor Management).
 */

import type { Supplier } from '../types/procurement.types';

export const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    supplierCode: 'VEND-ACRO-01',
    name: 'AcroTech Industrial Components',
    contactPerson: 'Marcus Vance',
    email: 'marcus.vance@acrotech-industrial.com',
    phone: '+1 (555) 234-8901',
    address: '4500 Industrial Parkway, Cleveland, OH 44135',
    taxId: 'US-EIN-45-8921043',
    paymentTerms: 'Net 30',
    rating: 4.8,
    status: 'Active',
    category: 'Mechanical & Automation Components',
    audit: {
      createdAt: '2026-01-15T09:00:00Z',
      createdBy: 'sys-admin',
      updatedAt: '2026-09-12T14:30:00Z',
      updatedBy: 'procurement-lead',
    },
  },
  {
    id: 'SUP-002',
    supplierCode: 'VEND-APEX-02',
    name: 'Apex Semiconductor Solutions',
    contactPerson: 'Dr. Helen Zhao',
    email: 'hzhao@apex-semiconductors.net',
    phone: '+1 (555) 876-4321',
    address: '120 Silicon Way, San Jose, CA 95134',
    taxId: 'US-EIN-94-3382910',
    paymentTerms: 'Net 45',
    rating: 4.9,
    status: 'Active',
    category: 'Microcontrollers & Integrated Circuits',
    audit: {
      createdAt: '2026-02-01T10:15:00Z',
      createdBy: 'sys-admin',
      updatedAt: '2026-10-05T11:20:00Z',
      updatedBy: 'procurement-lead',
    },
  },
  {
    id: 'SUP-003',
    supplierCode: 'VEND-PREC-03',
    name: 'Global Precision Tooling Ltd',
    contactPerson: 'Arthur Pendelton',
    email: 'pendelton@precisiontooling-global.co.uk',
    phone: '+44 20 7946 0912',
    address: '14 Foundry Square, Birmingham, UK B1 2HA',
    taxId: 'GB-VAT-982-1204-55',
    paymentTerms: 'Net 30',
    rating: 4.6,
    status: 'Active',
    category: 'Precision Tooling & MRO',
    audit: {
      createdAt: '2026-03-10T08:30:00Z',
      createdBy: 'sys-admin',
    },
  },
  {
    id: 'SUP-004',
    supplierCode: 'VEND-OMNI-04',
    name: 'OmniPackaging Dynamics',
    contactPerson: 'Clara Oswald',
    email: 'clara@omnipackaging-dyn.com',
    phone: '+1 (555) 432-9081',
    address: '880 Logistics Blvd, Louisville, KY 40223',
    taxId: 'US-EIN-61-7729103',
    paymentTerms: 'Net 15',
    rating: 4.3,
    status: 'Active',
    category: 'Packaging & Shipping Materials',
    audit: {
      createdAt: '2026-04-18T14:00:00Z',
      createdBy: 'procurement-buyer',
    },
  },
  {
    id: 'SUP-005',
    supplierCode: 'VEND-NEXU-05',
    name: 'Nexus Electronics Consortium',
    contactPerson: 'Klaus Reinhardt',
    email: 'klaus.reinhardt@nexus-consortium.de',
    phone: '+49 89 2080 3400',
    address: 'Industriestrasse 42, 80339 Munich, Germany',
    taxId: 'DE-VAT-129384729',
    paymentTerms: 'Net 60',
    rating: 3.9,
    status: 'Pending',
    category: 'Sensors & Wiring Harnesses',
    audit: {
      createdAt: '2026-10-01T16:20:00Z',
      createdBy: 'procurement-buyer',
    },
  },
];

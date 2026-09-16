import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /erp/inventory */
const InventoryPage: React.FC = () => (
  <PageShell domain="ERP" title="Inventory Management" description="Stock levels, SKUs, reorder points, batch tracking, and inventory valuation." />
);
export default InventoryPage;

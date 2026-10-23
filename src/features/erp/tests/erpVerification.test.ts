/**
 * OneCloud Enterprise ERP — Comprehensive Foundation Test & Verification Suite
 *
 * Validates cross-entity data integrity, mock services, mathematical reconciliation,
 * double-entry balance constraints, and simulated mutation reactivity.
 */

import { erpDashboardService } from '../services/erpDashboardService';
import { erpProcurementService } from '../services/erpProcurementService';
import { erpInventoryService } from '../services/erpInventoryService';
import { erpSalesService } from '../services/erpSalesService';
import { erpFinanceService } from '../services/erpFinanceService';

async function runErpVerification() {
  console.log('====================================================');
  console.log('   ONECLOUD ENTERPRISE ERP FOUNDATION TEST SUITE    ');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✓ [PASS] ${testName}`);
    } else {
      console.error(`  ✗ [FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
      throw new Error(`Assertion failed: ${testName}`);
    }
  }

  // ─── 1. PROCUREMENT WORKFLOW & SERVICES ────────────────────────────────────
  console.log('1. Auditing Procurement Contracts & Services...');
  const suppliers = await erpProcurementService.listSuppliers();
  assert(suppliers.length >= 5, 'Suppliers directory loaded with all records');

  const sup1 = await erpProcurementService.getSupplierById('SUP-001');
  assert(sup1.name === 'AcroTech Industrial Components', 'Supplier SUP-001 details verified');
  assert(sup1.paymentTerms === 'Net 30', 'Supplier SUP-001 payment terms match Net 30');

  const requisitions = await erpProcurementService.listRequisitions();
  assert(requisitions.length >= 3, 'Purchase requisitions list loaded');

  const poList = await erpProcurementService.listPurchaseOrders();
  assert(poList.length >= 3, 'Purchase orders list loaded');

  // Verify PO line math
  for (const po of poList) {
    const calculatedSubtotal = po.lines.reduce((sum, line) => sum + line.lineTotal, 0);
    assert(
      Math.abs(calculatedSubtotal - po.subtotal) < 0.01,
      `PO ${po.poNumber} line totals match subtotal ($${po.subtotal})`
    );
    assert(
      Math.abs(po.subtotal + po.taxAmount - po.totalAmount) < 0.01,
      `PO ${po.poNumber} subtotal + tax equals totalAmount ($${po.totalAmount})`
    );
  }

  const grnList = await erpProcurementService.listGoodsReceipts();
  assert(grnList.length >= 1, 'Goods Received Notes (GRN) loaded');
  const grn1 = grnList[0];
  assert(grn1.poNumber === 'PO-2026-0891', 'GRN-2026-0312 correctly references PO-2026-0891');

  // ─── 2. INVENTORY WORKFLOW & BALANCES ──────────────────────────────────────
  console.log('\n2. Auditing Inventory & Stock Balance Mathematics...');
  const products = await erpInventoryService.listProducts();
  assert(products.length >= 5, 'Product catalog loaded');

  const prod1 = await erpInventoryService.getProductById('PROD-001');
  assert(prod1.sku === 'SRV-48V-01', 'Product PROD-001 SKU verified');
  assert(prod1.unitPrice > prod1.unitCost, 'Product unit price exceeds unit cost');

  const warehouses = await erpInventoryService.listWarehouses();
  assert(warehouses.length >= 3, 'Warehouses list loaded');

  const stockBalances = await erpInventoryService.getStockBalances();
  assert(stockBalances.length >= 5, 'Stock balances loaded');

  // Verify stock balance arithmetic: available = onHand - reserved
  for (const sb of stockBalances) {
    assert(
      sb.quantityAvailable === sb.quantityOnHand - sb.quantityReserved,
      `Stock balance for ${sb.productSku} reconciles: Available (${sb.quantityAvailable}) = OnHand (${sb.quantityOnHand}) - Reserved (${sb.quantityReserved})`
    );
    const expectedLowStock = sb.quantityOnHand <= sb.reorderPoint;
    assert(
      sb.isLowStock === expectedLowStock,
      `Stock balance ${sb.productSku} isLowStock flag (${sb.isLowStock}) strictly matches reorder threshold check`
    );
  }

  const lowStockAlerts = await erpInventoryService.getLowStockAlerts();
  assert(lowStockAlerts.length === 3, 'Exactly 3 low stock alerts triggered');

  // ─── 3. SALES & INVOICES RECONCILIATION ────────────────────────────────────
  console.log('\n3. Auditing Sales Orders & Billing Reconciliation...');
  const salesOrders = await erpSalesService.listSalesOrders();
  assert(salesOrders.length >= 3, 'Sales orders loaded');

  for (const so of salesOrders) {
    const lineSubtotal = so.lines.reduce((sum, line) => sum + line.lineTotal, 0);
    assert(
      Math.abs(lineSubtotal - so.subtotal) < 0.01,
      `Sales order ${so.orderNumber} line totals match subtotal ($${so.subtotal})`
    );
    assert(
      Math.abs(so.subtotal + so.taxAmount - so.totalAmount) < 0.01,
      `Sales order ${so.orderNumber} subtotal + tax equals totalAmount ($${so.totalAmount})`
    );
  }

  const invoices = await erpSalesService.listInvoices();
  assert(invoices.length >= 3, 'Invoices loaded');

  for (const inv of invoices) {
    assert(
      Math.abs(inv.totalAmount - inv.amountPaid - inv.amountDue) < 0.01,
      `Invoice ${inv.invoiceNumber} amountDue ($${inv.amountDue}) = total ($${inv.totalAmount}) - paid ($${inv.amountPaid})`
    );
  }

  const payments = await erpSalesService.listPayments();
  assert(payments.length >= 1, 'Payments loaded');
  assert(payments[0].amount === 6000, 'Customer payment of $6,000 against INV-2026-1048 verified');

  // ─── 4. GENERAL LEDGER & DOUBLE-ENTRY EQUALITY ─────────────────────────────
  console.log('\n4. Auditing General Ledger & Double-Entry Balance Constraints...');
  const accounts = await erpFinanceService.listAccounts();
  assert(accounts.length >= 9, 'Chart of Accounts loaded with 9 standard accounts');

  const journals = await erpFinanceService.listJournalEntries();
  assert(journals.length >= 2, 'Journal entries loaded');

  for (const je of journals) {
    assert(
      Math.abs(je.totalDebit - je.totalCredit) < 0.001,
      `Journal Entry ${je.entryNumber} is strictly balanced: Total Debit ($${je.totalDebit}) === Total Credit ($${je.totalCredit})`
    );
  }

  // Test unbalanced entry rejection
  let caughtUnbalancedError = false;
  try {
    await erpFinanceService.createJournalEntry({
      entryNumber: 'JE-TEST-FAIL',
      date: '2026-10-23',
      reference: 'TEST',
      narration: 'Intentionally unbalanced entry test',
      status: 'Draft',
      lines: [
        { id: '1', accountId: 'ACC-1010', accountCode: '1010', accountName: 'Cash', type: 'Debit', amount: 100 },
        { id: '2', accountId: 'ACC-4010', accountCode: '4010', accountName: 'Revenue', type: 'Credit', amount: 90 },
      ],
      totalDebit: 100,
      totalCredit: 90,
      periodId: '2026-Q4',
    });
  } catch (err: any) {
    caughtUnbalancedError = true;
    assert(
      err.message.includes('out of balance'),
      'erpFinanceService correctly threw validation error for unbalanced journal entry'
    );
  }
  assert(caughtUnbalancedError, 'Unbalanced journal entry was properly blocked by service');

  // ─── 5. DYNAMIC DASHBOARD AGGREGATION ──────────────────────────────────────
  console.log('\n5. Auditing Dynamic Dashboard KPI Aggregation...');
  const dashboardData = await erpDashboardService.getDashboardData();
  assert(dashboardData.kpis.length === 6, 'Dashboard aggregates all 6 enterprise KPI cards');
  assert(dashboardData.alerts.length === 4, 'Dashboard aggregates all 4 operational alerts');
  assert(dashboardData.recentTransactions.length === 5, 'Dashboard aggregates 5 recent transactions');

  // Verify derived metrics match calculations
  assert(
    dashboardData.metrics.lowStockItemsCount === 3,
    'Dashboard metric lowStockItemsCount (3) matches low stock alerts count'
  );
  assert(
    dashboardData.metrics.accountsReceivableTotal === 20611,
    'Dashboard metric accountsReceivableTotal ($20,611) matches outstanding customer invoices'
  );
  assert(
    dashboardData.metrics.accountsPayableTotal === 51561,
    'Dashboard metric accountsPayableTotal ($51,561) matches AP account + vendor bills'
  );
  assert(
    dashboardData.metrics.budgetUtilizationRate === 77.1,
    'Dashboard metric budgetUtilizationRate (77.1%) matches departmental budget pools'
  );

  console.log('\n====================================================');
  console.log(`   ALL ${totalTests} ERP FOUNDATION TESTS PASSED SUCCESSFULLY!  `);
  console.log('====================================================\n');
}

runErpVerification().catch((err) => {
  console.error('\nVerification failed:', err);
  process.exit(1);
});

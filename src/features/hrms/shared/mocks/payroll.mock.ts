import type { Payslip } from '../types';

export const mockPayslips: Payslip[] = [
    {
        id: 'pay-1', employeeId: 'emp-5',
        month: 5, year: 2024,
        grossPay: 90000, netPay: 74200, currency: 'INR',
        status: 'PAID',
        generatedAt: '2024-06-01T00:00:00.000Z',
        paidAt: '2024-06-02T00:00:00.000Z',
        lines: [
            { label: 'Basic', amount: 60000, type: 'EARNING' },
            { label: 'HRA', amount: 24000, type: 'EARNING' },
            { label: 'Special', amount: 6000, type: 'EARNING' },
            { label: 'PF', amount: 7200, type: 'DEDUCTION' },
            { label: 'Tax', amount: 8600, type: 'DEDUCTION' },
        ],
    },
    {
        id: 'pay-2', employeeId: 'emp-4',
        month: 5, year: 2024,
        grossPay: 120000, netPay: 98000, currency: 'INR',
        status: 'GENERATED',
        generatedAt: '2024-06-01T00:00:00.000Z',
        paidAt: null,
        lines: [
            { label: 'Basic', amount: 80000, type: 'EARNING' },
            { label: 'HRA', amount: 32000, type: 'EARNING' },
            { label: 'Special', amount: 8000, type: 'EARNING' },
            { label: 'PF', amount: 9600, type: 'DEDUCTION' },
            { label: 'Tax', amount: 12400, type: 'DEDUCTION' },
        ],
    },
];
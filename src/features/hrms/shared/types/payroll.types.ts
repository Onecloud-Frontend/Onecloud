export type PayslipStatus = 'DRAFT' | 'GENERATED' | 'PAID';

export interface PayslipLine {
    label: string;
    amount: number;
    type: 'EARNING' | 'DEDUCTION';
}

export interface Payslip {
    id: string;
    employeeId: string;
    month: number;   // 1–12
    year: number;
    grossPay: number;
    netPay: number;
    currency: string;
    status: PayslipStatus;
    lines: PayslipLine[];
    generatedAt: string;
    paidAt: string | null;
}
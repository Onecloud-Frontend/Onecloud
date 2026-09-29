import type { Employee } from '../types';

export function formatFullName(e: Pick<Employee, 'firstName' | 'lastName'>): string {
    return `${e.firstName} ${e.lastName}`.trim();
}

export function formatDate(iso?: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatCurrency(amount: number, currency = 'INR'): string {
    try {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
    } catch {
        return `${currency} ${amount}`;
    }
}

export function humanizeEnum(value: string): string {
    return value
        .toLowerCase()
        .split('_')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
}
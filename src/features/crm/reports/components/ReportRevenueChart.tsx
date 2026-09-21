import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { MonthlyRevenuePoint } from '../types/reports.types';
import { formatCompactCurrency, formatCurrency } from './reportFormatters';

interface ReportRevenueChartProps {
  data: MonthlyRevenuePoint[];
}

/** Monthly won-revenue bar chart. Sized by the fixed-height container it is placed in. */
export const ReportRevenueChart: React.FC<ReportRevenueChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
      <YAxis
        tickLine={false}
        axisLine={false}
        tick={{ fontSize: 12, fill: '#64748b' }}
        tickFormatter={(value: number) => formatCompactCurrency(value)}
      />
      <Tooltip formatter={(value) => formatCurrency(Number(value))} cursor={{ fill: '#f1f5f9' }} />
      <Bar dataKey="revenue" name="Revenue" fill="#2f6bff" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

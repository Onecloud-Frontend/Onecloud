import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { StageDistributionRow } from '../types/reports.types';
import { formatCompactCurrency, formatCurrency } from './reportFormatters';

interface ReportStageChartProps {
  data: StageDistributionRow[];
}

/** Pipeline value by stage, used by the Opportunity Report. */
export const ReportStageChart: React.FC<ReportStageChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
      <XAxis dataKey="stage" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-20} textAnchor="end" height={50} />
      <YAxis
        tickLine={false}
        axisLine={false}
        tick={{ fontSize: 12, fill: '#64748b' }}
        tickFormatter={(value: number) => formatCompactCurrency(value)}
      />
      <Tooltip formatter={(value) => formatCurrency(Number(value))} cursor={{ fill: '#f1f5f9' }} />
      <Bar dataKey="value" name="Pipeline value" fill="#2f6bff" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

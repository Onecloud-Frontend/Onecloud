import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { MonthlyRatePoint } from '../types/reports.types';
import { formatPercent } from './reportFormatters';

interface ReportConversionChartProps {
  data: MonthlyRatePoint[];
}

/** Monthly lead-conversion-rate line chart. Sized by the fixed-height container it is placed in. */
export const ReportConversionChart: React.FC<ReportConversionChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
      <YAxis
        tickLine={false}
        axisLine={false}
        tick={{ fontSize: 12, fill: '#64748b' }}
        tickFormatter={(value: number) => formatPercent(value)}
      />
      <Tooltip formatter={(value) => formatPercent(Number(value))} />
      <Line
        type="monotone"
        dataKey="rate"
        name="Conversion rate"
        stroke="#2f6bff"
        strokeWidth={2}
        dot={{ r: 3 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

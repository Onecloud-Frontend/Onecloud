import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { SalespersonPerformance } from '../types/reports.types';
import { formatPercent } from './reportFormatters';

interface ReportAchievementChartProps {
  data: SalespersonPerformance[];
}

const BAR_COLOR_MET = '#16a34a';
const BAR_COLOR_BELOW = '#2f6bff';

/** Target-achievement percentage by salesperson. Bars at or above 100% are highlighted green. */
export const ReportAchievementChart: React.FC<ReportAchievementChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
      <XAxis dataKey="salesperson" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
      <YAxis
        tickLine={false}
        axisLine={false}
        tick={{ fontSize: 12, fill: '#64748b' }}
        tickFormatter={(value: number) => formatPercent(value)}
      />
      <Tooltip formatter={(value) => formatPercent(Number(value))} cursor={{ fill: '#f1f5f9' }} />
      <Bar dataKey="achievement" name="Achievement" radius={[4, 4, 0, 0]}>
        {data.map((row) => (
          <Cell key={row.salesperson} fill={row.achievement >= 100 ? BAR_COLOR_MET : BAR_COLOR_BELOW} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

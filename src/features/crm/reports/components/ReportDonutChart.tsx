import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { QuoteBreakdownRow } from '../types/reports.types';
import { formatCurrency, formatNumber } from './reportFormatters';

interface ReportDonutChartProps {
  data: QuoteBreakdownRow[];
}

const SLICE_COLORS = ['#2f6bff', '#16a34a', '#f59e0b', '#ef4444', '#8b5cf6', '#0b1f4d'];

/** Donut chart of quote count share by status or approval state. */
export const ReportDonutChart: React.FC<ReportDonutChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie data={data} dataKey="count" nameKey="label" innerRadius={55} outerRadius={85} paddingAngle={2}>
        {data.map((row, index) => (
          <Cell key={row.label} fill={SLICE_COLORS[index % SLICE_COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value, _name, item) => [`${formatNumber(Number(value))} (${formatCurrency(item.payload.value)})`, item.payload.label]} />
      <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
    </PieChart>
  </ResponsiveContainer>
);

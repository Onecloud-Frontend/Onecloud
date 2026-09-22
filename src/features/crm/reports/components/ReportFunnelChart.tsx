import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { FunnelStep } from '../types/reports.types';
import { formatNumber } from './reportFormatters';

interface ReportFunnelChartProps {
  data: FunnelStep[];
}

const FUNNEL_COLORS = ['#2f6bff', '#5b8bff', '#8caeff', '#0b1f4d'];

/** Horizontal-style funnel showing how many leads reached each stage. */
export const ReportFunnelChart: React.FC<ReportFunnelChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
      <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
      <YAxis
        type="category"
        dataKey="stage"
        tickLine={false}
        axisLine={false}
        width={90}
        tick={{ fontSize: 12, fill: '#64748b' }}
      />
      <Tooltip formatter={(value) => formatNumber(Number(value))} cursor={{ fill: '#f1f5f9' }} />
      <Bar dataKey="count" name="Leads" radius={[0, 4, 4, 0]}>
        {data.map((step, index) => (
          <Cell key={step.stage} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

import React from 'react';
import { RevenueTrend } from '../types/dashboard.types';

interface RevenueTrendChartProps {
  data: RevenueTrend[];
}

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data }) => {
  // This is a placeholder component for the chart.
  // In a real application, this would be replaced with a charting library like Recharts or Chart.js.

  const maxRevenue = Math.max(...data.map(d => Math.max(d.revenue, d.target)));

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-[#0b1f4d]">Revenue Trend</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Actual vs Target (Last 6 Months)</p>
        </div>
      </div>
      
      <div className="flex-1 flex items-end gap-2 mt-4 min-h-[200px] relative">
        {/* Placeholder Y-axis markings */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 border-t border-b border-slate-900 border-dashed">
            <div className="border-t border-slate-900 border-dashed h-px w-full mt-auto mb-[50%]"></div>
        </div>

        {data.map((item, index) => {
          const revenueHeight = `${(item.revenue / maxRevenue) * 100}%`;
          const targetHeight = `${(item.target / maxRevenue) * 100}%`;
          
          return (
            <div key={index} className="flex-1 flex flex-col justify-end items-center group relative h-full z-10">
              <div className="w-full max-w-[40px] flex items-end gap-1 h-full">
                {/* Target Bar */}
                <div 
                  className="w-1/2 bg-slate-200 rounded-t-sm transition-all duration-300 group-hover:bg-slate-300" 
                  style={{ height: targetHeight }}
                  title={`Target: ₹${item.target.toLocaleString('en-IN')}`}
                />
                {/* Actual Bar */}
                <div 
                  className="w-1/2 bg-blue-500 rounded-t-sm transition-all duration-300 group-hover:bg-blue-600" 
                  style={{ height: revenueHeight }}
                  title={`Actual: ₹${item.revenue.toLocaleString('en-IN')}`}
                />
              </div>
              <div className="mt-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {item.month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

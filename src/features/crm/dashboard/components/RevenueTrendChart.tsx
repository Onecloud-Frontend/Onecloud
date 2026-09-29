import React from 'react';
import { RevenueTrend } from '../types/dashboard.types';

interface RevenueTrendChartProps {
  data: RevenueTrend[];
}

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({
  data,
}) => {
  const maxRevenue =
    data.length > 0
      ? Math.max(...data.map((item) => Math.max(item.revenue, item.target)))
      : 0;

  const chartMax = Math.ceil(maxRevenue / 100000) * 100000 || 100000;

  const getBarHeight = (value: number) => {
    if (chartMax === 0) {
      return '0%';
    }

    return `${(value / chartMax) * 100}%`;
  };

  const yAxisValues = [
    chartMax,
    chartMax * 0.75,
    chartMax * 0.5,
    chartMax * 0.25,
    0,
  ];

  const formatAxisValue = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(0)}L`;
    }

    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-base font-bold text-[#0b1f4d]">
            Revenue Trend
          </h2>

          <p className="text-xs text-slate-500 font-medium mt-1">
            Actual vs Target revenue performance
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
            <span>Actual</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" />
            <span>Target</span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="flex flex-1 min-h-[280px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <span className="text-lg text-slate-400">—</span>
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-700">
              No revenue data available
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Revenue trends will appear here when data is available.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 min-h-[280px]">
          {/* Y Axis */}
          <div className="w-12 shrink-0 pb-8">
            <div className="h-full flex flex-col justify-between text-[10px] font-medium text-slate-400">
              {yAxisValues.map((value, index) => (
                <span key={index} className="leading-none">
                  {formatAxisValue(value)}
                </span>
              ))}
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative flex-1 min-w-0">
            {/* Grid Lines */}
            <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
              {yAxisValues.map((_, index) => (
                <div
                  key={index}
                  className={
                    index === yAxisValues.length - 1
                      ? 'border-t border-slate-200'
                      : 'border-t border-dashed border-slate-200'
                  }
                />
              ))}
            </div>

            {/* Bars */}
            <div className="relative h-full flex items-end gap-2 sm:gap-3 pb-8">
              {data.map((item, index) => {
                const revenueHeight = getBarHeight(item.revenue);
                const targetHeight = getBarHeight(item.target);

                return (
                  <div
                    key={`${item.month}-${index}`}
                    className="relative flex-1 h-full min-w-0"
                  >
                    {/* Bar Group */}
                    <div className="absolute inset-x-0 top-0 bottom-8 flex items-end justify-center">
                      <div className="flex items-end justify-center gap-1 h-full w-full max-w-[64px]">
                        {/* Target */}
                        <div
                          className="w-[42%] min-h-[2px] rounded-t-md bg-slate-200 transition-all duration-300 hover:bg-slate-300"
                          style={{ height: targetHeight }}
                          title={`${item.month} Target: ₹${item.target.toLocaleString(
                            'en-IN'
                          )}`}
                        />

                        {/* Actual */}
                        <div
                          className="w-[42%] min-h-[2px] rounded-t-md bg-blue-500 transition-all duration-300 hover:bg-blue-600"
                          style={{ height: revenueHeight }}
                          title={`${item.month} Actual: ₹${item.revenue.toLocaleString(
                            'en-IN'
                          )}`}
                        />
                      </div>
                    </div>

                    {/* Month Label */}
                    <div className="absolute bottom-0 left-0 right-0 text-center">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                        {item.month}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { PipelineStage } from '../types/dashboard.types';

interface PipelineFunnelProps {
  data: PipelineStage[];
}

export const PipelineFunnel: React.FC<PipelineFunnelProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col h-full">
      <div className="mb-5">
        <h2 className="text-base font-bold text-[#0b1f4d]">
          Sales Pipeline
        </h2>

        <p className="text-xs text-slate-500 font-medium mt-1">
          Current opportunities by stage
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-1 min-h-[260px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <span className="text-lg text-slate-400">—</span>
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-700">
              No pipeline data available
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Pipeline stages will appear here when data is available.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center gap-3">
          {data.map((stage, index) => {
            const widthPercentage = Math.max(20, 100 - index * 15);

            return (
              <div
                key={stage.id}
                className="relative w-full flex justify-center"
              >
                <div
                  className={`relative flex items-center justify-between px-4 py-2.5 rounded-lg ${stage.color} bg-opacity-40 transition-transform hover:scale-[1.01] cursor-default group`}
                  style={{ width: `${widthPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white opacity-40 mix-blend-overlay rounded-lg pointer-events-none" />

                  <span className="relative text-[13px] font-bold text-slate-700 z-10">
                    {stage.name}
                  </span>

                  <div className="relative flex items-center gap-3 z-10">
                    <span className="text-xs font-semibold text-slate-600 bg-white/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {stage.count}
                    </span>

                    <span className="text-[13px] font-bold text-slate-700 hidden sm:inline-block">
                      ₹{(stage.value / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
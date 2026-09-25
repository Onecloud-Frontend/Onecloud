export interface PipelineTimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  type?: string;
}

interface PipelineOpportunityTimelineProps {
  items: PipelineTimelineItem[];
}

export default function PipelineOpportunityTimeline({
  items,
}: PipelineOpportunityTimelineProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Activity Timeline</h2>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          No timeline activity available.
        </p>
      ) : (
        <div className="mt-6">
          {items.map((item, index) => (
            <div key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
              {index !== items.length - 1 && (
                <div className="absolute left-[7px] top-3 h-full w-px bg-gray-200" />
              )}

              <div className="relative z-10 mt-1 h-4 w-4 rounded-full border-2 border-gray-400 bg-white" />

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>

                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>

                {item.type && (
                  <p className="mt-1 text-xs font-medium text-gray-500">
                    {item.type}
                  </p>
                )}

                {item.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

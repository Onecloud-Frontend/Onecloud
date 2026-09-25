import type { PipelineOpportunity } from "../types/pipeline.types";

interface PipelineSummaryProps {
  opportunities: PipelineOpportunity[];
}

export default function PipelineSummary({
  opportunities,
}: PipelineSummaryProps) {
  const totalOpportunities = opportunities.length;

  // Only active/open pipeline opportunities
  const activeOpportunities = opportunities.filter(
    (item) => item.stage !== "Closed Won" && item.stage !== "Closed Lost",
  );

  const pipelineValue = activeOpportunities.reduce(
    (sum, item) => sum + item.expectedRevenue,
    0,
  );

  // Won opportunities
  const wonOpportunities = opportunities.filter(
    (item) => item.stage === "Closed Won" || item.status === "Won",
  );

  // Lost opportunities
  const lostOpportunities = opportunities.filter(
    (item) => item.stage === "Closed Lost" || item.status === "Lost",
  );

  const wonValue = wonOpportunities.reduce(
    (sum, item) => sum + item.expectedRevenue,
    0,
  );

  const lostValue = lostOpportunities.reduce(
    (sum, item) => sum + item.expectedRevenue,
    0,
  );

  const closedCount = wonOpportunities.length + lostOpportunities.length;

  const winRate =
    closedCount === 0 ? 0 : (wonOpportunities.length / closedCount) * 100;

  const cards = [
    {
      label: "Total Opportunities",
      value: totalOpportunities.toLocaleString(),
    },
    {
      label: "Pipeline Value",
      value: `$${pipelineValue.toLocaleString()}`,
    },
    {
      label: "Won Value",
      value: `$${wonValue.toLocaleString()}`,
    },
    {
      label: "Lost Value",
      value: `$${lostValue.toLocaleString()}`,
    },
    {
      label: "Win Rate",
      value: `${winRate.toFixed(1)}%`,
    },
    {
      label: "Won Opportunities",
      value: wonOpportunities.length.toLocaleString(),
    },
    {
      label: "Lost Opportunities",
      value: lostOpportunities.length.toLocaleString(),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border bg-white p-4 shadow-sm"
        >
          <p className="text-sm text-gray-500">{card.label}</p>

          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

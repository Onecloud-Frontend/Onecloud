import type { PipelineOpportunity } from "../types/pipeline.types";

interface PipelineSummaryProps {
  opportunities: PipelineOpportunity[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PipelineSummary({
  opportunities,
}: PipelineSummaryProps) {
  const totalOpportunities = opportunities.length;

  const activeOpportunities = opportunities.filter(
    (item) => item.stage !== "CLOSED_WON" && item.stage !== "CLOSED_LOST",
  );

  const pipelineValue = activeOpportunities.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const weightedValue = activeOpportunities.reduce(
    (sum, item) => sum + item.expectedRevenue,
    0,
  );

  const wonOpportunities = opportunities.filter(
    (item) => item.stage === "CLOSED_WON",
  );

  const lostOpportunities = opportunities.filter(
    (item) => item.stage === "CLOSED_LOST",
  );

  const wonValue = wonOpportunities.reduce((sum, item) => sum + item.amount, 0);

  const lostValue = lostOpportunities.reduce(
    (sum, item) => sum + item.amount,
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
      value: formatCurrency(pipelineValue),
    },
    {
      label: "Weighted Value",
      value: formatCurrency(weightedValue),
    },
    {
      label: "Won Value",
      value: formatCurrency(wonValue),
    },
    {
      label: "Lost Value",
      value: formatCurrency(lostValue),
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

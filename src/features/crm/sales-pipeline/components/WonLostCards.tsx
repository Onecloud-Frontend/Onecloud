export interface WonLostSummary {
  totalOpportunities: number;
  wonOpportunities: number;
  lostOpportunities: number;
  wonValue: number;
  lostValue: number;
  winRate: number;
  lossRate: number;
  averageDealValue: number;
  averageSalesCycle: number;
}

interface WonLostCardsProps {
  summary: WonLostSummary;
}

export default function WonLostCards({ summary }: WonLostCardsProps) {
  const cards = [
    {
      label: "Total Opportunities",
      value: summary.totalOpportunities.toLocaleString(),
    },
    {
      label: "Won Opportunities",
      value: summary.wonOpportunities.toLocaleString(),
    },
    {
      label: "Lost Opportunities",
      value: summary.lostOpportunities.toLocaleString(),
    },
    {
      label: "Won Value",
      value: `$${summary.wonValue.toLocaleString()}`,
    },
    {
      label: "Lost Value",
      value: `$${summary.lostValue.toLocaleString()}`,
    },
    {
      label: "Win Rate",
      value: `${summary.winRate.toFixed(1)}%`,
    },
    {
      label: "Loss Rate",
      value: `${summary.lossRate.toFixed(1)}%`,
    },
    {
      label: "Average Deal Value",
      value: `$${summary.averageDealValue.toLocaleString()}`,
    },
    {
      label: "Average Sales Cycle",
      value: `${summary.averageSalesCycle.toFixed(1)} days`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

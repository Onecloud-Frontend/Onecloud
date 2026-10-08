interface OpportunityStatusBadgeProps {
  status: "Open" | "Won" | "Lost";
}

export function OpportunityStatusBadge({
  status,
}: OpportunityStatusBadgeProps) {
  const statusStyles = {
    Open: "bg-blue-100 text-blue-700 border-blue-200",
    Won: "bg-green-100 text-green-700 border-green-200",
    Lost: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      <span className="mr-2 h-2 w-2 rounded-full bg-current" />
      {status}
    </span>
  );
}
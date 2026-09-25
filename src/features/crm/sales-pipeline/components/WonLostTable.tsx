import type { PipelineOpportunity } from "../types/pipeline.types";

interface WonLostTableProps {
  opportunities: PipelineOpportunity[];
}

export default function WonLostTable({ opportunities }: WonLostTableProps) {
  const closedOpportunities = opportunities.filter(
    (item) =>
      item.stage === "Closed Won" ||
      item.stage === "Closed Lost" ||
      item.status === "Won" ||
      item.status === "Lost",
  );

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Won/Lost Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Closed opportunity details.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium">Opportunity</th>

              <th className="px-4 py-3 font-medium">Customer</th>

              <th className="px-4 py-3 font-medium">Owner</th>

              <th className="px-4 py-3 font-medium">Stage</th>

              <th className="px-4 py-3 font-medium">Revenue</th>

              <th className="px-4 py-3 font-medium">Close Date</th>

              <th className="px-4 py-3 font-medium">Loss Reason</th>
            </tr>
          </thead>

          <tbody>
            {closedOpportunities.map((opportunity) => {
              const isWon =
                opportunity.stage === "Closed Won" ||
                opportunity.status === "Won";

              return (
                <tr key={opportunity.id} className="border-b last:border-b-0">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">
                        {opportunity.name}
                      </p>

                      <p className="text-xs text-gray-500">{opportunity.id}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3">{opportunity.customer}</td>

                  <td className="px-4 py-3">{opportunity.owner}</td>

                  <td className="px-4 py-3">{isWon ? "Won" : "Lost"}</td>

                  <td className="px-4 py-3 font-medium">
                    {opportunity.currency}{" "}
                    {opportunity.expectedRevenue.toLocaleString()}
                  </td>

                  <td className="px-4 py-3">{opportunity.expectedCloseDate}</td>

                  <td className="px-4 py-3">{opportunity.lossReason || "—"}</td>
                </tr>
              );
            })}

            {closedOpportunities.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No won or lost opportunities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

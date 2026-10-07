import type { Designation } from "../types/organization.types";

import "./DesignationTable.css";

interface DesignationTableProps {
  designations: Designation[];
  loading?: boolean;
  error?: string | null;
}

export default function DesignationTable({
  designations,
  loading = false,
  error = null,
}: DesignationTableProps) {
  if (loading) {
    return (
      <div className="designation-table__state">
        Loading designations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="designation-table__state designation-table__state--error">
        {error}
      </div>
    );
  }

  if (designations.length === 0) {
    return (
      <div className="designation-table__state">
        No designations found.
      </div>
    );
  }

  return (
    <div className="designation-table-wrapper">
      <table className="designation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Designation</th>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {designations.map((designation) => (
            <tr key={designation.id}>
              <td>{designation.id}</td>

              <td className="designation-table__name">
                {designation.name}
              </td>

              <td>{designation.code || "-"}</td>

              <td>{designation.description || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
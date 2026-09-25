import type { Department } from "../types/organization.types";

import "./DepartmentTable.css";

interface DepartmentTableProps {
  departments: Department[];
  loading?: boolean;
  error?: string | null;
  onSelect?: (department: Department) => void;
}

export default function DepartmentTable({
  departments,
  loading = false,
  error = null,
  onSelect,
}: DepartmentTableProps) {
  if (loading) {
    return (
      <div className="department-table__state">
        Loading departments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="department-table__state department-table__state--error">
        {error}
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="department-table__state">
        No departments found.
      </div>
    );
  }

  return (
    <div className="department-table-wrapper">
      <table className="department-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr
              key={department.id}
              className={
                onSelect
                  ? "department-table__row--clickable"
                  : undefined
              }
              onClick={() => onSelect?.(department)}
            >
              <td>{department.id}</td>

              <td className="department-table__name">
                {department.name}
              </td>

              <td>
                {department.code || "-"}
              </td>

              <td>
                {department.description || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
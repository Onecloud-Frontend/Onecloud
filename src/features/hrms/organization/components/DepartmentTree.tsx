import type { DepartmentTreeNode } from "../types/organization.types";

import "./DepartmentTree.css";

interface DepartmentTreeProps {
  departments: DepartmentTreeNode[];
  selectedDepartmentId: number | null;
  onSelect: (department: DepartmentTreeNode) => void;
}

interface DepartmentNodeProps {
  department: DepartmentTreeNode;
  selectedDepartmentId: number | null;
  onSelect: (department: DepartmentTreeNode) => void;
}

function DepartmentNode({
  department,
  selectedDepartmentId,
  onSelect,
}: DepartmentNodeProps) {
  const hasChildren = department.children.length > 0;

  return (
    <li className="department-tree__item">
      <button
        type="button"
        className={`department-tree__node ${
          selectedDepartmentId === department.id
            ? "department-tree__node--selected"
            : ""
        }`}
        onClick={() => onSelect(department)}
      >
        <span className="department-tree__icon">
          {hasChildren ? "▾" : "•"}
        </span>

        <span className="department-tree__name">
          {department.name}
        </span>

        {department.code && (
          <span className="department-tree__code">
            {department.code}
          </span>
        )}
      </button>

      {hasChildren && (
        <ul className="department-tree__children">
          {department.children.map((child) => (
            <DepartmentNode
              key={child.id}
              department={child}
              selectedDepartmentId={selectedDepartmentId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function DepartmentTree({
  departments,
  selectedDepartmentId,
  onSelect,
}: DepartmentTreeProps) {
  if (departments.length === 0) {
    return (
      <div className="department-tree__empty">
        No departments found.
      </div>
    );
  }

  return (
    <div className="department-tree">
      <ul className="department-tree__root">
        {departments.map((department) => (
          <DepartmentNode
            key={department.id}
            department={department}
            selectedDepartmentId={selectedDepartmentId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}
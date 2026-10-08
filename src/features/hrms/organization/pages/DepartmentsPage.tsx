import { useMemo, useState } from "react";

import DepartmentTable from "../components/DepartmentTable";
import DepartmentTree from "../components/DepartmentTree";
import { useDepartments } from "../hooks/useOrganization";

import type {
  Department,
  DepartmentTreeNode,
} from "../types/organization.types";

import "./DepartmentsPage.css";

function buildDepartmentTree(
  departments: Department[],
  parentId: number | null = null
): DepartmentTreeNode[] {
  return departments
    .filter(
      (department) => department.parentId === parentId
    )
    .map((department) => ({
      ...department,

      children: buildDepartmentTree(
        departments,
        department.id
      ),
    }));
}

export default function DepartmentsPage() {
  const [selectedDepartmentId, setSelectedDepartmentId] =
    useState<number | null>(null);

  const {
    data: departments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useDepartments();

  const departmentTree = useMemo(
    () => buildDepartmentTree(departments),
    [departments]
  );

  const selectedDepartment = departments.find(
    (department) =>
      department.id === selectedDepartmentId
  );

  if (isLoading) {
    return (
      <div className="departments-page">
        <div className="departments-page__state">
          <div className="departments-page__spinner" />

          <p>Loading departments...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="departments-page">
        <div className="departments-page__state departments-page__state--error">
          <h2>Unable to load departments</h2>

          <p>
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading departments."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="departments-page">
      <header className="departments-page__header">
        <div>
          <h1>Departments</h1>

          <p>
            View the organization department structure.
          </p>
        </div>

        <div className="departments-page__count">
          {departments.length} departments
        </div>
      </header>

      <div className="departments-page__content">
        <section className="departments-page__card departments-page__tree-card">
          <div className="departments-page__card-header">
            <div>
              <h2>Department Hierarchy</h2>

              <p>
                Organization structure
              </p>
            </div>
          </div>

          <DepartmentTree
            departments={departmentTree}
            selectedDepartmentId={selectedDepartmentId}
            onSelect={(department) =>
              setSelectedDepartmentId(department.id)
            }
          />
        </section>

        <section className="departments-page__card departments-page__table-card">
          <div className="departments-page__card-header">
            <div>
              <h2>Department List</h2>

              <p>
                All available departments
              </p>
            </div>

            {selectedDepartment && (
              <div className="departments-page__selected">
                Selected:{" "}
                <strong>
                  {selectedDepartment.name}
                </strong>
              </div>
            )}
          </div>

          <DepartmentTable
            departments={departments}
            onSelect={(department) =>
              setSelectedDepartmentId(department.id)
            }
          />
        </section>
      </div>
    </div>
  );
}
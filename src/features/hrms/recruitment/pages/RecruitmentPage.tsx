import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";

import PageShell from "@/shared/components/ui/PageShell";

const RecruitmentPage: React.FC = () => {
  return (
    <>
      <PageShell
        domain="HRMS"
        title="Recruitment"
        description="Job postings, applicant tracking, interviews, and hiring pipeline."
      />

      <div className="mx-auto mt-8 max-w-5xl">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/hrms/recruitment/offers"
            className="group rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Briefcase className="h-5 w-5" />
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Offer Management
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Create, manage, approve, send, and track employee offers.
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecruitmentPage;
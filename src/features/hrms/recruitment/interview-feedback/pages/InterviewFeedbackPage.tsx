import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RatingInput from "../components/RatingInput";

import {
  useInterviewFeedback,
  useSubmitInterviewFeedback,
} from "../hooks/useInterviewFeedback";

import { interviewFeedbackSchema } from "../schemas/interviewFeedback.schema";

import type { InterviewFeedbackFormValues } from "../types/interviewFeedback.types";

const InterviewFeedbackPage = () => {
  const [selectedInterviewId, setSelectedInterviewId] = useState("");

  const { data: interviews = [], isLoading, isError } = useInterviewFeedback();

  const submitFeedback = useSubmitInterviewFeedback();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<InterviewFeedbackFormValues>({
    resolver: zodResolver(interviewFeedbackSchema),
    defaultValues: {
      technicalSkills: 0,
      communication: 0,
      problemSolving: 0,
      cultureFit: 0,
      experience: 0,
      overallRating: 0,
      recommendation: "Hire",
    },
  });

  const technicalSkills = watch("technicalSkills");
  const communication = watch("communication");
  const problemSolving = watch("problemSolving");
  const cultureFit = watch("cultureFit");
  const experience = watch("experience");
  const overallRating = watch("overallRating");

  useEffect(() => {
    if (!selectedInterviewId && interviews.length > 0) {
      setSelectedInterviewId(interviews[0].id);
    }
  }, [interviews, selectedInterviewId]);

  const selectedInterview = interviews.find(
    (interview) => interview.id === selectedInterviewId,
  );

  const onSubmit = (values: InterviewFeedbackFormValues) => {
    if (!selectedInterviewId) {
      return;
    }

    submitFeedback.mutate({
      interviewId: selectedInterviewId,
      feedback: values,
    });
  };

  const handleInterviewChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const interviewId = event.target.value;

    setSelectedInterviewId(interviewId);

    const interview = interviews.find((item) => item.id === interviewId);

    if (interview?.feedback) {
      reset(interview.feedback);
    } else {
      reset({
        technicalSkills: 0,
        communication: 0,
        problemSolving: 0,
        cultureFit: 0,
        experience: 0,
        overallRating: 0,
        recommendation: "Hire",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-gray-600">
        Loading interview feedback...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Failed to load interview feedback.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Interview Feedback</h1>

        <p className="mt-1 text-sm text-gray-600">
          Submit feedback for the selected interview.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="interview"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Interview
          </label>

          <select
            id="interview"
            value={selectedInterviewId}
            onChange={handleInterviewChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            {interviews.map((interview) => (
              <option key={interview.id} value={interview.id}>
                {interview.candidateName} - {interview.jobTitle} -{" "}
                {interview.round}
              </option>
            ))}
          </select>
        </div>

        {selectedInterview && (
          <div className="mb-6 grid gap-4 rounded-md bg-gray-50 p-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">Candidate</p>

              <p className="text-sm font-medium text-gray-900">
                {selectedInterview.candidateName}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Job Title</p>

              <p className="text-sm font-medium text-gray-900">
                {selectedInterview.jobTitle}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Round</p>

              <p className="text-sm font-medium text-gray-900">
                {selectedInterview.round}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Interviewer</p>

              <p className="text-sm font-medium text-gray-900">
                {selectedInterview.interviewerName}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RatingField
              label="Technical Skills"
              value={technicalSkills}
              onChange={(value) =>
                setValue("technicalSkills", value, {
                  shouldValidate: true,
                })
              }
              error={errors.technicalSkills?.message}
            />

            <RatingField
              label="Communication"
              value={communication}
              onChange={(value) =>
                setValue("communication", value, {
                  shouldValidate: true,
                })
              }
              error={errors.communication?.message}
            />

            <RatingField
              label="Problem Solving"
              value={problemSolving}
              onChange={(value) =>
                setValue("problemSolving", value, {
                  shouldValidate: true,
                })
              }
              error={errors.problemSolving?.message}
            />

            <RatingField
              label="Culture Fit"
              value={cultureFit}
              onChange={(value) =>
                setValue("cultureFit", value, {
                  shouldValidate: true,
                })
              }
              error={errors.cultureFit?.message}
            />

            <RatingField
              label="Experience"
              value={experience}
              onChange={(value) =>
                setValue("experience", value, {
                  shouldValidate: true,
                })
              }
              error={errors.experience?.message}
            />

            <RatingField
              label="Overall Rating"
              value={overallRating}
              onChange={(value) =>
                setValue("overallRating", value, {
                  shouldValidate: true,
                })
              }
              error={errors.overallRating?.message}
            />
          </div>

          <div>
            <label
              htmlFor="recommendation"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Recommendation
            </label>

            <select
              id="recommendation"
              {...register("recommendation")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="Strong Hire">Strong Hire</option>

              <option value="Hire">Hire</option>

              <option value="Hold">Hold</option>

              <option value="Reject">Reject</option>
            </select>

            {errors.recommendation && (
              <p className="mt-1 text-xs text-red-600">
                {errors.recommendation.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!selectedInterviewId || submitFeedback.isPending}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitFeedback.isPending ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>

          {submitFeedback.isSuccess && (
            <p className="text-sm text-green-600">
              Interview feedback submitted successfully.
            </p>
          )}

          {submitFeedback.isError && (
            <p className="text-sm text-red-600">
              Failed to submit interview feedback.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

interface RatingFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const RatingField = ({ label, value, onChange, error }: RatingFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <RatingInput value={value} onChange={onChange} />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default InterviewFeedbackPage;

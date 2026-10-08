import { z } from "zod";

export const interviewFeedbackSchema = z.object({
  technicalSkills: z
    .number()
    .min(1, "Please rate Technical Skills")
    .max(5, "Rating cannot be more than 5"),

  communication: z
    .number()
    .min(1, "Please rate Communication")
    .max(5, "Rating cannot be more than 5"),

  problemSolving: z
    .number()
    .min(1, "Please rate Problem Solving")
    .max(5, "Rating cannot be more than 5"),

  cultureFit: z
    .number()
    .min(1, "Please rate Culture Fit")
    .max(5, "Rating cannot be more than 5"),

  experience: z
    .number()
    .min(1, "Please rate Experience")
    .max(5, "Rating cannot be more than 5"),

  overallRating: z
    .number()
    .min(1, "Please rate Overall Rating")
    .max(5, "Rating cannot be more than 5"),

  recommendation: z.enum(["Strong Hire", "Hire", "Hold", "Reject"]),
});

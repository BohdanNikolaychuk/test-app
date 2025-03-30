"use server";

import axios from "axios";
import Joi from "joi";
import { redirect } from "next/navigation";
const githubRepoPattern =
  /^(https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)(\/)?$/;

const schema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),
  github_repo_url: Joi.string()
    .pattern(githubRepoPattern)
    .uri()
    .required()
    .messages({
      "string.uri": "GitHub repository URL must be a valid URL.",
      "string.empty": "GitHub repository URL is required.",
      "any.required": "GitHub repository URL is required.",
      "string.pattern.base":
        "GitHub repository URL must be a valid GitHub repository URL.",
    }),
  candidate_level: Joi.string()
    .valid("Junior", "Middle", "Senior", "Principal")
    .required()
    .empty("")
    .messages({
      "any.only":
        "Candidate level must be one of Junior, Middle, Senior or Principal.",
      "any.required": "Candidate level is required.",
      "string.empty": "Candidate level cannot be empty.",
    }),
  assignment_description: Joi.string().min(10).required().messages({
    "string.base": "Assignment description must be a string.",
    "string.empty": "Assignment description is required.",
    "string.min": "Assignment description must be at least 10 characters.",
    "any.required": "Assignment description is required.",
  }),
});

type SuccessResponse = {
  status: string;
  message: string;
};

type ErrorResponse = {
  message: string;
  errors: string[];
};

export type SubmitAssignmentResult = SuccessResponse | ErrorResponse;

export type SubmitAssignmentFormState = {
  formData?: FormData;
  errors: {
    name?: string;
    email?: string;
    github_repo_url?: string;
    candidate_level?: string;
    assignment_description?: string;
    general?: string;
  };
};

const filterFields = (data: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) => !key.startsWith("$") && !(value instanceof File)
    )
  );

const validateFormData = (data: Record<string, unknown>) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    const errors: Record<string, string> = {};
    error.details.forEach((err) => {
      errors[err.path[0] as string] = err.message;
    });
    return errors;
  }
  return {};
};

export const submitAssignmentAction = async (
  state: SubmitAssignmentFormState,
  formData: FormData
): Promise<SubmitAssignmentFormState> => {
  const data = Object.fromEntries(formData.entries());

  const filteredData = filterFields(data);

  const errors = validateFormData(filteredData);
  if (Object.keys(errors).length > 0) {
    return { formData, errors };
  }

  const response = await axios.post<SuccessResponse>(
    "https://tools.qa.ale.ai/api/tools/candidates/assignments",
    filteredData
  );

  if (
    response.data.status === "success" &&
    response.data.message === "Assignment submitted successfully!"
  ) {
    const queryString = new URLSearchParams(
      filteredData as Record<string, string>
    ).toString();
    redirect(`/thank-you?${queryString}`);
  }

  return { formData, errors: {} };
};

"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import Joi from "joi";
import { AlertCircle, Github, Mail, User } from "lucide-react";
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  github_repo_url: string;
  candidate_level: string;
  assignment_description: string;
}

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
  github_repo_url: Joi.string().uri().required().messages({
    "string.uri": "GitHub repository URL must be a valid URL.",
    "string.empty": "GitHub repository URL is required.",
    "any.required": "GitHub repository URL is required.",
  }),
  candidate_level: Joi.string()
    .valid("Junior", "Middle", "Senior", "Principal")
    .required()
    .messages({
      "any.only":
        "Candidate level must be one of Junior, Middle, Senior or Principal.",
      "any.required": "Candidate level is required.",
    }),
  assignment_description: Joi.string().min(10).required().messages({
    "string.base": "Assignment description must be a string.",
    "string.empty": "Assignment description is required.",
    "string.min": "Assignment description must be at least 10 characters.",
    "any.required": "Assignment description is required.",
  }),
});

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    github_repo_url: "",
    candidate_level: "",
    assignment_description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, candidate_level: value }));
    if (errors.candidate_level) {
      setErrors((prev) => ({ ...prev, candidate_level: "" }));
    }
  };

  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors: Record<string, string> = {};
      error.details.forEach((err) => {
        newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
  };

  return (
    <div className="w-full px-4 py-8 sm:px-0">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Assignment Submission
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">
                Full Name
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <User size={18} />
                </div>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`pl-10 ${
                    errors.name
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <p
                  id="name-error"
                  className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
                >
                  <AlertCircle size={14} />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Mail size={18} />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`pl-10 ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
                >
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="github_repo_url"
                className="text-base font-medium"
              >
                GitHub Repository
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Github size={18} />
                </div>
                <Input
                  id="github_repo_url"
                  name="github_repo_url"
                  value={formData.github_repo_url}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repository"
                  className={`pl-10 ${
                    errors.github_repo_url
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  aria-invalid={!!errors.github_repo_url}
                  aria-describedby={
                    errors.github_repo_url ? "github-error" : undefined
                  }
                />
              </div>
              {errors.github_repo_url && (
                <p
                  id="github-error"
                  className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
                >
                  <AlertCircle size={14} />
                  {errors.github_repo_url}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="candidate_level"
                className="text-base font-medium"
              >
                Candidate Level
              </Label>
              <Select
                value={formData.candidate_level}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger
                  id="candidate_level"
                  className={
                    errors.candidate_level
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  aria-invalid={!!errors.candidate_level}
                  aria-describedby={
                    errors.candidate_level ? "candidate-level-error" : undefined
                  }
                >
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Middle">Middle</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Principal">Principal</SelectItem>
                </SelectContent>
              </Select>
              {errors.candidate_level && (
                <p
                  id="candidate-level-error"
                  className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
                >
                  <AlertCircle size={14} />
                  {errors.candidate_level}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="assignment_description"
                className="text-base font-medium"
              >
                Assignment Submission
              </Label>
              <Textarea
                id="assignment_description"
                name="assignment_description"
                value={formData.assignment_description}
                onChange={handleChange}
                placeholder="Describe your assignment or add any additional notes..."
                className={`min-h-[150px] resize-y ${
                  errors.assignment_description
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                aria-invalid={!!errors.assignment_description}
                aria-describedby={
                  errors.assignment_description
                    ? "assignment-description-error"
                    : undefined
                }
              />
              {errors.assignment_description && (
                <p
                  id="assignment-description-error"
                  className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
                >
                  <AlertCircle size={14} />
                  {errors.assignment_description}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full py-6 text-base font-medium transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Assignment"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Success indicator that appears after submission */}
      {isSubmitting && (
        <div
          className="fixed inset-0 bg-background/80 flex items-center justify-center z-50"
          aria-live="assertive"
        >
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="animate-spin h-8 w-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                Submitting your assignment
              </h3>
              <p className="text-center text-muted-foreground">
                Please wait while we process your submission...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

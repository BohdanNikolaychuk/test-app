"use client";

import type React from "react";

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
import { AlertCircle, Github, Mail, User } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    level: "",
    assignment: "",
  });

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
    setFormData((prev) => ({ ...prev, level: value }));
    if (errors.level) {
      setErrors((prev) => ({ ...prev, level: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.github.trim()) {
      newErrors.github = "GitHub repository is required";
    } else if (
      !/^https?:\/\/github\.com\/[\w-]+\/[\w-]+/.test(formData.github)
    ) {
      newErrors.github = "Please enter a valid GitHub repository URL";
    }

    if (!formData.level) {
      newErrors.level = "Please select your level";
    }

    if (!formData.assignment.trim()) {
      newErrors.assignment = "Assignment submission is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <div className="w-full px-4 py-8 sm:px-0">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center sm:text-3xl">
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
              <Label htmlFor="github" className="text-base font-medium">
                GitHub Repository
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Github size={18} />
                </div>
                <Input
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repository"
                  className={`pl-10 ${
                    errors.github
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  aria-invalid={!!errors.github}
                  aria-describedby={errors.github ? "github-error" : undefined}
                />
              </div>
              {errors.github && (
                <p
                  id="github-error"
                  className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
                >
                  <AlertCircle size={14} />
                  {errors.github}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-base font-medium">
                Candidate Level
              </Label>
              <Select value={formData.level} onValueChange={handleSelectChange}>
                <SelectTrigger
                  id="level"
                  className={
                    errors.level
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  aria-invalid={!!errors.level}
                  aria-describedby={errors.level ? "level-error" : undefined}
                >
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              {errors.level && (
                <p
                  id="level-error"
                  className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
                >
                  <AlertCircle size={14} />
                  {errors.level}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignment" className="text-base font-medium">
                Assignment Submission
              </Label>
              <Textarea
                id="assignment"
                name="assignment"
                value={formData.assignment}
                onChange={handleChange}
                placeholder="Describe your assignment or add any additional notes..."
                className={`min-h-[150px] resize-y ${
                  errors.assignment
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                aria-invalid={!!errors.assignment}
                aria-describedby={
                  errors.assignment ? "assignment-error" : undefined
                }
              />
              {errors.assignment && (
                <p
                  id="assignment-error"
                  className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
                >
                  <AlertCircle size={14} />
                  {errors.assignment}
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

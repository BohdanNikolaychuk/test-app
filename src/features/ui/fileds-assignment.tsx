import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { AlertCircle, Github, Mail, User } from "lucide-react";
import { useId } from "react";

export function FieldsAssignment({
  formData,
  errors,
}: {
  formData?: FormData;
  errors?: {
    name?: string;
    email?: string;
    github_repo_url?: string;
    assignment_description?: string;
  };
}) {
  const nameId = useId();
  const emailId = useId();
  const githubId = useId();
  const assignmentDescriptionId = useId();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={nameId} className="text-base font-medium">
          Full Name
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <User size={18} />
          </div>
          <Input
            id={nameId}
            name="name"
            placeholder="Enter your full name"
            className={`pl-10 ${errors?.name ? "border-red-500" : ""}`}
            aria-invalid={!!errors?.name}
            aria-describedby={errors?.name ? `${nameId}-error` : undefined}
            required
            defaultValue={formData?.get("name")?.toString()}
          />
        </div>
        {errors?.name && (
          <p
            id={`${nameId}-error`}
            className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
          >
            <AlertCircle size={14} />
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={emailId} className="text-base font-medium">
          Email Address
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <Mail size={18} />
          </div>
          <Input
            id={emailId}
            name="email"
            type="email"
            placeholder="you@example.com"
            className={`pl-10 ${errors?.email ? "border-red-500" : ""}`}
            aria-invalid={!!errors?.email}
            aria-describedby={errors?.email ? `${emailId}-error` : undefined}
            required
            defaultValue={formData?.get("email")?.toString()}
          />
        </div>
        {errors?.email && (
          <p
            id={`${emailId}-error`}
            className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
          >
            <AlertCircle size={14} />
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={githubId} className="text-base font-medium">
          GitHub Repository
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <Github size={18} />
          </div>
          <Input
            id={githubId}
            name="github_repo_url"
            placeholder="https://github.com/username/repository"
            className={`pl-10 ${
              errors?.github_repo_url ? "border-red-500" : ""
            }`}
            aria-invalid={!!errors?.github_repo_url}
            aria-describedby={
              errors?.github_repo_url ? `${githubId}-error` : undefined
            }
            required
            defaultValue={formData?.get("github_repo_url")?.toString()}
          />
        </div>
        {errors?.github_repo_url && (
          <p
            id={`${githubId}-error`}
            className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
          >
            <AlertCircle size={14} />
            {errors.github_repo_url}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={assignmentDescriptionId}
          className="text-base font-medium"
        >
          Assignment Submission
        </Label>
        <Textarea
          id={assignmentDescriptionId}
          name="assignment_description"
          placeholder="Describe your assignment or add any additional notes..."
          className={`min-h-[150px] resize-y ${
            errors?.assignment_description
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          aria-invalid={!!errors?.assignment_description}
          required
          defaultValue={formData?.get("assignment_description")?.toString()}
          aria-describedby={
            errors?.assignment_description
              ? `${assignmentDescriptionId}-error`
              : undefined
          }
        />
        {errors?.assignment_description && (
          <p
            id={`${assignmentDescriptionId}-error`}
            className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
          >
            <AlertCircle size={14} />
            {errors.assignment_description}
          </p>
        )}
      </div>
    </>
  );
}

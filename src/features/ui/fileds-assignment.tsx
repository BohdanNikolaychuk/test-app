import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { AlertCircle, Github, Mail, User } from "lucide-react";
export function FieldsAssignment({
  formData,
  errors,
}: {
  formData?: FormData;
  errors?: {
    name: string;
    email: string;
    assi: string;
  };
}) {
  return (
    <>
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
              errors?.name ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
            aria-invalid={!!errors?.name}
            aria-describedby={errors?.name ? "name-error" : undefined}
          />
        </div>
        {errors?.name && (
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
              errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
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
        <Label htmlFor="assignment" className="text-base font-medium">
          Assignment Description
        </Label>
        <Textarea
          id="assignment"
          name="assignment"
          placeholder="Describe your assignment or add any additional notes..."
          className={`min-h-[150px] resize-y ${
            errors?.description
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          aria-invalid={!!errors?.description}
          aria-describedby={
            errors?.description ? "assignment-error" : undefined
          }
        />
        {errors?.description && (
          <p
            id="assignment-error"
            className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
          >
            <AlertCircle size={14} />
            {errors.description}
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
              errors.github ? "border-red-500 focus-visible:ring-red-500" : ""
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
    </>
  );
}

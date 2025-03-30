import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { AlertCircle } from "lucide-react";

export default async function DropDownAssignment({
  formData,
  errors,
}: {
  formData?: FormData;
  errors?: {
    candidate_level?: string;
  };
}) {
  const res = await fetch(
    "https://tools.qa.ale.ai/api/tools/candidates/levels"
  );
  const data = await res.json();
  const candidateLevels = data.levels || [];
  return (
    <div className="space-y-2">
      <Label htmlFor="candidate_level" className="text-base font-medium">
        Candidate Level
      </Label>
      <Select
        name="candidate_level"
        defaultValue={formData?.get("candidate_level")?.toString()}
      >
        <SelectTrigger
          id="candidate_level"
          className={
            errors?.candidate_level
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }
          aria-invalid={!!errors?.candidate_level}
          aria-describedby={
            errors?.candidate_level ? `candidate_level-error` : undefined
          }
        >
          <SelectValue placeholder="Select your experience level" />
        </SelectTrigger>
        <SelectContent>
          {candidateLevels.map((level: string) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors?.candidate_level && (
        <p
          id={`candidate_level-error`}
          className="text-sm font-medium text-red-500 flex items-center gap-1 mt-1"
        >
          <AlertCircle size={14} />
          {errors.candidate_level}
        </p>
      )}
    </div>
  );
}

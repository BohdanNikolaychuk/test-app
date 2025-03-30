"use client";

import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function DropDownAssignment({
  formData,
  errors,
}: {
  formData?: FormData;
  errors?: {
    candidate_level?: string;
  };
}) {
  const [candidateLevels, setCandidateLevels] = useState<string[]>([]);

  useEffect(() => {
    const fetchCandidateLevels = async () => {
      try {
        const { data } = await axios.get(
          "https://tools.qa.ale.ai/api/tools/candidates/levels"
        );
        setCandidateLevels(data.levels || []);
      } catch (error) {
        console.error("Error fetching candidate levels:", error);
      }
    };

    fetchCandidateLevels();
  }, []);

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

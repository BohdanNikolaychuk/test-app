"use client";

import { useActionState } from "@/shared/lib/react";
import {
  submitAssignmentAction,
  SubmitAssignmentFormState,
} from "../actions/submit-form";
import { FieldsAssignment } from "../ui/fileds-assignment";
import { AssignmentForm } from "../ui/form-layout-assignment";
import { SubmitButton } from "../ui/submit-assignment";

export function FormAssignment({ dropdown }: { dropdown: React.ReactNode }) {
  const [formState, action, isPending] = useActionState(
    submitAssignmentAction,
    {
      errors: {},
    } as SubmitAssignmentFormState
  );
  return (
    <AssignmentForm
      title="Assignment Submission"
      action={action}
      fields={<FieldsAssignment {...formState} />}
      dropdown={dropdown}
      actions={<SubmitButton isPending={isPending}> Sign In</SubmitButton>}
    />
  );
}

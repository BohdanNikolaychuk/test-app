"use client";

import { useActionState } from "@/shared/lib/react";
import {
  submitAssignmentAction,
  SubmitAssignmentFormState,
} from "../actions/submit-form";
import DropDownAssignment from "../ui/dropdown-assignment";
import { FieldsAssignment } from "../ui/fileds-assignment";
import { AssignmentForm } from "../ui/form-layout-assignment";
import { SubmitButton } from "../ui/submit-assignment";

export function FormAssignment() {
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
      dropdown={<DropDownAssignment {...formState} />}
      actions={<SubmitButton isPending={isPending}>Submit</SubmitButton>}
    />
  );
}

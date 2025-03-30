import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export function AssignmentForm({
  actions,
  fields,
  title,
  action,
  dropdown,
}: {
  title: string;
  fields: React.ReactNode;
  actions: React.ReactNode;
  dropdown: React.ReactNode;
  action: (formData: FormData) => void;
}) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <form action={action}>
        <CardContent className="space-y-6 p-6">
          {fields}
          {dropdown}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">{actions}</CardFooter>
      </form>
    </Card>
  );
}

import { FormAssignment } from "@/features/containers/form-assignment";
import DropDownAssignment from "@/features/ui/dropdown-assignment";

export default async function Home() {
  return (
    <div className="w-full px-4 py-8 sm:px-0">
      <FormAssignment dropdown={<DropDownAssignment />} />
    </div>
  );
}

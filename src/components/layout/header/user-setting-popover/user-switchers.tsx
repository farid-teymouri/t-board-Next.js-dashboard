import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type UserSwitchersProps = {
  id: string;
  text: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function UserSwitchers({
  id,
  text,
  checked,
  onCheckedChange,
}: UserSwitchersProps) {
  return (
    <div className="flex flex-row items-center justify-between space-x-2">
      <Label htmlFor={id}>{text}</Label>

      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

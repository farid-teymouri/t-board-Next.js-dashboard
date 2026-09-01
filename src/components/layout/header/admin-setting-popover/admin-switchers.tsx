import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type AdminSwitchersProps = {
  id: string;
  text: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function AdminSwitchers({
  id,
  text,
  checked,
  onCheckedChange,
}: AdminSwitchersProps) {
  return (
    <div className="flex flex-row items-center justify-between space-x-2">
      <Label htmlFor={id}>{text}</Label>

      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

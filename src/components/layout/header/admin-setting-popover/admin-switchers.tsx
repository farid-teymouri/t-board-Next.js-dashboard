import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
type AdminSwitchersProps = {
  id: string;
  text: string;
};
export function AdminSwitchers({ id, text }: AdminSwitchersProps) {
  return (
    <div className="flex flex-row justify-between items-center space-x-2">
      <Label htmlFor={id}>{text}</Label>
      <Switch id={id} defaultChecked />
    </div>
  );
}

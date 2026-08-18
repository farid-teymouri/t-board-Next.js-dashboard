import { Card, CardContent } from "@/components/ui/card";
import { AdminSwitchers } from "@/components/layout/header/admin-setting-popover/admin-switchers";

export function AdminSwitchCard() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="flex flex-col space-y-3">
        <AdminSwitchers
          id="sms-notification"
          text="دریافت اعلان ها از طریق پیامک"
        />
        <AdminSwitchers
          id="email-notification"
          text="دریافت اعلان ها از طریق ایمیل"
        />
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { AdminSwitchers } from "@/components/layout/header/admin-setting-popover/admin-switchers";
import { getDictionary } from "@/i18n/dictionaries";

export async function AdminSwitchCard() {
  const dic = (await getDictionary()).adminSettings;

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="flex flex-col space-y-3">
        <AdminSwitchers id="sms-notification" text={dic.switchCard.sms} />

        <AdminSwitchers id="email-notification" text={dic.switchCard.email} />
      </CardContent>
    </Card>
  );
}

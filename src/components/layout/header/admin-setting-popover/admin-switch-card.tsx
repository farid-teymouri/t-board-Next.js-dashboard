import { Card, CardContent } from "@/components/ui/card";
import { AdminSwitchers } from "@/components/layout/header/admin-setting-popover/admin-switchers";
import type { AdminSettingsDictionary } from "@/i18n/dictionaries";

type AdminSwitchCardProps = {
  dictionary: AdminSettingsDictionary;
};

export function AdminSwitchCard({ dictionary }: AdminSwitchCardProps) {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="flex flex-col space-y-3">
        <AdminSwitchers
          id="sms-notification"
          text={dictionary.switchCard.sms}
        />

        <AdminSwitchers
          id="email-notification"
          text={dictionary.switchCard.email}
        />
      </CardContent>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./admin-cloud-card.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getDictionary } from "@/i18n/dictionaries";
export async function AdminCloudCard() {
  const dic = (await getDictionary()).adminSettings;

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader className="space-y-2">
        <CardTitle>
          <h3 className="leading-none font-medium text-lg">
            {dic.cloudCard.title}
          </h3>
        </CardTitle>

        <CardDescription className="space-y-2">
          <h4 className="flex flex-row gap-1">
            <span className="text-primary">{dic.cloudCard.usagePercent}</span>

            <p>{dic.cloudCard.usage}</p>
          </h4>

          <Progress value={70} className="w-full max-w-sm" />
        </CardDescription>
      </CardHeader>

      <CardContent className="-mb-(--card-spacing) overflow-hidden relative h-20 flex flex-col justify-between p-3">
        <Button className="w-fit p-4">{dic.cloudCard.settings}</Button>{" "}
        <div className="admin-card-content rtl:before:-left-10 before:-right-10 rtl:after:-left-32.5 after:-right-32.5 "></div>
      </CardContent>
    </Card>
  );
}

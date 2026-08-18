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

export function AdminCloudCard() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader className="space-y-2">
        <CardTitle>
          <h3 className="leading-none font-medium text-lg">جزئیات فضای ابری</h3>
        </CardTitle>

        <CardDescription className="space-y-2">
          <h4 className="flex flex-row gap-1">
            <Badge variant="secondary">۷۰%</Badge>
            <p>از فضای ابری اشغال شده</p>
          </h4>
          <Progress value={70} className="w-full max-w-sm" />
        </CardDescription>
      </CardHeader>

      <CardContent className="-mb-(--card-spacing) overflow-hidden relative h-20 flex flex-col justify-between p-3">
        <div className="admin-card-content"></div>
        <Button className="w-fit p-4">تنظیمات فضای ابری</Button>
      </CardContent>
    </Card>
  );
}

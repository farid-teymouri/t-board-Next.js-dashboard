import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DangerZoneSkeleton() {
  return (
    <Card className="border-destructive">
      <CardHeader className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-6">
        <Skeleton className="h-5 w-80 max-w-full" />
        <Skeleton className="h-10 w-36" />
      </CardContent>
    </Card>
  );
}

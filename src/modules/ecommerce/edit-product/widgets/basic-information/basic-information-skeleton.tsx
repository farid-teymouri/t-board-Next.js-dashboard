import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function BasicInformationSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-36 animate-pulse rounded-md bg-muted" />

        <div className="h-4 w-64 max-w-full animate-pulse rounded-md bg-muted" />
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />

              <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

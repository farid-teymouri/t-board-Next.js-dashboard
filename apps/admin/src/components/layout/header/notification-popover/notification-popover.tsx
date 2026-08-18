import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Settings } from "lucide-react";
import { DoorOpen } from "lucide-react";
import { UserRound } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" />}
        className="h-auto rounded-4xl! hover:text-primary"
      >
        ftg
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className="relative w-80 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="grid gap-4">
            <div className="space-y-1"></div>

            <Separator />
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}

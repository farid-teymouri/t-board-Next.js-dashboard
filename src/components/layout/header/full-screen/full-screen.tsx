"use client";

import { Expand, Shrink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function FullScreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Failed to toggle fullscreen:", error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle fullscreen"
        className="w-8.5 h-8.5"
        onClick={handleFullscreen}
      >
        {isFullscreen ? <Shrink /> : <Expand />}
      </Button>
    </div>
  );
}

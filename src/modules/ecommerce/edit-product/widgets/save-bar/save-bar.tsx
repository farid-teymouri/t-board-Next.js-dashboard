"use client";

import { Check, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { formatDate, formatTime } from "@/utils/formatters";

import { useSaveBar } from "../../hooks/use-save-bar";

import type { SaveBarData } from "./types";

type SaveBarDictionary = {
  saved: string;
  cancel: string;
  saveAsDraft: string;
  saveChanges: string;
};

type SaveBarProps = {
  dictionary: SaveBarDictionary;
  locale: "fa" | "en";
};

export function SaveBar({ dictionary, locale }: SaveBarProps) {
  const { data, isLoading } = useSaveBar();

  if (isLoading || !data) {
    return null;
  }

  const saveBarData: SaveBarData = data;

  return (
    <Card className="sticky bottom-0 z-50 bg-foreground/10 backdrop-blur-xl px-6">
      <div className="flex min-h-16 flex-wrap items-stretch justify-between gap-6 lg:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-2 text-sm lg:mx-0 mx-auto">
          <Check className="size-4 text-chart-3" />

          <span>{dictionary.saved}</span>

          <span className="font-bold">
            {formatDate(saveBarData.savedAt, locale)}
          </span>

          <span className="text-chart-3">-</span>

          <span className="font-bold">
            {formatTime(saveBarData.savedAt, locale)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:mx-0 mx-auto">
          <Button variant="secondary" className="sm:w-fit w-full">
            {dictionary.cancel}
          </Button>

          <Button variant="secondary" className="sm:w-fit w-full">
            {dictionary.saveAsDraft}
          </Button>

          <Button className="sm:w-fit w-full">
            <Save className="size-4 " />
            {dictionary.saveChanges}
          </Button>
        </div>
      </div>
    </Card>
  );
}

"use client";

import { useState } from "react";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import type { ProductStatusData } from "./types";

type StatusFormProps = {
  data: ProductStatusData;
  dictionary: EcommerceEditProductDictionary["status"];
};

const statusOptions = [
  {
    value: "active",
    label: "active",
    description: "activeDescription",
  },
  {
    value: "draft",
    label: "draft",
    description: "draftDescription",
  },
  {
    value: "scheduled",
    label: "scheduled",
    description: "scheduledDescription",
  },
] as const;

const salesChannels = [
  {
    key: "onlineStore",
    label: "onlineStore",
  },
  {
    key: "pointOfSale",
    label: "pointOfSale",
  },
  {
    key: "socialMarketplaces",
    label: "socialMarketplaces",
  },
] as const;

export function StatusForm({ data, dictionary }: StatusFormProps) {
  const [status, setStatus] = useState(data.status);

  return (
    <div className="space-y-6">
      <RadioGroup value={status} onValueChange={setStatus} className="gap-5">
        {statusOptions.map((option) => (
          <div
            key={option.value}
            className="group flex cursor-pointer items-start gap-3"
            onClick={() => setStatus(option.value)}
          >
            <RadioGroupItem
              id={`status-${option.value}`}
              value={option.value}
              className="mt-0.5 border-foreground/20 group-hover:border-foreground"
            />

            <div className="grid gap-1">
              <Label
                htmlFor={`status-${option.value}`}
                className="cursor-pointer"
              >
                {dictionary[option.label]}
              </Label>

              <p className="text-muted-foreground cursor-pointer text-sm">
                {dictionary[option.description]}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">{dictionary.salesChannels}</h3>

        <div className="grid gap-4">
          {salesChannels.map((channel) => (
            <div key={channel.key} className="flex items-center gap-3">
              <Checkbox
                id={`sales-channel-${channel.key}`}
                defaultChecked={data.salesChannels[channel.key]}
              />

              <Label
                htmlFor={`sales-channel-${channel.key}`}
                className="cursor-pointer"
              >
                {dictionary[channel.label]}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

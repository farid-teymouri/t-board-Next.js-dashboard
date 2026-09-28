"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import type { InventoryData } from "./types";

type InventoryFormProps = {
  data: InventoryData;
  dictionary: EcommerceEditProductDictionary["inventory"];
  locale: "fa" | "en";
};

export function InventoryForm({
  data,
  dictionary,
  locale,
}: InventoryFormProps) {
  const [trackQuantity, setTrackQuantity] = useState(data.trackQuantity);
  const [selectedLocation, setSelectedLocation] = useState(data.location.id);
  const handleLocationChange = (value: string | null) => {
    if (value) {
      setSelectedLocation(value);
    }
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>
          {dictionary.sku}
          <span className="text-destructive"> *</span>
        </Label>

        <Input defaultValue={data.sku} />
      </div>

      <div className="space-y-2">
        <Label>{dictionary.barcode}</Label>

        <Input defaultValue={data.barcode} inputMode="numeric" />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-1">
          <Label>{dictionary.trackQuantity}</Label>

          <p className="text-sm text-muted-foreground">
            {dictionary.trackQuantityDescription}
          </p>
        </div>

        <Switch checked={trackQuantity} onCheckedChange={setTrackQuantity} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>{dictionary.quantity}</Label>

          <Input type="number" defaultValue={data.quantity} />
        </div>

        <div className="space-y-2">
          <Label>{dictionary.lowStockAlertAt}</Label>

          <Input type="number" defaultValue={data.lowStockAlertAt} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>{dictionary.location}</Label>

        <Select value={selectedLocation} onValueChange={handleLocationChange}>
          <SelectTrigger>
            <SelectValue>
              {
                data.locations.find(
                  (location) => location.id === selectedLocation,
                )?.name[locale]
              }
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {data.locations.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {location.name[locale]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

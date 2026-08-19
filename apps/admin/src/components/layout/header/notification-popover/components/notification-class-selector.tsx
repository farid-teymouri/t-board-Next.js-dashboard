import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { NotificationFilter } from "../notification-types";

const items = [
  { label: "تمام اعلان‌ها", value: "all" },
  { label: "جدید", value: "new" },
  { label: "خوانده‌نشده", value: "unread" },
  { label: "در انتظار تأیید", value: "pending" },
  { label: "مالی", value: "financial" },
  { label: "هشدار", value: "warning" },
  { label: "سایر اعلان‌ها", value: "others" },
] satisfies {
  label: string;
  value: NotificationFilter;
}[];

type NotificationClassSelectorProps = {
  value: NotificationFilter;
  onValueChange: (value: NotificationFilter) => void;
};

export function NotificationClassSelector({
  value,
  onValueChange,
}: NotificationClassSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value) {
          onValueChange(value as NotificationFilter);
        }
      }}
      items={items}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="نوع اعلان را انتخاب کنید" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>لیست اعلان‌ها</SelectLabel>

          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

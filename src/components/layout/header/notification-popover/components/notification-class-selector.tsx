import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  NotificationFilter,
  NotificationType,
} from "../notification-types";

const items = [
  { value: "all", key: "all" },
  { value: "new", key: "new" },
  { value: "unread", key: "unread" },
  { value: "pending", key: "pending" },
  { value: "financial", key: "financial" },
  { value: "warning", key: "warning" },
  { value: "others", key: "others" },
] satisfies {
  value: NotificationFilter;
  key: NotificationFilter;
}[];

type NotificationClassSelectorProps = {
  value: NotificationFilter;
  onValueChange: (value: NotificationFilter) => void;

  dictionary: {
    classSelector: {
      placeholder: string;
      label: string;
    };

    badge: Record<NotificationType | "all" | "others", string>;
  };
};

export function NotificationClassSelector({
  value,
  onValueChange,
  dictionary,
}: NotificationClassSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value) {
          onValueChange(value as NotificationFilter);
        }
      }}
      items={items.map((item) => ({
        value: item.value,
        label: dictionary.badge[item.key],
      }))}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={dictionary.classSelector.placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{dictionary.classSelector.label}</SelectLabel>

          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {dictionary.badge[item.key]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

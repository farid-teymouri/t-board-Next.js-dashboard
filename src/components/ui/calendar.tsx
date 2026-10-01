"use client";

import * as React from "react";

import { cn } from "cn";

import {
  DayPicker as GregorianDayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "@daypicker/react";
import { DayPicker as PersianDayPicker } from "@daypicker/persian";

import { Button, buttonVariants } from "@/components/ui/button";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";
type CalendarProps =
  React.ComponentProps<typeof GregorianDayPicker> extends infer T
    ? T extends unknown
      ? Omit<T, "locale"> & {
          locale?: Locale;
        }
      : never
    : never;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: CalendarProps & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  const isPersianCalendar = locale?.code === "fa-IR";

  const isHoliday = (date: Date) => {
    const day = date.getDay();

    return isPersianCalendar ? day === 5 : day === 0 || day === 6;
  };

  const calendarComponents = {
    Root: ({
      className,
      rootRef,
      ...props
    }: {
      className?: string;
      rootRef?: React.Ref<HTMLDivElement>;
    }) => {
      return (
        <div
          data-slot="calendar"
          ref={rootRef}
          className={cn(className)}
          {...props}
        />
      );
    },

    Chevron: ({
      className,
      orientation,
      ...props
    }: {
      className?: string;
      orientation?: "up" | "down" | "left" | "right";
      [key: string]: unknown;
    }) => {
      if (orientation === "left") {
        return (
          <ChevronLeftIcon
            className={cn("rtl:rotate-180 size-4", className)}
            {...props}
          />
        );
      }

      if (orientation === "right") {
        return (
          <ChevronRightIcon
            className={cn("rtl:rotate-180 size-4", className)}
            {...props}
          />
        );
      }

      return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
    },

    DayButton: (props: React.ComponentProps<typeof DayButton>) => (
      <CalendarDayButton locale={locale} {...props} />
    ),

    ...components,
  };

  const calendarProps = {
    showOutsideDays,
    className: cn(
      "group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(10)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
      String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
      String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
      className,
    ),

    modifiers: {
      holiday: isHoliday,
      ...props.modifiers,
    },

    captionLayout,

    locale,

    formatters: {
      formatMonthDropdown: (date: Date) =>
        date.toLocaleString(locale?.code, {
          month: "short",
        }),
      ...formatters,
    },

    classNames: {
      root: cn("w-fit", defaultClassNames.root),

      months: cn(
        "relative flex flex-col gap-4 md:flex-row",
        defaultClassNames.months,
      ),

      month: cn("flex w-full flex-col gap-4", defaultClassNames.month),

      nav: cn(
        "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
        defaultClassNames.nav,
      ),

      button_previous: cn(
        buttonVariants({ variant: buttonVariant }),
        "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
        defaultClassNames.button_previous,
      ),

      button_next: cn(
        buttonVariants({ variant: buttonVariant }),
        "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
        defaultClassNames.button_next,
      ),

      month_caption: cn(
        "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
        defaultClassNames.month_caption,
      ),

      dropdowns: cn(
        "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
        defaultClassNames.dropdowns,
      ),

      dropdown_root: cn(
        "relative rounded-(--cell-radius)",
        defaultClassNames.dropdown_root,
      ),

      dropdown: cn(
        "absolute inset-0 bg-popover opacity-0",
        defaultClassNames.dropdown,
      ),

      caption_label: cn(
        "font-medium select-none",
        captionLayout === "label"
          ? "text-sm"
          : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
        defaultClassNames.caption_label,
      ),

      month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),

      weekdays: "hidden",
      weekday: "hidden",

      week: cn("mt-2 flex w-full gap-1", defaultClassNames.week),

      week_number_header: cn(
        "w-(--cell-size) select-none",
        defaultClassNames.week_number_header,
      ),

      week_number: cn(
        "text-[0.8rem] text-muted-foreground select-none",
        defaultClassNames.week_number,
      ),

      day: cn(
        "group/day relative aspect-square h-full min-w-0 flex-1 rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-e-(--cell-radius)",
        props.showWeekNumber
          ? "[&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)"
          : "[&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)",
        defaultClassNames.day,
      ),

      range_start: cn(
        "relative isolate z-0 rounded-s-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:end-0 after:w-4 after:bg-muted",
        defaultClassNames.range_start,
      ),

      range_middle: cn("rounded-none bg-muted", defaultClassNames.range_middle),

      range_end: cn(
        "relative isolate z-0 rounded-e-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:start-0 after:w-4 after:bg-muted",
        defaultClassNames.range_end,
      ),

      today: cn(
        "rounded-(--cell-radius) bg-chart-2/30 text-foreground data-[selected=true]:rounded-none",
        defaultClassNames.today,
      ),

      outside: cn(
        "text-muted-foreground aria-selected:text-muted-foreground",
        defaultClassNames.outside,
      ),

      disabled: cn(
        "text-muted-foreground opacity-50",
        defaultClassNames.disabled,
      ),

      hidden: cn("invisible", defaultClassNames.hidden),

      ...classNames,
    },

    components: calendarComponents,

    ...props,
  };

  if (isPersianCalendar) {
    return <PersianDayPicker {...calendarProps} />;
  }

  return <GregorianDayPicker {...calendarProps} />;
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  children,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Locale;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  const weekdayLabel = new Intl.DateTimeFormat(
    locale?.code === "fa-IR" ? "fa-IR" : "en-US",
    {
      weekday: "long",
    },
  ).format(day.date);

  const isHoliday =
    locale?.code === "fa-IR"
      ? day.date.getDay() === 5
      : day.date.getDay() === 0 || day.date.getDay() === 6;

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col justify-center gap-1 rounded-(--cell-radius) border-0 px-2 py-2 leading-none font-normal",

        "hover:bg-accent hover:text-accent-foreground",

        "data-[range-middle=true]:rounded-none",
        "data-[range-middle=true]:bg-muted",
        "data-[range-middle=true]:text-foreground",

        "data-[range-start=true]:rounded-s-(--cell-radius)",
        "data-[range-start=true]:bg-primary",
        "data-[range-start=true]:text-primary-foreground",

        "data-[range-end=true]:rounded-e-(--cell-radius)",
        "data-[range-end=true]:bg-primary",
        "data-[range-end=true]:text-primary-foreground",

        "data-[selected-single=true]:bg-primary",
        "data-[selected-single=true]:text-primary-foreground",

        "data-[range-middle=true]:hover:bg-muted",
        "data-[range-start=true]:hover:bg-primary",
        "data-[range-end=true]:hover:bg-primary",

        isHoliday &&
          !modifiers.range_middle &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          "text-destructive hover:bg-destructive/15 hover:text-destructive",

        className,
      )}
      {...props}
    >
      {modifiers.range_start && (
        <span className="absolute inset-y-0 -inset-e-0.5 -z-10 bg-primary" />
      )}

      <span className="text-sm font-medium">{children}</span>

      <span className="text-[10px] leading-none opacity-70">
        {weekdayLabel}
      </span>
    </Button>
  );
}

export { Calendar, CalendarDayButton };

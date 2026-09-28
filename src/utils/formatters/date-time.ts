type FormatterLocale = "fa" | "en";

const localeMap: Record<FormatterLocale, string> = {
  fa: "fa-IR",
  en: "en-US",
};

export function formatDate(
  value: string | Date,
  locale: FormatterLocale = "en",
): string {
  return new Intl.DateTimeFormat(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function formatTime(
  value: string | Date,
  locale: FormatterLocale = "en",
): string {
  return new Intl.DateTimeFormat(localeMap[locale], {
    hour: "numeric",
    minute: "2-digit",
    hour12: locale === "en",
  }).format(new Date(value));
}

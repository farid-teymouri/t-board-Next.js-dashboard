export function formatNumber(
  value: number,
  locale: "fa" | "en" = "en",
): string {
  const formatted = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  ).format(value);

  if (locale === "fa") {
    return formatted.replace(/٫/g, "/");
  }

  return formatted;
}

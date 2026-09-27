export type NumberFormatStyle = "default" | "compact" | "decimal";

export function formatNumber(
  value: number,
  locale: "fa" | "en" = "en",
  style: NumberFormatStyle = "default",
): string {
  if (style === "compact" && Math.abs(value) >= 1000) {
    const compactValue = value / 1000;
    const roundedValue = Math.round(compactValue * 10) / 10;

    const formatted = new Intl.NumberFormat(
      locale === "fa" ? "fa-IR" : "en-US",
      { maximumFractionDigits: 1 },
    ).format(roundedValue);

    if (locale === "fa") {
      return `${formatted.replace(/٫/g, "/")} هزار`;
    }

    return `${formatted}K`;
  }

  const formatted = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
    style === "decimal" ? { maximumFractionDigits: 2 } : undefined,
  ).format(value);

  if (locale === "fa") {
    return formatted.replace(/٫/g, "/");
  }

  return formatted;
}

export function formatInputNumber(
  value: string | number,
  locale: "fa" | "en" = "en",
): string {
  if (value === "") {
    return "";
  }

  const normalized = String(value)
    .replace(/,/g, "")
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));

  const numericValue = Number(normalized);

  if (!Number.isFinite(numericValue)) {
    return "";
  }

  return formatNumber(numericValue, locale);
}

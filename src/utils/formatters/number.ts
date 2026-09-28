export type NumberFormatStyle = "default" | "compact" | "decimal";

function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

export function sanitizeNumber(value: string, allowDecimal: boolean): string {
  const normalized = normalizeDigits(value).replace(/,/g, "").replace(/٬/g, "");

  if (!allowDecimal) {
    return normalized.replace(/\D/g, "");
  }

  const sanitized = normalized.replace(/[^\d.]/g, "");
  const [integerPart, ...decimalParts] = sanitized.split(".");

  if (decimalParts.length === 0) {
    return integerPart;
  }

  return `${integerPart}.${decimalParts.join("")}`;
}

export function parseNumber(value: string): number {
  if (!value) {
    return 0;
  }

  const normalized = normalizeDigits(value)
    .replace(/,/g, "")
    .replace(/٬/g, "")
    .trim();

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

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

const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];

const teens = [
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
];

const tens = [
  "",
  "",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];

const hundreds = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];

const scales = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

function threeDigitToWords(value: number): string {
  const parts: string[] = [];

  const hundred = Math.floor(value / 100);
  const remainder = value % 100;

  if (hundred > 0) {
    parts.push(hundreds[hundred]);
  }

  if (remainder > 0 && remainder < 10) {
    parts.push(ones[remainder]);
  } else if (remainder >= 10 && remainder < 20) {
    parts.push(teens[remainder - 10]);
  } else if (remainder >= 20) {
    parts.push(tens[Math.floor(remainder / 10)]);

    if (remainder % 10 > 0) {
      parts.push(ones[remainder % 10]);
    }
  }

  return parts.join(" و ");
}

export function numberToPersianWords(value: number): string {
  if (value === 0) {
    return "صفر";
  }

  if (value < 0) {
    return `منفی ${numberToPersianWords(Math.abs(value))}`;
  }

  const parts: string[] = [];

  let remaining = Math.floor(value);
  let scaleIndex = 0;

  while (remaining > 0) {
    const group = remaining % 1000;

    if (group > 0) {
      const words = threeDigitToWords(group);
      const scale = scales[scaleIndex];

      parts.unshift(scale ? `${words} ${scale}` : words);
    }

    remaining = Math.floor(remaining / 1000);
    scaleIndex += 1;
  }

  return parts.join(" و ");
}

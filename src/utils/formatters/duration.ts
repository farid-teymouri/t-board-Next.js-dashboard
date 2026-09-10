import { formatNumber } from "./number";

export function formatDuration(
  seconds: number,
  locale: "fa" | "en" = "en",
): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (locale === "fa") {
    const parts: string[] = [];

    if (minutes > 0) {
      parts.push(`${formatNumber(minutes, "fa")} دقیقه`);
    }

    if (remainingSeconds > 0) {
      parts.push(`${formatNumber(remainingSeconds, "fa")} ثانیه`);
    }

    return parts.join(" ");
  }

  const parts: string[] = [];

  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }

  if (remainingSeconds > 0) {
    parts.push(`${remainingSeconds}s`);
  }

  return parts.join(" ");
}

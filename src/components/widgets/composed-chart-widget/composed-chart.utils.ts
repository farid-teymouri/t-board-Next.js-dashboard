export function formatChartValue(value: number, locale: "fa" | "en") {
  const formatted =
    value >= 1000
      ? `${(value / 1000).toFixed(1).replace(".0", "")}${
          locale === "fa" ? " هزار" : "k"
        }`
      : value.toString();

  if (locale === "fa") {
    return formatted.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
  }

  return formatted;
}

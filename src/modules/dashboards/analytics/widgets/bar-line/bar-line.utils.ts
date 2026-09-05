const englishMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export function formatValue(value: number, locale: "en" | "fa") {
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

export function getMonthLabel(month: number, locale: "en" | "fa") {
  const months = locale === "fa" ? persianMonths : englishMonths;

  return months[month - 1];
}

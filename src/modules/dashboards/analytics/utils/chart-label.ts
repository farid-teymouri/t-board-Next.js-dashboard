const monthLabels = {
  en: {
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
  },

  fa: {
    jan: "فروردین",
    feb: "اردیبهشت",
    mar: "خرداد",
    apr: "تیر",
    may: "مرداد",
    jun: "شهریور",
    jul: "مهر",
    aug: "آبان",
    sep: "آذر",
    oct: "دی",
    nov: "بهمن",
    dec: "اسفند",
  },
} as const;

const weekLabels = {
  en: {
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
  },

  fa: {
    mon: "دوشنبه",
    tue: "سه‌شنبه",
    wed: "چهارشنبه",
    thu: "پنجشنبه",
    fri: "جمعه",
    sat: "شنبه",
    sun: "یکشنبه",
  },
} as const;

export function getAcquisitionChartLabel(
  period: "week" | "month" | "year",
  key: string,
  locale: "fa" | "en",
) {
  if (period === "year") {
    return key;
  }

  if (period === "month") {
    return monthLabels[locale][key as keyof typeof monthLabels.en] ?? key;
  }

  return weekLabels[locale][key as keyof typeof weekLabels.en] ?? key;
}

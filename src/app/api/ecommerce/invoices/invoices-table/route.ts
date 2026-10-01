import { NextResponse } from "next/server";
import type {
  Invoice,
  InvoiceTabCount,
} from "@/modules/ecommerce/invoices/widgets/invoices-table/types";

const invoiceClients = [
  {
    firstName: { fa: "سارا", en: "Sara" },
    lastName: { fa: "احمدی", en: "Ahmadi" },
    email: "sara.ahmadi@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "نگار", en: "Negar" },
    lastName: { fa: "محمدی", en: "Mohammadi" },
    email: "negar.mohammadi@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "مریم", en: "Maryam" },
    lastName: { fa: "رضایی", en: "Rezaei" },
    email: "maryam.rezaei@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "الهام", en: "Elham" },
    lastName: { fa: "کریمی", en: "Karimi" },
    email: "elham.karimi@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "نیلوفر", en: "Niloufar" },
    lastName: { fa: "حسینی", en: "Hosseini" },
    email: "niloufar.hosseini@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "مهسا", en: "Mahsa" },
    lastName: { fa: "مرادی", en: "Moradi" },
    email: "mahsa.moradi@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "ترانه", en: "Taraneh" },
    lastName: { fa: "اکبری", en: "Akbari" },
    email: "taraneh.akbari@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "نازنین", en: "Nazanin" },
    lastName: { fa: "حیدری", en: "Heydari" },
    email: "nazanin.heydari@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "آیدا", en: "Aida" },
    lastName: { fa: "مرادی", en: "Moradi" },
    email: "aida.moradi@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "سحر", en: "Sahar" },
    lastName: { fa: "صادقی", en: "Sadeghi" },
    email: "sahar.sadeghi@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "ریحانه", en: "Reyhaneh" },
    lastName: { fa: "موسوی", en: "Mousavi" },
    email: "reyhaneh.mousavi@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "پریناز", en: "Parinaz" },
    lastName: { fa: "جعفری", en: "Jafari" },
    email: "parinaz.jafari@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "شیما", en: "Shima" },
    lastName: { fa: "نوری", en: "Nouri" },
    email: "shima.nouri@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "ستاره", en: "Setareh" },
    lastName: { fa: "قاسمی", en: "Ghasemi" },
    email: "setareh.ghasemi@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "رویا", en: "Roya" },
    lastName: { fa: "کاظمی", en: "Kazemi" },
    email: "roya.kazemi@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "فرزانه", en: "Farzaneh" },
    lastName: { fa: "رحیمی", en: "Rahimi" },
    email: "farzaneh.rahimi@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "لیلا", en: "Leila" },
    lastName: { fa: "عباسی", en: "Abbasi" },
    email: "leila.abbasi@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "مونا", en: "Mona" },
    lastName: { fa: "یوسفی", en: "Yousefi" },
    email: "mona.yousefi@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "شبنم", en: "Shabnam" },
    lastName: { fa: "عزیزی", en: "Azizi" },
    email: "shabnam.azizi@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "آرزو", en: "Arezo" },
    lastName: { fa: "رستمی", en: "Rostami" },
    email: "arezo.roostami@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "پریسا", en: "Parisa" },
    lastName: { fa: "نوروزی", en: "Norouzi" },
    email: "parisa.norouzi@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "هدیه", en: "Hedieh" },
    lastName: { fa: "توکلی", en: "Tavakoli" },
    email: "hedieh.tavakoli@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "کیمیا", en: "Kimia" },
    lastName: { fa: "شریفی", en: "Sharifi" },
    email: "kimia.sharifi@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "آتنا", en: "Atena" },
    lastName: { fa: "نعمتی", en: "Nemati" },
    email: "atena.nemati@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "باران", en: "Baran" },
    lastName: { fa: "قنبری", en: "Ghanbari" },
    email: "baran.ghanbari@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "سودابه", en: "Soudabeh" },
    lastName: { fa: "رجبی", en: "Rajabi" },
    email: "soudabeh.rajabi@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "نگین", en: "Negin" },
    lastName: { fa: "زارعی", en: "Zarei" },
    email: "negin.zarei@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "محدثه", en: "Mohaddeseh" },
    lastName: { fa: "اسماعیلی", en: "Esmaeili" },
    email: "mohaddeseh.esmaeili@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "یگانه", en: "Yeganeh" },
    lastName: { fa: "رستگار", en: "Rostegar" },
    email: "yeganeh.rostegar@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "هانیه", en: "Hanieh" },
    lastName: { fa: "زارعی", en: "Zarei" },
    email: "hanieh.zarei@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "بهاره", en: "Bahareh" },
    lastName: { fa: "مهدوی", en: "Mahdavi" },
    email: "bahareh.mahdavi@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "آناهیتا", en: "Anahita" },
    lastName: { fa: "فتحی", en: "Fathi" },
    email: "anahita.fathi@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "سپیده", en: "Sepideh" },
    lastName: { fa: "رستمی", en: "Rostami" },
    email: "sepideh.rostami@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "سمیه", en: "Somayeh" },
    lastName: { fa: "کریمی", en: "Karimi" },
    email: "somayeh.karimi@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "مینا", en: "Mina" },
    lastName: { fa: "هاشمی", en: "Hashemi" },
    email: "mina.hashemi@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "فرناز", en: "Farnaz" },
    lastName: { fa: "بهرامی", en: "Behrami" },
    email: "farnaz.behrami@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "آزاده", en: "Azadeh" },
    lastName: { fa: "نصیری", en: "Nasiri" },
    email: "azadeh.nasiri@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "مهتاب", en: "Mahtab" },
    lastName: { fa: "اکبری", en: "Akbari" },
    email: "mahtab.akbari@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "شادی", en: "Shadi" },
    lastName: { fa: "زمانی", en: "Zamani" },
    email: "shadi.zamani@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "مژگان", en: "Mojgan" },
    lastName: { fa: "بابایی", en: "Babaei" },
    email: "mojgan.babaei@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "راحله", en: "Raheleh" },
    lastName: { fa: "امینی", en: "Amini" },
    email: "raheleh.amini@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "غزل", en: "Ghazal" },
    lastName: { fa: "محمودی", en: "Mahmoudi" },
    email: "ghazal.mahmoudi@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "نسترن", en: "Nastaran" },
    lastName: { fa: "حبیبی", en: "Habibi" },
    email: "nastaran.habibi@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "الناز", en: "Elnaz" },
    lastName: { fa: "مرادی", en: "Moradi" },
    email: "elnaz.moradi@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "سارا", en: "Sara" },
    lastName: { fa: "کمالی", en: "Kamali" },
    email: "sara.kamali@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "مریم", en: "Maryam" },
    lastName: { fa: "نوروزی", en: "Norouzi" },
    email: "maryam.norouzi@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "نگار", en: "Negar" },
    lastName: { fa: "کاظمی", en: "Kazemi" },
    email: "negar.kazemi@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "لیلا", en: "Leila" },
    lastName: { fa: "رضوانی", en: "Rezvani" },
    email: "leila.rezvani@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "هلیا", en: "Heyla" },
    lastName: { fa: "شمس", en: "Shams" },
    email: "heyla.shams@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "کیانا", en: "Kiana" },
    lastName: { fa: "صالحی", en: "Salehi" },
    email: "kiana.salehi@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
  {
    firstName: { fa: "سارا", en: "Sara" },
    lastName: { fa: "جهانی", en: "Jahani" },
    email: "sara.jahani@example.com",
    avatarColor: "bg-chart-4/15 text-chart-4",
  },
  {
    firstName: { fa: "محمد", en: "Mohammad" },
    lastName: { fa: "احمدی", en: "Ahmadi" },
    email: "mohammad.ahmadi@example.com",
    avatarColor: "bg-chart-2/15 text-chart-2",
  },
  {
    firstName: { fa: "علی", en: "Ali" },
    lastName: { fa: "رضایی", en: "Rezaei" },
    email: "ali.rezaei@example.com",
    avatarColor: "bg-chart-5/15 text-chart-5",
  },
  {
    firstName: { fa: "امیر", en: "Amir" },
    lastName: { fa: "حسینی", en: "Hosseini" },
    email: "amir.hosseini@example.com",
    avatarColor: "bg-chart-3/15 text-chart-3",
  },
  {
    firstName: { fa: "رضا", en: "Reza" },
    lastName: { fa: "کریمی", en: "Karimi" },
    email: "reza.karimi@example.com",
    avatarColor: "bg-chart-1/15 text-chart-1",
  },
];

const statuses: Invoice["status"][] = [
  "paid",
  "unpaid",
  "paid",
  "paid",
  "overdue",
  "paid",
  "draft",
  "paid",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "overdue",
  "paid",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "draft",
  "paid",
  "paid",
  "overdue",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "paid",
  "overdue",
  "paid",
  "draft",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "paid",
  "unpaid",
  "paid",
  "overdue",
  "paid",
  "paid",
  "paid",
  "draft",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "overdue",
  "paid",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "paid",
  "draft",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "overdue",
  "paid",
  "paid",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "unpaid",
  "paid",
  "paid",
  "paid",
  "paid",
];

const amounts = [
  12_800_000, 18_500_000, 24_750_000, 31_900_000, 38_400_000, 42_500_000,
  46_800_000, 51_200_000, 57_900_000, 63_500_000, 68_200_000, 72_400_000,
  79_500_000, 84_200_000, 91_500_000, 96_800_000, 104_500_000, 112_000_000,
  126_500_000, 138_000_000,
];

const overdueDaysList = [9, 14, 6, 21, 4, 12, 17];
const paidAtOffsets = [2, 4, 6, 8, 10, 12, 15, 18, 21, 24, 27];

let overdueIndex = 0;
let paidAtIndex = 0;

const invoices: Invoice[] = statuses.map((status, index) => {
  const client = invoiceClients[index % invoiceClients.length];
  const amount = amounts[index % amounts.length];

  const issueDate = new Date(2026, 8, 1 + index); // ۱ شهریور به بعد
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + 14);

  let overdueDays = 0;
  if (status === "overdue") {
    overdueDays = overdueDaysList[overdueIndex % overdueDaysList.length];
    overdueIndex += 1;
    dueDate.setDate(dueDate.getDate() - overdueDays);
  }

  let paidAt: string | undefined;
  if (status === "paid") {
    const paidDate = new Date(issueDate);
    paidDate.setDate(
      paidDate.getDate() + paidAtOffsets[paidAtIndex % paidAtOffsets.length],
    );
    paidAt = paidDate.toISOString();
    paidAtIndex += 1;
  }

  return {
    id: `INV-2026-${String(index + 1).padStart(4, "0")}`,
    client,
    issueDate: issueDate.toISOString(),
    dueDate: dueDate.toISOString(),
    paidAt,
    overdueDays,
    amount,
    currency: "IRT",
    status,
  };
});

// ─── تاریخ مرجع (۱ مهر ۱۴۰۵) ───────────────────────────────────────────────
const summaryReferenceDate = new Date(2026, 9, 1); // ۱ اکتبر ۲۰۲۶

const currentPeriodStart = new Date(summaryReferenceDate);
currentPeriodStart.setDate(currentPeriodStart.getDate() - 30);

const previousPeriodStart = new Date(currentPeriodStart);
previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);

const previousPeriodEnd = new Date(currentPeriodStart);

// ─── توابع کمکی ────────────────────────────────────────────────────────────
const getPercentageChange = (current: number, previous: number) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
};

const getChangeDirection = (change: number): "up" | "down" =>
  change >= 0 ? "up" : "down";

// ─── محاسبه paid در ۳۰ روز اخیر (بر اساس issueDate – همان منطق دیتاتیبل) ───
const filterByIssueDate = (start: Date, end: Date) =>
  invoices.filter((inv) => {
    const d = new Date(inv.issueDate);
    return d >= start && d < end;
  });

const currentPeriodInvoices = filterByIssueDate(
  currentPeriodStart,
  summaryReferenceDate,
);
const previousPeriodInvoices = filterByIssueDate(
  previousPeriodStart,
  previousPeriodEnd,
);

const currentPaidAmount = currentPeriodInvoices
  .filter((inv) => inv.status === "paid")
  .reduce((sum, inv) => sum + inv.amount, 0);

const previousPaidAmount = previousPeriodInvoices
  .filter((inv) => inv.status === "paid")
  .reduce((sum, inv) => sum + inv.amount, 0);

const paidChange = getPercentageChange(currentPaidAmount, previousPaidAmount);

// ─── outstanding (بر اساس dueDate) ─────────────────────────────────────────
const getOutstandingAmount = (start: Date, end: Date) =>
  invoices
    .filter((inv) => inv.status === "unpaid" || inv.status === "overdue")
    .filter((inv) => {
      const d = new Date(inv.dueDate);
      return d >= start && d < end;
    })
    .reduce((sum, inv) => sum + inv.amount, 0);

const currentOutstandingAmount = getOutstandingAmount(
  currentPeriodStart,
  summaryReferenceDate,
);
const previousOutstandingAmount = getOutstandingAmount(
  previousPeriodStart,
  previousPeriodEnd,
);
const outstandingChange = getPercentageChange(
  currentOutstandingAmount,
  previousOutstandingAmount,
);

// ─── مقادیر کلی (بدون فیلتر زمانی) ─────────────────────────────────────────
const outstandingInvoices = invoices.filter(
  (inv) => inv.status === "unpaid" || inv.status === "overdue",
);
const outstandingAmount = outstandingInvoices.reduce(
  (sum, inv) => sum + inv.amount,
  0,
);

const overdueInvoices = invoices.filter((inv) => inv.status === "overdue");
const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);

const draftInvoices = invoices.filter((inv) => inv.status === "draft");

// ─── tabs (کاملاً داینامیک از روی دیتا) ────────────────────────────────────
const tabs: InvoiceTabCount[] = [
  { id: "all", count: invoices.length },
  { id: "paid", count: invoices.filter((i) => i.status === "paid").length },
  { id: "unpaid", count: invoices.filter((i) => i.status === "unpaid").length },
  { id: "overdue", count: overdueInvoices.length },
  { id: "draft", count: draftInvoices.length },
];

// ─── API ───────────────────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    summary: {
      currency: "IRT",
      outstanding: {
        amount: currentOutstandingAmount,
        change: Math.abs(outstandingChange),
        direction: getChangeDirection(outstandingChange),
      },
      overdue: {
        amount: overdueAmount,
        count: overdueInvoices.length,
      },
      paid30Days: {
        amount: currentPaidAmount,
        change: Math.abs(paidChange),
        direction: getChangeDirection(paidChange),
      },
      drafts: {
        count: draftInvoices.length,
      },
    },
    tabs,
    invoices,
  });
}

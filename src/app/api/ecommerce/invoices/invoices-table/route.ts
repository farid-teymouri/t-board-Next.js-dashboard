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
  12800000, 18500000, 24750000, 31900000, 38400000, 42500000, 46800000,
  51200000, 57900000, 63500000, 68200000, 72400000, 79500000, 84200000,
  91500000, 96800000, 104500000, 112000000, 126500000, 138000000,
];

const overdueDays = [9, 14, 6, 21, 4, 12, 17];

let overdueIndex = 0;

const invoices: Invoice[] = statuses.map((status, index) => {
  const client = invoiceClients[index % invoiceClients.length];
  const amount = amounts[index % amounts.length];

  const issueDate = new Date(2026, 8, 1 + index);

  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + 14);

  let invoiceOverdueDays = 0;

  if (status === "overdue") {
    invoiceOverdueDays = overdueDays[overdueIndex];
    overdueIndex += 1;

    dueDate.setDate(dueDate.getDate() - invoiceOverdueDays);
  }

  return {
    id: `INV-2026-${String(index + 1).padStart(4, "0")}`,
    client,
    issueDate: issueDate.toISOString(),
    dueDate: dueDate.toISOString(),
    overdueDays: invoiceOverdueDays,
    amount,
    currency: "IRT",
    status,
  };
});

const tabs: InvoiceTabCount[] = [
  {
    id: "all",
    count: 94,
  },
  {
    id: "paid",
    count: 71,
  },
  {
    id: "unpaid",
    count: 11,
  },
  {
    id: "overdue",
    count: 7,
  },
  {
    id: "draft",
    count: 5,
  },
];

export async function GET() {
  return NextResponse.json({
    summary: {
      count: 94,
      overdue: 7,
      amount: 1824000000,
      currency: "IRT",
    },
    tabs,
    invoices,
  });
}

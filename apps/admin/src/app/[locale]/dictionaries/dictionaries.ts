// import { locale } from "next/root-params";
// import { notFound } from "next/navigation";

// const dictionaries = {
//   en: () => import("./en.json").then((module) => module.default),
//   fa: () => import("./fa.json").then((module) => module.default),
// };

// export type Locale = keyof typeof dictionaries;

// export const hasLocale = (locale: string): locale is Locale =>
//   locale in dictionaries;

// export const getDictionary = async () => {
//   const lang = await locale();
//   console.log(lang);

//   if (!hasLocale(lang)) notFound();
//   // return dictionaries[lang]();
//   return lang;
// };

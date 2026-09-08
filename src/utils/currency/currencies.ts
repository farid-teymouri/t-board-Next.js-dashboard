import type { Currency, CurrencyDefinition } from "./types";

export const currencies: Record<Currency, CurrencyDefinition> = {
  IRR: {
    code: "IRR",
    fa: {
      symbol: "ریال",
      name: "ریال",
    },
    en: {
      symbol: "IRR",
      name: "Iranian Rial",
    },
  },

  IRT: {
    code: "IRT",
    fa: {
      symbol: "تومان",
      name: "تومان",
    },
    en: {
      symbol: "IRT",
      name: "Iranian Toman",
    },
  },

  TRY: {
    code: "TRY",
    fa: {
      symbol: "لیر",
      name: "لیر",
    },
    en: {
      symbol: "₺",
      name: "Turkish Lira",
    },
  },

  USD: {
    code: "USD",
    fa: {
      symbol: "دلار",
      name: "دلار",
    },
    en: {
      symbol: "$",
      name: "US Dollar",
    },
  },

  USDT: {
    code: "USDT",
    fa: {
      symbol: "تتر",
      name: "تتر",
    },
    en: {
      symbol: "₮",
      name: "Tether",
    },
  },

  EUR: {
    code: "EUR",
    fa: {
      symbol: "یورو",
      name: "یورو",
    },
    en: {
      symbol: "€",
      name: "Euro",
    },
  },

  GBP: {
    code: "GBP",
    fa: {
      symbol: "پوند",
      name: "پوند",
    },
    en: {
      symbol: "£",
      name: "British Pound",
    },
  },
};

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Check, Languages } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";

const locales = ["fa", "en"] as const;
const defaultLocale = "fa";

type Locale = (typeof locales)[number];

type LanguageSwitcherDictionary = {
  title: string;
  fa: string;
  en: string;
};

type LanguageSwitcherProps = {
  dictionary: LanguageSwitcherDictionary;
};

export function LanguageSwitcher({ dictionary }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean);

  const currentLocale: Locale = locales.includes(segments[0] as Locale)
    ? (segments[0] as Locale)
    : defaultLocale;

  const pathWithoutLocale =
    currentLocale === defaultLocale
      ? pathname
      : pathname.replace(`/${currentLocale}`, "") || "/";

  const createLocalePath = (locale: Locale) => {
    const path =
      locale === defaultLocale
        ? pathWithoutLocale
        : `/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

    const queryString = searchParams.toString();

    return queryString ? `${path}?${queryString}` : path;
  };

  return (
    <Popover>
      <PopoverTrigger
        className="h-8.5 w-8.5"
        render={
          <Button variant="outline" size="icon" aria-label={dictionary.title} />
        }
      >
        <Languages />
      </PopoverTrigger>

      <PopoverPositioner align="center">
        <PopoverContent className="relative top-1 w-44 p-2">
          <div className="grid gap-1">
            <div className="px-2 py-1.5 text-sm font-medium">
              {dictionary.title}
            </div>

            {locales.map((locale) => {
              const isActive = currentLocale === locale;

              return (
                <Link
                  key={locale}
                  href={createLocalePath(locale)}
                  className={buttonVariants({
                    variant: isActive ? "secondary" : "ghost",
                    className: isActive
                      ? "w-full justify-between"
                      : "w-full justify-between hover:bg-accent!",
                  })}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{dictionary[locale]}</span>

                  {isActive && <Check className="size-4" />}
                </Link>
              );
            })}
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}

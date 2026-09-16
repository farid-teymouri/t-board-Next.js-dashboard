"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export function SidebarLogo() {
  const params = useParams<{ locale: "fa" | "en" }>();
  const locale = params.locale;

  return (
    <Link
      href={`/${locale}`}
      aria-label="T-Board"
      className="flex shrink-0 items-center gap-2"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="6" className="fill-primary"></rect>

        <rect
          x="13.5"
          y="5"
          width="5"
          height="16"
          rx="1.2"
          className="fill-primary-foreground"
        ></rect>

        <rect
          x="7"
          y="5"
          width="18"
          height="5"
          rx="1.5"
          className="fill-primary-foreground"
        ></rect>

        <rect
          x="6"
          y="14"
          width="5"
          height="5"
          rx="1.2"
          className="fill-primary-foreground"
        ></rect>
        <rect
          x="6"
          y="20.5"
          width="5"
          height="5"
          rx="1.2"
          className="fill-primary-foreground"
        ></rect>

        <rect
          x="21"
          y="14"
          width="5"
          height="5"
          rx="1.2"
          className="fill-primary-foreground"
        ></rect>
        <rect
          x="21"
          y="20.5"
          width="5"
          height="5"
          rx="1.2"
          className="fill-primary-foreground"
        ></rect>

        <rect
          x="11.5"
          y="25"
          width="9"
          height="2.2"
          rx="1"
          className="fill-primary-foreground"
        ></rect>
      </svg>
      <span className="text-base font-semibold tracking-tight">T-Board</span>
    </Link>
  );
}

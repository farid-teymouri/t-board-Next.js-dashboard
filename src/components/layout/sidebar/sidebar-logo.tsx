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
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="26"
          height="26"
          rx="8"
          className="fill-primary"
        />

        <path
          d="M10 11H22M16 11V22"
          className="stroke-primary-foreground"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <span className="text-base font-semibold tracking-tight">T-Board</span>
    </Link>
  );
}

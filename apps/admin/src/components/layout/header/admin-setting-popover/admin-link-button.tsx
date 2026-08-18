import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import type { ReactNode } from "react";

type AdminLinkButtonProps = {
  text: string;
  href: string;
  socialBadge?: string;
  variant:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  children: ReactNode;
};

export function AdminLinkButton({
  children,
  socialBadge,
  variant,
  text,
  href,
}: AdminLinkButtonProps) {
  const content = (
    <>
      {children}
      <span className="text-sm font-medium">{text}</span>
    </>
  );

  return (
    <Link
      href={href}
      className={`${buttonVariants({ variant, size: "sm" })} flex w-full items-center gap-3 p-6`}
    >
      <div className="flex flex-1 items-center gap-3">{content}</div>

      {socialBadge && (
        <Badge className="block bg-red-50 text-sky-700 dark:bg-sky-800 dark:text-sky-100">
          {socialBadge}
        </Badge>
      )}
    </Link>
  );
}

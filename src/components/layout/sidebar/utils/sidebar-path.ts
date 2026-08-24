export function createLocalePath(href: string, locale: "fa" | "en") {
  if (href === "/") {
    return locale === "fa" ? "/" : "/en";
  }

  return locale === "fa" ? href : `/en${href}`;
}

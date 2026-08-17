"use client";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const pageTitle = getPageTitle(pathname);

  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Open navigation"
        >
          ☰
        </button>

        <div>
          <div className="breadcrumb">
            Administration
            <span>/</span>
            <span>{pageTitle}</span>
          </div>

          <h1>{pageTitle}</h1>
        </div>
      </div>

      <div className="header-actions">
        <button type="button" className="header-action" aria-label="Search">
          ⌕
        </button>

        <button
          type="button"
          className="header-action notification-button"
          aria-label="Notifications"
        >
          ♢<span className="notification-badge">3</span>
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">FT</div>

          <div className="admin-profile-info">
            <strong>Farid Teymouri</strong>
            <span>Super Admin</span>
          </div>

          <span className="profile-chevron">⌄</span>
        </div>
      </div>
    </header>
  );
}

function getPageTitle(pathname: string) {
  if (pathname === "/") {
    return "Dashboard";
  }

  const segment = pathname.split("/").filter(Boolean).at(-1);

  if (!segment) {
    return "Dashboard";
  }

  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

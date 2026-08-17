"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/",
        icon: "⌂",
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        label: "Music",
        href: "/music",
        icon: "♫",
      },
      {
        label: "Artists",
        href: "/artists",
        icon: "♬",
      },
      {
        label: "Albums",
        href: "/albums",
        icon: "▣",
      },
      {
        label: "Playlists",
        href: "/playlists",
        icon: "☷",
      },
      {
        label: "Media",
        href: "/media",
        icon: "▶",
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        label: "Forum",
        href: "/community/forum",
        icon: "◉",
      },
      {
        label: "Moderation",
        href: "/community/moderation",
        icon: "⚑",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Users",
        href: "/users",
        icon: "♙",
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: "⌁",
      },
      {
        label: "Finance",
        href: "/finance",
        icon: "$",
      },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      {
        label: "Servers",
        href: "/infrastructure/servers",
        icon: "▥",
      },
      {
        label: "Storage",
        href: "/infrastructure/storage",
        icon: "▤",
      },
      {
        label: "System Health",
        href: "/infrastructure/health",
        icon: "♥",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Security",
        href: "/security",
        icon: "◇",
      },
      {
        label: "Audit Logs",
        href: "/audit-logs",
        icon: "≡",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: "⚙",
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">M</div>

        <div>
          <strong>Music</strong>
          <span>Administration</span>
        </div>
      </div>

      <nav className="sidebar-navigation">
        {navigation.map((section) => (
          <div className="navigation-section" key={section.title}>
            <div className="navigation-section-title">{section.title}</div>

            <div className="navigation-items">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`navigation-item ${isActive ? "active" : ""}`}
                  >
                    <span className="navigation-icon">{item.icon}</span>

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="system-status">
          <span className="status-dot" />

          <div>
            <strong>All systems operational</strong>
            <span>System status</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

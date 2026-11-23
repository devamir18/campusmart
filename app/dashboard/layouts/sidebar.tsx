"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type IconName =
  | "overview"
  | "orders"
  | "products"
  | "earnings"
  | "store"
  | "notifications"
  | "help"
  | "users"
  | "saved"
  | "payments"
  | "addresses"
  | "reports"
  | "settings";

type DashboardType = "seller" | "buyer" | "admin";

type NavigationItem = {
  label: string;
  icon: IconName;
  href?: string;
};

type SidebarProps = {
  dashboardType?: DashboardType;
  activeItem?: string;
};

const navigationByDashboard: Record<DashboardType, NavigationItem[]> = {
  seller: [
    { label: "Overview", icon: "overview", href: "/dashboard/page"},
    { label: "Orders", icon: "orders", href: "/dashboard/pages/orders" },
    { label: "Products", icon: "products", href: "/dashboard/pages/product"  },
    { label: "Earnings", icon: "earnings", href: "/dashboard/pages/earning"  },
    { label: "Store profile", icon: "store", href: "/dashboard/pages/store" },
    { label: "Notifications", icon: "notifications", href: "/dashboard/pages/notifications" },
    { label: "Help and support", icon: "help", href: "/dashboard/pages/support" },
  ],
  buyer: [
    { label: "Overview", icon: "overview" },
    { label: "My orders", icon: "orders" },
    { label: "Saved items", icon: "saved" },
    { label: "Payments", icon: "payments" },
    { label: "Addresses", icon: "addresses" },
    { label: "Notifications", icon: "notifications" },
    { label: "Help and support", icon: "help" },
  ],
  admin: [
    { label: "Overview", icon: "overview" },
    { label: "Users", icon: "users" },
    { label: "Sellers", icon: "store" },
    { label: "Orders", icon: "orders" },
    { label: "Products", icon: "products" },
    { label: "Reports", icon: "reports" },
    { label: "Settings", icon: "settings" },
  ],
};

const iconPaths: Record<IconName, string> = {
  overview: "M3 10.5 12 3l9 7.5M5 9v11h14V9M9 20v-6h6v6",
  orders: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  products: "m3 7 9-4 9 4-9 4-9-4ZM3 7v10l9 4 9-4V7M12 11v10",
  earnings: "M12 2v20m5-16H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  store: "M3 10h18M5 10v10h14V10M3 10l2-7h14l2 7M9 20v-6h6v6",
  notifications:
    "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4",
  help: "M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 5m.1 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6-7.9a4 4 0 0 1 0 7.8m2 4h2a2 2 0 0 1 2 2v2",
  saved: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z",
  payments:
    "M2 7h20M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 9h5",
  addresses:
    "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  reports: "M3 3v18h18M8 15l4-4 4 3 5-7",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v3m0 14v3M4.2 4.2l2.1 2.1m9.4 9.4 2.1 2.1M2 12h3m14 0h3M4.2 19.8l2.1-2.1m9.4-9.4 2.1-2.1",
};

function SidebarIcon({
  name,
  active,
}: {
  name: IconName;
  active: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-5 shrink-0 ${
        active ? "text-white" : "text-blue-600"
      }`}
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

export default function Sidebar({
  dashboardType = "seller",
  activeItem = "Overview",
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const items = navigationByDashboard[dashboardType];

  return (
    <aside className="w-full flex-none md:sticky md:top-0 md:h-screen md:w-60">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 md:hidden">
        <Link href="/" aria-label="Campus Marketplace home">
          <Image
            src="/image/campuslogo.svg"
            alt="Campus Marketplace"
            width={180}
            height={32}
            priority
            className="h-auto w-36"
          />
        </Link>
        <button
          type="button"
          aria-label={isOpen ? "Close dashboard navigation" : "Open dashboard navigation"}
          aria-expanded={isOpen}
          aria-controls="dashboard-sidebar-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-blue-600 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-6"
          >
            {isOpen ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="dashboard-sidebar-navigation"
        className={`${isOpen ? "block" : "hidden"} border-b border-gray-200 bg-white px-4 py-4 md:block md:h-full md:border-b-0 md:border-r md:px-5 md:py-4`}
      >
        <Link
          href="/"
          aria-label="Campus Marketplace home"
          className="mb-8 hidden md:inline-flex"
        >
          <Image
            src="/image/campuslogo.svg"
            alt="Campus Marketplace"
            width={180}
            height={32}
            priority
            className="h-auto w-36 px-2 py-4"
          />
        </Link>

        <nav aria-label={`${dashboardType} dashboard navigation`}>
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = item.label === activeItem;

              return (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                        isActive
                          ? "bg-blue-600 font-semibold text-white"
                          : "text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <SidebarIcon name={item.icon} active={isActive} />
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                        isActive
                          ? "bg-blue-600 font-semibold text-white"
                          : "text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <SidebarIcon name={item.icon} active={isActive} />
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

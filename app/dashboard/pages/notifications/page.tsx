"use client";

import { useState } from "react";
import Sidebar from "../../layouts/sidebar";
import Top from "../../layouts/top";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  category: "Orders" | "Payments" | "Products";
  unread: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New order received",
    message: "Order 1054 is waiting for you to review.",
    time: "2 minutes ago",
    category: "Orders",
    unread: true,
  },
  {
    id: 2,
    title: "Order ready for pickup",
    message: "Order 1050 has been marked ready.",
    time: "20 minutes ago",
    category: "Orders",
    unread: true,
  },
  {
    id: 3,
    title: "Payout processed",
    message: "Your recent payout has been sent to your bank.",
    time: "Yesterday",
    category: "Payments",
    unread: false,
  },
  {
    id: 4,
    title: "Check your product stock",
    message: "Some products may need a stock update.",
    time: "2 days ago",
    category: "Products",
    unread: false,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;
  const visibleNotifications = notifications.filter(
    (notification) => filter === "all" || notification.unread
  );

  function markAsRead(id: number) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false }))
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <Sidebar dashboardType="seller" activeItem="Notifications" />
      <main className="min-h-screen min-w-0 flex-1">
        <Top />
        <section className="space-y-5 px-4 py-6 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 md:text-2xl">
                Notifications
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                You have {unreadCount} unread{" "}
                {unreadCount === 1 ? "notification" : "notifications"}.
              </p>
            </div>
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Mark all as read
            </button>
          </div>

          <div className="flex gap-2 px-3">
            {(["all", "unread"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  filter === value
                    ? "bg-blue-950 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {value === "all" ? "All" : `Unread (${unreadCount})`}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            {visibleNotifications.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {visibleNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`flex flex-wrap items-start justify-between gap-4 p-5 ${
                      notification.unread ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex min-w-0 gap-3">
                      <span
                        aria-hidden="true"
                        className={`mt-1.5 size-2 shrink-0 rounded-full ${
                          notification.unread ? "bg-blue-600" : "bg-transparent"
                        }`}
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold text-gray-900">
                            {notification.title}
                          </h2>
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                            {notification.category}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.message}
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    {notification.unread && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        className="ml-5 text-sm font-semibold text-blue-700 hover:text-blue-900"
                      >
                        Mark as read
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-12 text-center">
                <h2 className="font-semibold text-gray-900">
                  You're all caught up
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  There are no unread notifications.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

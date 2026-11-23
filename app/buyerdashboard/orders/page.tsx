"use client";

import Image from "next/image";
import Link from "next/link";
import Top from "../layout/top";
import { useBuyerOrders, type BuyerOrderStatus } from "../orders-context";
import { formatNaira } from "../product-data";

function getStatusLabel(status: BuyerOrderStatus) {
  if (status === "on-the-way") {
    return "On the way";
  }
  if (status === "delivered") {
    return "Delivered";
  }
  return "Seller preparing";
}

export default function BuyerOrdersPage() {
  const { orders } = useBuyerOrders();

  return (
    <div className="min-h-screen bg-slate-50">
      <Top />
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-slate-500">
          <Link href="/buyerdashboard" className="hover:text-blue-700">
            Marketplace
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="font-medium text-slate-900">
            My orders
          </span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My orders</h1>
            <p className="mt-1 text-sm text-slate-600">
              Track your orders and confirm delivery.
            </p>
          </div>
          <Link
            href="/buyerdashboard"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Continue shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No orders yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Orders you place will appear here with their latest tracking status.
            </p>
            <Link
              href="/buyerdashboard"
              className="mt-5 inline-flex rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Browse products
            </Link>
          </section>
        ) : (
          <ul className="mt-6 space-y-4">
            {orders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/buyerdashboard/orders/${order.id}`}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:items-center sm:p-5"
                >
                  <Image
                    src={order.items[0].image}
                    alt={order.items[0].imageAlt}
                    width={72}
                    height={72}
                    className="size-[72px] rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-slate-900">
                        Order {order.id}
                      </h2>
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-800">
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {order.storeName} · {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {order.fulfillment === "delivery"
                        ? "Delivery"
                        : "Pickup"}{" "}
                      · {new Date(order.placedAt).toLocaleString("en-NG")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <span className="font-bold text-slate-900">
                      {formatNaira(order.total)}
                    </span>
                    <span className="text-xs font-semibold text-blue-700">
                      Track order →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

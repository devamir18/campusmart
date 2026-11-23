"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import Top from "../../layout/top";
import { useBuyerOrders, type BuyerOrderStatus } from "../../orders-context";
import { formatNaira } from "../../product-data";

const STEPS: { id: BuyerOrderStatus | "placed"; label: string }[] = [
  { id: "placed", label: "Order placed" },
  { id: "preparing", label: "Seller preparing" },
  { id: "on-the-way", label: "On the way" },
  { id: "delivered", label: "Delivered" },
];

function getStatusIndex(status: BuyerOrderStatus) {
  return STEPS.findIndex((step) => step.id === status);
}

function getStatusLabel(status: BuyerOrderStatus) {
  if (status === "on-the-way") {
    return "On the way";
  }
  if (status === "delivered") {
    return "Delivered";
  }
  return "Seller preparing";
}

function formatTime(timestamp: number | null) {
  if (timestamp === null) {
    return "Soon";
  }

  return new Date(timestamp).toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function OrderTracking({ orderId }: { orderId: string }) {
  const { orders, advanceDemoOrder, confirmDemoDelivery } = useBuyerOrders();
  const order = orders.find((item) => item.id === orderId);
  const [isReporting, setIsReporting] = useState(false);
  const [problem, setProblem] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Top />
        <main className="mx-auto max-w-3xl px-4 py-12 text-center md:px-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Order not found
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Demo orders are kept for this browsing session only. Place an order
            again if this page was refreshed.
          </p>
          <Link
            href="/buyerdashboard/orders"
            className="mt-5 inline-flex rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Back to my orders
          </Link>
        </main>
      </div>
    );
  }

  const currentStep = getStatusIndex(order.status);
  const itemCount = order.items.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const isDelivered = order.status === "delivered";
  const locationLabel =
    order.fulfillment === "delivery" ? "Delivery address" : "Pickup point";

  function advanceStatus() {
    advanceDemoOrder(orderId);
    setFeedbackMessage("Demo tracking status updated.");
  }

  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!problem.trim()) {
      setReportMessage("Describe the issue before submitting.");
      return;
    }

    setReportMessage(
      "Your report is saved in this demo only. Contact the seller directly for help."
    );
    setProblem("");
    setIsReporting(false);
  }

  function confirmDelivery() {
    confirmDemoDelivery(orderId);
    setFeedbackMessage("Delivery confirmed in this demo.");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Top />
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-slate-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/buyerdashboard/orders" className="hover:text-blue-700">
                My orders
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-slate-900">
              Order {order.id}
            </li>
          </ol>
        </nav>

        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              Order {order.id}
            </h1>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold text-indigo-800">
              {getStatusLabel(order.status)}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Placed today at {formatTime(order.placedAt)}
          </p>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)]">
          <div className="space-y-4">
            <section
              aria-labelledby="order-progress-title"
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <h2
                id="order-progress-title"
                className="text-sm font-bold text-slate-900"
              >
                Order progress
              </h2>
              <ol className="relative mt-7 grid grid-cols-4">
                <li
                  aria-hidden="true"
                  className="absolute left-[12.5%] right-[12.5%] top-3 z-0 h-1 list-none rounded-full bg-slate-200"
                >
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </li>
                {STEPS.map((step, index) => {
                  const isComplete = index < currentStep;
                  const isCurrent = index === currentStep;
                  const timestamp =
                    index === 0
                      ? order.placedAt
                      : index === 1
                        ? order.preparingAt
                        : index === 2
                          ? order.onTheWayAt
                          : order.deliveredAt;

                  return (
                    <li
                      key={step.id}
                      aria-current={isCurrent ? "step" : undefined}
                      className="relative z-10 flex min-w-0 flex-col items-center text-center"
                    >
                      <span
                        className={`flex size-6 items-center justify-center rounded-full border-2 text-[10px] font-bold ${
                          isComplete
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : isCurrent
                              ? "border-indigo-600 bg-white text-indigo-700 ring-4 ring-indigo-100"
                              : "border-slate-200 bg-slate-200 text-slate-400"
                        }`}
                      >
                        {isComplete ? "✓" : isCurrent ? "●" : ""}
                      </span>
                      <span
                        className={`mt-3 text-[10px] font-semibold sm:text-xs ${
                          isCurrent || isComplete
                            ? "text-slate-900"
                            : "text-slate-500"
                        }`}
                      >
                        {step.label}
                      </span>
                      <span className="mt-1 text-[10px] text-slate-500">
                        {formatTime(timestamp)}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-xs text-indigo-800">
                <span className="font-semibold">
                  {isDelivered
                    ? "Your order has been delivered"
                    : order.status === "on-the-way"
                      ? "Your order is on the way"
                      : "The seller is preparing your order"}
                </span>
                <span className="text-indigo-700">
                  {order.fulfillment === "delivery"
                    ? order.address
                    : `Pickup: ${order.address}`}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p aria-live="polite" className="text-xs text-slate-500">
                  {feedbackMessage ||
                    "Tracking updates are simulated until order services are connected."}
                </p>
                {!isDelivered && (
                  <button
                    type="button"
                    onClick={advanceStatus}
                    className="rounded-full border border-slate-300 px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    Simulate next update
                  </button>
                )}
              </div>
            </section>

            <section
              aria-labelledby="order-items-title"
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <h2
                id="order-items-title"
                className="text-sm font-bold text-slate-900"
              >
                Items
              </h2>
              <ul className="mt-4 divide-y divide-slate-200">
                {order.items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex items-center gap-3 py-2.5"
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={44}
                      height={44}
                      className="size-11 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {item.quantity} × {formatNaira(item.unitPrice)}
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                      {formatNaira(item.quantity * item.unitPrice)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span>
                  Total ({itemCount} items
                  {order.deliveryFee > 0
                    ? `, includes ${formatNaira(order.deliveryFee)} delivery`
                    : ""}
                  )
                </span>
                <span className="text-base font-bold text-slate-900">
                  {formatNaira(order.total)}
                </span>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                <span aria-hidden="true" className="text-lg">✓</span>
                Payment protection
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {formatNaira(order.total)}
              </p>
              <p className="mt-2 text-xs leading-5 text-emerald-900">
                In the live marketplace, payment is held securely until you
                confirm delivery. This demo does not charge or hold funds.
              </p>
              <button
                type="button"
                disabled={!isDelivered || order.deliveryConfirmed}
                onClick={confirmDelivery}
                className="mt-4 min-h-10 w-full rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-200 disabled:text-emerald-800"
              >
                {order.deliveryConfirmed
                  ? "Delivery confirmed"
                  : "Confirm delivery"}
              </button>
              <p className="mt-2 text-center text-[10px] text-emerald-800">
                {order.deliveryConfirmed
                  ? "Thanks for confirming receipt."
                  : isDelivered
                    ? "Confirm only after you receive your order."
                    : "Available once your order is delivered."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsReporting((visible) => !visible);
                  setReportMessage("");
                }}
                className="mt-4 block w-full text-center text-xs font-medium text-red-700 hover:text-red-900"
              >
                Report a problem
              </button>
              {isReporting && (
                <form onSubmit={submitReport} className="mt-3">
                  <label
                    htmlFor="order-problem"
                    className="text-xs font-medium text-slate-700"
                  >
                    What went wrong?
                  </label>
                  <textarea
                    id="order-problem"
                    required
                    rows={3}
                    value={problem}
                    onChange={(event) => setProblem(event.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                  />
                  <button
                    type="submit"
                    className="mt-2 w-full rounded-full bg-red-700 px-3 py-2 text-xs font-semibold text-white hover:bg-red-800"
                  >
                    Submit report
                  </button>
                </form>
              )}
              {reportMessage && (
                <p role="status" className="mt-3 text-xs leading-5 text-slate-700">
                  {reportMessage}
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xs font-bold text-slate-900">
                {locationLabel}
              </h2>
              <p className="mt-2 text-xs font-medium text-slate-800">
                {order.address}
              </p>
              <div className="mt-4 flex justify-between gap-3 border-t border-slate-100 pt-3 text-[11px]">
                <span className="text-slate-500">
                  {order.fulfillment === "delivery"
                    ? "Estimated arrival"
                    : "Pickup timing"}
                </span>
                <span className="text-right font-semibold text-slate-800">
                  {order.fulfillment === "delivery"
                    ? order.estimatedTime
                    : "Confirm with the seller"}
                </span>
              </div>
            </section>

            <section className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                  {order.storeName
                    .split(/\s+/)
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-xs font-semibold text-slate-900">
                    {order.storeName}
                  </h2>
                  <p
                    className={`mt-1 text-[10px] font-medium ${
                      order.storeVerified
                        ? "text-emerald-700"
                        : "text-slate-500"
                    }`}
                  >
                    {order.storeVerified ? "✓ Verified seller" : "Seller"}
                  </p>
                </div>
              </div>
              <Link
                href={`/buyerdashboard/stores/${order.storeId}`}
                className="shrink-0 text-[11px] font-semibold text-blue-700 hover:text-blue-900"
              >
                View store
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

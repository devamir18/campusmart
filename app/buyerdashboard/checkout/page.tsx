"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import Top from "../layout/top";
import {
  useBuyerCart,
  type BuyerCartItem,
} from "../cart-context";
import {
  formatNaira,
  PRODUCTS,
  STORES,
  type BuyerStore,
} from "../product-data";
import { useBuyerOrders } from "../orders-context";

type CheckoutLine = {
  productId: string;
  productName: string;
  quantity: number;
  stock: number;
  unitPrice: number;
  image: string;
  imageAlt: string;
};

type StoreOrder = {
  store: BuyerStore;
  items: CheckoutLine[];
};

type OrderConfirmation = {
  items: BuyerCartItem[];
  total: number;
  customerName: string;
  orderIds: string[];
};

function getStoreOrders(cartItems: BuyerCartItem[]): StoreOrder[] {
  const orders = new Map<string, StoreOrder>();

  for (const cartItem of cartItems) {
    const product = PRODUCTS.find((item) => item.id === cartItem.productId);
    if (!product) {
      throw new Error(`Cart product "${cartItem.productId}" is unavailable.`);
    }

    const store = STORES.find((item) => item.id === product.storeId);
    if (!store) {
      throw new Error(`Store "${product.storeId}" is unavailable.`);
    }

    const order = orders.get(store.id) ?? { store, items: [] };
    order.items.push({
      productId: product.id,
      productName: product.name,
      quantity: cartItem.quantity,
      stock: product.stock,
      unitPrice: product.price,
      image: product.image,
      imageAlt: product.imageAlt,
    });
    orders.set(store.id, order);
  }

  return Array.from(orders.values());
}

export default function CheckoutPage() {
  const {
    cartItems,
    cartCount,
    setCartItemQuantity,
    removeFromCart,
    clearCart,
  } = useBuyerCart();
  const { createDemoOrder } = useBuyerOrders();
  const [fulfillmentByStore, setFulfillmentByStore] = useState<
    Record<string, "delivery" | "pickup">
  >({});
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null
  );
  const storeOrders = getStoreOrders(cartItems);
  const subtotal = storeOrders.reduce(
    (total, order) =>
      total +
      order.items.reduce(
        (storeTotal, item) => storeTotal + item.unitPrice * item.quantity,
        0
      ),
    0
  );
  const deliveryTotal = storeOrders.reduce((total, order) => {
    const fulfillment =
      fulfillmentByStore[order.store.id] ??
      (order.store.deliveryAvailable ? "delivery" : "pickup");
    return total + (fulfillment === "delivery" ? order.store.deliveryFee : 0);
  }, 0);
  const total = subtotal + deliveryTotal;
  const needsAddress = storeOrders.some(
    (order) =>
      order.store.deliveryAvailable &&
      (fulfillmentByStore[order.store.id] ?? "delivery") === "delivery"
  );

  function selectFulfillment(
    storeId: string,
    fulfillment: "delivery" | "pickup"
  ) {
    setFulfillmentByStore((current) => ({
      ...current,
      [storeId]: fulfillment,
    }));
  }

  function placeDemoOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const orderIds = storeOrders.map((order) =>
      createDemoOrder({
        storeId: order.store.id,
        items: order.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        fulfillment:
          fulfillmentByStore[order.store.id] ??
          (order.store.deliveryAvailable ? "delivery" : "pickup"),
        address,
        customerName,
        phone,
      })
    );
    setConfirmation({
      items: cartItems.map((item) => ({ ...item })),
      total,
      customerName: customerName.trim(),
      orderIds,
    });
    clearCart();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Top />
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-slate-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/buyerdashboard" className="hover:text-blue-700">
                Marketplace
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-slate-900">
              Checkout
            </li>
          </ol>
        </nav>

        <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
        <p className="mt-1 text-sm text-slate-600">
          Review your items and choose delivery or pickup for each seller.
        </p>

        {confirmation ? (
          <section
            aria-labelledby="order-confirmation-title"
            className="mt-6 max-w-2xl rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
              ✓
            </div>
            <h2
              id="order-confirmation-title"
              className="mt-4 text-xl font-bold text-slate-900"
            >
              Demo order prepared
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Thank you, {confirmation.customerName}. Your cart contained{" "}
              {confirmation.items.reduce(
                (count, item) => count + item.quantity,
                0
              )}{" "}
              {confirmation.items.reduce(
                (count, item) => count + item.quantity,
                0
              ) === 1
                ? "item"
                : "items"}{" "}
              totaling {formatNaira(confirmation.total)}.
            </p>
            <p
              role="status"
              className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900"
            >
              This is a demo only. No order has been sent to sellers and no
              payment has been collected.
            </p>
            <Link
              href={
                confirmation.orderIds.length === 1
                  ? `/buyerdashboard/orders/${confirmation.orderIds[0]}`
                  : "/buyerdashboard/orders"
              }
              className="mt-5 inline-flex rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Track your order
            </Link>
          </section>
        ) : cartCount === 0 ? (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Add products from the marketplace before checking out.
            </p>
            <Link
              href="/buyerdashboard"
              className="mt-5 inline-flex rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Browse products
            </Link>
          </section>
        ) : (
          <form
            onSubmit={placeDemoOrder}
            className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
          >
            <div className="space-y-5">
              {storeOrders.map((order) => {
                const fulfillment =
                  fulfillmentByStore[order.store.id] ??
                  (order.store.deliveryAvailable ? "delivery" : "pickup");
                const storeSubtotal = order.items.reduce(
                  (sum, item) => sum + item.unitPrice * item.quantity,
                  0
                );

                return (
                  <section
                    key={order.store.id}
                    aria-labelledby={`store-${order.store.id}`}
                    className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <h2
                          id={`store-${order.store.id}`}
                          className="font-semibold text-slate-900"
                        >
                          {order.store.name}
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "product" : "products"}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        {formatNaira(storeSubtotal)}
                      </p>
                    </div>

                    <ul className="divide-y divide-slate-100">
                      {order.items.map((item) => (
                        <li
                          key={item.productId}
                          className="flex gap-3 py-4"
                        >
                          <Image
                            src={item.image}
                            alt={item.imageAlt}
                            width={80}
                            height={80}
                            className="size-16 shrink-0 rounded-lg object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-medium text-slate-900">
                              {item.productName}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              {formatNaira(item.unitPrice)} each
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.productId)}
                              className="mt-2 text-xs font-medium text-red-700 hover:text-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="flex h-9 shrink-0 items-center rounded-full border border-slate-200">
                            <button
                              type="button"
                              aria-label={`Decrease ${item.productName} quantity`}
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                setCartItemQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              className="size-8 rounded-full text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                            >
                              −
                            </button>
                            <span
                              aria-live="polite"
                              className="w-7 text-center text-xs text-slate-900"
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase ${item.productName} quantity`}
                              disabled={item.quantity >= item.stock}
                              onClick={() =>
                                setCartItemQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="size-8 rounded-full text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <fieldset className="border-t border-slate-100 pt-4">
                      <legend className="text-sm font-semibold text-slate-900">
                        Delivery method
                      </legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 has-[:checked]:border-blue-700 has-[:checked]:bg-blue-50">
                          <input
                            type="radio"
                            name={`fulfillment-${order.store.id}`}
                            value="pickup"
                            checked={fulfillment === "pickup"}
                            onChange={() =>
                              selectFulfillment(order.store.id, "pickup")
                            }
                            className="mt-0.5 accent-blue-700"
                          />
                          <span>
                            <span className="block text-xs font-semibold text-slate-900">
                              Pick up
                            </span>
                            <span className="mt-1 block text-[11px] text-slate-500">
                              {order.store.pickupPoint}
                            </span>
                          </span>
                        </label>
                        <label
                          className={`flex items-start gap-3 rounded-xl border p-3 ${
                            order.store.deliveryAvailable
                              ? "cursor-pointer border-slate-200 has-[:checked]:border-blue-700 has-[:checked]:bg-blue-50"
                              : "cursor-not-allowed border-slate-100 bg-slate-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`fulfillment-${order.store.id}`}
                            value="delivery"
                            checked={fulfillment === "delivery"}
                            disabled={!order.store.deliveryAvailable}
                            onChange={() =>
                              selectFulfillment(order.store.id, "delivery")
                            }
                            className="mt-0.5 accent-blue-700"
                          />
                          <span>
                            <span className="block text-xs font-semibold text-slate-900">
                              Delivery
                            </span>
                            <span className="mt-1 block text-[11px] text-slate-500">
                              {order.store.deliveryAvailable
                                ? `${formatNaira(order.store.deliveryFee)} · ${order.store.estimatedTime}`
                                : "Not available from this seller"}
                            </span>
                          </span>
                        </label>
                      </div>
                    </fieldset>
                  </section>
                );
              })}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <h2 className="font-semibold text-slate-900">
                  Contact and delivery details
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-medium text-slate-700">
                    Full name
                    <input
                      required
                      autoComplete="name"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                    />
                  </label>
                  <label className="text-xs font-medium text-slate-700">
                    Phone number
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                    />
                  </label>
                  {needsAddress && (
                    <label className="text-xs font-medium text-slate-700 sm:col-span-2">
                      Delivery address
                      <textarea
                        required
                        autoComplete="street-address"
                        rows={3}
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                      />
                    </label>
                  )}
                </div>
              </section>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-5">
              <h2 className="text-lg font-bold text-slate-900">
                Order summary
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3 text-slate-600">
                  <dt>Items ({cartCount})</dt>
                  <dd>{formatNaira(subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-3 text-slate-600">
                  <dt>Delivery</dt>
                  <dd>{deliveryTotal === 0 ? "Free" : formatNaira(deliveryTotal)}</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-slate-100 pt-3 font-bold text-slate-900">
                  <dt>Total</dt>
                  <dd>{formatNaira(total)}</dd>
                </div>
              </dl>
              <p className="mt-4 rounded-xl bg-blue-50 px-3 py-3 text-xs leading-5 text-blue-900">
                Pay the seller on delivery or pickup. Online payment is not
                available in this demo.
              </p>
              <button
                type="submit"
                className="mt-5 min-h-11 w-full rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Place demo order
              </button>
              <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">
                This demo does not send orders to sellers or collect payment.
              </p>
              <Link
                href="/buyerdashboard"
                className="mt-4 block text-center text-xs font-medium text-blue-700 hover:text-blue-900"
              >
                Continue shopping
              </Link>
            </aside>
          </form>
        )}
      </main>
    </div>
  );
}

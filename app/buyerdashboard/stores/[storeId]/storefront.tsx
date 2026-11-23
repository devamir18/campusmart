"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useBuyerCart } from "../../cart-context";
import Top from "../../layout/top";
import {
  formatNaira,
  type BuyerProduct,
  type BuyerStore,
} from "../../product-data";

export default function Storefront({
  store,
  products,
}: {
  store: BuyerStore;
  products: BuyerProduct[];
}) {
  const { addToCart } = useBuyerCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const categories = [
    "All",
    ...new Set(products.map((product) => product.menuCategory)),
  ];
  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.menuCategory === selectedCategory;
    const matchesSearch = `${product.name} ${product.menuCategory}`
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  async function shareStore() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage("Store link copied.");
    } catch {
      setShareMessage("Couldn't copy the store link. Copy it from your browser address bar.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Top />
      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-gray-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/buyerdashboard" className="hover:text-blue-700">
                Marketplace
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>Stores</li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-gray-900">
              {store.name}
            </li>
          </ol>
        </nav>

        <section aria-labelledby="store-name">
          <div className="relative h-28 overflow-hidden rounded-2xl bg-amber-400 sm:h-32">
            <div className="absolute -right-4 -top-20 size-48 rounded-full bg-amber-300/70" />
            <div className="absolute -bottom-16 left-12 size-28 rounded-full bg-amber-300/70" />
            <div className="absolute -bottom-16 right-1/4 size-28 rounded-full bg-amber-300/70" />
          </div>
          <div className="relative -mt-9 flex flex-wrap items-end justify-between gap-4 px-5">
            <div className="flex min-w-0 items-end gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-blue-700 text-xl font-bold text-white shadow-sm">
                {store.name
                  .split(/\s+/)
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="min-w-0 pb-1">
                <h1
                  id="store-name"
                  className="truncate text-xl font-bold text-slate-900 sm:text-2xl"
                >
                  {store.name}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {store.isVerified && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      Verified seller
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      store.isOpen
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {store.isOpen ? "Open now" : "Closed"}
                  </span>
                  <span className="hidden text-xs text-slate-500 sm:inline">
                    {store.description}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-1">
              <p aria-live="polite" className="text-xs text-slate-600">
                {shareMessage}
              </p>
              <button
                type="button"
                onClick={shareStore}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Share store
              </button>
            </div>
          </div>
        </section>

        <section
          aria-label="Store information"
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs text-slate-500">Opening hours</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {store.openingHours[0]?.hours ?? "Contact store"}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {store.openingHours[0]?.day ?? ""}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs text-slate-500">Delivery</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {store.deliveryAvailable
                ? "Delivery and pickup available"
                : "Pickup available"}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {store.estimatedTime}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs text-slate-500">Pickup point</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {store.pickupPoint}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Delivery fee {formatNaira(store.deliveryFee)}
            </p>
          </div>
        </section>

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(250px,0.9fr)]">
          <section aria-labelledby="store-menu-title">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <h2
                  id="store-menu-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Menu
                </h2>
                <span className="text-xs text-slate-500">
                  {products.length} {products.length === 1 ? "item" : "items"}
                </span>
              </div>
              <label className="sr-only" htmlFor="store-search">
                Search this store
              </label>
              <input
                id="store-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search this store"
                className="h-9 w-full rounded-full border border-slate-200 bg-white px-4 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 sm:w-56"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-medium ${
                    selectedCategory === category
                      ? "bg-blue-950 text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {category}
                  {category === "All" && (
                    <span className="ml-1">{products.length}</span>
                  )}
                </button>
              ))}
            </div>

            {visibleProducts.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {visibleProducts.map((product) => (
                  <article
                    key={product.id}
                    className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                  >
                    <Link
                      href={`/buyerdashboard/products/${product.id}`}
                      className="block overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        width={480}
                        height={320}
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="h-24 w-full object-cover"
                      />
                    </Link>
                    <Link
                      href={`/buyerdashboard/products/${product.id}`}
                      className="mt-2 block line-clamp-2 min-h-9 text-xs font-semibold text-slate-900 hover:text-blue-700"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {product.menuCategory}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {formatNaira(product.price)}
                      </span>
                      <button
                        type="button"
                        aria-label={`Add ${product.name} to cart`}
                        onClick={() => addToCart(product.id)}
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-lg leading-none text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                      >
                        +
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
                No items match your search.
              </p>
            )}
          </section>

          <aside className="space-y-4">
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-bold text-slate-900">
                About this store
              </h2>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                {store.description}
              </p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-bold text-slate-900">
                Opening hours
              </h2>
              <dl className="mt-3 space-y-3">
                {store.openingHours.map((hours) => (
                  <div
                    key={hours.day}
                    className="flex items-start justify-between gap-3 text-[11px]"
                  >
                    <dt className="text-slate-600">{hours.day}</dt>
                    <dd
                      className={`text-right font-medium ${
                        hours.hours === "Closed"
                          ? "text-slate-400"
                          : "text-slate-800"
                      }`}
                    >
                      {hours.hours}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-[11px]">
                <p className="flex justify-between gap-3 text-slate-600">
                  <span>Delivery fee</span>
                  <span className="font-medium text-slate-800">
                    {formatNaira(store.deliveryFee)}
                  </span>
                </p>
                <p className="flex justify-between gap-3 text-slate-600">
                  <span>Estimated time</span>
                  <span className="text-right font-medium text-slate-800">
                    {store.estimatedTime}
                  </span>
                </p>
              </div>
            </section>

            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-800">
              Confirm item availability, delivery, and payment details with the
              seller before ordering.
            </p>
          </aside>
        </div>
      </main>
      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-slate-500 md:px-6">
          <Link href="/buyerdashboard" className="font-semibold text-slate-800">
            Market Campus
          </Link>
          <Link href="/buyerdashboard" className="hover:text-blue-700">
            Back to marketplace
          </Link>
        </div>
      </footer>
    </div>
  );
}

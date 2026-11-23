"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Top from "../buyerdashboard/layout/top";
import { useBuyerCart } from "./cart-context";
import { formatNaira, PRODUCTS } from "./product-data";

const CATEGORIES = [
  {
    id: "all",
    name: "All Items",
    description: "Everything on campus",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "textbooks",
    name: "Textbooks",
    description: "Lecture notes & past Qs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "gadgets",
    name: "Gadgets",
    description: "Phones, chargers & laptops",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M11 18h2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "hot-food",
    name: "Hot Food",
    description: "Meals, snacks & drinks",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 1v3M10 1v3M14 1v3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "hostel",
    name: "Hostel & Room",
    description: "Buckets, bedding & lamps",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "fashion",
    name: "Fashion & Jerseys",
    description: "Fits, kicks & club kits",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 6h18" strokeLinecap="round" />
        <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { cartCount, addToCart } = useBuyerCart();
  const visibleProducts =
    selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <main className="min-h-screen min-w-0 flex-1">
        <Top />

        <section className="px-4 py-3 md:px-6">
          <div className="relative overflow-hidden w-full max-w-7xl mx-auto rounded-2xl flex items-center justify-between gap-4 min-h-44 bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-6 md:px-12 shadow-sm">
            <div className="flex flex-col space-y-2.5 z-10 max-w-xl">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Everything you need on campus
              </h2>
              <p className="text-xs md:text-sm text-blue-100">
                Textbooks, gadgets, hot food and many more. Pay safely and confirm on delivery
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="w-fit px-6 py-2.5 mt-1 rounded-full bg-yellow-400 hover:bg-yellow-300 text-gray-950 text-sm font-semibold transition cursor-pointer"
              >
                Browse all
              </button>
            </div>

            <div className="relative flex items-center gap-3 shrink-0 z-10">
              <div className="hidden sm:flex relative items-center justify-center pointer-events-none">
                <div className="absolute w-32 h-32 md:w-44 md:h-44 rounded-full bg-blue-500/20 blur-xl" />
                <svg
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-24 md:w-32 md:h-32 text-blue-300/35"
                  aria-hidden="true"
                >
                  <ellipse cx="60" cy="28" rx="14" ry="24" fill="currentColor" />
                  <ellipse cx="60" cy="92" rx="14" ry="24" fill="currentColor" />
                  <ellipse cx="28" cy="60" rx="24" ry="14" fill="currentColor" />
                  <ellipse cx="92" cy="60" rx="24" ry="14" fill="currentColor" />
                  <ellipse cx="37" cy="37" rx="14" ry="24" transform="rotate(-45 37 37)" fill="currentColor" />
                  <ellipse cx="83" cy="83" rx="14" ry="24" transform="rotate(-45 83 83)" fill="currentColor" />
                  <ellipse cx="83" cy="37" rx="14" ry="24" transform="rotate(45 83 37)" fill="currentColor" />
                  <ellipse cx="37" cy="83" rx="14" ry="24" transform="rotate(45 37 83)" fill="currentColor" />
                  <circle cx="60" cy="60" r="14" className="fill-blue-200/60" />
                </svg>
              </div>

              <Link
                href="/buyerdashboard/checkout"
                aria-label={`Open cart, ${cartCount} items`}
                className="flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-2.5 text-yellow-300 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
                    <path d="M5 7h13.79a2 2 0 0 1 1.99 2.199l-.6 6A2 2 0 0 1 18.19 17H8.64a2 2 0 0 1-1.962-1.608z" />
                    <path strokeLinecap="round" d="m5 7l-.81-3.243A1 1 0 0 0 3.22 3H2m6 18h2m6 0h2" />
                  </g>
                </svg>
                <span className="text-xs font-medium text-white">
                  Cart ({cartCount})
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-4 py-6 md:px-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold text-gray-950">Shop by category</h2>
            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group flex flex-col items-start text-left rounded-2xl p-4 border transition cursor-pointer ${
                    isActive
                      ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                      : "bg-white/95 text-gray-950 border-gray-200 hover:border-blue-700/40 hover:bg-blue-50/40"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-xl mb-3 transition ${
                      isActive
                        ? "bg-yellow-400 text-gray-950"
                        : "bg-blue-50 text-blue-700 group-hover:bg-blue-100"
                    }`}
                  >
                    {category.icon}
                  </div>
                  <p className="text-sm font-semibold leading-snug">{category.name}</p>
                  <p
                    className={`text-xs mt-1 line-clamp-1 ${
                      isActive ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-gray-950">
                {selectedCategory === "all"
                  ? "Popular on campus"
                  : `Popular ${CATEGORIES.find((category) => category.id === selectedCategory)?.name}`}
              </h2>
              <span aria-live="polite" className="text-sm text-gray-500">
                {visibleProducts.length} {visibleProducts.length === 1 ? "item" : "items"}
              </span>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => {
                  return (
                  <article
                    key={product.id}
                    className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                  >
                    <Link
                      href={`/buyerdashboard/products/${product.id}`}
                      aria-label={`View ${product.name}`}
                      className="block overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        width={480}
                        height={320}
                        loading={
                          product.id === visibleProducts[0]?.id
                            ? "eager"
                            : "lazy"
                        }
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="h-20 w-full object-cover transition-transform hover:scale-105 sm:h-24"
                      />
                    </Link>
                    <div className="pt-3">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-gray-500">
                        {CATEGORIES.find(
                          (category) => category.id === product.category
                        )?.name}
                      </p>
                      <h3 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-gray-900 sm:text-sm">
                        <Link
                          href={`/buyerdashboard/products/${product.id}`}
                          className="rounded-sm hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm font-bold text-blue-800">
                        {formatNaira(product.price)}
                      </p>
                      <Link
                        href={`/buyerdashboard/stores/${product.storeId}`}
                        className="mt-2 block truncate text-xs text-gray-600 hover:text-blue-700"
                      >
                        {product.seller}
                      </Link>
                      <p className="mt-1 truncate text-[11px] text-gray-400">
                        Pickup: {product.location}
                      </p>
                      <button
                        type="button"
                        onClick={() => addToCart(product.id)}
                        className="mt-3 w-full rounded-full bg-blue-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:text-sm"
                      >
                        Add to cart
                      </button>
                    </div>
                  </article>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                No items are available in this category yet.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
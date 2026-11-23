"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useBuyerCart } from "../../cart-context";
import Top from "../../layout/top";
import { formatNaira, type BuyerProduct } from "../../product-data";

function getCategoryName(category: string) {
  const names: Record<string, string> = {
    textbooks: "Textbooks",
    gadgets: "Gadgets",
    "hot-food": "Hot Food",
    hostel: "Hostel & Room",
    fashion: "Fashion & Jerseys",
  };

  return names[category] ?? "Campus items";
}

export default function ProductDetail({
  product,
  relatedProducts,
}: {
  product: BuyerProduct;
  relatedProducts: BuyerProduct[];
}) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart: addItemToCart } = useBuyerCart();
  const [cartMessage, setCartMessage] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("Block C, Room 214");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState(deliveryAddress);
  const [addressError, setAddressError] = useState("");

  function addToCart() {
    addItemToCart(product.id, quantity);
    setCartMessage(
      `${quantity} ${quantity === 1 ? "item" : "items"} added to your cart.`
    );
  }

  function saveAddress() {
    const trimmedAddress = addressDraft.trim();
    if (!trimmedAddress) {
      setAddressError("Enter a delivery address.");
      return;
    }

    setDeliveryAddress(trimmedAddress);
    setAddressDraft(trimmedAddress);
    setAddressError("");
    setIsEditingAddress(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Top />

      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-gray-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/buyerdashboard"
                className="hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                Marketplace
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/buyerdashboard"
                className="hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                {getCategoryName(product.category)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-gray-900">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          <section aria-label={`${product.name} photos`}>
            <div className="relative aspect-square max-h-[520px] overflow-hidden rounded-2xl bg-white">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </section>

          <section className="flex flex-col">
            <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              {getCategoryName(product.category)}
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white"
                >
                  {product.seller.charAt(0)}
                </span>
                <Link
                  href={`/buyerdashboard/stores/${product.storeId}`}
                  className="text-sm font-medium text-slate-800 hover:text-blue-700"
                >
                  {product.seller}
                </Link>
              </div>
              <Link
                  href={`/buyerdashboard/stores/${product.storeId}`}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                View store
              </Link>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {formatNaira(product.price)}
            </p>
            <p
              className={`mt-2 text-xs font-medium ${
                product.stock > 0 ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {product.stock > 0
                ? `In stock, ${product.stock} available`
                : "Currently unavailable"}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {product.description}
            </p>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold text-slate-700">
                Quantity
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex h-10 items-center rounded-full border border-slate-200 bg-white">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    className="size-10 rounded-full text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    −
                  </button>
                  <span aria-live="polite" className="w-10 text-center text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={quantity >= product.stock}
                    onClick={() =>
                      setQuantity((value) =>
                        Math.min(product.stock, value + 1)
                      )
                    }
                    className="size-10 rounded-full text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  disabled={product.stock === 0}
                  onClick={addToCart}
                  className="min-h-10 flex-1 rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Add to cart · {formatNaira(product.price * quantity)}
                </button>
              </div>
              <p aria-live="polite" className="mt-2 min-h-5 text-xs text-emerald-700">
                {cartMessage}
              </p>
            </div>

            <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white px-4">
              <div className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-800">
                    Deliver to
                  </p>
                  {isEditingAddress ? (
                    <input
                      autoFocus
                      value={addressDraft}
                      onChange={(event) => setAddressDraft(event.target.value)}
                      aria-invalid={Boolean(addressError)}
                      aria-describedby={
                        addressError ? "delivery-address-error" : undefined
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          saveAddress();
                        }
                      }}
                      className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 focus:border-blue-600 focus:outline-none"
                    />
                  ) : (
                    <p className="mt-1 truncate text-xs text-slate-600">
                      {deliveryAddress}
                    </p>
                  )}
                </div>
                {isEditingAddress ? (
                  <button
                    type="button"
                    onClick={saveAddress}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAddressDraft(deliveryAddress);
                      setIsEditingAddress(true);
                    }}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900"
                  >
                    Change
                  </button>
                )}
              </div>
              {addressError && (
                <p
                  id="delivery-address-error"
                  className="py-2 text-xs text-red-700"
                  role="alert"
                >
                  {addressError}
                </p>
              )}
              <div className="py-3 text-xs text-slate-600">
                Estimated time: {product.deliveryEstimate}
              </div>
              <div className="py-3 text-xs text-slate-600">
                Delivery fee: {formatNaira(product.deliveryFee)}
              </div>
            </div>

            <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-800">
              Confirm the item and delivery details with the seller before
              arranging payment.
            </p>
          </section>
        </div>

        {relatedProducts.length > 0 && (
          <section id="more-from-seller" className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-slate-900">
              More from {product.seller}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/buyerdashboard/products/${relatedProduct.id}`}
                  className="rounded-xl border border-slate-200 bg-white p-2.5 transition hover:border-blue-200 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.imageAlt}
                    width={480}
                    height={320}
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="h-24 w-full rounded-lg object-cover"
                  />
                  <p className="mt-2 line-clamp-2 min-h-9 text-xs font-semibold text-slate-800">
                    {relatedProduct.name}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {formatNaira(relatedProduct.price)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Link
          href="/buyerdashboard"
          className="mt-8 inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Back to marketplace
        </Link>
      </main>
    </div>
  );
}

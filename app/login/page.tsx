"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

type AccountType = "student" | "seller";
type FormMode = "login" | "signup";

export default function Login() {
  const [accountType, setAccountType] = useState<AccountType>("student");
  const [formMode, setFormMode] = useState<FormMode>("login");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [message, setMessage] = useState<{
    kind: "error" | "info";
    text: string;
  } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formMode === "signup") {
      const formData = new FormData(event.currentTarget);
      if (formData.get("password") !== formData.get("confirmPassword")) {
        setMessage({ kind: "error", text: "Passwords do not match." });
        return;
      }
    }

    setMessage({
      kind: "info",
      text: "Authentication is not connected yet. Your details were not submitted.",
    });
  }

  function changeMode(mode: FormMode) {
    setFormMode(mode);
    setMessage(null);
  }

  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <section className="relative isolate flex min-h-72 flex-col overflow-hidden border border-blue-400/30 bg-blue-700 p-6 text-white shadow-xl sm:p-8 md:min-h-screen md:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/40 via-blue-700/80 to-blue-800/90 backdrop-blur-md"
        />

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 text-blue-300/15"
          viewBox="0 0 200 200"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(100,100)">
            <ellipse cx="0" cy="-45" rx="22" ry="42" transform="rotate(0)" />
            <ellipse cx="0" cy="-45" rx="22" ry="42" transform="rotate(60)" />
            <ellipse cx="0" cy="-45" rx="22" ry="42" transform="rotate(120)" />
            <ellipse cx="0" cy="-45" rx="22" ry="42" transform="rotate(180)" />
            <ellipse cx="0" cy="-45" rx="22" ry="42" transform="rotate(240)" />
            <ellipse cx="0" cy="-45" rx="22" ry="42" transform="rotate(300)" />
            <circle cx="0" cy="0" r="16" className="text-white/25" />
          </g>
        </svg>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-10 h-52 w-52 text-white/10"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(100,100)">
            <ellipse cx="0" cy="-42" rx="18" ry="38" transform="rotate(0)" />
            <ellipse cx="0" cy="-42" rx="18" ry="38" transform="rotate(45)" />
            <ellipse cx="0" cy="-42" rx="18" ry="38" transform="rotate(90)" />
            <ellipse cx="0" cy="-42" rx="18" ry="38" transform="rotate(135)" />
            <ellipse cx="0" cy="-42" rx="18" ry="38" transform="rotate(180)" />
            <ellipse cx="0" cy="-42" rx="18" ry="38" transform="rotate(225)" />
            <ellipse cx="0" cy="-42" rx="18" ry="38" transform="rotate(270)" />
            <ellipse cx="0" cy="-42" rx="18" ry="38" transform="rotate(315)" />
            <circle cx="0" cy="0" r="14" />
          </g>
        </svg>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-blue-400/25 blur-3xl"
        />

        <div className="relative z-10">
          <Link href="/" aria-label="Campus Marketplace home">
            <Image
              src="/image/campuslogo.svg"
              alt="Campus Marketplace"
              width={180}
              height={32}
              priority
              className="h-auto w-36 md:w-40"
            />
          </Link>

          <div className="mt-10 flex flex-col gap-3 sm:mt-14 md:mt-28">
            <h1 className="text-3xl font-bold tracking-wide sm:text-4xl">
              Buy and sell on campus safely
            </h1>
            <p className="text-base tracking-tight text-blue-200">
              {formMode === "login"
                ? "Log in to pick up where you left off."
                : "Create an account to get started."}
            </p>

            <ul className="mt-3 space-y-2 text-sm text-gray-100">
              <li>Verified campus sellers</li>
              <li>Payment held until delivery</li>
              <li>Refund if your order never arrives</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-white px-4 py-8 sm:px-8 md:min-h-screen">
        <div className="w-full max-w-xl">
          <div className="mb-5 flex items-center justify-end gap-2 text-sm text-gray-600">
            <span>
              {formMode === "login" ? "New here?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() =>
                changeMode(formMode === "login" ? "signup" : "login")
              }
              className="rounded-full border border-gray-300 px-3 py-2 font-semibold text-gray-900 transition-colors hover:bg-gray-950 hover:text-white"
            >
              {formMode === "login" ? "Sign up" : "Log in"}
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-3xl font-semibold text-gray-950">
              {formMode === "login" ? "Log in" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {formMode === "login"
                ? "Welcome back. Enter your details to continue."
                : "Choose your account type and enter your details."}
            </p>

            <div
              role="group"
              aria-label="Account type"
              className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1"
            >
              {(["student", "seller"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={accountType === type}
                  onClick={() => setAccountType(type)}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    accountType === type
                      ? "bg-white text-gray-950 shadow-sm"
                      : "text-gray-600 hover:text-gray-950"
                  }`}
                >
                  {type === "student" ? "Student" : "Seller"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {formMode === "signup" && (
                <div>
                  <label
                    htmlFor="full-name"
                    className="mb-1.5 block text-sm font-medium text-gray-900"
                  >
                    Full name
                  </label>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Your name"
                  />
                </div>
              )}

              {formMode === "signup" && accountType === "seller" && (
                <>
                  <div>
                    <label
                      htmlFor="business-name"
                      className="mb-1.5 block text-sm font-medium text-gray-900"
                    >
                      Business name
                    </label>
                    <input
                      id="business-name"
                      name="businessName"
                      type="text"
                      autoComplete="organization"
                      required
                      className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="Your business or store name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pickup-location"
                      className="mb-1.5 block text-sm font-medium text-gray-900"
                    >
                      Hostel pickup location
                    </label>
                    <input
                      id="pickup-location"
                      name="pickupLocation"
                      type="text"
                      autoComplete="street-address"
                      required
                      className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="Hostel, block, or pickup point"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="seller-phone"
                      className="mb-1.5 block text-sm font-medium text-gray-900"
                    >
                      Mobile or WhatsApp number
                    </label>
                    <input
                      id="seller-phone"
                      name="sellerPhone"
                      type="tel"
                      autoComplete="tel"
                      required
                      className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="+234 000 000 0000"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="product-category"
                      className="mb-1.5 block text-sm font-medium text-gray-900"
                    >
                      Main product category
                    </label>
                    <select
                      id="product-category"
                      name="productCategory"
                      required
                      defaultValue=""
                      className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="food">Food and drinks</option>
                      <option value="textbooks">Textbooks and stationery</option>
                      <option value="electronics">Electronics and gadgets</option>
                      <option value="clothing">Clothing and accessories</option>
                      <option value="hostel">Hostel essentials</option>
                      <option value="services">Campus services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <fieldset className="space-y-4 rounded-lg border border-gray-200 p-4">
                    <legend className="px-1 text-sm font-semibold text-gray-900">
                      Bank details for payouts
                    </legend>
                    <div>
                      <label
                        htmlFor="account-holder"
                        className="mb-1.5 block text-sm font-medium text-gray-900"
                      >
                        Account holder name
                      </label>
                      <input
                        id="account-holder"
                        name="accountHolder"
                        type="text"
                        autoComplete="name"
                        required
                        className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        placeholder="Name on the bank account"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bank-name"
                        className="mb-1.5 block text-sm font-medium text-gray-900"
                      >
                        Bank name
                      </label>
                      <input
                        id="bank-name"
                        name="bankName"
                        type="text"
                        autoComplete="off"
                        required
                        className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        placeholder="Your bank"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="account-number"
                        className="mb-1.5 block text-sm font-medium text-gray-900"
                      >
                        Account number
                      </label>
                      <input
                        id="account-number"
                        name="accountNumber"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        required
                        className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter your account number"
                      />
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500">
                      Bank details are collected for seller payouts. Do not
                      enter your card PIN or banking password.
                    </p>
                  </fieldset>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  {formMode === "login" && (
                    <button
                      type="button"
                      onClick={() =>
                        setMessage({
                          kind: "info",
                          text: "Password reset is not configured yet.",
                        })
                      }
                      className="text-sm font-medium text-blue-700 hover:text-blue-900"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    formMode === "login" ? "current-password" : "new-password"
                  }
                  minLength={formMode === "signup" ? 8 : undefined}
                  required
                  className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter your password"
                />
              </div>

              {formMode === "signup" && (
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-1.5 block text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="h-11 w-full rounded-md border border-gray-300 px-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {formMode === "login" && (
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(event) =>
                      setKeepSignedIn(event.target.checked)
                    }
                    className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Keep me signed in
                </label>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                {formMode === "login" ? "Log in" : "Create account"}
              </button>

              {message && (
                <p
                  role={message.kind === "error" ? "alert" : "status"}
                  className={`text-sm ${
                    message.kind === "error" ? "text-red-700" : "text-gray-600"
                  }`}
                >
                  {message.text}
                </p>
              )}
            </form>

            <p className="mt-5 rounded-lg bg-gray-900 px-3 py-2 text-sm text-gray-100">
              Your payment is held until you confirm delivery.
            </p>

            <nav
              aria-label="Login help"
              className="mt-5 flex justify-center gap-5 text-sm text-gray-700"
            >
              <span>Terms</span>
              <span>Privacy</span>
              <span>Help</span>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}

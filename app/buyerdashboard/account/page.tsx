"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import Top from "../layout/top";
import {
  useBuyerAccount,
  type BuyerAccountData,
  type BuyerAddress,
} from "../account-context";

const ACCOUNT_SECTIONS = [
  { id: "personal-details", label: "Personal details" },
  { id: "delivery-addresses", label: "Delivery addresses" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "help", label: "Help and support" },
];

export default function BuyerAccountPage() {
  const {
    account,
    isLoaded,
    storageMessage,
    updateAccount: updateAccountInMemory,
    saveAccount,
  } = useBuyerAccount();
  const [activeSection, setActiveSection] = useState("personal-details");
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressDraft, setAddressDraft] = useState("");
  const [areaDraft, setAreaDraft] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [securityMessage, setSecurityMessage] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);

  function updateAccount(nextAccount: BuyerAccountData) {
    saveAccount(nextAccount);
    setFormMessage("");
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fullName = account.profile.fullName.trim();
    const email = account.profile.email.trim();
    if (!fullName || !email) {
      setFormMessage("Enter your name and email address.");
      return;
    }

    saveAccount({
      ...account,
      profile: { ...account.profile, fullName, email },
    });
    setFormMessage("");
  }

  function openAddressForm(address?: BuyerAddress) {
    setEditingAddressId(address?.id ?? null);
    setAddressDraft(address?.address ?? "");
    setAreaDraft(address?.area ?? "");
    setAddressFormOpen(true);
    setFormMessage("");
  }

  function saveAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = addressDraft.trim();
    const area = areaDraft.trim();
    if (!address || !area) {
      setFormMessage("Enter both the address and its campus or area.");
      return;
    }

    const isNewAddress = editingAddressId === null;
    const nextAddresses = isNewAddress
      ? [
          ...account.addresses,
          {
            id: `address-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            address,
            area,
            isDefault: account.addresses.length === 0,
          },
        ]
      : account.addresses.map((item) =>
          item.id === editingAddressId ? { ...item, address, area } : item
        );

    updateAccount({ ...account, addresses: nextAddresses });
    setAddressFormOpen(false);
  }

  function removeAddress(addressId: string) {
    const nextAddresses = account.addresses.filter(
      (address) => address.id !== addressId
    );
    if (
      account.addresses.find((address) => address.id === addressId)?.isDefault &&
      nextAddresses.length > 0
    ) {
      nextAddresses[0] = { ...nextAddresses[0], isDefault: true };
    }
    updateAccount({ ...account, addresses: nextAddresses });
  }

  function setDefaultAddress(addressId: string) {
    updateAccount({
      ...account,
      addresses: account.addresses.map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      })),
    });
  }

  function changeNotification(
    key: "orderUpdates" | "marketplaceNews",
    checked: boolean
  ) {
    updateAccount({
      ...account,
      notifications: { ...account.notifications, [key]: checked },
    });
  }

  function changePhoto(file: File | undefined) {
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setFormMessage("Choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFormMessage("Choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const photoDataUrl = reader.result;
      if (typeof photoDataUrl !== "string") {
        setFormMessage("The selected image could not be read.");
        return;
      }
      updateAccountInMemory({
        ...account,
        profile: { ...account.profile, photoDataUrl },
      });
      setFormMessage("Save your personal details to keep this photo.");
    });
    reader.addEventListener("error", () => {
      setFormMessage("The selected image could not be read.");
    });
    reader.readAsDataURL(file);
  }

  const initials = account.profile.fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "AB";

  return (
    <div className="min-h-screen bg-slate-100">
      <Top />
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <h1 className="mb-4 text-2xl font-bold text-slate-900">My account</h1>

        <div className="grid items-start gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 lg:sticky lg:top-4">
            <div className="flex items-center gap-3 border-b border-slate-100 px-2 pb-3">
              <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-sm font-bold text-indigo-700">
                {account.profile.photoDataUrl ? (
                  <Image
                    src={account.profile.photoDataUrl}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    className="size-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-slate-900">
                  {account.profile.fullName}
                </p>
                <p className="truncate text-[10px] text-slate-500">
                  {account.profile.email}
                </p>
              </div>
            </div>

            <nav aria-label="Account settings" className="pt-2">
              <ul className="space-y-1">
                {ACCOUNT_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={
                        activeSection === section.id ? "page" : undefined
                      }
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[11px] transition ${
                        activeSection === section.id
                          ? "bg-indigo-100 font-semibold text-indigo-800"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {section.label}
                      <span aria-hidden="true">›</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-2 border-t border-slate-100 pt-2">
              <Link
                href="/login"
                className="block rounded-lg px-3 py-2.5 text-[11px] font-medium text-red-700 hover:bg-red-50"
              >
                Log out
              </Link>
            </div>
          </aside>

          <div className="space-y-4">
            <section
              id="personal-details"
              aria-labelledby="personal-details-title"
              className="scroll-mt-5 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h2
                id="personal-details-title"
                className="text-sm font-bold text-slate-900"
              >
                Personal details
              </h2>
              <form onSubmit={saveProfile}>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-lg font-bold text-indigo-700">
                    {account.profile.photoDataUrl ? (
                      <Image
                        src={account.profile.photoDataUrl}
                        alt=""
                        width={56}
                        height={56}
                        unoptimized
                        className="size-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    aria-label="Choose profile photo"
                    className="sr-only"
                    disabled={!isLoaded}
                    onChange={(event) => {
                      changePhoto(event.target.files?.[0]);
                      event.currentTarget.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={!isLoaded}
                    onClick={() => photoInputRef.current?.click()}
                    className="rounded-full border border-slate-300 px-4 py-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                  >
                    Change photo
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="text-[10px] font-semibold text-slate-700">
                    Full name
                    <input
                      required
                      disabled={!isLoaded}
                      autoComplete="name"
                      value={account.profile.fullName}
                      onChange={(event) =>
                        updateAccountInMemory({
                          ...account,
                          profile: {
                            ...account.profile,
                            fullName: event.target.value,
                          },
                        })
                      }
                      className="mt-1.5 h-9 w-full rounded-lg border border-slate-300 px-3 text-xs font-normal text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </label>
                  <label className="text-[10px] font-semibold text-slate-700">
                    Email
                    <span className="float-right rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                      Student email
                    </span>
                    <input
                      required
                      disabled={!isLoaded}
                      type="email"
                      autoComplete="email"
                      value={account.profile.email}
                      onChange={(event) =>
                        updateAccountInMemory({
                          ...account,
                          profile: {
                            ...account.profile,
                            email: event.target.value,
                          },
                        })
                      }
                      className="mt-1.5 h-9 w-full rounded-lg border border-slate-300 px-3 text-xs font-normal text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </label>
                  <label className="text-[10px] font-semibold text-slate-700">
                    Phone number
                    <input
                      type="tel"
                      disabled={!isLoaded}
                      autoComplete="tel"
                      placeholder="For the rider to reach you"
                      value={account.profile.phone}
                      onChange={(event) =>
                        updateAccountInMemory({
                          ...account,
                          profile: {
                            ...account.profile,
                            phone: event.target.value,
                          },
                        })
                      }
                      className="mt-1.5 h-9 w-full rounded-lg border border-slate-300 px-3 text-xs font-normal text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </label>
                  <label className="text-[10px] font-semibold text-slate-700">
                    School
                    <input
                      autoComplete="organization"
                      disabled={!isLoaded}
                      placeholder="Your school"
                      value={account.profile.school}
                      onChange={(event) =>
                        updateAccountInMemory({
                          ...account,
                          profile: {
                            ...account.profile,
                            school: event.target.value,
                          },
                        })
                      }
                      className="mt-1.5 h-9 w-full rounded-lg border border-slate-300 px-3 text-xs font-normal text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <p aria-live="polite" className="text-[11px] text-slate-500">
                    {formMessage || storageMessage || " "}
                  </p>
                  <button
                    type="submit"
                    disabled={!isLoaded}
                    className="rounded-full bg-indigo-700 px-4 py-2 text-[10px] font-semibold text-white hover:bg-indigo-800 disabled:opacity-50"
                  >
                    Save personal details
                  </button>
                </div>
              </form>
            </section>

            <section
              id="delivery-addresses"
              aria-labelledby="delivery-addresses-title"
              className="scroll-mt-5 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2
                  id="delivery-addresses-title"
                  className="text-sm font-bold text-slate-900"
                >
                  Delivery addresses
                </h2>
                <button
                  type="button"
                  onClick={() => openAddressForm()}
                  className="rounded-full border border-slate-300 px-4 py-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                >
                  Add address
                </button>
              </div>

              {account.addresses.length > 0 ? (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {account.addresses.map((address) => (
                    <li
                      key={address.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-start gap-2">
                          <span aria-hidden="true" className="text-indigo-700">⌖</span>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-900">
                              {address.address}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-500">
                              {address.area}
                            </p>
                          </div>
                        </div>
                        {address.isDefault && (
                          <span className="rounded-full bg-indigo-100 px-2 py-1 text-[9px] font-semibold text-indigo-700">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="mt-4 flex items-center gap-4 pl-5 text-[10px]">
                        <button
                          type="button"
                          onClick={() => openAddressForm(address)}
                          className="font-semibold text-indigo-700 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button
                            type="button"
                            onClick={() => setDefaultAddress(address.id)}
                            className="font-medium text-slate-600 hover:text-slate-900"
                          >
                            Make default
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeAddress(address.id)}
                          className="font-medium text-slate-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-5 text-center text-xs text-slate-500">
                  Add a delivery address to make checkout quicker.
                </p>
              )}

              {addressFormOpen && (
                <form
                  onSubmit={saveAddress}
                  className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4"
                >
                  <h3 className="text-xs font-semibold text-slate-900">
                    {editingAddressId ? "Edit address" : "New address"}
                  </h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label className="text-[10px] font-semibold text-slate-700">
                      Address
                      <input
                        required
                        autoComplete="street-address"
                        value={addressDraft}
                        onChange={(event) => setAddressDraft(event.target.value)}
                        className="mt-1.5 h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs font-normal text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                      />
                    </label>
                    <label className="text-[10px] font-semibold text-slate-700">
                      Campus or area
                      <input
                        required
                        value={areaDraft}
                        onChange={(event) => setAreaDraft(event.target.value)}
                        className="mt-1.5 h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs font-normal text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                      />
                    </label>
                  </div>
                  {formMessage && (
                    <p role="alert" className="mt-2 text-[11px] text-red-700">
                      {formMessage}
                    </p>
                  )}
                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setAddressFormOpen(false)}
                      className="rounded-full px-4 py-2 text-[10px] font-semibold text-slate-600 hover:bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-indigo-700 px-4 py-2 text-[10px] font-semibold text-white hover:bg-indigo-800"
                    >
                      Save address
                    </button>
                  </div>
                </form>
              )}
            </section>

            <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber-100 p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-amber-400 text-xl font-bold text-white">
                  M
                </span>
                <div>
                  <h2 className="text-xs font-bold text-slate-900">
                    Want to sell on Market Campus?
                  </h2>
                  <p className="mt-1 text-[10px] text-amber-900">
                    Open your store in minutes and reach students on your campus.
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard/pages/store"
                className="rounded-full bg-indigo-700 px-4 py-2.5 text-[10px] font-semibold text-white hover:bg-indigo-800"
              >
                Open your store
              </Link>
            </section>

            <section
              id="notifications"
              aria-labelledby="notifications-title"
              className="scroll-mt-5 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h2
                id="notifications-title"
                className="text-sm font-bold text-slate-900"
              >
                Notifications
              </h2>
              <p className="mt-1 text-[10px] text-slate-500">
                Choose which updates you receive in this browser.
              </p>
              <div className="mt-4 space-y-3">
                <label className="flex items-center justify-between gap-4 text-xs text-slate-700">
                  Order status updates
                  <input
                    type="checkbox"
                    checked={account.notifications.orderUpdates}
                    onChange={(event) =>
                      changeNotification("orderUpdates", event.target.checked)
                    }
                    className="size-4 accent-indigo-700"
                  />
                </label>
                <label className="flex items-center justify-between gap-4 text-xs text-slate-700">
                  Marketplace news and offers
                  <input
                    type="checkbox"
                    checked={account.notifications.marketplaceNews}
                    onChange={(event) =>
                      changeNotification(
                        "marketplaceNews",
                        event.target.checked
                      )
                    }
                    className="size-4 accent-indigo-700"
                  />
                </label>
              </div>
            </section>

            <section
              id="security"
              aria-labelledby="security-title"
              className="scroll-mt-5 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2
                    id="security-title"
                    className="text-sm font-bold text-slate-900"
                  >
                    Security
                  </h2>
                  <p className="mt-3 text-[10px] font-semibold text-slate-800">
                    Password
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Keep your account safe with a strong password.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSecurityMessage(
                      "Password changes will be available when secure account sign-in is connected."
                    )
                  }
                  className="rounded-full border border-slate-300 px-4 py-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Change password
                </button>
              </div>
              {securityMessage && (
                <p role="status" className="mt-3 text-[11px] text-amber-800">
                  {securityMessage}
                </p>
              )}
            </section>

            <section
              id="help"
              aria-labelledby="help-title"
              className="scroll-mt-5 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h2 id="help-title" className="text-sm font-bold text-slate-900">
                Help and support
              </h2>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Need help with an order? Open its tracking page to view seller
                details or report a problem.
              </p>
              <Link
                href="/buyerdashboard/orders"
                className="mt-3 inline-flex text-xs font-semibold text-indigo-700 hover:text-indigo-900"
              >
                Go to my orders
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

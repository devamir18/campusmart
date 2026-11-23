"use client";

import { useEffect, useState, type FormEvent } from "react";
import Sidebar from "../../layouts/sidebar";
import Top from "../../layouts/top";

type StoreProfile = {
  storeName: string;
  description: string;
  pickupLocation: string;
  contactEmail: string;
  contactPhone: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
};

const storageKey = "campus-marketplace-store-profile";

const defaultProfile: StoreProfile = {
  storeName: "Amaka's Kitchen",
  description:
    "Fresh meals and snacks for the campus community. Delivery and pickup available.",
  pickupLocation: "Naraguta Hostel",
  contactEmail: "",
  contactPhone: "",
  openingTime: "09:00",
  closingTime: "21:00",
  isOpen: true,
};

function isStoreProfile(value: unknown): value is StoreProfile {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "storeName" in value &&
    typeof value.storeName === "string" &&
    "description" in value &&
    typeof value.description === "string" &&
    "pickupLocation" in value &&
    typeof value.pickupLocation === "string" &&
    "contactEmail" in value &&
    typeof value.contactEmail === "string" &&
    "contactPhone" in value &&
    typeof value.contactPhone === "string" &&
    "openingTime" in value &&
    typeof value.openingTime === "string" &&
    "closingTime" in value &&
    typeof value.closingTime === "string" &&
    "isOpen" in value &&
    typeof value.isOpen === "boolean"
  );
}

function ProfileField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "time";
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="h-10 w-full rounded-lg border border-gray-300 px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
      />
    </div>
  );
}

export default function StoreProfilePage() {
  const [profile, setProfile] = useState(defaultProfile);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    void Promise.resolve().then(() => {
      try {
        const savedProfile = window.localStorage.getItem(storageKey);
        if (!savedProfile || !active) {
          return;
        }

        const parsedProfile: unknown = JSON.parse(savedProfile);
        if (!isStoreProfile(parsedProfile)) {
          setNotice(
            "Saved store details could not be read. Please review and save them again."
          );
          return;
        }

        setProfile(parsedProfile);
      } catch {
        if (active) {
          setNotice("Saved store details could not be loaded in this browser.");
        }
      }
    });

    return () => {
      active = false;
    };
  }, []);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(profile));
      setNotice("Store profile saved in this browser.");
    } catch {
      setNotice("Could not save your store profile in this browser.");
    }
  }

  const checklist = [
    { label: "Store name", complete: profile.storeName.trim().length > 0 },
    { label: "Description", complete: profile.description.trim().length > 0 },
    {
      label: "Pickup location",
      complete: profile.pickupLocation.trim().length > 0,
    },
    {
      label: "Contact details",
      complete:
        profile.contactEmail.trim().length > 0 ||
        profile.contactPhone.trim().length > 0,
    },
    {
      label: "Opening hours",
      complete: Boolean(profile.openingTime && profile.closingTime),
    },
  ];
  const completedItems = checklist.filter((item) => item.complete).length;

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <Sidebar dashboardType="seller" activeItem="Store profile" />
      <main className="min-h-screen min-w-0 flex-1">
        <Top />
        <section className="space-y-5 px-4 py-6 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 md:text-2xl">
                Store profile
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Update the details students see when they visit your store.
              </p>
            </div>
            <span className="text-xs text-gray-500">Preview updates as you edit</span>
          </div>

          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
            <div className="space-y-5">
              <section
                aria-label="Store preview"
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="h-28 bg-gradient-to-r from-amber-300 to-orange-400" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {profile.storeName || "Your store name"}
                    </h2>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        profile.isOpen
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {profile.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                  <p className="mt-3 min-h-12 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {profile.description || "Your store description will appear here."}
                  </p>
                  <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-800">Pickup:</span>{" "}
                      {profile.pickupLocation || "Add a pickup location"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Hours:</span>{" "}
                      {profile.openingTime || "--:--"}–{profile.closingTime || "--:--"}
                    </p>
                    {(profile.contactEmail || profile.contactPhone) && (
                      <p>
                        <span className="font-medium text-gray-800">Contact:</span>{" "}
                        {[profile.contactPhone, profile.contactEmail]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold text-gray-900">Profile checklist</h2>
                  <span className="text-xs font-medium text-gray-500">
                    {completedItems}/{checklist.length} complete
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {checklist.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span
                        aria-hidden="true"
                        className={`flex size-5 items-center justify-center rounded-full text-xs ${
                          item.complete
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {item.complete ? "✓" : "·"}
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <form
              onSubmit={saveProfile}
              className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
            >
              <section className="space-y-4">
                <div>
                  <h2 className="font-semibold text-gray-900">Store details</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Add the information customers need to find and contact you.
                  </p>
                </div>
                <ProfileField
                  id="store-name"
                  label="Store name"
                  value={profile.storeName}
                  onChange={(storeName) =>
                    setProfile((current) => ({ ...current, storeName }))
                  }
                  placeholder="e.g. Campus Bites"
                  required
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ProfileField
                    id="pickup-location"
                    label="Pickup / hostel location"
                    value={profile.pickupLocation}
                    onChange={(pickupLocation) =>
                      setProfile((current) => ({ ...current, pickupLocation }))
                    }
                    placeholder="e.g. Naraguta Hostel"
                    required
                  />
                  <ProfileField
                    id="contact-phone"
                    label="Contact phone"
                    type="tel"
                    value={profile.contactPhone}
                    onChange={(contactPhone) =>
                      setProfile((current) => ({ ...current, contactPhone }))
                    }
                    placeholder="e.g. 080 1234 5678"
                  />
                </div>
                <ProfileField
                  id="contact-email"
                  label="Contact email"
                  type="email"
                  value={profile.contactEmail}
                  onChange={(contactEmail) =>
                    setProfile((current) => ({ ...current, contactEmail }))
                  }
                  placeholder="you@example.com"
                />
                <div className="space-y-1.5">
                  <label
                    htmlFor="store-description"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Store description
                  </label>
                  <textarea
                    id="store-description"
                    value={profile.description}
                    onChange={(event) =>
                      setProfile((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    rows={4}
                    maxLength={300}
                    placeholder="Tell students what you sell..."
                    className="w-full resize-y rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                  />
                  <p className="text-right text-xs text-gray-400">
                    {profile.description.length}/300
                  </p>
                </div>
              </section>

              <section className="space-y-4 border-t border-gray-100 pt-5">
                <div>
                  <h2 className="font-semibold text-gray-900">Availability</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Set your store hours and whether you are accepting orders.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ProfileField
                    id="opening-time"
                    label="Opens at"
                    type="time"
                    value={profile.openingTime}
                    onChange={(openingTime) =>
                      setProfile((current) => ({ ...current, openingTime }))
                    }
                    required
                  />
                  <ProfileField
                    id="closing-time"
                    label="Closes at"
                    type="time"
                    value={profile.closingTime}
                    onChange={(closingTime) =>
                      setProfile((current) => ({ ...current, closingTime }))
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  aria-pressed={profile.isOpen}
                  onClick={() =>
                    setProfile((current) => ({
                      ...current,
                      isOpen: !current.isOpen,
                    }))
                  }
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${
                    profile.isOpen
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold text-gray-900">
                      {profile.isOpen ? "Store is open" : "Store is closed"}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      {profile.isOpen
                        ? "Students can see your store as open."
                        : "Your store is shown as closed to students."}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      profile.isOpen ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 size-4 rounded-full bg-white transition-transform ${
                        profile.isOpen ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </span>
                </button>
              </section>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
                <p aria-live="polite" className="text-sm text-gray-600">
                  {notice}
                </p>
                <button
                  type="submit"
                  className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  Save store profile
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

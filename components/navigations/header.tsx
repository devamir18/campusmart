"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For students", href: "#categories" },
  { label: "For sellers", href: "#become-a-seller" },
  { label: "Fees" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/buyerdashboard") ||
    ["/login", "/signup"].includes(pathname)
  ) {
    return null;
  }

  return (
    <header className="relative z-20 w-full bg-blue-700">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
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

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a
                    href={link.href}
                    className="text-sm text-white transition-colors hover:text-blue-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="text-sm text-white">{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="rounded px-4 py-2 text-sm text-white hover:bg-white/10">
            Sign In
          </Link>
          <Link href="/buyerdashboard" className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-400">
            Log in
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center rounded-lg text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-7"
          >
            {isOpen ? (
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-white/15 px-5 pb-5 pt-4 sm:px-8 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-3 text-white hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="block rounded-lg px-3 py-3 text-white">
                    {link.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-lg border border-white/70 px-4 py-2.5 text-sm text-white hover:bg-white/10">
              Sign In
            </button>
            <button className="rounded-lg bg-blue-500 px-4 py-2.5 text-sm text-white hover:bg-blue-400">
              Log in
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

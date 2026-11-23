import Link from "next/link";
import Sidebar from "../../layouts/sidebar";
import Top from "../../layouts/top";

const helpTopics = [
  {
    question: "Where can I review and update orders?",
    answer:
      "Open Orders from the seller sidebar to review incoming orders and follow their status.",
  },
  {
    question: "Where can I see my earnings and payouts?",
    answer:
      "Open Earnings to review the earnings summary, weekly chart, and payout information.",
  },
  {
    question: "How do I check product availability?",
    answer:
      "Open Products to see each listed product and its current stock availability.",
  },
  {
    question: "What should I include when asking for help?",
    answer:
      "Include the order number or product name, what you were trying to do, and a screenshot if one is available.",
  },
];

const quickLinks = [
  { label: "View orders", href: "/dashboard/pages/orders" },
  { label: "Manage products", href: "/dashboard/pages/product" },
  { label: "View earnings", href: "/dashboard/pages/earning" },
];

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <Sidebar dashboardType="seller" activeItem="Help and support" />
      <main className="min-h-screen min-w-0 flex-1">
        <Top />
        <section className="space-y-6 px-4 py-6 md:px-6">
          <div className="px-3 py-2">
            <h1 className="text-lg font-semibold text-gray-900 md:text-2xl">
              Help and support
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Find answers and shortcuts for managing your seller dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-base font-bold text-slate-900">
                Frequently asked questions
              </h2>
              <div className="mt-4 divide-y divide-slate-100">
                {helpTopics.map((topic) => (
                  <details key={topic.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-slate-800">
                      {topic.question}
                      <span
                        aria-hidden="true"
                        className="text-xl text-blue-600 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 pr-6 text-sm leading-6 text-slate-600">
                      {topic.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <aside className="space-y-5">
              <section className="rounded-2xl bg-blue-950 p-5 text-white">
                <h2 className="font-bold">Need more help?</h2>
                <p className="mt-2 text-sm leading-6 text-blue-100">
                  When contacting your marketplace administrator, include the
                  relevant order or product details so they can help faster.
                </p>
              </section>

              <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h2 className="font-bold text-slate-900">Quick links</h2>
                <ul className="mt-3 space-y-1">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

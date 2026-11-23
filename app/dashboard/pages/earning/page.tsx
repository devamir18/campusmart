import Sidebar from "../../layouts/sidebar";
import Top from "../../layouts/top";

const weeklyEarnings = [
  { day: "Mon", amount: "₦22k", height: "44%", active: false },
  { day: "Tue", amount: "₦31k", height: "62%", active: false },
  { day: "Wed", amount: "₦28k", height: "56%", active: false },
  { day: "Thu", amount: "₦37k", height: "74%", active: false },
  { day: "Fri", amount: "₦44k", height: "88%", active: true },
  { day: "Sat", amount: "₦32k", height: "64%", active: false },
  { day: "Sun", amount: "₦28k", height: "56%", active: false },
];

const topEarningProducts = [
  { name: "Chicken rice bowl", amount: "₦64,000", share: 29 },
  { name: "Meat pie", amount: "₦50,000", share: 23 },
  { name: "Club sandwich", amount: "₦42,000", share: 19 },
  { name: "Fruit smoothie", amount: "₦66,000", share: 29 },
];

const earningsSummary = [
  { label: "Gross sales", amount: "₦222,000", detail: "From 50 orders" },
  { label: "Platform fee (10%)", amount: "−₦22,200", detail: "Marketplace service fee" },
  { label: "Your earnings", amount: "₦199,800", detail: "After platform fees" },
];

export default function Earnings() {
  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <Sidebar dashboardType="seller" activeItem="Earnings" />
      <main className="min-h-screen min-w-0 flex-1">
        <Top />
        <section className="space-y-6 px-4 py-6 md:px-6">
          <div className="flex items-center justify-between gap-4 px-3 py-2">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 md:text-2xl">
                Earnings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your sales, fees, and payouts.
              </p>
            </div>
            <button
              type="button"
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Download report
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_2fr]">
            <div className="flex flex-col justify-between gap-5 rounded-3xl bg-blue-950 p-6 text-white">
              <div>
                <p className="text-sm text-blue-100">Available to withdraw</p>
                <p className="mt-2 text-3xl font-semibold">₦40,000</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-gray-950 hover:bg-amber-300"
                >
                  Withdraw to bank
                </button>
                <p className="text-xs text-blue-100">Payouts every Monday</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 rounded-3xl bg-white p-4 shadow-sm sm:grid-cols-3">
              {earningsSummary.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col justify-center rounded-2xl p-4"
                >
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="mt-2 text-xl font-bold text-gray-950">
                    {item.amount}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-bold text-slate-900">Earnings this week</h2>
                <span className="text-xs font-medium text-slate-400">
                  Daily total
                </span>
              </div>

              <div className="flex h-48 gap-4">
                <div className="flex flex-col justify-between pb-6 text-[11px] font-medium text-slate-400">
                  <span>₦50k</span>
                  <span>₦40k</span>
                  <span>₦30k</span>
                  <span>₦20k</span>
                  <span>₦10k</span>
                  <span>₦0</span>
                </div>
                <div className="relative grid flex-1 grid-cols-7 items-end gap-2 border-b border-slate-100 pb-2 sm:gap-3">
                  {weeklyEarnings.map((item) => (
                    <div
                      key={item.day}
                      className="group flex h-full flex-col items-center justify-end"
                      title={`${item.day}: ${item.amount}`}
                    >
                      <span
                        className={`mb-1.5 whitespace-nowrap text-[10px] font-semibold sm:text-[11px] ${
                          item.active ? "text-blue-600" : "text-transparent"
                        }`}
                      >
                        {item.amount}
                      </span>
                      <div
                        role="img"
                        aria-label={`${item.day}: ${item.amount}`}
                        style={{ height: item.height }}
                        className={`w-full max-w-[28px] rounded-t-lg transition-colors ${
                          item.active
                            ? "bg-blue-600"
                            : "bg-slate-200 group-hover:bg-blue-200"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2 grid grid-cols-7 gap-2 text-center sm:gap-3">
                {weeklyEarnings.map((item) => (
                  <span
                    key={item.day}
                    className={`text-xs ${
                      item.active
                        ? "font-bold text-slate-900"
                        : "font-medium text-slate-400"
                    }`}
                  >
                    {item.day}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="font-bold text-slate-900">
                  Earnings by product
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Top products contributing to sales
                </p>
              </div>

              <div className="my-auto space-y-5">
                {topEarningProducts.map((product) => (
                  <div key={product.name} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <span className="font-semibold text-slate-800">
                        {product.name}
                      </span>
                      <span className="whitespace-nowrap text-slate-500">
                        {product.amount}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        role="img"
                        aria-label={`${product.share}% of sales`}
                        style={{ width: `${product.share}%` }}
                        className="h-full rounded-full bg-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

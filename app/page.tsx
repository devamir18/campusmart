import Hero from "@/components/sections/hero";
import Howitworks from "@/components/sections/howitworks";
import Safe from "@/components/sections/safe";
import Sell from "@/components/sections/sell";
import Shop from "@/components/sections/shop"
import Footer from "@/components/navigations/footer"
import HeroFunction from "@/components/sections/herofunction"

export default function Page() {
  return (
    <>
      <section className="bg-blue-600 text-white">
        <div className="mx-auto grid min-h-[min(42rem,calc(100svh-4rem))] max-w-7xl grid-cols-1 items-center gap-8 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20 lg:px-12">
          <div className="max-w-2xl motion-rise-in">
            <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              Buy from campus sellers.
              <span className="mt-2 block">And pay when it arrives.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
              Textbooks, gadgets, hot meals and hostel essentials from verified
              sellers on your campus. Your payment is held safely until you
              confirm delivery.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-yellow-600">
                Start Shopping
              </button>
              <button
                id="become-a-seller"
                className="rounded-xl border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Become a Seller
              </button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-50">
              <li>✓ Verified Sellers</li>
              <li>✓ Held Payment</li>
              <li>✓ Campus Delivery</li>
            </ul>
          </div>
          <div className="hidden md:block">
            {/* Right Column: Floating Order & Product Cards */}
<div className="relative w-full max-w-md mx-auto pb-12">
  
  {/* Main Card: Order 2087 */}
  <div className="bg-white rounded-2xl p-6 shadow-2xl text-slate-900 motion-rise-in" style={{ animationDelay: "120ms" }}>
    {/* Card Header */}
    <div className="flex items-center justify-between mb-5">
      <span className="font-bold text-slate-800 text-base">Order 2087</span>
      <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
        On the way
      </span>
    </div>

    {/* Item Details Row */}
    <div className="flex items-center justify-between pb-5 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-amber-100/80 text-amber-800 font-bold flex items-center justify-center text-base">
          C
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Chicken rice bowl</h4>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">
            ✓ Amaka&apos;s Kitchen, verified
          </p>
        </div>
      </div>
      <span className="font-bold text-slate-900 text-base">2,500</span>
    </div>

    {/* Vertical Order Timeline */}
    <div className="relative my-5 space-y-4">
     
      <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-slate-200" />

     
      <div className="relative flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white z-10" />
          <span className="font-medium text-slate-700">Paid and held safely</span>
        </div>
        <span className="text-slate-400">12:04 pm</span>
      </div>

     
      <div className="relative flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white z-10" />
          <span className="font-medium text-slate-700">Seller is preparing</span>
        </div>
        <span className="text-slate-400">12:09 pm</span>
      </div>

     
      <div className="relative flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100 z-10" />
          <span className="font-semibold text-slate-900">On the way to Block C</span>
        </div>
        <span className="text-slate-400">12:21 pm</span>
      </div>

      
      <div className="relative flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white z-10" />
          <span className="text-slate-400">Delivered</span>
        </div>
        <span className="text-slate-400">Soon</span>
      </div>
    </div>

    
    <div className="bg-emerald-50/90 border border-emerald-100 rounded-xl py-2.5 px-4 text-center">
      <p className="text-xs font-medium text-emerald-700">
        Your 2,500 is held until you confirm delivery.
      </p>
    </div>
  </div>


  <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-4 sm:-left-8 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3.5 max-w-[270px] motion-float">
    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-base shrink-0">
      O
    </div>
    <div>
      <h5 className="text-xs font-bold text-slate-900 leading-snug">
        Organic Chemistry, 4th ed.
      </h5>
      <p className="text-xs font-extrabold text-slate-800 mt-0.5">6,500</p>
      <span className="inline-block mt-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
        Verified seller
      </span>
    </div>
  </div>

</div>
          </div>

        </div>
      </section>
      <Hero />
      <Howitworks />
      <Safe />
      <Sell />
      <Shop/>
      <Footer/>
    </>
  );
}

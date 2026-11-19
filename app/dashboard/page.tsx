import Sidebar from "./layouts/sidebar";
import Table from "./layouts/table";
import Top from "./layouts/top";

const weeklySales = [
  { day: "Mon", amount: "22k", height: "55%", active: false },
  { day: "Tue", amount: "31k", height: "78%", active: false },
  { day: "Wed", amount: "28k", height: "70%", active: false },
  { day: "Thu", amount: "37k", height: "92%", active: false },
  { day: "Fri", amount: "24.5k", height: "61%", active: true },
  { day: "Sat", amount: "0", height: "4%", active: false },
  { day: "Sun", amount: "0", height: "4%", active: false },
];

const bestSellers = [
  { name: "Chicken rice bowl", sold: 18, progress: "100%" },
  { name: "Meat pie", sold: 12, progress: "68%" },
  { name: "Club sandwich", sold: 8, progress: "45%" },
  { name: "Fruit smoothie", sold: 5, progress: "28%" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <Sidebar dashboardType="seller" activeItem="Overview" />
      <main className="min-h-screen min-w-0 flex-1">
        <Top />
        <div className="h-12 mt-4 w-full bg-gray-100 flex justify-between md:mt-4 bg-re-900">
           <div>
             <h2 className="text-base md:text-2xl flex items-center text-gray-950 tracking-wide font-semibold px-12">Good day, Ali</h2>
             <p className="text-sm tet-gray-300 tracking-tighter px-13 -mt-1">friday 23</p>
           </div>
            <button className="flex flex-cols text-sm w-30 h-8 mx-4 rounded-full md:mt-2 gap-2 bg-blue-600 justify-center items-center"> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	         <path d="M0 0h24v24H0z" fill="none" />
	         <path fill="currentColor" d="M11 21v-8H3v-2h8V3h2v8h8v2h-8v8z" /> 
              </svg>Add Product</button>
        </div>
              
              <div className="w-full h-auto grid grid-cols-1 gap-4 md:flex flex-cols px-4 py-3">
                <div className="w-full px-2 flex md:max-w-84 h-40 justify-between bg-blue-600 rounded-xl">
                  <span className="flex flex-col gap-3 px-2">
                       <p className="px-3 py-4 text-lg md:text-xl ">3 new order waiting </p>
                       <p className="text-sm -mt-6 px-4 text-gray-300 tracking-tight">The oldest has waited 3 minutes</p>
                       <button className="w-40 h-9 mt-1 mx-3 text-sm font-semibold rounded-full text-base bg-yellow-400">Review order</button>
                  </span>

                  <span className="flex px-4 items-center">
                    <div className="w-15 h-15 rounded-full  bg-white/20 justify-center text-2xl flex items-center">
                    <p>3</p>
                    </div>
                  </span>
                </div>


                <div className="w-full min-h-[140px] grid grid-cols-2 md:flex flex-row items-center shadow-lg rounded-3xl justify-between px-4 py-3 gap-4 md:gap-0">
    
    {/* Item 1 */}
    <main className="w-full flex md:w-auto  p-4 gap-2 flex-col px-4  text-white rounded-lg ">
        <p className="text-sm py-4 -mt-4 text-gray-400">Today`s sales</p>
        <h2 className="text-lg font-bold text-gray-950 -mt-4">22,000</h2>
        <p className="text-xs text-green-400 ">+12% vs yesterday</p>
    </main>

    {/* Divider 1 */}
    <div className="hidden md:block w-[1px] h-10 bg-amber-100 mx-2" />

    {/* Item 2 */}
   <main className="w-full flex md:w-auto p-4 gap-2 flex-col px-4 text-white rounded-lg ">
        <p className="text-sm py-4 text-gray-400 -mt-4">Orders today</p>
        <h2 className="text-lg font-semibold text-gray-950 -mt-4">6</h2>
        <p className="text-xs text-gray-400 ">3 still open</p>
    </main>

    {/* Divider 2 */}
    <div className="hidden md:block w-[1px] h-10 bg-amber-100 mx-2" />

    {/* Item 3 */}
   <main className="w-full flex md:w-auto p-4 gap-2 flex-col px-4 text-white rounded-lg ">
        <p className="text-sm py-4 text-gray-400 -mt-4">This week</p>
        <h2 className="text-lg font-semibold text-gray-950 -mt-4">122,000</h2>
        <p className="text-xs text-gray-400 ">+4% vs last week</p>
    </main>

    {/* Divider 3 */}
    <div className="hidden md:block w-[1px] h-10 bg-amber-100 mx-2" />

    {/* Item 4 */}
   <main className="w-full flex md:w-auto p-4 gap-2 flex-col px-4 text-white rounded-lg ">
        <p className="text-sm py-4 text-gray-400 -mt-4">Pending payout</p>
        <h2 className="text-lg font-semibold text-gray-950 -mt-4">30,000</h2>
        <p className="text-xs text-gray-300 ">Paid out monday</p>
          </main>
          </div>
            </div>
                    
                    <div className="w-full h-auto p-4 grid grid-cols-1 md:grid-cols-2 px-6 mt-3 gap-6">
      
      {/* LEFT CARD: Sales This Week (Bar Chart) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900 text-base">Sales this week</h3>
          <span className="text-xs font-medium text-slate-400">Nov 9 to Nov 15</span>
        </div>

        {/* Chart Area (Y-Axis + Bars) */}
        <div className="flex gap-4 h-48">
          {/* Y-Axis Labels */}
          <div className="flex flex-col justify-between text-[11px] font-medium text-slate-400 pb-6 select-none">
            <span>40k</span>
            <span>30k</span>
            <span>20k</span>
            <span>10k</span>
            <span>0k</span>
          </div>

          {/* Bars Container */}
          <div className="flex-1 grid grid-cols-7 gap-2 sm:gap-3 items-end border-b border-slate-100 pb-2 relative">
            {weeklySales.map((item) => (
              <div key={item.day} className="flex flex-col items-center h-full justify-end group">
                {/* Floating Value Label above active bar */}
                {item.active && (
                  <span className="text-[11px] font-bold text-blue-600 mb-1.5">
                    {item.amount}
                  </span>
                )}

                {/* The Bar */}
                <div
                  style={{ height: item.height }}
                  className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 ${
                    item.active
                      ? "bg-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                      : "bg-slate-200/80 group-hover:bg-blue-200"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* X-Axis Day Labels */}
        <div className="flex gap-4 mt-2">
          <div className="w-6" /> {/* Spacer to align under bars, not Y-axis */}
          <div className="flex-1 grid grid-cols-7 gap-2 sm:gap-3 text-center">
            {weeklySales.map((item) => (
              <span
                key={item.day}
                className={`text-xs ${
                  item.active ? "font-bold text-slate-900" : "font-medium text-slate-400"
                }`}
              >
                {item.day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT CARD: Best Sellers Today (Progress Bars) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900 text-base">Best sellers today</h3>
        </div>

        {/* Progress Items List */}
        <div className="space-y-5 my-auto">
          {bestSellers.map((product) => (
            <div key={product.name} className="space-y-2">
              {/* Top Row: Product Name + Sold Count */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-800">{product.name}</span>
                <span className="text-xs font-medium text-slate-400">
                  {product.sold} sold
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                {/* Filled Blue Bar */}
                <div
                  style={{ width: product.progress }}
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

        <div className="px-4 p-3">
            <Table/>
        </div>

                   
      </main>
    </div>
  );
}
import Sidebar from "../../layouts/sidebar";
import Top from "../../layouts/top";

const latestOrders = [
  {
    id: "Order 1052",
    items: "Chicken rice bowl, Fruit smoothie",
    deliverTo: "Block C, Room 214",
    total: "5,300",
    status: "New",
    statusBg: "bg-blue-50 text-blue-600",
    actionText: "Accept",
    actionBg: "bg-blue-700 hover:bg-blue-800 text-white",
    time: "2 mins ago",
  },
  {
    id: "Order 1053",
    items: "Jollof rice, Plantain",
    deliverTo: "Naraguta Hostel",
    total: "3,200",
    status: "New",
    statusBg: "bg-blue-50 text-blue-600",
    actionText: "Accept",
    actionBg: "bg-blue-700 hover:bg-blue-800 text-white",
    time: "5 mins ago",
  },
  {
    id: "Order 1051",
    items: "Meat pie x3",
    deliverTo: "Block A, Room 105",
    total: "2,400",
    status: "Preparing",
    statusBg: "bg-amber-50 text-amber-600",
    actionText: "Mark ready",
    actionBg: "bg-slate-100 hover:bg-slate-200 text-slate-800",
    time: "12 mins ago",
  },
  {
    id: "Order 1050",
    items: "Club sandwich",
    deliverTo: "Pickup, food court",
    total: "1,800",
    status: "Ready",
    statusBg: "bg-emerald-50 text-emerald-600",
    actionText: "Hand to rider",
    actionBg: "bg-slate-100 hover:bg-slate-200 text-slate-800",
    time: "20 mins ago",
  },
  {
    id: "Order 1048",
    items: "Chicken rice bowl x2",
    deliverTo: "Block B, Room 012",
    total: "5,000",
    status: "Done",
    statusBg: "bg-slate-100 text-slate-600",
    actionText: "View",
    actionBg: "bg-slate-100 text-slate-600 hover:bg-slate-200",
    time: "1 hr ago",
  },
];

const columns = [
  { title: "New", statuses: ["New"], badgeBg: "bg-blue-100 text-blue-700" },
  { title: "Preparing", statuses: ["Preparing"], badgeBg: "bg-amber-100 text-amber-700" },
  { title: "Orders", statuses: ["Ready", "Done"], badgeBg: "bg-emerald-100 text-emerald-700" },
];

export default function Orders() {
  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <Sidebar dashboardType="seller" activeItem="Orders" />
      <main className="min-h-screen min-w-0 flex-1">
        <Top />
        <section className="px-4 py-6 md:px-6">
          <div className="w-full h-auto px-3 py-4 flex justify-between items-center">
            <p className="text-lg md:text-2xl font-semibold text-gray-900">Orders</p>

            <span className="flex items-center gap-2">
              <button className="w-28 h-9 rounded-full border border-white/40 backdrop-blur-md bg-white/85 text-gray-950 text-sm font-medium tracking-wide">
                Today
              </button>
              <button className="w-28 h-9 rounded-full bg-blue-950 text-white text-sm font-medium tracking-wide">
                This week
              </button>
            </span>
          </div>

          <div className="grid grid-cols-1 md:flex md:flex-row gap-4 mt-2 items-start">
            {columns.map((col) => {
              const colOrders = latestOrders.filter((o) =>
                col.statuses.includes(o.status)
              );

              return (
                <div
                  key={col.title}
                  className="w-full md:flex-1 p-4 bg-gray-200/70 backdrop-blur-md rounded-2xl flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between px-1">
                    <h2 className="text-sm font-bold text-gray-800">{col.title}</h2>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${col.badgeBg}`}
                    >
                      {colOrders.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {colOrders.map((order) => (
                      <div
                        key={order.id}
                        className="w-full p-4 bg-white rounded-2xl shadow-sm border border-white/60 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900 font-bold">
                                {order.id}
                              </span>
                              <span
                                className={`${order.statusBg} rounded-full text-[11px] font-semibold px-2.5 py-0.5`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 whitespace-nowrap">
                              {order.time}
                            </p>
                          </div>

                          <div className="mt-2.5 space-y-1.5">
                            <p className="text-xs sm:text-sm text-gray-700 font-medium">
                              {order.items}
                            </p>
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3.5 h-3.5 text-gray-400 shrink-0"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                />
                              </svg>
                              <span>{order.deliverTo}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                          <div className="flex flex-col">
                            <span className="text-[11px] text-gray-400">Total</span>
                            <span className="text-gray-900 font-bold text-sm">
                              {order.total}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {order.status === "New" && (
                              <button className="px-3 h-8 rounded-full text-gray-700 border border-gray-200 hover:bg-gray-50 text-xs font-medium bg-white transition">
                                Decline
                              </button>
                            )}
                            <button
                              className={`px-3.5 h-8 text-xs font-semibold rounded-full transition ${order.actionBg}`}
                            >
                              {order.actionText}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
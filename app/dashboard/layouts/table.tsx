"use client";

const latestOrders = [
  {
    id: "Order 1052",
    items: "Chicken rice bowl, Fruit smoothie",
    deliverTo: "Block C, Room 214",
    total: "5,300",
    status: "New",
    statusBg: "bg-blue-50 text-blue-600",
    actionText: "Accept",
    actionBg: "bg-blue-600 hover:bg-blue-700 text-white",
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
  },
  {
    id: "Order 1048",
    items: "Chicken rice bowl x2",
    deliverTo: "Block B, Room 012",
    total: "5,000",
    status: "Done",
    statusBg: "bg-slate-100 text-slate-600",
    actionText: "View",
    actionBg: "text-slate-500 hover:text-slate-800",
  },
];

export default function Table() {
  return (
    <div className="w-full bg-white  rounded-2xl p-6 border border-slate-100 shadow-sm mt-6">
      
      {/* Table Header Row (Title + See all link) */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900 text-base">Latest orders</h3>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
          See all orders
        </button>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          {/* Table Headings */}
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pr-4">Order</th>
              <th className="pb-3 px-4">Items</th>
              <th className="pb-3 px-4">Deliver to</th>
              <th className="pb-3 px-4">Total</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 pl-4 text-right">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-50 text-xs sm:text-sm">
            {latestOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/60 transition">
                
                {/* Order ID */}
                <td className="py-4 pr-4 font-bold text-slate-900 whitespace-nowrap">
                  {order.id}
                </td>

                {/* Items */}
                <td className="py-4 px-4 font-medium text-slate-700">
                  {order.items}
                </td>

                {/* Deliver To */}
                <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                  {order.deliverTo}
                </td>

                {/* Total Price */}
                <td className="py-4 px-4 font-semibold text-slate-900 whitespace-nowrap">
                  {order.total}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${order.statusBg}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Action Button */}
                <td className="py-4 pl-4 text-right whitespace-nowrap">
                  <button
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${order.actionBg}`}
                  >
                    {order.actionText}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
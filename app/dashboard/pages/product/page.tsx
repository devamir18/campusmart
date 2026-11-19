import Sidebar from "../../layouts/sidebar";
import Top from "../../layouts/top";

type Product = {
  id: string;
  category: string;
  price: string;
  stock: number;
};

const products: Product[] = [
  { id: "Chicken rice bowl", category: "Food", price: "5,300", stock: 12 },
  { id: "Fruit smoothie", category: "Drinks", price: "1,800", stock: 10 },
  { id: "Meat pie", category: "Snacks", price: "800", stock: 0 },
  { id: "Club sandwich", category: "Food", price: "2,400", stock: 6 },
];

export default function Product() {
  const availableProducts = products.filter((product) => product.stock > 0).length;

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <Sidebar dashboardType="seller" activeItem="Products" />
      <main className="min-h-screen min-w-0 flex-1">
        <Top />
        <section className="px-5 py-6 md:px-6">
          <div className="flex w-full items-center justify-between px-3 py-4">
            <div>
              <h1 className="py-2 text-lg font-semibold text-gray-900 md:text-2xl">
                Products
              </h1>
              <p className="text-sm text-gray-400">
                {products.length} items, {availableProducts} available
              </p>
            </div>
            <button
              type="button"
              className="mx-4 flex h-9 items-center justify-center gap-2 rounded-full bg-blue-600 px-4 text-sm text-white"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M11 21v-8H3v-2h8V3h2v8h8v2h-8v8z"
                />
              </svg>
              Add Product
            </button>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pr-4">Product</th>
                  <th className="px-4 pb-3">Category</th>
                  <th className="px-4 pb-3">Price</th>
                  <th className="px-4 pb-3">Stock</th>
                  <th className="px-4 pb-3">Availability</th>
                  <th className="pb-3 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs sm:text-sm">
                {products.map((product) => {
                  const isAvailable = product.stock > 0;

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-slate-50/60"
                    >
                      <td className="whitespace-nowrap py-4 pr-4 font-bold text-slate-900">
                        {product.id}
                      </td>
                      <td className="px-4 py-4 font-medium text-slate-700">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                        {product.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-900">
                        {product.stock}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${
                            isAvailable
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {isAvailable ? "In stock" : "Out of stock"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 text-right">
                        <span className="text-xs font-semibold text-slate-500">
                          -
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
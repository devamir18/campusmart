const categories = [
  {
    name: "Textbooks",
    description: "New and used course books",
    color: "bg-blue-100",
  },
  {
    name: "Gadgets",
    description: "Phones, chargers and laptops",
    color: "bg-amber-100",
  },
  {
    name: "Food",
    description: "Hot meals and snacks",
    color: "bg-green-100",
  },
  {
    name: "Campus services",
    description: "Printing and laundry",
    color: "bg-purple-100",
  },
  {
    name: "Hostel essentials",
    description: "Bedding, fans and kitchenware",
    color: "bg-rose-100",
  },
];

export default function Hero() {
  return (
    <section id="categories" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-gray-950 sm:text-4xl">
            Everything students need, in one place
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Browse by what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => (
            <article
              key={category.name}
              style={{ animationDelay: `${index * 80}ms` }}
              className={`motion-rise-in flex min-h-40 flex-col justify-end rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6 ${category.color}`}
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {category.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

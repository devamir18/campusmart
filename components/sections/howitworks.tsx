const steps = [
  {
    title: "Find what you need",
    description: "Find a verified seller and add items to your cart.",
  },
  {
    title: "Pay, and we hold it",
    description:
      "Your payment goes to CampusMart, not straight to the seller, so you are covered if something goes wrong.",
  },
  {
    title: "Confirm and we release it",
    description:
      "Confirm when your order arrives and we pay the seller. If it never shows up, we refund you.",
  },
];

export default function Howitworks() {
  return (
    <section id="how-it-works" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
          How it works
        </h2>

        <ol className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <li
              key={step.title}
              style={{ animationDelay: `${index * 120}ms` }}
              className="motion-rise-in rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-blue-950 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-gray-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

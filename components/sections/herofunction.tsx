export default function HeroFunction() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Feature 1 */}
          <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition">
            <div className="flex-shrink-0 bg-blue-50 text-blue-600 p-3 rounded-lg">
              {/* Small Tick Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Verified Campus Vendors</h3>
              <p className="mt-1 text-sm text-gray-600">Buy safely from trusted students and local student entrepreneurs on your campus.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition">
            <div className="flex-shrink-0 bg-blue-50 text-blue-600 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Secure Escrow Protection</h3>
              <p className="mt-1 text-sm text-gray-600">Your money is held safely and only released to the seller after you confirm delivery.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition">
            <div className="flex-shrink-0 bg-blue-50 text-blue-600 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Direct Campus Delivery</h3>
              <p className="mt-1 text-sm text-gray-600">Get your textbooks, gadgets, and hostel gear delivered right to your block or hall.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
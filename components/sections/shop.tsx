

export default function Shop() {


   return(
    <>
    
      <div className="w-full h-auto bg-gray-950 py-12">
        <h2 className="motion-rise-in text-2xl font-semibold md:text-3xl md:px-22 text-white">Shop smarter on your campus. or start selling today</h2>
            
            <div className="motion-rise-in flex flex-cols gap-8 md:mx-23 mt-7 md:mx-26" style={{ animationDelay: "100ms" }}>
                <button className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-yellow-600 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  Start Shopping
                </button>
                <button className="rounded-xl border border-white/70 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  Become a Seller
                </button>

            </div>

        </div>
    
    </>
   )}
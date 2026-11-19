import Image from "next/image";



export default function Sell() { 


return(
    <>
    
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 px-5 bg-white py-12">

        <div className="motion-rise-in flex flex-col gap-5 md:gap-7 py-9 md:py-12 px-5 md:px-12">
            <h2 className="text-2xl font-semibold md:text-3xl md:px-22 text-gray-950">Sell to students on your<br/> campus.
              
              <div className="mt-6 text-sm md:text-base text-gray-700">
                <p className="leading-relaxed">
                  Free to list 10% only when you sell
                </p>

                <p className="leading-relaxed">
                  Weekly payouts to your bank account 
                </p>

                <p className="leading-relaxed">
                  Manage orders from your phones or laptops 
                </p>
              </div>
            </h2>
        </div>

       <div className="motion-rise-in w-full flex items-center justify-center overflow-hidden" style={{ animationDelay: "120ms" }}>
  <Image
    src="/image/orders.png"
    alt="Campus Marketplace"
    width={600}
    height={400}
    priority
    className="w-full max-w-sm md:max-w-md h-auto object-contain rounded-xl"
  />
</div>


    </div>
    
    </>
    )}
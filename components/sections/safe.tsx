import EscrowFlowAnimation from "@/components/sections/EscrowFlowAnimation"

export default function Safe() {
    return(
        <>

        <div className="w-full h-auto md:py-12 bg-white">

            <div className="motion-rise-in max-w-5xl h-auto bg-gray-900 gap-8 grid grid-cols-1 px-8 py-4 md:m-auto rounded-3xl lg:grid-cols-2">
                <div className="flex flex-col">
                    <h2 className="text-xl font-semibold md:text-2xl py-8 px-12">Your money stay safe until you say so.</h2>
                     
                     <div className="-mt-8 px-15 p-6">
                        <p>Payment held until delivery is confirmed.</p>
                      <p>Refund if delivery never arrives.</p>
                      <p>Every seller is checked before going live.</p>
                     </div>

                </div>

              <div className="h-auto rounded-2xl flex items-center justify-center overflow-hidden px-4">
              <EscrowFlowAnimation />
                </div>

            </div>

        </div>
        
        
        </>
    )};
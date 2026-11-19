"use client";

import { useState, useEffect } from "react";

export default function EscrowFlowAnimation() {
  // Cycles through 3 stages: 0 (You -> CampusMart), 1 (Held in CampusMart), 2 (CampusMart -> Seller)
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 2000); // Changes step every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white rounded-xl flex flex-col items-center justify-center py-3 px-3 select-none">
      {/* 3-Node Flow Container */}
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        
        {/* NODE 1: YOU (Blue Circle) */}
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white transition-all duration-500 ${
              stage === 0
                ? "scale-110 ring-4 ring-blue-400/40 shadow-[0_0_15px_rgba(37,99,235,0.45)]"
                : "opacity-85"
            }`}
          >
            {/* User Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="mt-1.5 text-xs font-semibold text-slate-800">You</span>
        </div>

        {/* ARROW 1: PAYS */}
        <div className="flex flex-col items-center -mt-4">
          <span
            className={`text-[10px] font-medium mb-1 transition-colors duration-300 ${
              stage === 0 ? "text-amber-600 font-bold" : "text-slate-400"
            }`}
          >
            Pays
          </span>
          <div className="relative w-10 sm:w-16 h-0.5 bg-slate-300 flex items-center">
            {/* Animated Moving Dot */}
            <span
              className={`absolute w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] transition-all duration-1000 ${
                stage === 0 ? "left-full -translate-x-full opacity-100" : "left-0 opacity-0"
              }`}
            />
            {/* Arrowhead */}
            <svg className="w-3.5 h-3.5 text-slate-400 absolute -right-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* NODE 2: CAMPUSMART ESCROW (Yellow Circle) */}
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 transition-all duration-500 ${
              stage === 1
                ? "scale-110 ring-4 ring-amber-300/60 shadow-[0_0_18px_rgba(251,191,36,0.55)]"
                : "opacity-90"
            }`}
          >
            {/* Escrow / Shield / Chart Logo Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 14v-3M12 14V9M15 14v-4" />
            </svg>
          </div>
          <span className="mt-1.5 text-xs font-semibold text-slate-800">CampusMart</span>
        </div>

        {/* ARROW 2: PAID OUT */}
        <div className="flex flex-col items-center -mt-4">
          <span
            className={`text-[10px] font-medium mb-1 transition-colors duration-300 ${
              stage === 2 ? "text-emerald-600 font-bold" : "text-slate-400"
            }`}
          >
            Paid out
          </span>
          <div className="relative w-10 sm:w-16 h-0.5 bg-slate-300 flex items-center">
            {/* Animated Moving Dot */}
            <span
              className={`absolute w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] transition-all duration-1000 ${
                stage === 2 ? "left-full -translate-x-full opacity-100" : "left-0 opacity-0"
              }`}
            />
            {/* Arrowhead */}
            <svg className="w-3.5 h-3.5 text-slate-400 absolute -right-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* NODE 3: SELLER (Green Circle) */}
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white transition-all duration-500 ${
              stage === 2
                ? "scale-110 ring-4 ring-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.45)]"
                : "opacity-85"
            }`}
          >
            {/* Storefront / Seller Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
            </svg>
          </div>
          <span className="mt-1.5 text-xs font-semibold text-slate-800">Seller</span>
        </div>
      </div>

      {/* Bottom Dynamic Status Caption */}
      <p className="mt-3 text-[11px] sm:text-xs font-medium text-slate-600 text-center transition-opacity duration-300">
        {stage === 0 && "1. You pay safely into CampusMart"}
        {stage === 1 && "2. Payment held until you confirm delivery"}
        {stage === 2 && "3. Released to seller once you confirm!"}
      </p>
    </div>
  );
}
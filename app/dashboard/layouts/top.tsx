export default function Top() {
    return (
        <>
            <div className="hidden md:flex w-full h-16 items-center justify-between bg-gray-100 px-6 py-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="py-1.5 px-4 text-gray-500 text-sm border border-gray-200 w-72 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex items-center gap-3">
                    <span className="p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="text-black w-7 h-7">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="M7 18q-2.5 0-4.25-1.75T1 12t1.75-4.25T7 6h10q2.5 0 4.25 1.75T23 12t-1.75 4.25T17 18zm0-2h10q1.65 0 2.825-1.175T21 12t-1.175-2.825T17 8H7Q5.35 8 4.175 9.175T3 12t1.175 2.825T7 16m2.125-1.875Q10 13.25 10 12t-.875-2.125T7 9t-2.125.875T4 12t.875 2.125T7 15t2.125-.875M12 12" />
                        </svg>
                    </span>

                    <span className="w-10 h-10 rounded-full bg-white border border-gray-200 flex justify-center items-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="w-5 h-5 text-slate-700">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h1v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18t-.288.713T19 19zm7 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m.713-9.287Q13 12.425 13 12V9q0-.425-.288-.712T12 8t-.712.288T11 9v3q0 .425.288.713T12 13t.713-.288M12 16q.425 0 .713-.288T13 15t-.288-.712T12 14t-.712.288T11 15t.288.713T12 16" />
                        </svg>
                    </span>

                    <span className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs border border-gray-200 flex items-center justify-center shadow-sm">
                        AK
                    </span>
                </div>
            </div>
        </>
    );
}
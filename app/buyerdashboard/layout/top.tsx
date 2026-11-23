"use client";

import Image from "next/image"
import Link from "next/link"
import { useBuyerCart } from "../cart-context";
import { getBuyerInitials, useBuyerAccount } from "../account-context";

export default function Top() {
    const { cartCount } = useBuyerCart();
    const { account } = useBuyerAccount();
    const initials = getBuyerInitials(account.profile.fullName);


    return(
        <>

             <div className="w-full h-auto px-3 py-2 border-b-1 border-gray-100 shadow-sm">
                <main className="hidden md:flex justify-between gap-3 px-3 py-2">
                    <div>
                        <Link href="/buyerdashboard" aria-label="Campus Marketplace home">
          <Image
            src="/image/campuslogo.svg"
            alt="Campus Marketplace"
            width={180}
            height={32}
            priority
            className="h-auto w-36 md:w-40"
          />
        </Link>
                    </div>

                    <div>
                       <input type="text" name="" id="" placeholder="Search food, books gadgets and more" className="w-80 h-9 text-xs px-3 bg-gray-100 text-gray-400 rounded-full"/>
                    </div>

                    <div className="flex flex-cols gap-4 items-center  ">
                          <Link
                            href="/buyerdashboard/orders"
                            className="text-sm font-medium text-blue-700 hover:text-blue-900"
                          >
                            My orders
                          </Link>
                               <Link
                                href="/buyerdashboard/checkout"
                                aria-label={`Shopping cart, ${cartCount} items`}
                                className="relative rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                               >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-7">
	<path d="M0 0h24v24H0z" fill="none" />
	<g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
		<path d="M5 7h13.79a2 2 0 0 1 1.99 2.199l-.6 6A2 2 0 0 1 18.19 17H8.64a2 2 0 0 1-1.962-1.608z" />
		<path strokeLinecap="round" d="m5 7l-.81-3.243A1 1 0 0 0 3.22 3H2m6 18h2m6 0h2" />
	</g>
                               </svg>
                               <span aria-hidden="true" className="absolute -right-2 -top-1 flex min-w-4 items-center justify-center rounded-full bg-blue-700 px-1 text-[9px] font-bold text-white">
                                  {cartCount}
                               </span>
                               </Link>
                               <Link
                                 href="/buyerdashboard/account"
                                 aria-label="Your account"
                                 className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-blue-50 text-xs font-bold text-blue-700 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                               >
                                 {account.profile.photoDataUrl ? (
                                   <Image
                                     src={account.profile.photoDataUrl}
                                     alt=""
                                     width={40}
                                     height={40}
                                     unoptimized
                                     className="size-full object-cover"
                                   />
                                 ) : (
                                   initials
                                 )}
                               </Link>
                    </div>
                </main>
    
                    <main className="flex justify-between mx-3 items-center md:hidden">

                           <Link href="/buyerdashboard" aria-label="Campus Marketplace home">
          <Image
            src="/image/campuslogo.svg"
            alt="Campus Marketplace"
            width={180}
            height={32}
            priority
            className="h-auto w-36 md:w-40"
          />
        </Link>


                        <div className="flex items-center gap-4">
                          <Link
                            href="/buyerdashboard/orders"
                            className="text-sm font-medium text-blue-700 hover:text-blue-900"
                          >
                            My orders
                          </Link>
                          <Link
                            href="/buyerdashboard/checkout"
                            aria-label={`Shopping cart, ${cartCount} items`}
                            className="relative rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                          >
                               <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-9 text-gray-600">
	<path d="M0 0h24v24H0z" fill="none" />
	<g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
		<path d="M5 7h13.79a2 2 0 0 1 1.99 2.199l-.6 6A2 2 0 0 1 18.19 17H8.64a2 2 0 0 1-1.962-1.608z" />
		<path strokeLinecap="round" d="m5 7l-.81-3.243A1 1 0 0 0 3.22 3H2m6 18h2m6 0h2" />
	</g>
                               </svg>
                               <span aria-hidden="true" className="absolute right-0 top-0 flex min-w-4 items-center justify-center rounded-full bg-blue-700 px-1 text-[9px] font-bold text-white">
                                  {cartCount}
                        </span>
                          </Link>
                          <Link
                            href="/buyerdashboard/account"
                            aria-label="Your account"
                            className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-[10px] font-bold text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                          >
                            {account.profile.photoDataUrl ? (
                              <Image
                                src={account.profile.photoDataUrl}
                                alt=""
                                width={36}
                                height={36}
                                unoptimized
                                className="size-full object-cover"
                              />
                            ) : (
                              initials
                            )}
                          </Link>
                        </div>

                    </main>
                      
                </div>   
        


        </>
    )}
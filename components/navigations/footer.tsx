import Image from "next/image";
import Link from "next/link";
import { io } from "next/cache";
import { Suspense } from "react";

export default function Footer() {
    return(
        <>
        <div className="w-full h-auto bg-white py-6 flex flex-col md:justify-between md:flex-row gap-7">
             <Link href="/" aria-label="Campus Marketplace home">
             <Image
              src="/image/campuslogo.svg"
              alt="Campus Marketplace"
              width={180}
              height={32}
              className="mx-12"
             />
        </Link>

        <div className="flex flex-col gap-2 mx-4">
            <p className="text-sm text-gray-600">
                &copy;{" "}
                <Suspense fallback={null}>
                    <CopyrightYear />
                </Suspense>{" "}
                Campus Marketplace. All rights reserved.
            </p>
        </div>

        </div>
        
        
        </>
    )    }

    async function CopyrightYear() {
        await io();
        return <>{new Date().getFullYear()}</>;
    }
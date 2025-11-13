"use client"

import Link from "next/link";

export default function Navbar(){
    return (
        <div className="sticky rounded-2xl border p-4 m-4 z-50 top-4 border-b border-blue-500/30 shadow-lg shadow-blue-400/20 bg-white/80 backdrop-blur-md">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <h2 className="text-blue-400 font-bold text-xl">call4ly</h2>
                    </div>
                </Link>



            </div>
        </div>
    )
}
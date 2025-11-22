"use client"

import Link from "next/link";
import Image from "next/image";

export default function Navbar(){
    return (
        <nav className="sticky top-4 z-50 mx-4 mb-4">
            <div className="max-w-7xl mx-auto rounded-2xl border border-gray-200/50 bg-white/70 backdrop-blur-xl shadow-sm  transition-all duration-300">

                <div className="flex items-center justify-between px-6 py-4">

                    {/* Logo */}
                    <Link href="/" aria-label="Call4ly Forside" className="flex items-center gap-2 cursor-pointer">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-300">
                            Call4ly
                        </h2>
                    </Link>

                    <Link
                        href="/login"
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:scale-105"
                    >
                        Login
                    </Link>

                </div>

            </div>
        </nav>
    );
}
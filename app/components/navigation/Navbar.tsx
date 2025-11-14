"use client"

import Link from "next/link";

export default function Navbar(){
    return (
        <div className="sticky top-4 z-50 mx-4 mb-4">
            <div className="max-w-7xl mx-auto rounded-2xl border border-gray-200/50 bg-white/60 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center gap-2 group">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-cyan-700 transition-all">
                                Call4ly
                            </h2>
                        </div>
                    </Link>

                    {/* Right side - Join Waitlist Button */}
                    <Link
                        href="/waitlist"
                        className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:scale-105"
                    >
                        Join Waitlist
                        <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
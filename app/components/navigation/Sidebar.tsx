'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Phone, Calendar, Brain, Users, Settings } from "lucide-react";

const menu = [
    { name: "Overblik", href: "/dashboard", Icon: BarChart3 },
    { name: "Opkaldsoversigt", href: "/dashboard/calls", Icon: Phone },
    { name: "Bookings", href: "/dashboard/bookings", Icon: Calendar },
    { name: "Knowledge Base", href: "/dashboard/knowledge", Icon: Brain },
    { name: "Team Management", href: "/dashboard/team", Icon: Users },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-gradient-to-b from-white via-white to-blue-50/30 border-r border-gray-200/50 h-screen flex flex-col overflow-hidden">
            {/* Logo & Branding */}
            <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center gap-3 mb-2">

                    <div>
                        <h2 className="ml-8 text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent ">
                            Call4ly
                        </h2>
                        <p className="ml-7 text-xl text-gray-600">AI Receptionist</p>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                {menu.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const IconComponent = item.Icon;

                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer group ${
                                    isActive
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                                        : "text-gray-700 hover:bg-gray-100/50"
                                }`}
                            >
                                <IconComponent className="w-5 h-5" strokeWidth={2} />
                                <span className="font-medium text-sm">{item.name}</span>
                                {isActive && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer - Settings & User */}
            <div className="border-t border-gray-200/50 p-4 space-y-3">
                {/* Settings Button */}
                <Link href="/dashboard/settings">
                    <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                            pathname === "/dashboard/settings"
                                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-100/50"
                        }`}
                    >
                        <Settings className="w-5 h-5" strokeWidth={2} />
                        <span className="font-medium text-sm">Indstillinger</span>
                    </div>
                </Link>

                {/* User Profile Card */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200/50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                            U
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 truncate">Your Company</p>
                            <p className="text-xs text-gray-600 truncate">Pro Plan</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

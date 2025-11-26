'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Phone,
    CalendarCheck,
    Sparkles,
    Zap,
    Users,
    BarChart3,
    MessageSquare,
    Plug2,
    Settings,
    PanelLeftClose,
    PanelLeft
} from "lucide-react";

const menuSections = [
    {
        section: "Oversigt",
        items: [
            { name: "Overblik", href: "/dashboard", Icon: LayoutDashboard },
            { name: "Opkald", href: "/dashboard/calls", Icon: Phone},
            { name: "Bookinger", href: "/dashboard/bookings", Icon: CalendarCheck},
        ]
    },
    {
        section: "AI & Automation",
        items: [
            { name: "AI Agent", href: "/dashboard/agent", Icon: Sparkles },
            { name: "Workflows", href: "/dashboard/workflows", Icon: Zap },
        ]
    },
    {
        section: "Team & Indsigt",
        items: [
            { name: "Beskeder", href: "/dashboard/messages", Icon: MessageSquare},
            { name: "Team", href: "/dashboard/team", Icon: Users },
            { name: "Analytics", href: "/dashboard/analytics", Icon: BarChart3 },
        ]
    },
    {
        section: "Konfiguration",
        items: [
            { name: "Integrationer", href: "/dashboard/integrations", Icon: Plug2 },
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-72'} bg-gradient-to-b from-white via-white to-blue-50/30 border-r border-gray-200/50 h-screen flex flex-col overflow-hidden transition-all duration-300`}>
            {/* Logo & Branding */}
            <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between mb-2">
                    {!isCollapsed && (
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                Call4ly
                            </h2>
                            <p className="text-xl text-gray-600">AI Receptionist</p>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`${isCollapsed ? 'mx-auto' : 'ml-auto'} p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200`}
                        aria-label={isCollapsed ? "Udvid sidebar" : "Kollaps sidebar"}
                    >
                        {isCollapsed ? (
                            <PanelLeft className="w-5 h-5 text-gray-600" />
                        ) : (
                            <PanelLeftClose className="w-5 h-5 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation Menu with Sections */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {menuSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        {/* Section Header */}
                        {!isCollapsed && (
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
                                {section.section}
                            </h3>
                        )}
                        {isCollapsed && sectionIndex > 0 && (
                            <div className="border-t border-gray-200/50 my-3"></div>
                        )}

                        {/* Section Items */}
                        <div className="space-y-2">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                                const IconComponent = item.Icon;

                                return (
                                    <Link key={item.href} href={item.href}>
                                        <div
                                            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer group relative ${
                                                isActive
                                                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                                                    : "text-gray-700 hover:bg-gray-100/50"
                                            }`}
                                            title={isCollapsed ? item.name : undefined}
                                        >
                                            <IconComponent className="w-5 h-5" strokeWidth={2} />
                                            {!isCollapsed && (
                                                <>
                                                    <span className="font-medium text-sm flex-1">{item.name}</span>
                                                    {/* Badge */}

                                                    {isActive &&  (
                                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer - Settings & User */}
            <div className="border-t border-gray-200/50 p-4 space-y-3">
                {/* Settings Button */}
                <Link href="/dashboard/settings">
                    <div
                        className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                            pathname === "/dashboard/settings"
                                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-100/50"
                        }`}
                        title={isCollapsed ? "Indstillinger" : undefined}
                    >
                        <Settings className="w-5 h-5" strokeWidth={2} />
                        {!isCollapsed && <span className="font-medium text-sm">Indstillinger</span>}
                    </div>
                </Link>

                {/* User Profile Card */}
                {!isCollapsed ? (
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
                ) : (
                    <div className="flex justify-center relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-sm font-bold">
                            U
                        </div>
                        {/* Online status indicator */}
                        <span className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                )}
            </div>
        </aside>
    );
}
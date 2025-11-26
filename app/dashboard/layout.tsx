import Sidebar from "@/app/components/navigation/Sidebar";

// @ts-ignore
export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

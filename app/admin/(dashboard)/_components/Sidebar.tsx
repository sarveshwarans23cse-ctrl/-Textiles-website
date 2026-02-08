'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    BarChart,
    Settings,
    Package,
    LogOut
} from 'lucide-react';

const sidebarLinks = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag
    },
    {
        title: "Customers",
        href: "/admin/customers",
        icon: Users
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings
    }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white shadow-sm transition-transform md:translate-x-0 hidden md:block">
            {/* Logo Area */}
            <div className="flex h-16 items-center border-b border-gray-100 px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-700">
                    <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                        Prasanna Tex
                    </span>
                    <span className="rounded-md bg-primary-100 px-2 py-0.5 text-xs text-primary-700">
                        Admin
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex flex-col justify-between h-[calc(100vh-4rem)] px-3 py-4">
                <nav className="space-y-1">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                {link.title}
                                {isActive && (
                                    <div className="ml-auto h-2 w-2 rounded-full bg-primary-600" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Logout */}
                <div className="border-t border-gray-100 pt-4">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch('/api/notifications', { cache: 'no-store' });
        if (!res.ok) return;
        const list = await res.json();
        const count = Array.isArray(list) ? list.filter((n:any) => !n.read).length : 0;
        if (mounted) setUnread(count);
      } catch {}
    };
    load();
  }, [pathname]);

  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link
                href="/admin/dashboard"
                className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Admin Dashboard
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/menu"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === '/admin/menu'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Menu Management
                </Link>
                <Link
                  href="/admin/notifications"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                    pathname === '/admin/notifications'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Notifications
                  {unread > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center text-xs bg-red-600 text-white rounded-full px-2 py-0.5">
                      {unread}
                    </span>
                  )}
                </Link>
                {pathname === '/admin/menu' && (
                  <button
                    onClick={() => {
                      const addButton = document.querySelector('[data-add-product]');
                      if (addButton) {
                        (addButton as HTMLButtonElement).click();
                      }
                    }}
                    className="px-4 py-2 rounded-lg font-medium transition-colors bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}


'use client';

import { useEffect, useState } from 'react';

interface NotificationItem {
  id: string;
  type: 'order' | 'product' | 'system';
  message: string;
  createdAt: string;
  read?: boolean;
  meta?: Record<string, any>;
}

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notifications', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch {}
  };

  const markAll = async () => {
    setMarkingAll(true);
    try {
      await fetch('/api/notifications/read-all', { method: 'POST' });
      setItems(prev => prev.map(n => ({ ...n, read: true })));
    } finally {
      setMarkingAll(false);
    }
  };

  const unreadCount = items.filter(i => !i.read).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Unread: {unreadCount}</span>
          <button
            onClick={markAll}
            disabled={markingAll || unreadCount === 0}
            className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {markingAll ? 'Marking...' : 'Mark all as read'}
          </button>
          <button
            onClick={load}
            className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 bg-white rounded-xl shadow">Loading...</div>
      ) : items.length === 0 ? (
        <div className="p-8 bg-white rounded-xl shadow text-gray-600">No notifications yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((n) => (
            <div key={n.id} className={`p-4 bg-white rounded-xl shadow border ${n.read ? 'border-gray-200' : 'border-primary-200'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${n.type === 'order' ? 'bg-green-100 text-green-700' : n.type === 'product' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{n.type}</span>
                    <span className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{n.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!n.read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 text-sm"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

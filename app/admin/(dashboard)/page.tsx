'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Users, ShoppingBag, TrendingUp, DollarSign, Download, ChevronDown } from 'lucide-react';
import { salesData, categoryData } from '@/lib/admin-data';
import RecentOrders from '../_components/RecentOrders';

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f97316'];

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  newCustomers: number;
  growth: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  growthChange: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount).replace('₹', '₹');
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState('last30days');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const periodLabels: Record<string, string> = {
    'last7days': 'Last 7 Days',
    'last30days': 'Last 30 Days',
    'thisyear': 'This Year',
  };

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/stats?period=${period}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleDownloadReport = () => {
    // Generate CSV report
    if (!stats) return;

    const csvContent = `Dashboard Report - ${periodLabels[period]}
Generated: ${new Date().toLocaleDateString('en-IN')}

Metric,Value,Change
Total Revenue,${formatCurrency(stats.totalRevenue)},${stats.revenueChange >= 0 ? '+' : ''}${stats.revenueChange}%
Total Orders,${stats.totalOrders},${stats.ordersChange >= 0 ? '+' : ''}${stats.ordersChange}%
New Customers,${stats.newCustomers},${stats.customersChange >= 0 ? '+' : ''}${stats.customersChange}%
Growth,${stats.growth}%,${stats.growthChange >= 0 ? '+' : ''}${stats.growthChange}%
`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-report-${period}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const statCards = stats ? [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      change: `${stats.revenueChange >= 0 ? '+' : ''}${stats.revenueChange}%`,
      trend: stats.revenueChange >= 0 ? 'up' : 'down',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Orders',
      value: formatNumber(stats.totalOrders),
      change: `${stats.ordersChange >= 0 ? '+' : ''}${stats.ordersChange}%`,
      trend: stats.ordersChange >= 0 ? 'up' : 'down',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'New Customers',
      value: formatNumber(stats.newCustomers),
      change: `${stats.customersChange >= 0 ? '+' : ''}${stats.customersChange}%`,
      trend: stats.customersChange >= 0 ? 'up' : 'down',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Growth',
      value: `${stats.growth}%`,
      change: `${stats.growthChange >= 0 ? '+' : ''}${stats.growthChange}%`,
      trend: stats.growthChange >= 0 ? 'up' : 'down',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          {/* Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 text-sm py-2 px-3 bg-white shadow-sm hover:bg-gray-50 transition-colors"
            >
              <span>{periodLabels[period]}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px] overflow-hidden">
                {Object.entries(periodLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setPeriod(key);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${period === key ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleDownloadReport}
            disabled={loading || !stats}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Loading skeleton
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="w-14 h-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-32 h-8 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                    }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue Analytics</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                <Area type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" name="Sales" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Sales by Category</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <RecentOrders />
    </div>
  );
}

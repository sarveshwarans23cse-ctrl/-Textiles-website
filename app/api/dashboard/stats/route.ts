import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

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

// Helper to get date range based on period
function getDateRange(period: string): { start: Date; end: Date; prevStart: Date; prevEnd: Date } {
    const now = new Date();
    const end = new Date(now);
    let start: Date;
    let prevStart: Date;
    let prevEnd: Date;

    switch (period) {
        case 'last7days':
            start = new Date(now);
            start.setDate(start.getDate() - 7);
            prevEnd = new Date(start);
            prevStart = new Date(prevEnd);
            prevStart.setDate(prevStart.getDate() - 7);
            break;
        case 'thisyear':
            start = new Date(now.getFullYear(), 0, 1); // Jan 1st of current year
            prevStart = new Date(now.getFullYear() - 1, 0, 1); // Jan 1st of previous year
            prevEnd = new Date(now.getFullYear() - 1, 11, 31); // Dec 31st of previous year
            break;
        case 'last30days':
        default:
            start = new Date(now);
            start.setDate(start.getDate() - 30);
            prevEnd = new Date(start);
            prevStart = new Date(prevEnd);
            prevStart.setDate(prevStart.getDate() - 30);
            break;
    }

    return { start, end, prevStart, prevEnd };
}

// Calculate percentage change
function calculateChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
}

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const period = searchParams.get('period') || 'last30days';
        const { start, end, prevStart, prevEnd } = getDateRange(period);

        // Current period data - use lean() for faster read-only queries
        const currentOrders = await Order.find({
            date: { $gte: start, $lte: end }
        }).lean();

        // Previous period data (for comparison)
        const previousOrders = await Order.find({
            date: { $gte: prevStart, $lte: prevEnd }
        }).lean();

        // Calculate current stats
        const totalRevenue = currentOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const totalOrders = currentOrders.length;

        // Get unique customers in current period
        const currentCustomerPhones = new Set(
            currentOrders
                .filter(order => order.customerDetails?.phone)
                .map(order => order.customerDetails!.phone)
        );
        const newCustomers = currentCustomerPhones.size;

        // Calculate previous stats
        const prevRevenue = previousOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const prevOrders = previousOrders.length;
        const prevCustomerPhones = new Set(
            previousOrders
                .filter(order => order.customerDetails?.phone)
                .map(order => order.customerDetails!.phone)
        );
        const prevCustomers = prevCustomerPhones.size;

        // Calculate changes
        const revenueChange = calculateChange(totalRevenue, prevRevenue);
        const ordersChange = calculateChange(totalOrders, prevOrders);
        const customersChange = calculateChange(newCustomers, prevCustomers);

        // Growth is based on revenue growth
        const growth = revenueChange;
        // Growth change compares current growth to previous period's growth pattern
        const prevGrowth = prevRevenue > 0 ? calculateChange(prevRevenue, prevRevenue * 0.9) : 0; // Simulated previous growth
        const growthChange = growth - prevGrowth;

        const stats: DashboardStats = {
            totalRevenue,
            totalOrders,
            newCustomers,
            growth: parseFloat(growth.toFixed(1)),
            revenueChange: parseFloat(revenueChange.toFixed(1)),
            ordersChange: parseFloat(ordersChange.toFixed(1)),
            customersChange: parseFloat(customersChange.toFixed(1)),
            growthChange: parseFloat(growthChange.toFixed(1)),
        };

        // Create response with caching headers
        const response = NextResponse.json(stats);
        // Cache for 30 seconds for dashboard data to stay relatively fresh
        response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');

        return response;
    } catch (error: any) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats', details: error.message },
            { status: 500 }
        );
    }
}

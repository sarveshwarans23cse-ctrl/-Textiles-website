import { NextRequest, NextResponse } from 'next/server';
import { readData, Order } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const data = readData();
    let orders: Order[] = data.orders;

    if (startDate && endDate) {
      orders = orders.filter((order) => {
        return order.date >= startDate && order.date <= endDate;
      });
    }

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = orders.length;

    // Group by date for chart
    const salesByDate: { [key: string]: number } = {};
    orders.forEach((order) => {
      if (salesByDate[order.date]) {
        salesByDate[order.date] += order.total;
      } else {
        salesByDate[order.date] = order.total;
      }
    });

    const chartData = Object.entries(salesByDate)
      .map(([date, sales]) => ({ date, sales }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      totalSales,
      orderCount,
      orders,
      chartData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}


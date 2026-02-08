
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign 
} from 'lucide-react';

export const adminStats = [
  {
    title: "Total Revenue",
    value: "₹54,230",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Total Orders",
    value: "345",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "New Customers",
    value: "1,234",
    change: "+22.4%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "Growth",
    value: "18.2%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

export const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];

export const categoryData = [
  { name: 'Kanchipuram', value: 400 },
  { name: 'Banarasi', value: 300 },
  { name: 'Cotton', value: 300 },
  { name: 'Silk', value: 200 },
];

export const recentOrders = [
  {
    id: "#ORD-1234",
    customer: "Priya Sharma",
    product: "Kanchipuram Silk Saree",
    amount: "₹12,499",
    status: "Delivered",
    date: "2 mins ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    id: "#ORD-1235",
    customer: "Rahul Verma",
    product: "Banarasi Silk Saree",
    amount: "₹8,999",
    status: "Processing",
    date: "15 mins ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
  },
  {
    id: "#ORD-1236",
    customer: "Anita Desai",
    product: "Cotton Daily Wear",
    amount: "₹1,499",
    status: "Shipped",
    date: "1 hour ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita"
  },
  {
    id: "#ORD-1237",
    customer: "Suresh Kumar",
    product: "Mysore Silk",
    amount: "₹6,499",
    status: "Pending",
    date: "2 hours ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh"
  }
];

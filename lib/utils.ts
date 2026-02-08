import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'lib', 'data.json');
let _cache: DataStore | null = null;
let _cacheTs = 0;
const CACHE_TTL_MS = 10_000; // 10 seconds

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  rating?: number;
  ratingCount?: number;
  offerPercent?: number; // 0-100 discount percent
  offerLabel?: string;   // optional label like "Festival Offer"
  variants?: {
    color: string;
    images: string[];
  }[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

export interface DataStore {
  products: Product[];
  orders: Order[];
  admin: {
    username: string;
    password: string;
  };
  notifications?: Notification[];
}

export interface Notification {
  id: string;
  type: 'order' | 'product' | 'system';
  message: string;
  createdAt: string; // ISO
  read?: boolean;
  meta?: Record<string, any>;
}

export function readData(): DataStore {
  try {
    const now = Date.now();
    if (_cache && now - _cacheTs < CACHE_TTL_MS) {
      return _cache;
    }
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const parsed = JSON.parse(fileContents) as DataStore;
    // Normalize optional fields
    parsed.products = (parsed.products || []).map(p => ({
      ...p,
      rating: typeof p.rating === 'number' ? p.rating : 0,
      ratingCount: typeof p.ratingCount === 'number' ? p.ratingCount : 0,
      offerPercent: typeof p.offerPercent === 'number' ? p.offerPercent : 0,
      offerLabel: typeof p.offerLabel === 'string' ? p.offerLabel : undefined,
    }));
    if (!parsed.notifications) parsed.notifications = [];
    _cache = parsed;
    _cacheTs = now;
    return parsed;
  } catch (error) {
    return {
      products: [],
      orders: [],
      admin: {
        username: "admin",
        password: "$2a$10$dsJg8n6OYsNZwtMVs6v8UekvjQ8PBSTtrsgPOeadU.sIHv3w5dnnK"
      },
      notifications: []
    };
  }
}

export function writeData(data: DataStore): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  // Invalidate cache immediately after write
  _cache = null;
  _cacheTs = 0;
}

export function generateId(): string {
  return uuidv4();
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}


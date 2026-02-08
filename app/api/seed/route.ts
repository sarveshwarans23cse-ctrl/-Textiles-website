import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';
import Order from '@/models/Order';
import Notification from '@/models/Notification';
import { readData } from '@/lib/utils';

export async function GET() {
    try {
        await connectToDatabase();

        // Read data from JSON file
        const FILE_DATA = readData();

        // Clear existing data (optional, maybe safe for dev)
        await Product.deleteMany({});
        await Order.deleteMany({});
        await Notification.deleteMany({});

        // Seed Products
        if (FILE_DATA.products && FILE_DATA.products.length > 0) {
            // Map ID to _id if we want to preserve exact IDs, or just let Mongo generate new ones.
            // For simplicity in migration, let's create new documents and let Mongo handle _id, 
            // BUT if the frontend relies on specific string IDs (like 'prod-001'), we might have issues if we switch to ObjectIds completely.
            // However, the Product model defined `toJSON` to map `_id` to `id`.
            // Let's import them as-is. Mongoose might complain if we try to set _id to non-ObjectId if schema defined it as such (auto).
            // Best approach: Don't force _id. Let Mongo generate unique IDs. 
            // The frontend components should ideally handle any string ID.

            // Wait, if we change IDs, cart references might break if stored in local storage.
            // But for a fresh backend, it's acceptable.

            await Product.insertMany(FILE_DATA.products.map(p => {
                const { id, ...rest } = p;
                // We ignore the old string 'id' and let Mongo generate a fresh ObjectId
                return rest;
            }));
        }

        // Seed Orders
        if (FILE_DATA.orders && FILE_DATA.orders.length > 0) {
            await Order.insertMany(FILE_DATA.orders.map(o => {
                const { id, ...rest } = o;
                return {
                    ...rest,
                    date: new Date(o.date) // Convert string date to Date object
                };
            }));
        }

        // Seed Notifications
        if (FILE_DATA.notifications && FILE_DATA.notifications.length > 0) {
            await Notification.insertMany(FILE_DATA.notifications.map(n => {
                const { id, ...rest } = n;
                return {
                    ...rest,
                    createdAt: new Date(n.createdAt)
                }
            }));
        }

        return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json(
            { error: 'Failed to seed database', details: error.message },
            { status: 500 }
        );
    }
}

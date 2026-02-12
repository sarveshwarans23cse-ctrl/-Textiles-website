import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface IOrder extends Document {
    items: IOrderItem[];
    total: number;
    status: string;
    date: Date; // Use Date object for better querying
    createdAt: Date;
    updatedAt: Date;
    customerDetails?: {
        name: string;
        phone: string;
        address: string;
        city: string;
        zipCode: string;
    };
    paymentId?: string;
    paymentStatus?: 'pending' | 'paid' | 'failed';
    paymentMethod?: string;
}

const OrderItemSchema = new Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const OrderSchema: Schema<IOrder> = new Schema(
    {
        items: [OrderItemSchema],
        total: { type: Number, required: true },
        status: { type: String, default: 'pending', index: true },
        date: { type: Date, default: Date.now, index: true },
        customerDetails: {
            name: String,
            phone: String,
            address: String,
            city: String,
            zipCode: String
        },
        paymentId: String,
        paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
        paymentMethod: String
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret: any) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

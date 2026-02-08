import mongoose, { Schema, Document, Model } from 'mongoose';

interface IVariant {
    color: string;
    images: string[];
}

export interface IProduct extends Document {
    id: string; // Keep string ID for compatibility with existing frontend
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    rating: number;
    ratingCount: number;
    offerPercent: number;
    offerLabel?: string;
    variants?: IVariant[];
    createdAt: Date;
    updatedAt: Date;
}

// Product Schema
const ProductSchema: Schema<IProduct> = new Schema(
    {
        // We can use the default _id, but we'll map existing string IDs to a custom field if needed,
        // or just rely on _id.toString(). For migration, let's keep a flexible structure.
        name: { type: String, required: true, index: true },
        category: { type: String, required: true, index: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        stock: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 },
        offerPercent: { type: Number, default: 0 },
        offerLabel: { type: String },
        variants: [{
            color: { type: String, required: true },
            images: [{ type: String, required: true }]
        }]
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                if (ret._id) {
                    ret.id = ret._id.toString();
                }
                // @ts-ignore
                delete ret._id;
                // @ts-ignore
                delete ret.__v;
            }
        },
        toObject: {
            virtuals: true
        }
    }
);

// Prevent overwriting model if already compiled
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

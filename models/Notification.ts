import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotification extends Document {
    type: 'order' | 'product' | 'system';
    message: string;
    createdAt: Date;
    read: boolean;
    meta?: Map<string, any>;
}

const NotificationSchema: Schema<INotification> = new Schema(
    {
        type: { type: String, required: true, enum: ['order', 'product', 'system'] },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
        meta: { type: Map, of: Schema.Types.Mixed },
    },
    {
        timestamps: true, // This adds createdAt and updatedAt
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

const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;

import mongoose, { Document, Schema } from "mongoose";

export interface ContactModel extends Document {
    firstname: string;
    lastname: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    deletedBy?: mongoose.Types.ObjectId;
}

const ContactSchema = new Schema<ContactModel>({
    firstname: {
        type: String,
        required: true,
        unique: true,
        maxlength: 80
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 80
    },
    phone: {
        type: String,
        required: true,
        minLength: 10,
        maxlength: 20
    },
    deletedAt: {
        type: Date,
        default: null
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

}, {
    timestamps: true
});

export const ContactModel = mongoose.model<ContactModel>('Contact', ContactSchema);
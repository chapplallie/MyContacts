import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs';

export interface UserModel extends Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    deletedBy?: mongoose.Types.ObjectId;
    validPassword(password: string): Promise<boolean>;
}

export interface IUserModel extends mongoose.Model<UserModel> {
    generatePassword(length?: number): string;
}

const UserSchema = new Schema<UserModel>({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 128
    },
    password: {
        type: String,
        required: true,
        maxlength: 128
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
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
});

// validating password
UserSchema.methods.validPassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Generating password
UserSchema.statics.generatePassword = function(length?: number): string {
    let result = "";
    const size = length ? length : 8;
    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    const charactersLength = characters.length;
    for (let i = 0; i < size; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// hashing password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.pre(['updateOne', 'findOneAndUpdate'], async function(next) {
    const update = this.getUpdate() as any;
    if (update.password) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
    }
    next();
});

export const UserModel = mongoose.model<UserModel, IUserModel>('User', UserSchema);
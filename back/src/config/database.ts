
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// MongoDB configuration using environment variables with fallback defaults
const DB_NAME = process.env.DB_NAME || "mycontacts_db";
const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";

// Construct MongoDB connection string
const getMongoURI = (): string => {
    if (DB_USER && DB_PASS) {
        return `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    } else {
        return `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    }
};

// Connect to MongoDB
export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(getMongoURI());
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Export mongoose instance for use in models
export const database = mongoose;

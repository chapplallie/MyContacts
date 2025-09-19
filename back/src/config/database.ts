
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const getMongoURI = (): string => {
    const atlasConnection = process.env.DB_STRING;
    if (atlasConnection) {
        return atlasConnection;
    }
    
    const DB_NAME = process.env.DB_NAME;
    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;
    const DB_HOST = process.env.DB_HOST;
    const DB_PORT = process.env.DB_PORT;

    if (DB_USER && DB_PASS) {
        return `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    } else {
        return `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    }
};

// Connecting DB
export const connectDatabase = async (): Promise<void> => {
    try {
        const uri = getMongoURI();
        console.log("Connecting to MongoDB...");
        
        await mongoose.connect(uri);
        
        console.log("Connected to MongoDB successfully!");
        console.log(`Database: ${mongoose.connection.name}`);
        
    } catch (error) {
        console.error("MongoDB connection error:", error);
        console.log("Make sure MongoDB is running or check your connection string");
        process.exit(1);
    }
};
export const database = mongoose;

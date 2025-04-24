// Import MongoDB Node.js driver
import { MongoClient } from "mongodb";

import "dotenv/config";

// Reads connection string from the MONGO_URI env var
// Immediately throws if it's missing to avoid spinning up the app without DB access
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error ("MONGO_URI environment variable is not defined");
};

// Allows database override at deploy by setting MONGO_DB_NAME or defaults to "betterconvo"
const dbName = process.env.MONGO_DB_NAME || "betterconvo";

// Module-scoped variables persist across multiple calls to connectDB()
let cachedClient = null;
let cachedDb = null;

export async function connectDB() {
    // If already connected once, return the same 'Db' object
    if (cachedDb) return cachedDb;

    // Create a client if one hasn't been created yet
    if (!cachedClient) {
        cachedClient = new MongoClient(uri, {
            
        })
    }
    if (!db) {
        try {
            await client.connect();
            db = client.db('betterconvo');
            console.log('Connected to MongoDB Atlas');
        } catch (err) {
            console.error('MongoDB connection error', err);
            throw err;
        }
    }
    return db;
}
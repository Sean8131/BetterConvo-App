import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
let db;

export async function connectDB() {
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
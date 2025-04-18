import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI is not defined");

let cachedClient = null;
let cachedDb = null;
const DEBUG = false;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db('betterconvo');
  return cachedDb;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('usage_logs');

    const utcDate = new Date();
    const nzString = utcDate.toLocaleString('en-NZ', {
      timeZone: 'Pacific/Auckland',
    });

    const usage = {
      ...req.body,
      timestamp: utcDate,
      timestamp_nzt: nzString,
    };

    if (!usage.timestamp) {
      console.warn("Usage object missing timestamp before insert");
    }

    if (DEBUG) console.log("Logging usage:", usage);

    const result = await collection.insertOne(usage);

    return res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Error in /api/track:', error.stack || error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

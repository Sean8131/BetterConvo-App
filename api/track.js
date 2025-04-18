import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error("MONGO_URI environment variable is not defined");
}
const client = new MongoClient(uri);
let cachedDb = null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    if (!cachedDb) {
      await client.connect();
      cachedDb = client.db('betterconvo'); // MongoDB database
    }

    const utcDate = new Date();
    const nzString = utcDate.toLocaleString("en-NZ", {
      timeZone: "Pacific/Auckland"
    });

    const usage = {
        ...req.body,
      timestamp: utcDate,
      timestamp_nzt: nzString,
    };

    if (!usage.timestamp) {
        console.warn("Usage object missing timestamp before insert");
    }

    console.log("Logging usage:", usage);

    const result = await cachedDb.collection('usage_logs').insertOne(usage);

    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Error logging usage:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

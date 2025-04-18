import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
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
      timestamp: utcDate,
      timestamp_nzt: nzString,
      ...req.body,
    };

    const result = await cachedDb.collection('usage_logs').insertOne(usage);

    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Error logging usage:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

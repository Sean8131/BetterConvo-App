import express from 'express';
import { connectDB } from '../db.js';
import { Timestamp } from 'mongodb';

const DEBUG = false;

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('usage_logs');

        const usage = {
            Timestamp: new Date(),
            ...req.body,
        };

        if (DEBUG) console.log("Tracking usage:", usage);

        await collection.insertOne(usage);
        res.status(201).json({success: true});
    } catch (err) {
        console.error('Failed to log usage:', err);
        res.status(500).json({ success: false, error: err.message});
    }
});

export default router;
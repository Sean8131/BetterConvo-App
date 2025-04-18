import express from 'express';
import { connectDB } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const db = await connectDB();
        // Ping the server to confirm the connection is alive
        const admin = db.admin();
        await admin.ping();

        res.status(200).json({success: true, message: "MongoDB connection is healthy."});
    } catch (err) {
        console.error("MongoDB test failed.", err);
        res.status(500).json({success: false, message: "MongoDB connection failed.", error: err.message});
    }
});

export default router;
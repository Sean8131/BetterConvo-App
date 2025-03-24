import "dotenv/config"; // Library to load environment variables from a .env file

// Load environment variables from the .env file (e.g., API keys, port number)
// dotenv.config();

// Import necessary libraries
import express from "express"; // Express framework for building the API server
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing
import { generateResponse } from "./generateResponse.js";


// Initialize the Express application
const app = express();

// Enable CORS to allow requests from different origins (e.g., frontend app)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * POST /api/generate
 * This endpoint receives user input in the request body and generates a GPT response.
 * Expected JSON structure in the request body:
 * {
 *   "situation": "Description of the situation",
 *   "feeling": "User's feeling",
 *   "request": "User's request"
 * }
 */
app.post("/api/generate", async (req, res) => {
  // Destructure the required fields from the request body
  const { situation, feeling, request } = req.body;

  // Validate that all required fields are provided; if not, return a 400 error response
  if (!situation || !feeling || !request) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Call the shared generateResponse function
    const message = await generateResponse(situation, feeling, request);
    res.json({ message });
  } catch (error) {
    console.error("Error in Express endpoint", error);
    res.status(500).json({ message: "Error generating response" });
  }
});

// Determine the port to listen on (default to 3000 if not specified in .env)
const PORT = process.env.PORT || 3000;

// Start the Express server and log the port number
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

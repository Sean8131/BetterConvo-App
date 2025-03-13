// Import necessary libraries
import express from "express"; // Express framework for building the API server
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Library to load environment variables from a .env file
import { OpenAI } from "openai"; // OpenAI Software Development Kit to interact with the GPT API

// Load environment variables from the .env file (e.g., API keys, port number)
dotenv.config();

// Initialize the Express application
const app = express();

// Enable CORS to allow requests from different origins (e.g., frontend app)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    // Call OpenAI's chat completions endpoint to generate a response using GPT-4
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Specify the GPT model to use
      messages: [
        // System message sets the behavior and context for the assistant
        {
          role: "system",
          content:
            "You are a communication coach using Nonviolent Communication (NVC).",
        },
        // User message includes the actual input provided by the user
        // TODO: sanitize user input
        // FIXME: this is broken
        {
          role: "user",
          content: `Situation: ${situation}\nFeeling: ${feeling}\nRequest: ${request}\nGenerate a response following NVC principles.`,
        },
      ],
      max_tokens: 200, // Limit the response to 200 tokens to control output length
    });

    // Send the generated response back to the client as JSON
    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    // Log any errors that occur during the API call and return a 500 error response
    console.error("Error generating response:", error);
    res.status(500).json({ message: "Error generating response" });
  }
});

/**
 * GET /api/generate
 * This endpoint is similar to the POST endpoint but uses query parameters.
 * You can test it easily in a browser.
 * Expected query parameters:
 * - situation
 * - feeling
 * - request
 */
app.get("/api/generate", async (req, res) => {
  // Extract query parameters from the request URL
  const { situation, feeling, request: reqText } = req.query;

  // Validate that all required query parameters are provided; if not, return a 400 error response
  if (!situation || !feeling || !reqText) {
    return res.status(400).json({
      error: "Missing required query parameters: situation, feeling, request",
    });
  }

  try {
    // Call OpenAI's chat completions endpoint using the provided query parameters
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Specify the GPT model to use
      messages: [
        // System message defines the assistant's role and context
        {
          role: "system",
          content:
            "You are a helpful communication coach using Nonviolent Communication (NVC).",
        },
        // User message compiles the query parameters into a prompt
        {
          role: "user",
          content: `Situation: ${situation}\nFeeling: ${feeling}\nRequest: ${reqText}\nGenerate a response following NVC principles.`,
        },
      ],
      max_tokens: 200, // Limit the response to 200 tokens
    });

    // Return the generated response as JSON
    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    // Log errors and return a 500 error response if the API call fails
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Error generating response" });
  }
});

// Endpoint to test backend

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});


// Determine the port to listen on (default to 3000 if not specified in .env)
const PORT = process.env.PORT || 3001;

// Start the Express server and log the port number
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

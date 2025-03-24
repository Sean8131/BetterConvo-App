import { generateResponse } from "../generateResponse.js";

export default async (req, res) => {
  // Destructure the required fields from the request body
  const { situation, feeling, request } = req.body;

  // Validate that all required fields are provided; if not, return a 400 error response
  if (!situation || !feeling || !request) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Use the shared generateResponse function to get the GPT output
    const message = await generateResponse(situation, feeling, request);
    res.json({ message });
  } catch (error) {
    console.error("Error in severless function:", error);
    res.status(500).json({ message: "Error generating response" });
  }
};

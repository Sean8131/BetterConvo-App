import { OpenAI } from "openai"; // OpenAI Software Development Kit to interact with the GPT API

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_ID,
   });

export default async (req, res) => {
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
            content: `Situation: ${situation}\nFeeling: ${feeling}\nRequest: ${request}\nPlease generate a natural, flowing conversation using NVC principles.
          Do not label any sentences with "Observation:", "Feeling:", "Need:", or "Request:".
          Keep the output under 80 words and make it kind, empathic, curious, and collaborative.
          Format the response so that each sentence is in its own paragraph (i.e., separate sentences with two newline characters).`,
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
  }
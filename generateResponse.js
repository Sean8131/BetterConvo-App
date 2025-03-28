import { OpenAI } from "openai"; // OpenAI Software Development Kit to interact with the GPT API

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID,
});

export async function generateResponse(situation, feeling, request) {
  // Validate that all required fields are provided
  if (!situation || !feeling || !request) {
    throw new Error("Missing required fields");
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
          Do not output any phrases that contain the words "you make me feel", "you made me feel", "that makes me feel", or indicate that someone has made someone else feel something, or indicate that the listener is responsible for the speaker's feelings (or vice versa). Both people are responsible for their own feelings. Keep situations specific. Don't say things like "recently".
          Keep the output under 80 words and make it kind, empathic, curious, and collaborative.
          Format the response so that each sentence is in its own paragraph (i.e., separate sentences with two newline characters).`,
        },
      ],
      max_tokens: 200, // Limit the response to 200 tokens to control output length
    });

    // Return the generated message content from the GPT response
    // 'response.choices[0].message.content' accesses the first choice returned by the API, then retrives the message content from that choice
    return response.choices[0].message.content;
  } catch (error) {
    // Log the error to the console with a specific label to help diagnose issues in generateResponse
    console.error("Error in generateResponse", error);
    // Rethrow the error so that the caller (e.g the endpoint handler) can catch and handle it
    throw error;
  }
}

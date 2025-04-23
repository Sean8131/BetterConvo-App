import { OpenAI } from "openai"; // OpenAI Software Development Kit to interact with the GPT API

const DEBUG = false;
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
    if (DEBUG)
      console.log("Calling OpenAI with:", { situation, feeling, request });
    // Call OpenAI's chat completions endpoint to generate a response using GPT-4
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Specify the GPT model to use
      messages: [
        // System message sets the behavior and context for the assistant
        {
          role: "system",
          content: `You are a communication coach. Generate a short (<70 words), first-person script for a courageous conversation.
          
          Use “I” and “you.” Don’t ask questions, explain theory, or use quotes, bullets, or labels. Don’t mention “Nonviolent Communication” or “NVC.” Avoid blaming phrases like “you made me feel.” 
          
          Exclude words denoting harm or negative feelings (abandoned, abused, attacked, betrayed, blamed, bullied, cheated, coerced, criticized, deceived, ignored, insulted, intimidated, invalidated, isolated, manipulated, misled, neglected, overpowered, pressured, provoked, rejected, smothered, trampled, unappreciated, unheard, unloved, unsupported, unwanted, used, victimized, violated, wronged). 
          
          Avoid vague time words. Use a natural, kind, empathetic, curious tone.
          
          Separate each sentence with two blank lines.`,
        },
        // User message includes the actual input provided by the user
        // TODO: sanitize user input
        // FIXME: this is broken
        {
          role: "user",
          content: `
          
          Situation: ${situation}
          Feeling: ${feeling}
          Request: ${request}
          
          Help me prepare for a challenging conversation so I can speak with clarity, empathy, and courage.
          `,
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

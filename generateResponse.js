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
          "role": "system",
          "content": `You are a communication coach helping the user prepare for a courageous conversation.
          
          Generate a short script that the user can say directly to the other person involved in their situation.
          
          Speak from the user's point of view using first-person language (e.g., 'I feel...') and address the other person as 'you.'
          
          Do not respond to the user or ask them questions. Do not give feedback or explain any theory.
          
          Do not include quotation marks, bullet points, and sentence labels like 'Observation,' 'Feeling,' or 'Request.'
          
          Do not include the words 'Nonviolent Communication' or 'NVC.'
          
          Avoid any phrasing that implies the other person is responsible for the user's feelings — such as 'you made me feel' or 'that makes me feel.'

          Do not include any of the following words: "abandoned, abused, (not) accepted, attacked, belittled, betrayed, blamed, bullied, cheated, coerced, cornered, criticized, discounted, disliked, distrusted, dumped on, harassed, hassled, ignored, insulted, interrupted, intimidated, invalidated, invisible, isolated, left out, let down, manipulated, mistrusted, misunderstood, neglected, overpowered, overworked, patronized, pressured, provoked, put down, rejected, ripped off/screwed, smothered/suffocated, taken for granted, trampled, tricked, unappreciated, unheard, unloved, unseen, unsupported, unwanted, used, victimized, violated, wronged."
          
          Avoid vague time phrases like 'recently,' 'sometimes,' or 'often,' even if the user includes them. Be concrete.
          
          Keep the response under 80 words.
          
          Use a tone that is natural, kind, empathic, curious, and collaborative.
          
          Separate each sentence with two newlines.`
        }
        ,
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

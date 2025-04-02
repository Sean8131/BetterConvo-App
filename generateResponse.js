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
          content: `Situation: ${situation}\nFeeling: ${feeling}\nRequest: ${request}\n
          
          Help me prepare for a challenging conversation so I can speak with clarity, empathy, and courage.

          Please provide me with a short script to help me start the conversation in a mindful way.
          
          Please generate a natural, flowing script using NVC principles and base it on the following:

          "Nonviolent Communication (NVC) has been described as a language of compassion, as a tool for positive social change, and as a spiritual practice. NVC gives us the tools and consciousness to understand what triggers us, to take responsibility for our reactions, and to deepen our connection with ourselves and others, thereby transforming our habitual responses to life. Ultimately, it involves a radical change in how we think about life and meaning. NVC is based on a fundamental principle:
          Underlying all human actions are needs that people are seeking to meet, and understanding and acknowledging these needs can create a shared basis for connection, cooperation, and more globally – peace.
          Understanding each other at the level of our needs creates such connection because, at this deeper human level, the similarities between us outweigh the differences, giving rise to greater compassion. When we focus on needs, without interpreting or conveying criticism, blame, or demands, our deeper creativity flourishes, and solutions arise that were previously blocked from our awareness. At this depth, conflicts and misunderstandings can be resolved with greater ease.
          Learning NVC is a process similar to learning a new language or skill: step-by-step learning coupled with ample time for practice lead to growing mastery. While it takes time to develop fluency, any knowledge of a new language makes it more likely that communication can take place. In addition, because NVC invites us to a level of vulnerability and caring that often are not familiar or habitual, full integration of the consciousness underlying this language is likely to require changes in our internal connection to ourselves, and healing of past pain.
          The language of NVC includes two parts: honestly expressing ourselves to others, and empathically hearing others. Both are expressed through four components – observations, feelings, needs, and requests – though empathic connection fundamentally relies on connection at the level of feelings and needs, hence observations and requests may or may not be articulated. Practicing NVC involves distinguishing these components from judgments, interpretations, and demands, and learning to embody the consciousness embedded in these components in order to express ourselves and hear ourselves and others in ways more likely to foster understanding and connection, to support everyone involved in getting their needs met, and to nurture in all of us a joy in giving and in receiving. The practice also includes empathic connection with ourselves – “self-empathy.” The purpose of self-empathy is to support us in maintaining connection with our own needs, choosing our actions and responses based on self-connection and self-acceptance.
          .
          The Components of NVC
          .
          Observations
          Observations are what we see or hear that we identify as the stimulus to our reactions. Our aim is to describe what we are reacting to concretely, specifically and neutrally, much as a video camera might capture the moment. This helps create a shared reality with the other person. The observation gives the context for our expression of feelings and needs, and may not even be needed of both people are clear about the context.
          The key to making an observation is to separate our own judgments, evaluations or interpretations from our description of what happened. For example, if we say: “You’re rude,” the other person may disagree, while if we say: “When I saw you walk in and I didn’t hear you say hello to me,” the other person is more likely to recognize the moment that is described.
          When we are able to describe what we see or hear in observation language without mixing in evaluation, we raise the likelihood that the person listening to us will hear this first step without immediately wanting to respond and will be more willing to hear our feelings and needs.
          Learning to translate judgments and interpretations into observation language moves us away from right/wrong thinking and helps us take responsibility for our reactions by directing our attention to our needs as the source of our feelings rather than to the other person. In this way, observations – paving the way towards greater connection with ourselves and with others – emerge as a crucial building block towards a profound consciousness shift.
          Feelings
          Feelings represent our emotional experience and physical sensations associated with our needs that have been met or that remain unmet (see below). Our aim is to identify, name and connect with those feelings.
          The key to identifying and expressing feelings is to focus on words that describe our inner experience rather than words that describe our interpretations of people’s actions. For example: “I feel lonely” describes an inner experience, while “I feel like you don’t love me” describes an interpretation of how the other person may be feeling.
          When we express our feelings, we continue the process of taking responsibility for our experience, which helps others hear what’s important to us with less likelihood of hearing criticism or blame of themselves. This increases the likelihood that they will respond in a way that meets both our needs.
          Needs
          Our needs are an expression of our deepest shared humanity. All human beings share key needs for survival: hydration, nourishment, rest, shelter, and connection to name a few. We also share many other needs, though we may experience them to varying degrees and may experience them more or less intensely at various times.
          In the context of NVC, needs refer to what is most alive in us: our core values and deepest human longings. Understanding, naming, and connecting with our needs helps us improve our relationship with ourselves, as well as foster understanding with others, so we are all more likely to take actions that meet everyone’s needs.
          The key to identifying, expressing, and connecting with needs is to focus on words that describe shared human experience rather than words that describe the particular strategies to meet those needs. Whenever we include a person, a location, an action, a time, or an object in our expression of what we want, we are describing a strategy rather than a need. For example: “I want you to come to my birthday party” may be a particular strategy to meet a need for love and connection. In this case, we have a person, an action, and an implied time and location in the original statement. The internal shift from focusing on a specific strategy to connecting with needs often results in a sense of power and liberation, as we can free ourselves from being attached to one particular strategy by identifying the underlying needs and exploring alternative strategies.
          Feelings arise when our needs are met or not met, which happens at every moment of life. Our feelings are related to the trigger, but they are not caused by the trigger: their source is our own experience of met or unmet needs. By connecting our feelings with our needs, therefore, we take full responsibility for our feelings, freeing us and others from fault and blame. And by expressing our unique experience in the moment of a shared human reality of needs, we create the most likely opportunity for another person to see our humanity and to experience empathy and understanding for us.
          Requests
          In order to meet our needs, we make requests to assess how likely we are to get cooperation for particular strategies we have in mind for meeting our needs. Our aim is to identify and express a specific action that we believe will serve this purpose, and then check with others involved about their willingness to participate in meeting our needs in this way. In a given moment, it is our connection with another that determines the quality of their response to our request. Therefore often our requests in the moment are “connection requests,” intended to foster connection and understanding and to determine whether we have sufficiently connected to move to a “solution request.” An example of a connection request might be: “Would you tell me how you feel about this?” An example of a solution request might be “Would you be willing to take your shoes off when you come in the house?”
          The spirit of requests relies on our willingness to hear a “no” and to continue to work with ourselves or others to find ways to meet everyone’s needs. Whether we are making a request or a demand is often evident by our response when our request is denied. A denied demand will lead to punitive consequences; a denied request most often will lead to further dialogue. We recognize that “no” is an expression of some need that is preventing the other person from saying “yes”. If we trust that through dialogue we can find strategies to meet both of our needs, “no” is simply information to alert us that saying “yes” to our request may be too costly in terms of the other person’s needs. We can then continue to seek connection and understanding to allow additional strategies to arise that will work to meet more needs.
          To increase the likelihood that our requests would be understood, we attempt to use language that is as concrete and doable as possible, and that is truly a request rather than a demand. For example, “I would like you to always come on time” is unlikely to be doable, while “Would you be willing to spend 15 minutes with me talking about what may help you arrive at 9 am to our meetings?” is concrete and doable. While a person may assent to the former expression (“Yes, I’ll always come on time”), our deeper needs – for connection, confidence, trust, responsibility, respect, or others – are likely to remain unmet.
          If someone agrees to our request out of fear, guilt, shame, obligation, or the desire for reward, this compromises the quality of connection and trust between us. When we are able to express a clear request, we raise the likelihood that the person listening to us will experience choice in their response. As a consequence, while we may not gain immediate assent to our wishes, we are more likely to get our needs met over time because we are building trust that everyone’s needs matter. Within an atmosphere of such trust, goodwill increases, and with it a willingness to support each other in getting our needs met.
          Learning to make clear requests and shifting our consciousness to making requests in place of demands are very challenging skills for most people. People often find the request part to be the hardest, because of what we call a “crisis of imagination”: a difficulty in identifying a strategy that could actually meet our needs without being at the expense of other needs. Even before considering the needs of others, the very act of coming up with what we call a positive, doable request is challenging. We are habituated to thinking in terms of what we want people to stop doing (“don’t yell at me”), and how we want them to be (“treat me with respect”) rather than what we want them to do (“Would you be willing to lower your voice or talk later?”). With time, and a deeper connection to our needs, our creativity expands to imagine and embrace more strategies.
          This fourth step is critical to our ability to create the life we want. In particular, shifting from demands to requests entails a leap in focus and in faith: we shift from focusing on getting our needs met, to focusing on the quality of connection that will allow both of our needs to truly matter and ultimately also to be met."

          Use language that sounds natural and not to formal.
          
          Do not output any quotation marks e.g "".
          
          Do not label any sentences with "Observation:", "Feeling:", "Need:", or "Request:". 
          
          Do not output the words "NVC" or "Non Violent Communication".
          
          Do not output any phrases that contain the words, or are similar to "you make me feel", "you made me feel", "that makes me feel", "that made me feel" or indicate that someone has made someone else feel something, or indicate that the listener is responsible for the speaker's feelings (or vice versa). 
          
          Both people are responsible for their own feelings. 
          
          Keep situations specific and don't say things like "recently", "sometimes", "often", even if I say those words, or imply that in my message.
          
          Keep the output under 80 words and make it kind, empathic, curious, and collaborative.
          
          Format the response so that each sentence is in its own paragraph (i.e., separate sentences with two newline characters).
          
          Base the output on the following principles`,
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

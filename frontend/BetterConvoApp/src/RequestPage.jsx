// Import useState hook from React, which lets us store and update stateful data in the component
import { useState } from 'react';

// Defining the RequestPage component
export default function RequestPage() {
  // Hard-coded values for testing
  const situation = "My partner didn't reassure me when I was stressed.";
  const feeling = "Lonely";

  // Initialize a state variable called "request" with a default string
  // The "setRequest" function is used to update the "request" state
  // Allows the user to edit the request in the <textarea> and for us to track those changes
  const [request, setRequest] = useState("Please be there for me and reassure me.");

  // Initialize a state variable called "response" with an empty string
  // The "response" state varialbe holds whatever the API sends back
  // Once we receive a GPT-generated message, we'll store it in "response" and display it
  const [response, setResponse] = useState("");

  // Handler for the "Generate" button
  const handleGenerate = async () => {
    try {
      // Send a POST request to Express backend at /api/generate
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situation,
          feeling,
          request,
        }),
      });

      const data = await res.json();
      // Set the GPT-generated message in state
      setResponse(data.message);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Error generating response");
    }
  };

  return (
    <div>
      <h1>BetterConvo</h1>

      {/* Display the hard-coded situation and feeling */}
      <div>
        <p><strong>Situation:</strong> {situation}</p>
        <p><strong>Feeling:</strong> {feeling}</p>
      </div>

      {/* Text area for the request */}
      <div>
        <label htmlFor="request" style={{ display: "block"}}>
          Enter your request:
        </label>
        <textarea
          id="request"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
        />
      </div>

      {/* Generate button */}
      <button onClick={handleGenerate}>
        Generate
      </button>

      {/* Display the GPT response if we have one */}
      {response && (
        <div>
          <h2>You could start with:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

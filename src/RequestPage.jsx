// Import useState hook from React, which lets us store and update stateful data in the component
import { useState } from 'react';

// Import useLocation hook from React which lets us access the current location object. It contains the current URL and state passed from navigation. Here, it's used to retrive the feelings that were passed from the previous page.

import { useLocation } from "react-router-dom";

// Import useNavigate hook from React, which returns a function that we can call to changes routes and pass state to update the next page the user is taken to 
import { useNavigate } from "react-router-dom";

// Defining the RequestPage component
export default function RequestPage() {

    // Retrieve the situation and feelings passed from FeelingsPage
  // If none are provided, fallback to default value
  const location = useLocation();
  const feelingsFromState = location.state?.feelings || [];

  // Join the feelings array into a single string if nedded
  const feeling = feelingsFromState.join(", ");

  // Hard-coded values for testing
  const situation = "My partner ate all the creamed rice";

  // Initialize a state variable called "request" with a default string
  // The "setRequest" function is used to update the "request" state
  // Allows the user to edit the request in the <textarea> and for us to track those changes
  const [request, setRequest] = useState("Text me that you'll be late");

    // Hook for navigation between pages
    const navigate = useNavigate();

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
      // Navigate to the Script Response Screen, passing the generated message in the state
      navigate("/script", {state: {response: data.message}});
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
    </div>
  );
}

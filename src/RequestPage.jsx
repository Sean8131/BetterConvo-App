// Import useState hook from React, which lets us store and update stateful data in the component
import { useState } from "react";

// Import useLocation hook from React which lets us access the current location object. It contains the current URL and state passed from navigation. Here, it's used to retrive the feelings that were passed from the previous page.

import { useLocation } from "react-router-dom";

// Import useNavigate hook from React, which returns a function that we can call to changes routes and pass state to update the next page the user is taken to
import { useNavigate } from "react-router-dom";
import MyTitle from "./MyTitle";

// Defining the RequestPage component
export default function RequestPage() {
  // Retrieve the situation and feelings passed from FeelingsPage
  // If none are provided, fallback to default value
  const location = useLocation();
  const { situation, feelings } = location.state || {
    situation: "",
    feelings: [],
  };

  // Join the feelings array into a single string if nedded
  const feeling =
    feelings && feelings.length > 0 ? feelings.join(", ") : "Annoyed";

  // Hard-coded values for testing
  // const situation = "My partner ate all the creamed rice";

  // Initialize a state variable called "request" with a default string
  // The "setRequest" function is used to update the "request" state
  // Allows the user to edit the request in the <textarea> and for us to track those changes
  const [request, setRequest] = useState("Clean up after yourself");

  // Hook for navigation between pages
  const navigate = useNavigate();

  // Initialize a state variable called "response" with an empty string
  // The "response" state varialbe holds whatever the API sends back
  // Once we receive a GPT-generated message, we'll store it in "response" and display it
  const [response, setResponse] = useState("");

  // State for the loading indicator
  const [loading, setLoading] = useState(false);

  // State to hold any error message
  const [errorMessage, setErrorMessage] = useState("");

  // Handler for the "Generate" button
  const handleGenerate = async () => {
    // Validate that all required fields are provided
    if (!situation || !feeling) {
      alert("Please ensure the situation and feeling are properly filled out");
      return;
    }
    // Check if the situation has a minimum character count
    if (request.trim().length < 10) {
      alert("Please describe what you would like in at least 10 characters.");
      return;
    }

    // Log the payload for debugging purposes
    console.log("Sending payload:", { situation, feeling, request });

    // Start the loading indicator and disable the button
    setLoading(true);

    // Clear any previous error message
    setErrorMessage("");

    try {
      // Send a POST request to Vercel serverless function at /api/generate
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situation,
          feeling,
          request,
        }),
      });

      // If the response is not OK, throw an error to be caught below
      if (!res.ok) {
        const errorText = await res.text();
        console.log(errorText);
        throw new Error(`HTTP error! status: ${res.status}: ${errorText}`);
      }

      // Parse the response JSON
      const data = await res.json();
      console.log("API response:", data);

      // Navigate to the Script Response Screen, passing the generated message in the state
      navigate("/script", { state: { response: data.message } });
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Error generating response");
      // Set the inline error message
      setErrorMessage(
        "An error occurred while generating the response. Please try again."
      );
    } finally {
      // Stop the loading indicator
      setLoading(false);
    }
  };

  // Handler for the "Back" button
  const handleBack = () => {
    // Navigate back to the previous page in the browser history
    navigate(-1);
  };

  return (
    <div class="mx-auto w-2xs md:w-3xl p-2">
      <MyTitle />
      <div>
        <p class=" break-words w-full p-4 text-lg">
          <strong>Situation:</strong> {situation}
        </p>
        <p class="text-lg pb-4">
          <strong>Feeling:</strong> {feeling}
        </p>
      </div>

      {/* Text area for the request */}
      <div class="mx-auto max-width-sm md:w-xl p-2">
        <label
          class="text-l md:text-xl font-medium flex flex-col mb-4"
          htmlFor="request"
        >
          What would you like to happen?
        </label>

        {/* If loading, show the spinner; otherwise, show the textarea */}
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <textarea
            class="border rounded-xl text-l p-4 mb-4"
            id="request"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            rows="6"
            style={{ width: "100%", marginBottom: "20px" }}
            placeholder="e.g I would like my partner to message me if they are running late."
          />
        )}
      </div>

      {/* Inline error message */}
        {errorMessage && (
          <div class="text-red-500 mb-4">{errorMessage}</div>
        )}

      <button
        class="rounded-lg border border-transparent py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px focus-visible:ring-[#646cff]"
        onClick={handleBack}
        style={{ marginRight: "10px" }}
        disabled={loading}
      >
        Back
      </button>

      {/* Replace Generate with Retry button if an error occurred */}
      {errorMessage ? (
        <button
        class="rounded-lg border border-transparent text-green-400 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px focus-visible:ring-[#646cff]"
        onClick={handleGenerate}
        disabled={loading}
      >
        Retry
      </button>
      ) : (
      <button
        class="rounded-lg border border-transparent py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px focus-visible:ring-[#646cff]"
        onClick={handleGenerate}
        disabled={loading}
      >
        Generate
      </button>
      )}

      {/* Inline CSS for the spinner */}
      <style>
        {`
        .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        animation: spin 2s linear infinite;
        margin: 20px auto;
        }
        @keyframes spin {
        0% {transform: rotate(0deg); }
        100% {transform: rotate(360deg); }
        }
        `}
      </style>
    </div>
  );
}

// Import useState hook from React, which lets us store and update stateful data in the component
import { useState, useEffect, useRef } from "react";

// Import useLocation hook from React which lets us access the current location object. It contains the current URL and state passed from navigation. Here, it's used to retrive the feelings that were passed from the previous page.

import { useLocation } from "react-router-dom";

// Import useNavigate hook from React, which returns a function that we can call to changes routes and pass state to update the next page the user is taken to
import { useNavigate } from "react-router-dom";
import MyTitle from "./MyTitle";
import BlinkingTextarea from "./BlinkingTextArea";

// Defining the RequestPage component
export default function RequestPage() {
  // Retrieve the situation and feelings passed from FeelingsPage
  // If none are provided, fallback to default value
  const location = useLocation();
  const { situation, feelings } = location.state || {
    situation: "",
    feelings: [],
  };

  // Hook for navigation between pages
  const navigate = useNavigate();

  // Use a ref to ensure the component doesn't re-render and the redirect happens only once
  const hasRedirected = useRef(false);

  // Redirect the user if required data is missing
  useEffect(() => {
    if ((!situation || situation.trim() === "") && !hasRedirected.current) {
      hasRedirected.current = true; // Mark that we've already alerted and redirected
      alert("Required informaion is missing. Please re-enter your information.");
      navigate("/situation");
    } else if (situation && (!feelings || feelings.length === 0) && !hasRedirected.current) {
      hasRedirected.current = true;
      alert("Required informaion is missing. Please re-enter your information.");
      navigate("/feelings");
    }
  }, [situation, feelings, navigate]);

  // Join the feelings array into a single string if nedded
  const feeling = feelings.join(", ");

  // Initialize a state variable called "request" with a default string
  // The "setRequest" function is used to update the "request" state
  // Allows the user to edit the request in the <textarea> and for us to track those changes
  const [request, setRequest] = useState("Next time, send me a message to let me know you're running late");

  // Initialize a state variable called "response" with an empty string
  // The "response" state varialbe holds whatever the API sends back
  // Once we receive a GPT-generated message, we'll store it in "response" and display it
  const [response, setResponse] = useState("");

  // State for the loading indicator
  const [loading, setLoading] = useState(false);

  // State to hold any error message
  const [errorMessage, setErrorMessage] = useState("");

  // State to track network connectivity
  const [isOnLine, setIsOnLine] = useState(navigator.onLine);

  // Effect to add event listeners for online and offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOnLine(true);

      // Automatically clear error message when connection is restored
      setErrorMessage("");
    };
    const handleOffline = () => {
      setIsOnLine(false);
      setErrorMessage("No Internet Connection. Please check your connection.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handler for the "Generate" / "Retry" button
  const handleGenerate = async () => {
    // If offline, immediately set error message and do not proceed
    if (!isOnLine) {
      setErrorMessage("No Internet Connection. Please check your connection.");
      return;
    }

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

    // Record the start time to enforce a 5 second time delay
    const startTime = Date.now();

    // Variables to capture error info without immediately updating the state
    let errorOccurred = false;
    let errorMsg = "";

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

      // Ensure the loading indicator remains visible for 4 seconds
      const elapsed = Date.now() - startTime;
      if (elapsed < 4000) {
        await new Promise((resolve) => setTimeout(resolve, 4000 - elapsed));
      }

      // Navigate to the Script Response Screen, passing the generated message in the state
      navigate("/script", { state: { response: data.message } });
    } catch (error) {
      console.error("Error generating response:", error);

      // Capture the error message to be set after the delay
      errorOccurred = true;
      errorMsg =
        "An error occurred while generating the response. Please try again.";
    } finally {
      // Calculate elapsed time and ensure the loading indicator is visible for 4 seconds
      const elapsedFinal = Date.now() - startTime;
      if (elapsedFinal < 4000) {
        await new Promise((resolve) =>
          setTimeout(resolve, 4000 - elapsedFinal)
        );
      }

      // Stop the loading indicator
      setLoading(false);

      // If an error occurred, update the error message after the delay
      if (errorOccurred) {
        setErrorMessage(errorMsg);
      }
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
      <h2 class="text-xl md:text-2xl mb-4 font-semibold">Request</h2>
      <p class="font-medium text-base mb-2 md:text-lg">What do you want?</p>
      <p class="font-light text italic text-base md:text-lg mb-2 md:mb-4 ">e.g Let me know you'll be late</p>
        <div class="flex flex-col mb-2 md:mb-4">
          <p class="text-slate-500 break-words w-full text-base md:text-lg mb-2 md:mb-4">Situation: {situation}
        </p>
        <p class="m-0 text-slate-500 text-base md:text-lg">{feelings.length > 1 ? "Feelings:" : "Feeling: "}{feeling}
        </p>
        </div>
      </div>

      {/* Text area for the request */}
      <div class="mx-auto max-width-sm md:w-xl p-2">

        {/* If loading, show the spinner; otherwise, show the textarea */}
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <BlinkingTextarea placeholder="Enter your request..."
              value={request}
              onChange={(e) => setRequest(e.target.value)}/>
        )}
      </div>

      {/* Inline error message */}
      {errorMessage && <div class="text-red-500 mb-4">{errorMessage}</div>}

      {/* Button Rendering */}
{/* Back Button */}
<button
  className={`rounded-lg border py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-4 ${
    !isOnLine || loading
      ? "!text-gray-700 !border-gray-700"
      : "text-white border-purple-500 hover:bg-purple-100 hover:text-purple-950 hover:border-[#646cff]"
  }`}
  onClick={handleBack}
  style={{ marginRight: "10px" }}
  disabled={loading || !isOnLine}
>
  Back
</button>

{!isOnLine ? (
  // When offline, always show the Generate button as disabled.
  <button
    className="rounded-lg border border-gray-700 text-gray-700 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-not-allowed transition-colors duration-200 focus:outline-none focus-visible:ring-4"
    disabled
  >
    Generate
  </button>
) : errorMessage ? (
  // When there's an error (and you're online), show the Retry button.
  <button
    className="rounded-lg border border-green-400 text-green-400 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4"
    onClick={handleGenerate}
    disabled={loading}
  >
    Retry
  </button>
) : (
  // Otherwise, show the normal Generate button.
  <button
    className={`rounded-lg border py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-4 ${
      loading
        ? "!text-gray-700 !border-gray-700"
        : "text-white border-purple-500 hover:bg-purple-100 hover:text-purple-950 hover:border-[#646cff]"
    }`}
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

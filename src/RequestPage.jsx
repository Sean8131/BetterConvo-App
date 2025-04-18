// Import useState hook from React, which lets us store and update stateful data in the component
import { useState, useEffect, useRef } from "react";

// Import useLocation hook from React which lets us access the current location object. It contains the current URL and state passed from navigation. Here, it's used to retrive the feelings that were passed from the previous page.

import { useLocation } from "react-router-dom";

// Import useNavigate hook from React, which returns a function that we can call to changes routes and pass state to update the next page the user is taken to
import { useNavigate } from "react-router-dom";

import PageLayout from "./PageLayout";
import PageFooter from "./PageFooter";
import TextArea from "./TextArea";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton";
import MainHeader from "./MainHeader";

const DEBUG = false;

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
  const [request, setRequest] = useState("");

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

      if (DEBUG) console.log("Step 1: Sending request to /api/generate");
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

      if (DEBUG) console.log("Step 2: Received response from /api/generate");

      // If the response is not OK, throw an error to be caught below
      if (!res.ok) {
        const errorText = await res.text();
        console.log("Step2.1: Error response text:", errorText);
        console.log(errorText);
        throw new Error(`HTTP error! status: ${res.status}: ${errorText}`);
      }

      // Parse the response JSON
      const data = await res.json();
      if (DEBUG) console.log("Step 3: Parsed GPT response:", data);

      // Track usage after successful generation
      const session_id = localStorage.getItem('session_id');
      if (DEBUG) console.log("Step 4: Sending usage data");

      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generated_script',
          step: 'request',
          session_id: session_id,
          details: {
            prompt_length: situation.length + feeling.length + request.length,
          }
        })
      });

      if (DEBUG) console.log("Step 5: Usage data sent");

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
    <PageLayout
      footer={
        <PageFooter>
      <MainButton
        label={errorMessage ? "Retry" : "Generate"}
        onClick={handleGenerate}
        disabled={loading || !isOnLine}
      />
      <div className="h-18">
                          <SecondaryButton 
                            show={false}
                            label="Give Feedback" />
                          </div>
      </PageFooter>
      }
    >
      <div className="max-w-xl w-full mx-auto px-4 pt-20">
        <MainHeader title="What would you like to happen?" />
        <div className="text-left flex flex-col mb-4 text-white">
          <p className="font-display break-words text-base md:text-lg mb-2">
            Situation: {situation}
          </p>
          <p className="font-display text-base md:text-lg">
            {feelings.length > 1 ? "Feelings: " : "Feeling: "} {feeling}
          </p>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : (
          <TextArea
            placeholder="Describe what you want to happen..."
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
        )}

        {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      </div>

      {/* Spinner Styles */}
      <style>
        {`
          .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 72px;
            height: 72px;
            animation: spin 2s linear infinite;
            margin: 20px auto;
            margin-top: 80px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </PageLayout>
  );
}
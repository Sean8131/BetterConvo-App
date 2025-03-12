import { useLocation, useNavigate } from "react-router-dom";

export default function ScriptResponsePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the generated response from the navigation state
  const response = location.state?.response || "No response available.";

  // Handler for the "New Request" button to go back to the input screen
  const handleNewRequest = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>BetterConvo</h1>

      {/* Display the generated GPT response */}
      <div>
        <h2>You could start with:</h2>
        <p>{response}</p>
      </div>

      {/* New Request button */}
      <button onClick={handleNewRequest}>
        New Request
      </button>
    </div>
  );
}

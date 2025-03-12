import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import RequestPage from "./RequestPage";
import ScriptResponsePage from "./ScriptResponsePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Request Input Screen */}
        <Route path="/" element={<RequestPage />} />
        {/* Route for the Script Response Screen */}
        <Route path="/script" element={<ScriptResponsePage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import FeelingsPage from './FeelingsPage';
import RequestPage from "./RequestPage";
import ScriptPage from "./ScriptPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing route can be the Feelings Page */}
        <Route path="/" element={<FeelingsPage />} />
        <Route path="/request" element={<RequestPage />} />
        {/* Route for the Script Response Screen */}
        <Route path="/script" element={<ScriptPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import HomePage from "./HomePage";
import SituationPage from "./SituationPage";
import FeelingsPage from './FeelingsPage';
import RequestPage from "./RequestPage";
import ScriptPage from "./ScriptPage";

function App() {
  return (
    // <div class="max-w-md md:max-w-xl">
    <Router>
      <Routes>
        {/* Landing route: HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Routes */}
        <Route path="/situation" element={<SituationPage />} />
        <Route path="/feelings" element={<FeelingsPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/script" element={<ScriptPage />} />
      </Routes>
    </Router>
    // </div>
  );
}

export default App;

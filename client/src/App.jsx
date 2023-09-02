import "./App.css";
import Editor from "./components/Editor";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const uid = Date.now();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to={`/doc/${uid}`} />} />
        <Route path="/doc/:id" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;

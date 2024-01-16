import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/api/login" element={<LoginPage />} />
        <Route path="/api/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostMainPage  from "./pages/PostMainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignUpPage />} />
        <Route path="/post" element={<PostMainPage />} />
      </Routes>
    </Router>
  );
}

export default App;

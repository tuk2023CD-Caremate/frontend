import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostMainPage  from "./pages/PostMainPage";
import BestPostPage  from "./pages/BestPostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signIn" element={<SignUpPage />} />
        <Route path="/post" element={<PostMainPage />} />
        <Route path="/bestpost" element={<BestPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;

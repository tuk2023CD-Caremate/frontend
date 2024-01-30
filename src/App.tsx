import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostMainPage  from "./pages/PostMainPage";
import BestPostPage  from "./pages/BestPostPage";
import MyPostPage  from "./pages/MyPostPage";
import InterestsPostPage  from "./pages/InterestsPostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signIn" element={<SignUpPage />} />
        <Route path="/post" element={<PostMainPage />} />
        <Route path="/bestpost" element={<BestPostPage />} />
        <Route path="/mypost" element={<MyPostPage />} />
        <Route path="/interestspost" element={<InterestsPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;

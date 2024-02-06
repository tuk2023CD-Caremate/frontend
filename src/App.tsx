import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPostPage  from "./pages/MainPostPage";
import QuestionPostPage  from "./pages/QuestionPostPage";
import StudyPage  from "./pages/StudyPostPage";
import WritingPostPage from "./pages/WritingPostPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignUpPage />} />
        <Route path="/post" element={<MainPostPage />} />
        <Route path="/questions" element={<QuestionPostPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/writing" element={< WritingPostPage/>} />
      </Routes>
    </Router>
  )
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPostPage from './pages/MainPostPage'
import QuestionPostPage from './pages/QuestionPostPage'
import StudyPage from './pages/StudyPostPage'
import MyPage from './pages/MyPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignUpPage />} />
        <Route path="/post" element={<MainPostPage />} />
        <Route path="/questions" element={<QuestionPostPage />} />
        <Route path="/study" element={<StudyPage />} />

        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  )
}

export default App

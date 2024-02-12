import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPostPage from './pages/MainPostPage'
// import QuestionPostPage from './pages/QuestionPostPage'
import StudyPage from './pages/StudyPostPage'
import ProfilePage from './pages/Mypage/ProfilePage'
import OfflinePage from './pages/OfflinePage'
import OnlinePage from './pages/OnlinePage'
import NotificationPage from './pages/Mypage/NotificationPage'
import MyPostPage from './pages/Mypage/MyPostPage'
import MatingListPage from './pages/Mypage/MatingListPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/offline" element={<OfflinePage />} />
        <Route path="/online" element={<OnlinePage />} />
        <Route path="/post" element={<MainPostPage />} />
        {/* <Route path="/questions" element={<QuestionPostPage />} /> */}
        <Route path="/study" element={<StudyPage />} />
        <Route path="/mypage" element={<ProfilePage />} />
        <Route path="/mypage/notification" element={<NotificationPage />} />
        <Route path="/mypage/mypost" element={<MyPostPage />} />
        <Route path="/mypage/matchinglist" element={<MatingListPage />} />
      </Routes>
    </Router>
  )
}

export default App

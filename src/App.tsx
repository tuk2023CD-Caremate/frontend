import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPostPage from './pages/PostPage/MainPostPage'
import StudyPage from './pages/PostPage/StudyPostPage'
import ProfilePage from './pages/Mypage/ProfilePage'
import OfflinePage from './pages/OfflinePage'
import OnlinePage from './pages/OnlinePage'
import NotificationPage from './pages/Mypage/NotificationPage'
import MyPostPage from './pages/Mypage/MyPostPage'
import MatingListPage from './pages/Mypage/MatingListPage'
import QuestionPostPage  from "./pages/PostPage/QuestionPostPage";
import WritingPostPage from "./pages/PostPage/WritingPostPage";
{/*import PostPage from "./pages/PostPage/PostPage"; */}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignUpPage />} />

        <Route path="/offline" element={<OfflinePage />} />
        <Route path="/online" element={<OnlinePage />} />

        <Route path="/posts" element={<MainPostPage />} />
        <Route path="/posts/questions" element={<QuestionPostPage />} />
        <Route path="/posts/study" element={<StudyPage />} />
        <Route path="/posts/write" element={< WritingPostPage/>} />
        {/*<Route path="/post/:id" element={< PostPage/>} />*/}

        <Route path="/mypage" element={<ProfilePage />} />
        <Route path="/mypage/notification" element={<NotificationPage />} />
        <Route path="/mypage/mypost" element={<MyPostPage />} />
        <Route path="/mypage/matchinglist" element={<MatingListPage />} />

      </Routes>
    </Router>
  )
}

export default App

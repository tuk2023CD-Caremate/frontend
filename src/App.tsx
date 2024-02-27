import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPostsPage from './pages/PostsPage/MainPostsPage'
import StudyPostsPage from './pages/PostsPage/StudyPostsPage'
import ProfilePage from './pages/Mypage/ProfilePage'
import OfflinePage from './pages/OfflinePage'
import OnlinePage from './pages/OnlinePage'
import NotificationPage from './pages/Mypage/NotificationPage'
import MyPostPage from './pages/Mypage/MyPostPage'
import MatingListPage from './pages/Mypage/MatingListPage'
import ChatPage from './pages/ChatPage'
import QuestionPostsPage  from "./pages/PostsPage/QuestionPostsPage";
import WritingPostsPage from "./pages/PostsPage/WritingPostsPage";
import DetailMainPostsPage from "./pages/PostsPage/DetailMainPostsPage";
import DetailStudyPostsPage from "./pages/PostsPage/DetailStudyPostPage";  
import DetailQuestionsPostsPage from "./pages/PostsPage/DetailQuestionPostsPage";  
import StudyPage from "./pages/StudyPage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signIn" element={<SignUpPage />} />

        <Route path="/offline" element={<OfflinePage />} />
        <Route path="/online" element={<OnlinePage />} />

        <Route path="/chat" element={<ChatPage />} />

        <Route path="/posts" element={<MainPostsPage />} />
        <Route path="/posts/questions" element={<QuestionPostsPage />} />
        <Route path="/posts/study" element={<StudyPostsPage />} />

        <Route path="/posts/write" element={< WritingPostsPage/>} />
        <Route path="/posts/:post_id" element={< DetailMainPostsPage/>} />
        <Route path="/posts/study/:post_id" element={< DetailStudyPostsPage/>} />
        <Route path="/posts/questions/:post_id" element={< DetailQuestionsPostsPage/>} />

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

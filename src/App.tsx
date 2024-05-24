import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { styled } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPostsPage from './pages/post/MainPostsPage'
import StudyPostsPage from './pages/post/StudyPostsPage'
import ProfilePage from './pages/mypage/ProfilePage'
import StartPage from './pages/matching/StartPage'
import NotificationPage from './pages/mypage/NotificationPage'
import MyPostPage from './pages/mypage/MyPostPage'
import MatingListPage from './pages/mypage/MatingListPage'
import ChatPage from './pages/chat/ChatPage'
import QuestionPostsPage from './pages/post/QuestionPostsPage'
import WritingPostsPage from './pages/post/WritingPostsPage'
import DetailMainPostsPage from './pages/post/DetailMainPostsPage'
import DetailStudyPostsPage from './pages/post/DetailStudyPostPage'
import DetailQuestionsPostsPage from './pages/post/DetailQuestionPostsPage'
import StudyPage from './pages/StudyPage'
import SelectUserPage from './pages/matching/SelectUserPage'
import UpdatePostsPage from './pages/post/UpdatePostsPage'
import ProtectedRoute from './components/utils/ProtecetedRoute'
import { useApiUrlStore } from './store/store'
import ChatRoomPage from './pages/chat/ChatRoomPage'

const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    min-height: 100px;
    font-size: 25px;
    font-weight: bold;
  }
`

function App() {
  const { apiUrl } = useApiUrlStore()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      const eventSource = new EventSource(`${apiUrl}/subscribe/${token}`)
      eventSource.onopen = () => {
        console.log('sse opened!')
      }
      eventSource.addEventListener('Like', (event) => {
        const data = JSON.parse(event.data)
        console.log('좋아요 알림 :', data)
        toast.info(`${data.nickname}님께서 회원님의 게시글을 좋아합니다.`, {
          position: 'top-right',
        })
      })

      eventSource.addEventListener('Comment', (event) => {
        const data = JSON.parse(event.data)
        console.log('댓글 알림 :', data)
        toast.info(`${data.nickname}님께서 회원님의 게시글에 댓글을 작성하였습니다.`, {
          position: 'top-right',
        })
      })

      eventSource.addEventListener('Matching', (event) => {
        const data = JSON.parse(event.data)
        console.log('매칭 알림 :', data)
        toast.info(`${data.nickname}님께서 매칭을 요청하였습니다.`, {
          position: 'top-right',
        })
      })
    }
  }, [])

  return (
    <Router>
      <CustomToastContainer />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />

        {/* <Route path="/offline" element={<OfflinePage />} /> */}

        <Route path="/matching" element={<StartPage />} />
        <Route path="/matching/select" element={<SelectUserPage />} />

        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats/room/:chatRoomId/:mentorId"
          element={
            <ProtectedRoute>
              <ChatRoomPage />
            </ProtectedRoute>
          }
        />

        <Route path="/posts" element={<MainPostsPage />} />
        <Route path="/posts/questions" element={<QuestionPostsPage />} />
        <Route path="/posts/study" element={<StudyPostsPage />} />

        <Route path="/posts/write" element={<WritingPostsPage />} />
        <Route path="/posts/update/:post_id" element={<UpdatePostsPage />} />

        <Route path="posts/study/:post_id" element={<DetailStudyPostsPage />} />
        <Route path="posts/questions/:post_id" element={<DetailQuestionsPostsPage />} />
        <Route path="posts/:post_id" element={<DetailMainPostsPage />} />

        <Route path="/calender" element={<StudyPage />} />

        <Route path="/mypage" element={<ProfilePage />} />
        <Route path="/mypage/notification" element={<NotificationPage />} />
        <Route path="/mypage/mypost" element={<MyPostPage />} />
        <Route path="/mypage/matchinglist" element={<MatingListPage />} />
      </Routes>
    </Router>
  )
}

export default App

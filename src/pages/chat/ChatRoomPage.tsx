import Header from '../../components/Header.tsx'
import { styled } from 'styled-components'
import Navbar from '../../components/Navbar.tsx'
import Chat from '../../components/chat/Chat.tsx'
import { useParams } from 'react-router-dom'
import { useReviewModalStore } from '../../store/store.ts'
import CreateReviewModal from '../../components/chat/CreateReviewModal.tsx'

interface RouteParams {
  [key: string]: string | undefined
  chatRoomId?: string
  mentorId?: string
}

const Container = styled.div`
  display: flex;
  height: calc(100vh - 280px);
  width: 1280px;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
`

function ChatRoomPage() {
  const { chatRoomId, mentorId } = useParams<RouteParams>()

  const { isReviewModalOpen, setIsReviewModalOpen } = useReviewModalStore()

  const openModal = () => {
    setIsReviewModalOpen(true)
  }

  const closeModal = () => {
    setIsReviewModalOpen(false)
  }

  if (!chatRoomId) {
    return <div>채팅방 ID가 제공되지 않았습니다.</div>
  }

  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <Chat onOpen={openModal} chatRoomId={chatRoomId} />
        <CreateReviewModal isOpen={isReviewModalOpen} onClose={closeModal} mentorId={mentorId} />
      </Container>
    </div>
  )
}

export default ChatRoomPage

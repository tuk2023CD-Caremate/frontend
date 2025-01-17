import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import Header from '../../components/Header.tsx'
import Navbar from '../../components/Navbar.tsx'
import Chat from '../../components/chat/Chat.tsx'
import CreateReviewModal from '../../components/chat/CreateReviewModal.tsx'
import { useReviewModalStore } from '../../store/store.ts'

interface RouteParams {
  [key: string]: string | undefined
  chatRoomId?: string
  mentorId?: string
}

const Container = styled.div`
  display: flex;
  height: calc(100vh -17.5rem);
  width: 80rem;
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

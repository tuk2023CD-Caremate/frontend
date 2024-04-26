import Header2 from '../components/Header2.tsx'
import { styled } from 'styled-components'
import Chat from '../components/Chat.tsx'
import { useState } from 'react'
import CreateReviewModal from './OnlinePage/CreateReviewModal.tsx'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 110px);
`

function ChatPage() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Header2 />
      <Container>
        <Chat />
        <CreateReviewModal isOpen={isModalOpen} onClose={closeModal} />
      </Container>
    </div>
  )
}

export default ChatPage

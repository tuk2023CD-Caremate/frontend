import Header2 from '../components/Header2.tsx'
import { styled } from 'styled-components'
import Navbar2 from '../components/Navbar2.tsx'
import Chat from '../components/Chat.tsx'
import { useParams } from 'react-router-dom'

interface RouteParams {
  [key: string]: string | undefined
  chatRoomId?: string
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
  const { chatRoomId } = useParams<RouteParams>()

  if (!chatRoomId) {
    return <div>채팅방 ID가 제공되지 않았습니다.</div>
  }

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <Chat chatRoomId={chatRoomId} />
      </Container>
    </div>
  )
}

export default ChatRoomPage

import Header2 from '../components/Header2.tsx'
import { styled } from 'styled-components'
import Navbar2 from '../components/Navbar2.tsx'
import Chat from '../components/Chat.tsx'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 280px);
  width: 1280px;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
`

function ChatRoomPage() {
  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <Chat />
      </Container>
    </div>
  )
}

export default ChatRoomPage

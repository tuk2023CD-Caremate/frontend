import Header2 from '../components/Header2.tsx'
import { styled } from 'styled-components'
// import Chat from '../components/Chat.tsx'
import Navbar2 from '../components/Navbar2.tsx'
import ChatList from '../components/ChatList.tsx'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 220px);
  width: 1280px;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
`

function ChatPage() {
  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <ChatList />
      </Container>
    </div>
  )
}

export default ChatPage

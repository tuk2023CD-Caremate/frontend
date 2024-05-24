import Header from '../../components/Header.tsx'
import { styled } from 'styled-components'
import Navbar from '../../components/Navbar.tsx'
import ChatList from '../../components/chat/ChatList.tsx'

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
      <Header />
      <Navbar />
      <Container>
        <ChatList />
      </Container>
    </div>
  )
}

export default ChatPage

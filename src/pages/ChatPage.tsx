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

const Text = styled.div`
  display: flex;
  width: 1099px;
  margin: 0 auto;
  font-size: 50px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
`

function ChatPage() {
  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Text>채팅</Text>
      <Container>
        <ChatList />
        {/* <Chat /> */}
      </Container>
    </div>
  )
}

export default ChatPage

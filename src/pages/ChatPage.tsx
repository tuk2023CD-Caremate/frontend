import Header2 from '../components/Header2.tsx'
import { styled } from 'styled-components'
import Chat from '../components/Chat.tsx'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 110px);
`

function ChatPage() {
  return (
    <div>
      <Header2 />
      <Container>
        <Chat />
      </Container>
    </div>
  )
}

export default ChatPage

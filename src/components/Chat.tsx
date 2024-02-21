import React, { useState } from 'react'
import styled from 'styled-components'
// import attachImg from '../assets/images/attach.png'
// import photoImg from '../assets/images/photo.png'
import profileImg from '../assets/images/profile.png'

interface Content {
  content: string
  sender?: string
}

interface MessagesProps {
  sender?: string
  userName: string
}

interface ProfileProps {
  sender?: string
  userName: string
  src: string
}

interface MessageContainerProps {
  sender?: string
  userName: string
}

const Container = styled.div`
  width: 1530px;
  height: calc(100vh - 170px);
  margin-top: 20px;
  margin-bottom: 40px;
  border-left: 2px solid #d8d8d8;
  border-right: 2px solid #d8d8d8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ChatWrap = styled.div`
  height: 800px;
  width: 1530px;
  overflow-y: auto; /* 내용이 넘칠 때만 스크롤 표시 */
`

const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.sender !== props.userName ? 'flex-start' : 'flex-start')};
`

const Time = styled.span`
  font-size: 12px;
  color: #888; /* Gray color for time */
`

const Profile = styled.img<ProfileProps>`
  width: 100px;
  height: 100px;
  margin-left: ${(props) => (props.sender !== props.userName ? '0' : '16px')};
  margin-right: ${(props) => (props.sender !== props.userName ? '16px' : '0')};
`

const Messages = styled.div<MessagesProps>`
  display: flex;
  max-width: 80%;
  padding: 30px;
  height: 10px;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.sender !== props.userName ? 'rgba(231, 227, 227, 0.8)' : '#8a33cb'};
  color: ${(props) => (props.sender !== props.userName ? 'black' : 'white')};
  border-radius: 16px;
  font-size: 26px;
  margin-left: ${(props) => (props.sender !== props.userName ? '0' : 'auto')};
`

const InputWrap = styled.div`
  justify-content: center;
  width: 100%;
  display: flex;
  align-items: center;
`

const InputField = styled.input`
  height: 70px;
  width: 1200px;
  border-radius: 50px;
  border: none;
  font-size: 20px;
  background-color: #f6f6f6;
  padding-left: 30px;
  font-size: x-large;
`

const SendButton = styled.button`
  width: 120px;
  height: 70px;
  margin-left: 50px;
  border-radius: 20px;
  font-size: x-large;
  font-weight: bold;
  border: none;
  background-color: #650fa9;
  color: #ffffff;
  cursor: pointer;
`

function Chat() {
  const [messages, setMessages] = useState<Content[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage: Content = {
        content: inputMessage,
        sender: 'user', // Assuming the user is the sender
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
    }
  }

  return (
    <div>
      <Container>
        <ChatWrap>
          {messages.map((message, index) => (
            <MessageContainer key={index} sender={message.sender} userName="user">
              <Messages sender={message.sender} userName="user">
                {message.content}
              </Messages>
              <Profile sender={message.sender} userName="user" src={profileImg} />
            </MessageContainer>
          ))}
        </ChatWrap>
        <InputWrap>
          <InputField
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <SendButton onClick={sendMessage}>전송</SendButton>
        </InputWrap>
      </Container>
    </div>
  )
}

export default Chat

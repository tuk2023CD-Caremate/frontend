import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// import attachImg from '../assets/images/attach.png'
// import photoImg from '../assets/images/photo.png'
import profileImg from '../assets/images/profile.png'
import axios from 'axios'
import { useApiUrlStore } from '../../store/store'
import Stomp from '@stomp/stompjs'
import { Client } from '@stomp/stompjs'

interface ChatProps {
  chatRoomId: string
  onOpen: () => void
}

interface Content {
  type: string
  chatRoomId: string
  sender: string
  content: string
}

interface MessagesProps {
  sender?: string
  nickname: string
}

interface ProfileProps {
  sender?: string
  nickname: string
  src: string
}

interface MessageContainerProps {
  sender?: string
  nickname: string
}

const Container = styled.div`
  width: 1530px;
  height: calc(100vh - 280px);
  margin-top: 20px;
  margin-bottom: 20px;
  border-left: 2px solid #d8d8d8;
  border-right: 2px solid #d8d8d8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ChatWrap = styled.div`
  width: 1530px;
  height: calc(100vh - 200px);
  overflow-y: auto; /* 내용이 넘칠 때만 스크롤 표시 */
`

const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.sender === props.nickname ? 'flex-end' : 'flex-start')};
`

// const Time = styled.span`
//   font-size: 12px;
//   color: #888; /* Gray color for time */
// `

const Profile = styled.img<ProfileProps>`
  width: 100px;
  height: 100px;
  margin-left: ${(props) => (props.sender !== props.nickname ? '0' : '10px')};
  margin-right: ${(props) => (props.sender !== props.nickname ? '10px' : '0')};
`

const Messages = styled.div<MessagesProps>`
  display: flex;
  max-width: 40%;
  padding: 20px;
  margin-right: 10px;
  height: auto;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.sender !== props.nickname ? 'rgba(231, 227, 227, 0.8)' : '#8a33cb'};
  color: ${(props) => (props.sender !== props.nickname ? 'black' : 'white')};
  border-radius: 16px;
  font-size: 26px;
  margin-left: ${(props) => (props.sender !== props.nickname ? '10px' : 'auto')};
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
const BtnWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  border-bottom: 2px solid #d8d8d8;
`

const ZoomLoginBtn = styled.button`
  width: 120px;
  height: 70px;
  border-radius: 20px;
  font-size: large;
  font-weight: bold;
  border: none;
  background-color: #650fa9;
  color: #ffffff;
  cursor: pointer;
  margin: 0 10px 20px 10px;
`
const CreateMeetingBtn = styled.button`
  width: 120px;
  height: 70px;

  border-radius: 20px;
  font-size: x-large;
  font-weight: bold;
  border: none;
  background-color: #650fa9;
  color: #ffffff;
  cursor: pointer;
  margin: 0 10px 20px 10px;
`

const CreateReviewBtn = styled.button`
  width: 120px;
  height: 70px;

  border-radius: 20px;
  font-size: x-large;
  font-weight: bold;
  border: none;
  background-color: #e8dcf2;
  color: #650fa9;
  cursor: pointer;
  margin: 0 10px 20px 10px;
`

function Chat({ chatRoomId, onOpen }: ChatProps) {
  const { apiUrl } = useApiUrlStore()

  const [nickname, setNickname] = useState<string>('')

  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)

  const [messages, setMessages] = useState<Content[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const chatRef = useRef<HTMLDivElement>(null)

  // 닉네임 요청
  const getNickname = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })

      setNickname(response.data.nickname)
      console.log('닉네임:', nickname)
    } catch (error) {}
  }

  useEffect(() => {
    const fetchData = async () => {
      await getNickname()
    }

    fetchData()

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate()
      }
    }
  }, [])

  useEffect(() => {
    initializeChat()
  }, [])

  const initializeChat = async () => {
    const access = localStorage.getItem('accessToken')

    const stomp = new Client({
      brokerURL: 'wss://studymate154.com/ws/chat',
      connectHeaders: {
        Authorization: `Bearer ${access}`,
      },
      debug: (str: string) => {
        console.log(str)
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })
    setStompClient(stomp)

    stomp.activate()

    stomp.onConnect = async () => {
      console.log('WebSocket 연결이 열렸습니다.')

      const subscriptionDestination = `/sub/chat/room/${chatRoomId}`

      stomp.subscribe(subscriptionDestination, (message) => {
        try {
          const parsedMessage = JSON.parse(message.body)
          setMessages((prevMessages) => [...prevMessages, parsedMessage])
        } catch (error) {
          console.error('오류가 발생했습니다:', error)
        }
      })
    }
  }

  const sendMessage = (messageContent: string, nickname: string, messageType: string) => {
    const destination = `/pub/chat/message/${chatRoomId}`
    const newMessage: Content = {
      type: messageType,
      chatRoomId: chatRoomId,
      sender: nickname,
      content: messageContent,
    }

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination,
        body: JSON.stringify(newMessage),
      })
    }
    setInputMessage('')

    console.log('dasdasdsa')
  }

  // 메세지 입력시 스크롤 아래로 이동
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const getAuth = async () => {
    try {
      window.open(
        'https://zoom.us/oauth/authorize?response_type=code&client_id=Zgt89KiZRri8SkBqws0SRg&redirect_uri=http%3A%2F%2F3.36.177.42%2Fapi%2Fmeeting%2FzoomApi',
      )
    } catch (error) {}
  }

  const getUrl = async () => {
    try {
      const response = await axios.get(`${apiUrl}/meeting/create`, {})
      const joinUrl = response.data.join_url
      window.open(response.data.start_url)
      if (nickname) {
        sendMessage(`화상 미팅 참여 링크 : ${joinUrl}`, nickname, 'TALK')
      } else {
        console.error('Nickname이 없습니다.')
      }
      console.log(response.data)
    } catch (error) {
      alert('Zoom 로그인을 먼저 해주세요!')
    }
  }

  const handleZoomLogin = async () => {
    try {
      getAuth()
    } catch (error) {}
  }

  const handleCreatMeeting = async () => {
    try {
      getUrl()
    } catch (error) {}
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (nickname) {
        sendMessage(inputMessage, nickname, 'TALK')
        sendMessage('채팅방에 입장하였습니다.', nickname, 'ENTER')
      } else {
        console.error('Nickname이 없습니다.')
      }
    }
  }

  return (
    <div>
      <Container>
        <BtnWrap>
          <ZoomLoginBtn onClick={handleZoomLogin}>Zoom 로그인</ZoomLoginBtn>
          <CreateMeetingBtn onClick={handleCreatMeeting}>회의 생성</CreateMeetingBtn>
          <CreateReviewBtn onClick={onOpen}>리뷰 작성</CreateReviewBtn>
        </BtnWrap>
        <ChatWrap ref={chatRef}>
          {messages.map((message, index) => (
            <MessageContainer key={index} sender={message.sender} nickname={nickname || ''}>
              {message.sender !== nickname && (
                <Profile sender={message.sender} nickname={nickname || ''} src={profileImg} />
              )}
              <Messages sender={message.sender} nickname={nickname || ''}>
                {message.content}
              </Messages>
              {message.sender === nickname && (
                <Profile sender={message.sender} nickname={nickname || ''} src={profileImg} />
              )}
            </MessageContainer>
          ))}
        </ChatWrap>
        <InputWrap>
          <InputField
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <SendButton onClick={() => sendMessage(inputMessage, nickname, 'TALK')}>전송</SendButton>
        </InputWrap>
      </Container>
    </div>
  )
}

export default Chat
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// import attachImg from '../assets/images/attach.png'
// import photoImg from '../assets/images/photo.png'
import Stomp, { Client } from '@stomp/stompjs'
import axios from 'axios'
import profileImg from '../../assets/images/profileimg.png'
import { useApiUrlStore } from '../../store/store'

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
  width: 95.6rem;
  height: calc(100vh - 17.5rem);
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  border-left: 2px solid #d8d8d8;
  border-right: 2px solid #d8d8d8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ChatWrap = styled.div`
  width: 95.6rem;
  height: calc(100vh - 12.5rem);
  overflow-y: auto; /* 내용이 넘칠 때만 스크롤 표시 */
`

const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.sender === props.nickname ? 'flex-end' : 'flex-start')};
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
`

// const Time = styled.span`
//   font-size: 12px;
//   color: #888; /* Gray color for time */
// `

const Profile = styled.img<ProfileProps>`
  padding: 0.8rem;
  width: 6.25rem;
  height: 6.25rem;
  margin-left: ${(props) => (props.sender !== props.nickname ? '0' : '0.625rem')};
  margin-right: ${(props) => (props.sender !== props.nickname ? '0.625rem' : '0')};
`

const Messages = styled.div<MessagesProps>`
  display: flex;
  max-width: 40%;
  padding: 1.25rem;
  margin-right: 0.625rem;
  height: auto;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.sender !== props.nickname ? 'rgba(231, 227, 227, 0.8)' : '#8a33cb'};
  color: ${(props) => (props.sender !== props.nickname ? 'black' : 'white')};
  border-radius: 1rem;
  font-size: 1.6rem;
  margin-left: ${(props) => (props.sender !== props.nickname ? '0.625rem' : 'auto')};
`

const InputWrap = styled.div`
  justify-content: center;
  width: 100%;
  display: flex;
  align-items: center;
`

const InputField = styled.input`
  height: 4.375rem;
  width: 75rem;
  border-radius: 3rem;
  border: none;
  font-size: 1.25rem;
  background-color: #f6f6f6;
  padding-left: 1.8rem;
  font-size: x-large;
`

const SendButton = styled.button`
  width: 7.5rem;
  height: 4.375rem;
  margin-left: 3rem;
  border-radius: 1.25rem;
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
  width: 7.5rem;
  height: 4.375rem;
  border-radius: 1.25rem;
  font-size: large;
  font-weight: bold;
  border: none;
  background-color: #650fa9;
  color: #ffffff;
  cursor: pointer;
  margin: 0rem 0.625rem 1.25rem 0.625rem;
`
const CreateMeetingBtn = styled.button`
  width: 7.5rem;
  height: 4.375rem;
  border-radius: 1.25rem;
  font-size: x-large;
  font-weight: bold;
  border: none;
  background-color: #650fa9;
  color: #ffffff;
  cursor: pointer;
  margin: 0rem 0.625rem 1.25rem 0.625rem;
`

const CreateReviewBtn = styled.button`
  width: 7.5rem;
  height: 4.375rem;
  border-radius: 1.25rem;
  font-size: x-large;
  font-weight: bold;
  border: none;
  background-color: #e8dcf2;
  color: #650fa9;
  cursor: pointer;
  margin: 0rem 0.625rem 1.25rem 0.625rem;
`

function Chat({ chatRoomId, onOpen }: ChatProps) {
  const { apiUrl } = useApiUrlStore()

  const [nickname, setNickname] = useState('')

  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)

  const [messages, setMessages] = useState<Content[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const chatRef = useRef<HTMLDivElement>(null)

  const [isComposing, setIsComposing] = useState(false)

  // 닉네임 요청
  const getNickname = () => {
    try {
      const nickname = localStorage.getItem('nickname')
      if (nickname) {
        setNickname(nickname)
      } else {
        console.log('저장된 닉네임이 없습니다.')
      }
      console.log('닉네임:', nickname)
    } catch (error) {
      console.error('닉네임을 불러오는 중 오류가 발생했습니다:', error)
    }
  }

  // 채팅 내역
  const fetchChatHistory = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/chat/rooms/${chatRoomId}/contents`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log(response)
      setMessages(response.data)
    } catch (error) {
      console.error('채팅 내역 로딩 중 오류가 발생했습니다:', error)
    }
  }

  useEffect(() => {
    getNickname()
    fetchChatHistory()

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
      brokerURL: 'wss://studymate154.kro.kr/ws/chat',
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

      const subscriptionDestination = `/exchange/chat.exchange/room.${chatRoomId}`

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
    const destination = `/pub/chat.message.${chatRoomId}`
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
        'https://zoom.us/oauth/authorize?response_type=code&client_id=Zgt89KiZRri8SkBqws0SRg&redirect_uri=http%3A%2F%2F35.216.37.137%2Fapi%2Fmeeting%2FzoomApi',
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

  const handleCreateMeeting = async () => {
    try {
      getUrl()
    } catch (error) {}
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isComposing && event.key === 'Enter') {
      if (nickname) {
        sendMessage(inputMessage, nickname, 'TALK')
      } else {
        console.error('Nickname이 없습니다.')
      }
    }
  }

  const handleComposition = (event: React.CompositionEvent<HTMLInputElement>) => {
    if (event.type === 'compositionstart') {
      setIsComposing(true)
    } else if (event.type === 'compositionend') {
      setIsComposing(false)
    }
  }

  return (
    <div>
      <Container>
        <BtnWrap>
          <ZoomLoginBtn onClick={handleZoomLogin}>Zoom 로그인</ZoomLoginBtn>
          <CreateMeetingBtn onClick={handleCreateMeeting}>회의 생성</CreateMeetingBtn>
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
            onCompositionStart={handleComposition}
            onCompositionEnd={handleComposition}
          />
          <SendButton onClick={() => sendMessage(inputMessage, nickname, 'TALK')}>전송</SendButton>
        </InputWrap>
      </Container>
    </div>
  )
}

export default Chat

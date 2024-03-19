import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// import attachImg from '../assets/images/attach.png'
// import photoImg from '../assets/images/photo.png'
import profileImg from '../assets/images/profile.png'
import axios from 'axios'
import { useApiUrlStore } from '../store/store'
import Stomp from '@stomp/stompjs'
import { Client } from '@stomp/stompjs'

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
  max-width: 40%;
  padding: 20px;
  margin: 10px;
  height: auto;
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
const BtnWrap = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 10px;
`

const ZoomLoginBtn = styled.button`
  width: 120px;
  height: 70px;
  margin: 10px;
  border-radius: 20px;
  font-size: large;
  font-weight: bold;
  border: none;
  background-color: #650fa9;
  color: #ffffff;
  cursor: pointer;
`
const CreateMeetingBtn = styled.button`
  width: 120px;
  height: 70px;
  margin: 10px;
  border-radius: 20px;
  font-size: x-large;
  font-weight: bold;
  border: none;
  background-color: #650fa9;
  color: #ffffff;
  cursor: pointer;
`

function Chat() {
  const { apiUrl } = useApiUrlStore()

  const [nickname, setNickname] = useState<string>()

  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)
  const [roomId, setRoomId] = useState<string>()

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

  // 채팅방 생성 api
  async function createChatroom() {
    // const access = localStorage.getItem('accessToken')

    try {
      if (nickname == '') {
        await getNickname()
      }
      const randomName = Math.floor(Math.random() * 1000000).toString() // 랜덤 번호 생성
      const response = await axios.post(`${apiUrl}/chat/room?name=${randomName}`, {
        // headers: { Authorization: `Bearer ${access}` },
      })
      setRoomId(response.data.roomId)
      console.log('채팅방 id:', roomId)
      console.log(`채팅방 name: ${response.data.name}`)
    } catch (error) {
      console.error(error)
      console.log('에러')
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await getNickname()
      await createChatroom()
    }

    fetchData()

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate()
      }
    }
  }, [])

  useEffect(() => {
    if (roomId) {
      initializeChat()
    }
  }, [roomId])

  const initializeChat = async () => {
    try {
      const stomp = new Client({
        brokerURL: 'ws://studymate-tuk.kro.kr:8080/ws/chat',
        debug: (str: string) => {
          console.log(str)
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      })
      setStompClient(stomp)

      stomp.activate()

      // WebSocket 연결이 열렸을 때의 처리 코드
      stomp.onConnect = () => {
        console.log('WebSocket 연결이 열렸습니다.')
        const subscriptionDestination = `/sub/chat/room/${roomId}`

        stomp.subscribe(subscriptionDestination, (frame) => {
          try {
            const parsedMessage = JSON.parse(frame.body)
            console.log(parsedMessage)
            setMessages((prevMessages) => [...prevMessages, parsedMessage])
          } catch (error) {
            console.error('오류가 발생했습니다:', error)
          }
        })
      }
    } catch (error) {
      console.error('채팅 룸 생성 중 오류가 발생했습니다:', error)
    }
  }

  const sendMessage = (messageContent: string) => {
    if (messageContent.trim() !== '') {
      const newMessage: Content = {
        content: messageContent,
        sender: 'user',
      }

      setMessages([...messages, newMessage])
      setInputMessage('')
    }
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
        'https://zoom.us/oauth/authorize?response_type=code&client_id=Zgt89KiZRri8SkBqws0SRg&redirect_uri=http%3A%2F%2Fstudymate-tuk.kro.kr%3A8080%2Fapi%2Fmeeting%2FzoomApi',
      )
    } catch (error) {}
  }

  const getUrl = async () => {
    try {
      const response = await axios.get(`${apiUrl}/meeting/create`, {})
      const joinUrl = response.data.join_url
      window.open(response.data.start_url)
      sendMessage(`화상 미팅 참여 링크 : ${joinUrl}`)
      console.log(response.data)
    } catch (error) {
      alert('Zoom 로그인을 먼저 해주세요!')
    }
  }

  const handleZoomLogin = async () => {
    try {
      getAuth()
    } catch (error) {
      // 에러 처리
    }
  }

  const handleCreatMeeting = async () => {
    try {
      getUrl()
    } catch (error) {}
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage(inputMessage)
    }
  }

  return (
    <div>
      <Container>
        <BtnWrap>
          <ZoomLoginBtn onClick={handleZoomLogin}>Zoom 로그인</ZoomLoginBtn>
          <CreateMeetingBtn onClick={handleCreatMeeting}>회의 생성</CreateMeetingBtn>
        </BtnWrap>
        <ChatWrap ref={chatRef}>
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
            onKeyDown={handleKeyPress}
          />
          <SendButton onClick={() => sendMessage(inputMessage)}>전송</SendButton>
        </InputWrap>
      </Container>
    </div>
  )
}

export default Chat

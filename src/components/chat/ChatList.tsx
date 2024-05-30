import styled from 'styled-components'
// import { useApiUrlStore } from '../store/store'
import ProfileIMG from '../../assets/images/profile.png'
import ChatIMG from '../../assets/images/chatIcon.png'
import { FaCircle } from 'react-icons/fa6'
import { RxDividerVertical } from 'react-icons/rx'
import { useApiUrlStore, useChatListStore } from '../../store/store'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 68.75rem;
  height: 14.6rem;
  border: 1px solid #d8d8d8;
  border-radius: 1rem;
  &:hover {
    border: 1px solid #650fa9;
  }
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1.25rem;
`

const MainWrap = styled.div`
  display: flex;
  width: 65.6rem;
`

const ImgWrap = styled.div`
  display: flex;
  width: 8.125rem;
  height: 8.125rem;
  justify-content: center;
  align-items: center;
  border: solid 1px #9b9b9b;
`

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 56.25rem;
  height: 7.5rem;
  margin-left: 1.25rem;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 56.25rem;
  height: 3.75rem;
`

const NameWrap = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.span`
  font-weight: bold;
  font-size: 2.3rem;
`

const NickName = styled.span`
  font-size:1.8rem;
  font-weight: bold;
  margin: 0.625rem;
`

const Bottom = styled.div`
  display: flex;
  width: 57.5rem;
  height: 3.75rem;
  align-items: center;
`

const Interest = styled.div`
  display: flex;
  color: #9b9b9b;
  font-size: 1.6rem;
`

const Detail = styled.div`
  display: flex;
  color: #9b9b9b;
  font-size: 1.6rem;
`

const StatusWrap = styled.div`
  display: flex;
  align-items: center;
`

const Status = styled.div`
  display: flex;
  color: #9b9b9b;
  font-weight: bold;
  font-size: 1.8rem;
  margin-left: 0.625rem;
`

const FooterWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 65.6rem;
`

// const ChatContent = styled.div`
//   display: flex;
//   color: #9b9b9b;
//   font-size: 26px;
// `

const MessageCount = styled.div<{ count: number }>`
  display: ${(props) => (props.count > 0 ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 3.25rem;
  height: 2.3rem;
  border-radius: 1.8rem;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
`

const NoChatList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:18.75rem;
`

const Text = styled.div`
  display: flex;
  font-size: 1.6rem;
  color: #9b9b9b;
`

function ChatList() {
  const { apiUrl } = useApiUrlStore()
  const { chatList, setChatList } = useChatListStore()

  // 닉네임 요청
  const getChatList = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/chat/rooms/list`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setChatList(response.data)
      console.log('api응답', response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getChatList()
  }, [])

  return (
    <div>
      {chatList.length === 0 ? (
        <NoChatList>
          <img src={ChatIMG} width={150} alt="Chat Icon" />
          <Text>입장할 채팅방이 없습니다.</Text>
        </NoChatList>
      ) : (
        chatList.map((chat) => (
          <Link to={`/chats/room/${chat.chatRoomId}/${chat.members[0].id}`} key={chat.chatRoomId}>
            <Container key={chat.chatRoomId}>
              <MainWrap>
                <ImgWrap>
                  <ProfileImg src={ProfileIMG} alt="프로필 이미지" />
                </ImgWrap>
                <InfoWrap>
                  <Top>
                    <NameWrap>
                      <Name>{chat.members[0].name}</Name>
                      <NickName>{chat.members[0].nickname}</NickName>
                    </NameWrap>
                    <StatusWrap>
                      <FaCircle color={chat.members[0].login ? '#2DC260' : '#9b9b9b'} />
                      <Status>{chat.members[0].login ? '온라인' : '오프라인'}</Status>
                    </StatusWrap>
                  </Top>
                  <Bottom>
                    <Interest>{chat.members[0].interests[0]}</Interest>
                    <RxDividerVertical color="#9b9b9b" size={28} />
                    <Detail>{chat.members[0].expertiseField}</Detail>
                  </Bottom>
                </InfoWrap>
              </MainWrap>
              <FooterWrap>
                {/* <ChatContent>{chat.lastMessage}</ChatContent> */}
                <MessageCount count={chat.unreadMessageCount}>
                  {chat.unreadMessageCount}
                </MessageCount>
              </FooterWrap>
            </Container>
          </Link>
        ))
      )}
    </div>
  )
}

export default ChatList

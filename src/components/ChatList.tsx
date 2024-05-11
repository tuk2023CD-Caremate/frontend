import styled from 'styled-components'
// import { useApiUrlStore } from '../store/store'
import ProfileIMG from '../assets/images/profile.png'
import ChatIMG from '../assets/images/chatIcon.png'
import { FaCircle } from 'react-icons/fa6'
import { RxDividerVertical } from 'react-icons/rx'
import { useApiUrlStore, useChatListStore } from '../store/store'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 1099px;
  height: 235px;
  border: 1px solid #d8d8d8;
  border-radius: 15px;
  &:hover {
    border: 1px solid #650fa9;
  }
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 20px;
`

const MainWrap = styled.div`
  display: flex;
  width: 1050px;
`

const ImgWrap = styled.div`
  display: flex;
  width: 130px;
  height: 130px;
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
  width: 900px;
  height: 120px;
  margin-left: 20px;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 900px;
  height: 60px;
`

const NameWrap = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.span`
  font-weight: bold;
  font-size: 38px;
`

const NickName = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin: 10px;
`

const Bottom = styled.div`
  display: flex;
  width: 920px;
  height: 60px;
  align-items: center;
`

const Interest = styled.div`
  display: flex;
  color: #9b9b9b;
  font-size: 26px;
`

const Detail = styled.div`
  display: flex;
  color: #9b9b9b;
  font-size: 26px;
`

const StatusWrap = styled.div`
  display: flex;
  align-items: center;
`

const Status = styled.div`
  display: flex;
  color: #9b9b9b;
  font-weight: bold;
  font-size: 30px;
  margin-left: 10px;
`

// const FooterWrap = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 1050px;
// `

// const ChatContent = styled.div`
//   display: flex;
//   color: #9b9b9b;
//   font-size: 26px;
// `

// const MessageCount = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: red;
//   width: 52px;
//   height: 38px;
//   border-radius: 30px;
//   color: #fff;
//   font-weight: bold;
//   font-size: 24px;
// `

const NoChatList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 300px;
`

const Text = styled.div`
  display: flex;
  font-size: 26px;
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
          <Link to={`/chats/room/${chat.chatRoomId}`} key={chat.chatRoomId}>
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
              {/* <FooterWrap>
            <ChatContent>{chat.lastMessage}</ChatContent>
            <MessageCount>{chat.messageCount}</MessageCount>
          </FooterWrap> */}
            </Container>
          </Link>
        ))
      )}
    </div>
  )
}

export default ChatList

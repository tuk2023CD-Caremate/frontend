import styled from 'styled-components'
import { useApiUrlStore } from '../store/store'
import ProfileIMG from '../assets/images/profile.png'
import { FaCircle } from 'react-icons/fa6'
import { RxDividerVertical } from 'react-icons/rx'

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

const FooterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1050px;
`

const ChatContent = styled.div`
  display: flex;
  color: #9b9b9b;
  font-size: 26px;
`

const MessageCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 52px;
  height: 38px;
  border-radius: 30px;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
`

function ChatList() {
  const { apiUrl } = useApiUrlStore()
  const statusText = '오프라인' // Example status, replace with actual status handling logic.

  const chatData = [
    {
      id: 1,
      name: '김영한',
      nickname: '영한코딩',
      status: '온라인',
      interests: '프로그래밍',
      details: '백엔드 JPA OOP',
      lastMessage: '백엔드 개발에 대해 더 배우고 싶어요!',
      messageCount: 5,
    },
    {
      id: 2,
      name: '이수진',
      nickname: '수진프론트',
      status: '오프라인',
      interests: '프론트엔드 개발',
      details: 'React, Vue.js',
      lastMessage: 'Vue.js 테크닉이 궁금합니다.',
      messageCount: 3,
    },
    {
      id: 3,
      name: '박준호',
      nickname: '준호데이터',
      status: '오프라인',
      interests: '데이터 분석',
      details: 'Python, 데이터 시각화',
      lastMessage: 'Python 라이브러리 추천 부탁드립니다.',
      messageCount: 4,
    },
  ]

  return (
    <div>
      {chatData.map((chat) => (
        <Container key={chat.id}>
          <MainWrap>
            <ImgWrap>
              <ProfileImg src={ProfileIMG} alt="프로필 이미지" />
            </ImgWrap>
            <InfoWrap>
              <Top>
                <NameWrap>
                  <Name>{chat.name}</Name>
                  <NickName>{chat.nickname}</NickName>
                </NameWrap>
                <StatusWrap>
                  <FaCircle color={chat.status === '온라인' ? '#2DC260' : '#9b9b9b'} />
                  <Status>{chat.status}</Status>
                </StatusWrap>
              </Top>
              <Bottom>
                <Interest>{chat.interests}</Interest>
                <RxDividerVertical color="#9b9b9b" size={28} />
                <Detail>{chat.details}</Detail>
              </Bottom>
            </InfoWrap>
          </MainWrap>
          <FooterWrap>
            <ChatContent>{chat.lastMessage}</ChatContent>
            <MessageCount>{chat.messageCount}</MessageCount>
          </FooterWrap>
        </Container>
      ))}
    </div>
  )
}

export default ChatList

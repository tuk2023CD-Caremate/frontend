import { useEffect } from 'react'
import styled from 'styled-components'
import UserImg from '../assets/images/profile.png'
import HeartImg from '../assets/images/likeicon.png'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { useApiUrlStore, useUserListStore } from '../store/store'
import axios from 'axios'

const Container = styled.div`
  width: 56.25rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0rem 0rem 1.25rem 0.625rem rgba(0, 0, 0, 0.2);
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 1.8rem;
`
const List = styled.div`
  max-height: 25rem;
  overflow-y: auto; /* 세로 스크롤 추가 */
`

const Box = styled.div`
  display: flex;
  width: 51.5rem;
  font-size: 1.8rem;
  align-items: center;
`

const UserImage = styled.img``

const UserRole = styled.div`
  font-size: 1.6rem;
  margin: 0.5rem;
  font-weight: bold;
`
const UserNickname = styled.div`
  font-size: 1.6rem;
  margin: 0.5rem;
`
const UserInterests = styled.div`
  font-size: 1.6rem;
  margin: 0.5rem;;
  font-weight: bold;
  color: #650fa9;
  margin-left: 1.25rem;
`

const UserDetail = styled.div`
  margin: 0.5rem;
  margin-left: 1.5rem;
`

const Blog = styled.div`
  font-size: 1.8rem;
`
const PublicRelations = styled.div`
  font-size: 1.8rem;
`
const HeartIMG = styled.img`
  width: 1.8rem;
  margin-right: 0.5rem;
`
const Heart = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
`

const RequestBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: #e8dcf2;
  color: #650fa9;
  width: 6.25rem;
  height: 3rem;
  justify-content: center;
  border-radius: 0.625rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 0.625rem;
`

const FindAgain = styled.div`
  display: flex;
  align-items: center;
  background-color: #e8dcf2;
  color: #650fa9;
  width: 6.25rem;
  height: 3rem;
  justify-content: center;
  border-radius: 0.625rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 0.625rem;
`

function SelectUserModal(id: any) {
  const { apiUrl } = useApiUrlStore()
  const { userList, setUserList } = useUserListStore()

  const encodedValue = JSON.stringify(id)
  const decodedValue = decodeURIComponent(encodedValue)
  const parsedObject = JSON.parse(decodedValue)
  const question_id = parsedObject.id

  // 멘토 리스트 조회
  const getUserList = async () => {
    const access = localStorage.getItem('accessToken')
    if (access) {
      try {
        const response = await axios.get(`${apiUrl}/matching/${question_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setUserList(response.data.memberList)
        console.log('Success ', response.data)
      } catch (error) {
        console.error('Error ', error)
      }
    } else {
      console.error('Access token not found.')
    }
  }

  // 매칭 요청
  const onRequestMatching = async (mentorId: number) => {
    const access = localStorage.getItem('accessToken')
    if (access) {
      try {
        const response = await axios.get(`${apiUrl}/matching/${question_id}/${mentorId}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        console.log('매칭요청발송')
        console.log(response.data)
      } catch (error) {
        console.error('Error ', error)
      }
    } else {
      console.error('Access token not found.')
    }
  }

  useEffect(() => {
    getUserList()
  }, [])

  // 매칭 요청 버튼 클릭 핸들러
  const handleRequestMatching = (mentorId: number) => {
    onRequestMatching(mentorId)
    // 매칭 요청이 성공했을 때의 추가적인 로직을 구현할 수 있습니다.
  }

  return (
    <div>
      <Container>
        <Title>멘토를 선택해주세요</Title>
        <List>
          <Accordion allowMultiple>
            {userList.map((user) => (
              <AccordionItem key={user.id}>
                <h2>
                  <AccordionButton>
                    <Box>
                      {' '}
                      <UserImage src={UserImg} />
                      <UserRole>{user.part}</UserRole>
                      <UserNickname>{user.nickname}</UserNickname>
                      <UserInterests>{user.interests}</UserInterests>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <UserDetail>
                    <Blog>Blog : {user.blogUrl}</Blog>
                    <PublicRelations>경력사항 : {user.publicRelations}</PublicRelations>
                    <Heart>
                      <HeartIMG src={HeartImg} />
                      {user.heart}
                    </Heart>
                    <RequestBtn onClick={() => handleRequestMatching(user.id)}>
                      매칭 요청
                    </RequestBtn>
                  </UserDetail>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </List>

        <FindAgain>다시 찾기</FindAgain>
      </Container>
    </div>
  )
}

export default SelectUserModal

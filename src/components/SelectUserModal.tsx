import React, { useEffect, useState } from 'react'
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
import { useApiUrlStore } from '../store/store'
import axios from 'axios'

interface UserList {
  id: number
  name: string
  nickname: string
  part: string
  email: string
  interests: string
  blogUrl: string
  publicRelations: string
  job: string
  heart: number
  starAverage: number
  solved: number
  matchingCount: number
}

const Container = styled.div`
  width: 900px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin: 30px;
`
const List = styled.div`
  max-height: 400px;
  overflow-y: auto; /* 세로 스크롤 추가 */
`

const Box = styled.div`
  display: flex;
  width: 825px;
  font-size: 30px;
  align-items: center;
`

const UserImage = styled.img``

const UserRole = styled.div`
  font-size: 26px;
  margin: 5px;
  font-weight: bold;
`
const UserNickname = styled.div`
  font-size: 26px;
  margin: 5px;
`
const UserInterests = styled.div`
  font-size: 20px;
  margin: 5px;
  font-weight: bold;
  color: #650fa9;
  margin-left: 20px;
`

const UserDetail = styled.div`
  margin: 5px;
  margin-left: 25px;
`

const Blog = styled.div`
  font-size: 30px;
`
const PublicRelations = styled.div`
  font-size: 30px;
`
const HeartIMG = styled.img`
  width: 30px;
  margin-right: 5px;
`
const Heart = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
`

const FindAgain = styled.div`
  display: flex;
  align-items: center;
  background-color: #e8dcf2;
  color: #650fa9;
  width: 100px;
  height: 50px;
  justify-content: center;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  margin: 30px;
`

function SelectUserModal() {
  const { apiUrl } = useApiUrlStore()

  const [userList, setUserList] = useState<UserList[]>([])

  const getUserList = async () => {
    const access = localStorage.getItem('accessToken')
    if (access) {
      try {
        const response = await axios.get(`${apiUrl}/matching/5`, {
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

  useEffect(() => {
    getUserList()
  }, [])

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

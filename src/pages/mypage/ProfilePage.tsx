import Header from '../../components/Header.tsx'
import Userbar from '../../components/sidebar/Userbar.tsx'
import Navbar from '../../components/Navbar.tsx'
import ProfileImg from '../../assets/images/profile.png'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useApiUrlStore, useProfileDataStore } from '../../store/store.ts'


const Container = styled.div`
  display: flex;
  margin-top: 100px;
`

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 400px);
`

const Upper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 100px);
  margin: 10px;
  padding-left: 50px;
  padding-right: 50px;
`

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Profile = styled.img`
  width: 150px;
`

const Role = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin: 10px;
`

const Nickname = styled.div`
  font-size: 40px;
  margin: 10px;
`

const Modify = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #dcdcdc;
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  margin: 30px;
  cursor: pointer;
`

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 100px);

  padding-left: 50px;
  padding-right: 50px;
`

const WrapContent = styled.div`
  margin: 20px;
  display: flex;
`
const Content = styled.div`
  width: 800px;
`

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 10px;
`

const Detail = styled.div`
  font-size: 28px;
  margin: 10px;
`

function ProfilePage() {
  const { apiUrl } = useApiUrlStore()
  const {profileData, setProfileData} = useProfileDataStore()

  const getProfile = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })

      setProfileData(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <Userbar />
        <ProfileWrapper>
          <Upper>
            <NameWrapper>
              <Profile src={ProfileImg} />
              <Role>{profileData.part}</Role>
              <Nickname>{profileData.nickname}</Nickname>
            </NameWrapper>
            <Modify>수정하기</Modify>
          </Upper>
          <Lower>
            <WrapContent>
              <Content>
                <Title>이름</Title>
                <Detail>{profileData.name}</Detail>
              </Content>
              <Content>
                <Title>전화번호</Title>
                <Detail>{profileData.tel}</Detail>
              </Content>
            </WrapContent>
            <WrapContent>
              <Content>
                <Title>PR</Title>
                <Detail>{profileData.publicRelations}</Detail>
              </Content>
              <Content>
                <Title>Blog</Title>
                <Detail>{profileData.blogUrl}</Detail>
              </Content>
            </WrapContent>
            <WrapContent>
              <Content>
                <Title>좋아요</Title>
                <Detail>{profileData.heart}</Detail>
              </Content>
              <Content>
                <Title>평점</Title>
                <Detail>{profileData.starAverage}</Detail>
              </Content>
            </WrapContent>
            <WrapContent>
              <Content>
                <Title>문제 해결</Title>
                <Detail>{profileData.solved}</Detail>
              </Content>
              <Content>
                <Title>매칭 수</Title>
                <Detail>{profileData.matchingCount}</Detail>
              </Content>
            </WrapContent>
          </Lower>
        </ProfileWrapper>
      </Container>
    </div>
  )
}

export default ProfilePage

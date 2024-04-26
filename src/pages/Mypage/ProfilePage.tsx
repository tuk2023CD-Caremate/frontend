import Header2 from '../../components/Header2.tsx'
import Userbar from '../../components/sidebar/Userbar.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import ProfileImg from '../../assets/images/profile.png'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect } from 'react'
import { useApiUrlStore, useUserInfoStore } from '../../store/store.ts'

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
  const { userInfo, setUserInfo } = useUserInfoStore()

  const getProfile = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })

      setUserInfo(response.data)
      localStorage.setItem('id', JSON.stringify(userInfo.id))
    } catch (error) {}
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <Userbar />
        <ProfileWrapper>
          <Upper>
            <NameWrapper>
              <Profile src={ProfileImg} />
              <Role>{userInfo.part}</Role>
              <Nickname>{userInfo.nickname}</Nickname>
            </NameWrapper>
            <Modify>수정하기</Modify>
          </Upper>
          <Lower>
            <WrapContent>
              <Content>
                <Title>이름</Title>
                <Detail>{userInfo.name}</Detail>
              </Content>
              <Content>
                <Title>전화번호</Title>
                <Detail>{userInfo.tel}</Detail>
              </Content>
            </WrapContent>
            <WrapContent>
              <Content>
                <Title>PR</Title>
                <Detail>{userInfo.publicRelations}</Detail>
              </Content>
              <Content>
                <Title>Blog</Title>
                <Detail>{userInfo.blogUrl}</Detail>
              </Content>
            </WrapContent>
            <WrapContent>
              <Content>
                <Title>좋아요</Title>
                <Detail>{userInfo.heart}</Detail>
              </Content>
              <Content>
                <Title>평점</Title>
                <Detail>{userInfo.starAverage}</Detail>
              </Content>
            </WrapContent>
            <WrapContent>
              <Content>
                <Title>문제 해결</Title>
                <Detail>{userInfo.solved}</Detail>
              </Content>
              <Content>
                <Title>매칭 수</Title>
                <Detail>{userInfo.matchingCount}</Detail>
              </Content>
            </WrapContent>
          </Lower>
        </ProfileWrapper>
      </Container>
    </div>
  )
}

export default ProfilePage

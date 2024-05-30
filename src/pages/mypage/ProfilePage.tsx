import Header from '../../components/Header.tsx'
import Profilebar from '../../components/sidebar/Profilebar.tsx'
import Navbar from '../../components/Navbar.tsx'
import ProfileImg from '../../assets/images/profile.png'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useApiUrlStore, useProfileDataStore } from '../../store/store.ts'
import Skeleton from '../../components/skeleton/MyPageSkeletonUI.tsx'

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 25rem);
  min-height: 48.75rem;
  border-left: 1px solid #d8d8d8;
`

const Upper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: calc(100% - 12.5rem);
  padding-left: 3rem;
  padding-right: 4.375rem;
`
const ProfileContent = styled.div`
  margin: 1.25rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 1.25rem;
  width: 31.25rem;
  height: 40rem;
`

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const User = styled.div`
  width: 28rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e8e8e8;
`

const InfoContent = styled.div`
  height: 25rem;
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
`

const Profile = styled.img`
  width: 15rem;
  margin: -1.25rem 0 -1.25rem 0;
`

const Role = styled.div`
  font-size: 2rem;
  font-weight: 300;
`

const Nickname = styled.div`
  font-size: 2.5rem;
  margin-right: 1.25rem;
  font-weight: 400;
`

const Modify = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9rem;
  height: 3rem;
  border-radius: 5px;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 1.25rem;
  margin-top: 1.25rem;
  cursor: pointer;
`

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`

const ReviewContent = styled.div`
  margin: 1.25rem 1.25rem 2rem 1.25rem;
  display: flex;
  flex-direction: column;
`
const MatchingContent = styled.div`
  margin: 1.25rem;
  display: flex;
  flex-direction: column;
`
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 1.25rem 0rem 0.625rem 0rem;
`
const Category = styled.div`
  border-bottom: 1px solid #e8e8e8;
  font-size: 2rem;
  font-weight: bold;
  width: 25rem;
  margin-left: -1.25rem;
  padding-bottom: 0.625rem;
  font-weight: 600;
`
const Title = styled.div`
  font-size: 1.75rem;
  font-weight: 500;
  margin-right: 1.25rem;
`

const Detail = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
`

function ProfilePage() {
  const { apiUrl } = useApiUrlStore()
  const { profileData, setProfileData } = useProfileDataStore()
  const [loading, setLoading] = useState(true)

  const getProfile = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setLoading(false)
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
        <Profilebar />
        <ProfileWrapper>
          <Upper>
            <ProfileContent>
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  <NameWrapper>
                    <Profile src={ProfileImg} />
                    <User>
                      <Nickname>{profileData.nickname}</Nickname>
                      <Role>{profileData.part}</Role>
                    </User>
                  </NameWrapper>
                  <InfoContent>
                    <Content>
                      <Title>이름</Title>
                      <Detail>{profileData.name}</Detail>
                    </Content>
                    <Content>
                      <Title>전화번호</Title>
                      <Detail>{profileData.tel}</Detail>
                    </Content>
                    <Content>
                      <Title>PR</Title>
                      <Detail>{profileData.publicRelations}</Detail>
                    </Content>
                    <Content>
                      <Title>Blog</Title>
                      <Detail>{profileData.blogUrl}</Detail>
                    </Content>
                  </InfoContent>
                </>
              )}
            </ProfileContent>
            <Lower>
              <ReviewContent>
                <Category>리뷰</Category>
                <Content>
                  <Title>좋아요</Title>
                  <Detail>{profileData.heart}</Detail>
                </Content>
                <Content>
                  <Title>평점</Title>
                  <Detail>{profileData.starAverage}</Detail>
                </Content>
              </ReviewContent>
              <MatchingContent>
                <Category>매칭기록</Category>
                <Content>
                  <Title>문제 해결</Title>
                  <Detail>{profileData.solved}</Detail>
                </Content>
                <Content>
                  <Title>매칭 수</Title>
                  <Detail>{profileData.matchingCount}</Detail>
                </Content>
              </MatchingContent>
            </Lower>
            <Modify>수정하기</Modify>
          </Upper>
        </ProfileWrapper>
      </Container>
    </div>
  )
}

export default ProfilePage

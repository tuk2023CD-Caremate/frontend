import Header from '../../components/Header.tsx'
import Profilebar from '../../components/sidebar/Profilebar.tsx'
import Navbar from '../../components/Navbar.tsx'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useApiUrlStore, useProfileDataStore,useLoadingStore, getImageImageUrl } from '../../store/store.ts'
import Skeleton from '../../components/skeleton/MyPageSkeletonUI.tsx'
import defaultImg from '../../assets/images/profileimg.png'


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
  margin: 0 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 1.25rem;
  width: 36rem;
  min-height: min-content;
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
  min-height: min-content;
  margin: 1.5rem 1.5rem 1.5rem 3.5rem;
  display: flex;
  flex-direction: column;
`

const Profile = styled.img`
width: 12rem;
height: 12rem;
border-radius: 50%;
margin: 1rem;
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
  margin-top: 0.625rem;
`
const Category = styled.div`
  border-bottom: 1px solid #e8e8e8;
  font-size: 2rem;
  font-weight: bold;
  width: 25rem;
  margin-left: -1.25rem;
  padding-bottom: 0.625rem;
  font-weight: bolder;
`
const Title = styled.div`
  width: 8rem;
  font-size: 1.55rem;
  font-weight: bold;
  margin-right: 1.25rem;
`

const Detail = styled.div`
  width: 22rem;
  font-size: 1.5rem;
  font-weight: 300;
`

function ProfilePage() {
  const { apiUrl } = useApiUrlStore()
  const { profileData, setProfileData } = useProfileDataStore()
  const {loading, setLoading} = useLoadingStore()
  const profileImg = getImageImageUrl(profileData.imageUrl, defaultImg);

  const getProfile = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setLoading(true)
      setProfileData(response.data)

      const profileurl = response.data.imageUrl
      const nickname = response.data.nickname

      localStorage.setItem('profileUrl', profileurl)
      localStorage.setItem('nickname', nickname)

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
                    <>
                      <NameWrapper>
                      <Profile src={profileImg} />
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
                          <Title>상세분야</Title>
                          <Detail>{profileData.interests}</Detail>
                        </Content>
                        <Content>
                          <Title>전문분야</Title>
                          <Detail>{profileData.expertiseField}</Detail>
                        </Content>
                        <Content>
                          <Title>직업</Title>
                          <Detail>{profileData.job}</Detail>
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
                  ) : (<Skeleton/>)
                  }
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
                <Link to="/mypage/update">
                <Modify>수정하기</Modify>
                </Link>
              </Upper>
            </ProfileWrapper>
         </Container>
    </div>
  );
};

export default ProfilePage;

import Header2 from '../../components/Header2.tsx'
import MypageBar from '../../components/sidebar/Mypagebar.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import ProfileImg from '../../assets/images/profile.png'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface ProfileData {
  part: string
  nickname: string
  email: string
  interests: string
}

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
  margin: 10px;
  padding-left: 50px;
  padding-right: 50px;
`
const EmailWrapper = styled.div`
  width: fit-content;
  margin: 20px;
  margin-top: 30px;
`

const Email = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 10px;
`

const EmailDetail = styled.div`
  font-size: 28px;
  margin: 10px;
`

const InterestsWrapper = styled.div`
  margin: 20px;
  width: fit-content;
`

const Interests = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 10px;
`

const InterestsDetail = styled.div`
  font-size: 28px;
  margin: 10px;
`

function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    part: '',
    nickname: '',
    email: '',
    interests: '',
  })

  const getProfile = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get('http://localhost:8080/api/user', {
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
      <Header2 />
      <Navbar2 />
      <Container>
        <MypageBar />
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
            <EmailWrapper>
              <Email>이메일</Email>
              <EmailDetail>{profileData.email}</EmailDetail>
            </EmailWrapper>
            <InterestsWrapper>
              <Interests>관심분야</Interests>
              <InterestsDetail>{profileData.interests}</InterestsDetail>
            </InterestsWrapper>
          </Lower>
        </ProfileWrapper>
      </Container>
    </div>
  )
}

export default ProfilePage

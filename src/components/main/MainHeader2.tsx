import styled from 'styled-components'
import LogoImg from '../../assets/images/StudyMate.svg'
import ProfileImg from '../../assets/images/profile.png'
import axios from 'axios'
import { useApiUrlStore } from '../../store/store'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  position: fixed;
  z-index: 3;
`
const Wrap = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
  height: 7rem;
  padding-left: 8.75rem;
  padding-right: 8.75rem;
`

const Logo = styled.img`
  width: 236px;
  cursor: pointer;
`

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Profile = styled.img`
  width: 12.5rem;
`

const NickName = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0.625rem;
`

const Sir = styled.div`
  font-size: 1.25rem;
  margin: 0.5rem;
`

const SignOut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  background-color: #dcdcdc;
  width: 7.5rem;
  height: 3rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 2rem;
  cursor: pointer;
`

export default function MainHeader2() {
  const { apiUrl } = useApiUrlStore()
  const navigate = useNavigate()
  const [nickname, setNickname] = useState<string>('')

  const getNickname = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      if (!access) {
        console.error('Access token not found in localStorage')
        return
      }
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setNickname(response.data.nickname)
    } catch (error) {
      console.error('Error fetching nickname:', error)
    }
  }

  useEffect(() => {
    getNickname()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/')
  }

  return (
    <Container>
      <Wrap>
        <Logo src={LogoImg} onClick={() => navigate('/')} />
        <RightWrapper>
          <Profile src={ProfileImg} />
          <NickName>{nickname}</NickName>
          <Sir>님</Sir>
          <SignOut onClick={handleLogout}>로그아웃</SignOut>
        </RightWrapper>
      </Wrap>
    </Container>
  )
}

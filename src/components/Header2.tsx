import styled from 'styled-components'
import LogoImg from '../assets/images/StudyMate.svg'
import ProfileImg from '../assets/images/profile.png'
import axios from 'axios'
import { useApiUrlStore } from '../store/store'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  padding-left: 8.75rem;
  padding-right: 8.75rem;
`

const Logo = styled.img`
  width: 15rem;
  cursor: pointer;
`

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Profile = styled.img`
  width: 6.25rem;
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

export default function Header2() {
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

  const handleLogout = async () => {
    const access = localStorage.getItem('accessToken')
    const refresh = localStorage.getItem('refreshToken')
    if (!access || !refresh) {
      console.error('Access token or refresh token not found in localStorage')
      return
    }
    try {
      const response = await axios.post(
        `${apiUrl}/logout`,
        {
          accessToken: access,
          refreshToken: refresh,
        },
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )

      console.log(response.data)
      alert('로그아웃 성공')
    } catch (error) {
      console.error('Logout failed:', error)
    }

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/')
  }
  return (
    <Container>
      <Logo src={LogoImg} onClick={() => navigate('/')} />
      <RightWrapper>
        <Profile src={ProfileImg} />
        <NickName>{nickname}</NickName>
        <Sir>님</Sir>
        <SignOut onClick={handleLogout}>로그아웃</SignOut>
      </RightWrapper>
    </Container>
  )
}
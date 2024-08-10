import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25rem;
  height: 31rem;
  display: flex;
  flex-direction: column;
`

const Profile = styled(Link)`
  width: 15rem;
  font-size: 1.5rem;
  display: flex;
  margin-top: 3rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.25rem 0rem 1.25rem 2.5rem;
  border-radius: 1.25rem;
`
const Notification = styled(Link)`
  width: 15rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.25rem 0rem 1.25rem 2.5rem;
  border-radius: 1.25rem;
`

const MyPost = styled(Link)`
  width: 15rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.25rem 0rem 1.25rem 2.5rem;
  border-radius: 1.25rem;
`

const MatchingList = styled(Link)`
  width: 15rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.25rem 0rem 1.25rem 2.5rem;
  border-radius: 1.25rem;
`

export default function Userbar() {
  const location = useLocation()

  return (
    <Container>
      <Profile
        to="/mypage/profile"
        style={{
          backgroundColor: location.pathname.includes('/mypage/profile') ? '#E8DCF2' : 'inherit',
          color: location.pathname.includes('/mypage/profile') ? '#650FA9' : 'inherit',
          fontWeight: location.pathname.includes('/mypage/profile') ? 'bold' : 'inherit',
        }}>
        프로필
      </Profile>
      <Notification
        to="/mypage/notification"
        style={{
          backgroundColor: location.pathname === '/mypage/notification' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/mypage/notification' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/mypage/notification' ? 'bold' : 'inherit',
        }}>
        알림
      </Notification>
      <MyPost
        to="/mypage/mypost"
        style={{
          backgroundColor: location.pathname === '/mypage/mypost' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/mypage/mypost' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/mypage/mypost' ? 'bold' : 'inherit',
        }}>
        내 게시글
      </MyPost>
      <MatchingList
        to="/mypage/questionlist"
        style={{
          backgroundColor: location.pathname === '/mypage/questionlist' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/mypage/questionlist' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/mypage/questionlist' ? 'bold' : 'inherit',
        }}>
        내 질문
      </MatchingList>
    </Container>
  )
}

import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25rem;
  height: 48rem;
  border-right: 1px solid #d8d8d8;
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
  padding: 1.25rem 0px 1.25rem 2.5rem;
  border-radius: 1.25rem;
`
const Notification = styled(Link)`
  width: 15rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.25rem 0px 1.25rem 2.5rem;
  border-radius: 1.25rem;
`

const MyPost = styled(Link)`
  width: 15rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.25rem 0px 1.25rem 2.5rem;
  border-radius: 1.25rem;
`

const MatchingList = styled(Link)`
  width: 15rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.25rem 0px 1.25rem 2.5rem;
  border-radius: 1.25rem;
`

export default function Userbar() {
  const location = useLocation()

  return (
    <Container>
      <Profile
        to="/mypage"
        style={{
          backgroundColor: location.pathname === '/mypage' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/mypage' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/mypage' ? 'bold' : 'inherit',
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
        내 게시물
      </MyPost>
      <MatchingList
        to="/mypage/matchinglist"
        style={{
          backgroundColor: location.pathname === '/mypage/matchinglist' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/mypage/matchinglist' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/mypage/matchinglist' ? 'bold' : 'inherit',
        }}>
        매칭 기록
      </MatchingList>
    </Container>
  )
}

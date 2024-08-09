import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  padding-left: 22rem;
  padding-right: 22rem;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
`

const Navigator = styled(Link)`
  font-size: 1.4rem;
  padding: 1.25rem 2.5rem 1.25rem 2.5rem;
  border-radius: 1rem;
  text-decoration: none;
  color: inherit;
`

export default function Navbar() {
  const location = useLocation()

  const isMypage = location.pathname.includes('/mypage')
  const isPost = location.pathname.includes('/posts')

  return (
    <Container>
      <Navigator
        to="/matching"
        style={{
          backgroundColor: location.pathname.includes('/matching') ? '#E8DCF2' : 'inherit',
          color: location.pathname.includes('/matching') ? '#650FA9' : 'inherit',
          fontWeight: location.pathname.includes('/matching') ? 'bold' : 'inherit',
        }}>
        온라인 매칭
      </Navigator>
      <Navigator
        to="/posts"
        style={{
          backgroundColor: isPost ? '#E8DCF2' : 'inherit',
          color: isPost ? '#650FA9' : 'inherit',
          fontWeight: isPost ? 'bold' : 'inherit',
        }}>
        게시판
      </Navigator>
      <Navigator
        to="/calender"
        style={{
          backgroundColor: location.pathname === '/calender' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/calender' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/calender' ? 'bold' : 'inherit',
        }}>
        스터디 기록
      </Navigator>
      <Navigator
        to="/chats"
        style={{
          backgroundColor: location.pathname.includes('/chats') ? '#E8DCF2' : 'inherit',
          color: location.pathname.includes('/chats') ? '#650FA9' : 'inherit',
          fontWeight: location.pathname.includes('/chats') ? 'bold' : 'inherit',
        }}>
        채팅
      </Navigator>
      <Navigator
        to="/mypage/profile"
        style={{
          backgroundColor: isMypage ? '#E8DCF2' : 'inherit',
          color: isMypage ? '#650FA9' : 'inherit',
          fontWeight: isMypage ? 'bold' : 'inherit',
        }}>
        마이 페이지
      </Navigator>
    </Container>
  )
}

import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 700px);
  height: 109px;
  padding-left: 350px;
  padding-right: 350px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
`

const Offline = styled(Link)`
  font-size: 22px;
  text-decoration: none;
  color: inherit;
`
const Online = styled(Link)`
  font-size: 22px;
  text-decoration: none;
  color: inherit;
`
const Post = styled(Link)`
  font-size: 22px;
  text-decoration: none;
  color: inherit;
`
const StudyList = styled(Link)`
  font-size: 22px;
  text-decoration: none;
  color: inherit;
`
const Mypage = styled(Link)`
  font-size: 22px;
  padding: 20px 40px 20px 40px;
  border-radius: 15px;
  text-decoration: none;
  color: inherit;
`

export default function Navbar2() {
  const location = useLocation()

  const isMypage = location.pathname.includes('/mypage')

  return (
    <Container>
      <Offline
        to="/offline"
        style={{
          backgroundColor: location.pathname === '/offline' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/offline' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/offline' ? 'bold' : 'inherit',
        }}>
        오프라인 매칭
      </Offline>
      <Online
        to="/online"
        style={{
          backgroundColor: location.pathname === '/online' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/online' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/online' ? 'bold' : 'inherit',
        }}>
        온라인 매칭
      </Online>
      <Post
        to="/post"
        style={{
          backgroundColor: location.pathname === '/post' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/post' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/post' ? 'bold' : 'inherit',
        }}>
        게시판
      </Post>
      <StudyList
        to="/study"
        style={{
          backgroundColor: location.pathname === '/study' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/study' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/study' ? 'bold' : 'inherit',
        }}>
        스터디 기록
      </StudyList>
      <Mypage
        to="/mypage"
        style={{
          backgroundColor: isMypage ? '#E8DCF2' : 'inherit',
          color: isMypage ? '#650FA9' : 'inherit',
          fontWeight: isMypage ? 'bold' : 'inherit',
        }}>
        마이 페이지
      </Mypage>
    </Container>
  )
}

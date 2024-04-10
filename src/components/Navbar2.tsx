import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 109px;
  padding-left: 350px;
  padding-right: 350px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
`

const Online = styled(Link)`
  font-size: 22px;
  padding: 20px 40px 20px 40px;
  border-radius: 15px;
  text-decoration: none;
  color: inherit;
`
const Post = styled(Link)`
  font-size: 22px;
  padding: 20px 40px 20px 40px;
  border-radius: 15px;
  text-decoration: none;
  padding: 20px 40px 20px 40px;
  border-radius: 15px;
  color: inherit;
`
const StudyList = styled(Link)`
  font-size: 22px;
  padding: 20px 40px 20px 40px;
  border-radius: 15px;
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
  const isPost = location.pathname.includes('/posts')

  return (
    <Container>
      <Online
        to="/online"
        style={{
          backgroundColor: location.pathname.includes('/online') ? '#E8DCF2' : 'inherit',
          color: location.pathname.includes('/online') ? '#650FA9' : 'inherit',
          fontWeight: location.pathname.includes('/online') ? 'bold' : 'inherit',
        }}>
        온라인 매칭
      </Online>
      <Post
        to="/posts"
        style={{
          backgroundColor: isPost ? '#E8DCF2' : 'inherit',
          color: isPost ? '#650FA9' : 'inherit',
          fontWeight: isPost ? 'bold' : 'inherit',
        }}>
        게시판
      </Post>
      <StudyList
        to="/calender"
        style={{
          backgroundColor: location.pathname === '/calender' ? '#E8DCF2' : 'inherit',
          color: location.pathname === '/calender' ? '#650FA9' : 'inherit',
          fontWeight: location.pathname === '/calender' ? 'bold' : 'inherit',
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

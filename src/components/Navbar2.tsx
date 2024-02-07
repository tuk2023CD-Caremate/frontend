import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 700px);
  height: 109px;
  padding-left: 350px;
  padding-right: 350px;
  border: 2px solid;
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
  text-decoration: none;
  color: inherit;
`

export default function Navbar2() {
  return (
    <Container>
      <Offline to="/offline">오프라인 매칭</Offline>
      <Online to="/online">온라인 매칭</Online>
      <Post to="/post">게시판</Post>
      <StudyList to="/study">스터디 기록</StudyList>
      <Mypage to="/post">마이 페이지</Mypage>
    </Container>
  )
}

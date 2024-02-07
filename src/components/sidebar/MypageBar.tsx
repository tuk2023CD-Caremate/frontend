import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  width: 400px;
  height: 780px;
  border-right: 2px solid;
  display: flex;
  flex-direction: column;
`

const Profile = styled(Link)`
  width: 240px;
  height: 55px;
  font-size: 25px;
  display: flex;
  margin-top: 50px;
  align-items: center;
  border: 2px solid;
  text-decoration: none;
  color: inherit;
`
const Notification = styled(Link)`
  width: 240px;
  height: 55px;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`

const MyPost = styled(Link)`
  width: 240px;
  height: 55px;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`

const MatchingList = styled(Link)`
  width: 240px;
  height: 55px;
  font-size: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  text-decoration: none;
  color: inherit;
`

export default function MypageBar() {
  return (
    <Container>
      <Profile to="/mypage">프로필</Profile>
      <Notification to="/mypage/notification">알림</Notification>
      <MyPost to="/mypage/mypost">내 게시물</MyPost>
      <MatchingList to="/mypage/matchinglist">매칭 기록</MatchingList>
    </Container>
  )
}

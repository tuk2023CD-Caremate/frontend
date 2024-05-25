import Header2 from '../../components/Header2.tsx'
import Userbar from '../../components/sidebar/Userbar.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import CommentImg from '../../assets/images/comment.png'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 25rem);
`

const Notification = styled.div`
  display: flex;
  align-items: center;
  background-color: #faf3ff;
  width: 100%;
  height: 7rem;
`
const Type = styled.img`
  width: 4rem;
  margin: 2.5rem;
`

const PageName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const Context = styled.div`
  font-size: 1.5rem;
  margin-left: 2.5rem;
`
function NotificationPage() {
  const notifications = [
    { id: 1, type: CommentImg, pageName: '게시판', context: '김선재 님이 댓글을 작성하였습니다.' },
    { id: 2, type: CommentImg, pageName: '게시판', context: '김선재 님이 댓글을 작성하였습니다.' },
    { id: 3, type: CommentImg, pageName: '게시판', context: '김선재 님이 댓글을 작성하였습니다.' },
    { id: 4, type: CommentImg, pageName: '게시판', context: '김선재 님이 댓글을 작성하였습니다.' },
    { id: 5, type: CommentImg, pageName: '게시판', context: '김선재 님이 댓글을 작성하였습니다.' },
    { id: 6, type: CommentImg, pageName: '게시판', context: '김선재 님이 댓글을 작성하였습니다.' },
    { id: 7, type: CommentImg, pageName: '게시판', context: '김선재 님이 댓글을 작성하였습니다.' },
    { id: 8, type: CommentImg, pageName: '게시판', context: '김선재 님이 댓글을 작성하였습니다.' },
  ]

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <Userbar />
        <NotificationWrapper>
          {notifications.map((notification) => (
            <Notification key={notification.id}>
              <Type src={notification.type}></Type>
              <PageName>{notification.pageName}</PageName>
              <Context>{notification.context}</Context>
            </Notification>
          ))}
        </NotificationWrapper>
      </Container>
    </div>
  )
}

export default NotificationPage

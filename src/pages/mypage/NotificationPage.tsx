import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoNotificationsOffSharp } from 'react-icons/io5'
import styled from 'styled-components'
import CommentImg from '../../assets/images/commentIcon.png'
import LikeImg from '../../assets/images/heartIcon.png'
import MatchingImg from '../../assets/images/matchingIcon.png'
import Header from '../../components/Header.tsx'
import Navbar from '../../components/Navbar.tsx'
import Profilebar from '../../components/sidebar/Profilebar.tsx'
import { useApiUrlStore } from '../../store/store.ts'

interface NotificationList {
  id: number
  content: string
  createdAt: string
}

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 25rem);
  min-height: 48.75rem;
  border-left: 1px solid #d8d8d8;
`

const Notification = styled.div`
  display: flex;
  align-items: center;
  background-color: #faf3ff;
  width: 100%;
  height: 7rem;
`

const Type = styled.img`
  width: 3.75rem;
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

const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-right: 2rem;
  width: 9rem;
  height: 3rem;
  border-radius: 10px;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #bdbdbd;
  }
`

const NoNotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
`

const Text = styled.div`
  display: flex;
  font-size: 1.6rem;
  color: #9b9b9b;
`

function NotificationPage() {
  const { apiUrl } = useApiUrlStore()
  const [notifications, setNotifications] = useState<NotificationList[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.get(`${apiUrl}/notification`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setNotifications(response.data)
      } catch (error) {
        console.error('Failed to fetch notifications', error)
      }
    }

    fetchNotifications()
  }, [apiUrl])

  const getNotificationIcon = (content: string) => {
    if (content.includes('댓글')) {
      return CommentImg
    } else if (content.includes('좋아요')) {
      return LikeImg
    } else if (content.includes('매칭')) {
      return MatchingImg
    }
  }

  const getNotificationPageName = (content: string) => {
    if (content.includes('댓글') || content.includes('좋아요')) {
      return '게시판'
    } else if (content.includes('매칭')) {
      return '매칭'
    }
  }

  const handleDeleteNofificationList = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      await axios.delete(`${apiUrl}/notification`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      alert('알림이 삭제되었습니다')
      location.reload()
    } catch (error) {
      console.error('Failed to fetch notifications', error)
    }
  }

  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <Profilebar />
        <NotificationWrapper>
          <DeleteBtn onClick={handleDeleteNofificationList}>알림 삭제</DeleteBtn>
          {notifications.length === 0 ? (
            <NoNotificationsList>
              <IoNotificationsOffSharp size={130} />
              <Text>알림이 없습니다.</Text>
            </NoNotificationsList>
          ) : (
            notifications.map((notification) => (
              <Notification key={notification.id}>
                <Type src={getNotificationIcon(notification.content)} />
                <PageName>{getNotificationPageName(notification.content)}</PageName>
                <Context>{notification.content}</Context>
              </Notification>
            ))
          )}
        </NotificationWrapper>
      </Container>
    </div>
  )
}

export default NotificationPage

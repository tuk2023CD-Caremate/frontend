import styled from 'styled-components'
import { IoMdStar, IoMdHeartEmpty, IoIosContacts } from 'react-icons/io'
import {
  useApiUrlStore,
  useIsAiBasedStore,
  useReviewListStore,
  useUserListStore,
} from '../../store/store'
import axios from 'axios'
import ProfileIMG from '../../assets/images/김영한.png'
import { useEffect, useState } from 'react'
import ReviewModal from './ReviewModal'
import { useNavigate } from 'react-router-dom'
import Loading from '../../assets/images/Loading.gif'

interface TruncatedContentProps {
  expanded: boolean
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rem;
  min-height: 22.5rem;
  border: 2px solid #d8d8d8;
  &:hover {
    border: 2px solid #650fa9;
  }
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1.25rem;
`

const LeftWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 3;
  margin-right: 3rem;
`

const ImgWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  margin-top: 1.25rem;
`

const InfoWrap = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`

const Section = styled.div`
  display: flex;
  align-items: center;
`
const BigTitle = styled.div`
  display: flex;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0.5rem;
`

const BigContent = styled.div`
  display: flex;
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem;
`

const Review = styled.div`
  display: flex;
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem;
  text-decoration: underline;
  cursor: pointer;
`

const Title = styled.div`
  display: flex;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.5rem;
`

const Content = styled.div`
  display: flex;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.5rem;
`

const TruncatedContent = styled.div<TruncatedContentProps>`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.expanded ? 'none' : '2')};
  max-height: ${(props) => (props.expanded ? 'none' : '3.6em')};
  cursor: pointer;
`

const Detail = styled.div`
  display: flex;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.5rem;
  cursor: pointer;
`

const RightWrap = styled.div`
  display: flex;
  width: 100%;
  height: 22rem;
  flex: 2;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Upper = styled.div`
  width: 27.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ReputationWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const LikeWrap = styled.div`
  display: flex;
`

const Lower = styled.div`
  width: 27.5rem;
  display: flex;
`

const RequestBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  font-size: 2rem;
  font-weight: bold;
  width: inherit;
  height: 3.75rem;
  background-color: #e8dcf2;
  color: #650fa9;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`

const LoadingIMG = styled.div`
  margin-top: 5rem;
`

function SelectUser(id: any) {
  const { apiUrl } = useApiUrlStore()
  const { userList, setUserList } = useUserListStore()
  const { setReviewList } = useReviewListStore()
  const { isAiBased } = useIsAiBasedStore()
  const [clickedUsername, setClickedUsername] = useState<string>() // 클릭한 유저 정보

  const [expandedUsers, setExpandedUsers] = useState<{ [key: number]: boolean }>({}) // 각 유저의 클릭 여부 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({})

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // 질문 폼 정보 디코딩
  const encodedValue = JSON.stringify(id)
  const decodedValue = decodeURIComponent(encodedValue)
  const parsedObject = JSON.parse(decodedValue)
  const question_id = parsedObject.id

  // // 멘토 리스트 조회
  // const getUserList = async () => {
  //   const access = localStorage.getItem('accessToken')
  //   if (access) {
  //     try {
  //       const response = await axios.get(`${apiUrl}/matching/${question_id}`, {
  //         headers: { Authorization: `Bearer ${access}` },
  //       })
  //       setUserList(response.data.memberList)
  //       console.log('Success ', response.data)
  //     } catch (error) {
  //       console.error('Error ', error)
  //     }
  //   } else {
  //     console.error('Access token not found.')
  //   }
  // }

  // 멘토 리스트 조회(KMP, AI)
  const getUserList = async () => {
    const access = localStorage.getItem('accessToken')
    const urlPath = isAiBased ? '/matching/keyword/ai/' : '/matching/keyword/'
    setIsLoading(true) // 로딩 시작

    if (access) {
      try {
        const response = await axios.get(`${apiUrl}${urlPath}${question_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setUserList(response.data)
        console.log('Success ', response.data)
      } catch (error) {
        console.error('Error ', error)
      } finally {
        setIsLoading(false) // 로딩 종료
      }
    } else {
      console.error('Access token not found.')
      setIsLoading(false) // 로딩 종료
    }
  }

  // 카카오 알림톡 매칭 요청
  const onRequestMatching = async (mentorId: number) => {
    const access = localStorage.getItem('accessToken')
    if (access) {
      try {
        const response = await axios.get(`${apiUrl}/matching/kakao/${question_id}/${mentorId}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        console.log('매칭요청발송')
        console.log(response.data)
      } catch (error) {
        console.error('Error ', error)
      }
    } else {
      console.error('Access token not found.')
    }
  }

  useEffect(() => {
    getUserList()
  }, [])

  const handleRequestMatching = (mentorId: number) => {
    onRequestMatching(mentorId)
    alert('요청되었습니다.')
    navigate('/chats')
    // 매칭 요청이 성공했을 때의 추가적인 로직
  }

  // 해당 멘토 리뷰 조회
  const getReviewList = async (mentorId: number) => {
    const access = localStorage.getItem('accessToken')
    if (access) {
      try {
        const response = await axios.get(`${apiUrl}/matching/review/${mentorId}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        console.log(response.data)
        setReviewList(response.data)
      } catch (error) {
        console.error('Error ', error)
      }
    } else {
      console.error('Access token not found.')
    }
  }

  useEffect(() => {}, [])

  const handleGetReviewList = (mentorId: number) => {
    getReviewList(mentorId)
  }

  // 유저를 클릭했을 때 해당 유저의 클릭 여부 상태를 변경
  const handleUserClick = (userId: number) => {
    setExpandedUsers((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId], // 해당 유저의 상태를 토글
    }))
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // 텍스트 확장/축소를 토글하는 함수
  const toggleExpand = (id: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id], // 현재 상태를 반전
    }))
  }

  return (
    <div>
      {isLoading ? (
        <LoadingIMG>
          <img src={Loading} width={400} />
        </LoadingIMG>
      ) : (
        userList.map((user) => (
          <Container key={user.id}>
            <LeftWrap>
              <ImgWrap>
                <ProfileImg src={user.imageUrl} />
                <BigContent>{user.matchingPercent ? `${user.matchingPercent}%` : ''}</BigContent>
              </ImgWrap>
              <InfoWrap>
                <Section>
                  <BigTitle>{user.name}</BigTitle>
                  <BigContent>{user.nickname}</BigContent>
                  <IoIosContacts size={32} />
                  <Content>{user.heart}</Content>
                </Section>
                <Section>
                  <Title>분야</Title>
                  <Content>{user.interests}</Content>
                  {expandedUsers[user.id] ? (
                    <Detail onClick={() => handleUserClick(user.id)}>{user.expertiseField}</Detail>
                  ) : (
                    <Detail onClick={() => handleUserClick(user.id)}>
                      {user.expertiseField.length > 8
                        ? `${user.expertiseField.slice(0, 8)}...`
                        : user.expertiseField}
                    </Detail>
                  )}
                </Section>
                <Section>
                  <Title>직업</Title>
                  <Content>{user.job}</Content>
                </Section>
                <Section>
                  <Title>이메일</Title>
                  <Content>{user.email}</Content>
                </Section>
                <Section>
                  <Title>Blog</Title>
                  <Content>{user.blogUrl}</Content>
                </Section>
                <Section>
                  <TruncatedContent
                    onClick={() => toggleExpand(user.id)}
                    expanded={expandedDescriptions[user.id]}>
                    {user.publicRelations}
                  </TruncatedContent>
                </Section>
              </InfoWrap>
            </LeftWrap>
            <RightWrap>
              <Upper>
                <ReputationWrap>
                  <Section>
                    <IoMdStar size={40} />
                    <BigContent>{user.starAverage}</BigContent>
                    <Content>/</Content>
                    <Review
                      onClick={() => {
                        openModal()
                        handleGetReviewList(user.id)
                        setClickedUsername(user.name)
                      }}>
                      리뷰 {user.reviewCount}
                    </Review>
                  </Section>
                </ReputationWrap>
                <LikeWrap>
                  <Content> {user.heart}</Content>
                  <IoMdHeartEmpty size={40} />
                </LikeWrap>
              </Upper>
              <Lower>
                <RequestBtn onClick={() => handleRequestMatching(user.id)}>매칭 요청</RequestBtn>
              </Lower>
            </RightWrap>
            {/* 리뷰 모달창 */}
            {clickedUsername && (
              <ReviewModal isOpen={isModalOpen} onClose={closeModal} userName={clickedUsername} />
            )}
          </Container>
        ))
      )}
    </div>
  )
}

export default SelectUser

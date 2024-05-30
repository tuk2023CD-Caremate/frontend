import Header from '../../components/Header.tsx'
import Profilebar from '../../components/sidebar/Profilebar.tsx'
import Navbar from '../../components/Navbar.tsx'
import styled from 'styled-components'
import DividerImg from '../../assets/images/divider1.png'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  useApiUrlStore,
  useQuestionListStore,
  useLoadingStore
} from '../../store/store.ts'
import SkeletonUI from '../../components/skeleton/SkeletonUI.tsx'

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`

const MatchingListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 25rem);
  min-height: 48.75rem;
  border-left: 1px solid #d8d8d8;
`

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
  width: calc(100% - 6.25rem);
  height: 6.25rem;
  padding-left: 1.25rem;
  border: 1px solid #d8d8d8;
  margin-bottom: 2.5rem;
`

const MyPost = styled.div`
  display: flex;
  padding: 1.25rem 0rem 0rem 1.25rem;
  width: calc(100% - 1.25rem);
  height: 20rem;
  border: 1px solid #d8d8d8;
  flex-direction: column;
`

const BoardType = styled.div`
 font-size: 1.75rem;
  font-weight: bold;
  color: #086ab5;
  margin: 0.625rem;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0.625rem;
`

const Context = styled.div`
  font-size: 1.5rem;
  margin: 0 0.625rem 0.625rem 0.625rem;
`

const Tag = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #650fa9;
  margin: 0.625rem;
`

const FooterWrap = styled.div`
   display: flex;
  margin: 0.625rem;
  align-items: center;
`

const IsSolved = styled.div`
  font-size: 1.5rem;
  color: #9b9b9b;
  font-weight: bold;
`

const Divider = styled.img`
  width: 2px;
  height: 1.25rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
`
const Participation = styled.div`
  font-size: 1.5rem;
  color: #9b9b9b;
`

const DateCreated = styled.div`
  font-size: 1.5rem;
  color: #9b9b9b;
`

function MatchingListPage() {
  const {apiUrl} = useApiUrlStore()
  const {loading, setLoading} = useLoadingStore()
  const {questionList, setQuestionList } = useQuestionListStore()
  const [_nickname, setNickName] = useState<string>('')

  //내가 작성한 질문 전체조회
  const getQuestion = async (nickname : string) => {
    try {
      const access = localStorage.getItem('accessToken')
      if (!access) {
        window.alert('로그인을해주세요.')
        return
      }
      const response = await axios.get(`${apiUrl}/question`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setQuestionList(response.data)
      setLoading(true)

      const MyQuestions = response.data.filter((post: { writer: string }) => post.writer === nickname) //유저의 nickname 과 작성자의 wirter가 일치하는 질문
      setQuestionList(MyQuestions.reverse())
     
    } catch (error) {
      alert('Error while fetching post')
    }
  }
  const getNickname = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setNickName(response.data.nickname)
      await getQuestion(response.data.nickname) //nickname 가져온 후 getQuestion
    } catch (error) {
      alert('Error while fetching post')
    }
  }

  useEffect(() => {
    getNickname()
  }, [])

  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <Profilebar />
        <MatchingListWrapper>
          <PageTitle>내가 작성한 질문</PageTitle>
          {loading ? (
            questionList.map((list, index) => (
            <MyPost key={index}>
              <BoardType>{list.interests}</BoardType>
              <Title>{list.title}</Title>
              <Context>{list.content}</Context>
              <Tag># {list.specificField}</Tag>
              <FooterWrap>
                <IsSolved>
                  {list.isSolved ?
                  <IoIosCheckmarkCircle size={32}/>
                  : <IoIosCloseCircle size={32}/>
                  }
                </IsSolved>
                <Divider src={DividerImg}/>
                <DateCreated>{list.createAt}</DateCreated>
                <Divider src={DividerImg} />
                <Participation>{list.writer}</Participation>
              </FooterWrap>
            </MyPost>
            ))
          ): (
            <SkeletonUI/>
          )}
        </MatchingListWrapper>
      </Container>
    </div>
  )
}

export default MatchingListPage

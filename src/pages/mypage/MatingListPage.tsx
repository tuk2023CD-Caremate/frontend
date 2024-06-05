import Header from '../../components/Header.tsx'
import Profilebar from '../../components/sidebar/Profilebar.tsx'
import Navbar from '../../components/Navbar.tsx'
import styled from 'styled-components'
import DividerImg from '../../assets/images/divider1.png'
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
  width: calc(100% - 6.25rem);
  min-height: min-content;
  border: 1px solid #d8d8d8;
  flex-direction: column;
`
const Category = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 8.75rem;
height: 2.5rem;
font-size: 1.65rem;
font-weight: bold;
`

const Content = styled.div`
display: flex;
min-height: min-content;

`

const BoardType = styled.div`
display: flex;
align-items: center;
font-size: 1.5rem;
margin: 0rem 0.625rem 1.25rem 4rem;

`

const Title = styled.div`
display: flex;
align-items: center;
font-size: 1.5rem;
margin: 0rem 0.625rem 1.25rem 4rem;
`

const Context = styled.div`
display: flex;
align-items: center;
width: 45rem;
min-height: 5rem;
font-size: 1.5rem;
margin: 0rem 0.625rem 1.25rem 4rem;
border: 1px solid #bdbdbd;
border-radius: 5px;
padding: 1rem;
`

const Tag = styled.div`
display: flex;
align-items: center;
font-size: 1.5rem;
margin: 0rem 0.625rem 1.25rem 4rem;
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
              <Content>
                <Category style={{color: '#086ab5'}}>관심분야</Category>
                <BoardType>
                  {
                    (list.interests === 'SERVER' ? '서버/네트워크'
                    : (list.interests === 'WEBAPP' ? '웹/앱 개발'
                      : (list.interests === 'DATA' ? '데이터개발' 
                        :(list.interests ==='AI' ? 'AI/IOT'
                            :(list.interests === 'SECURITY' ?'정보보안' : null)
                  ))))}
                </BoardType>
              </Content>
              <Content>
                <Category style={{color: '#650fa9'}}>상세분야</Category>
                <Tag>{list.specificField}</Tag>
              </Content>
              <Content>
                <Category>제목</Category>
                <Title>{list.title}</Title>
              </Content>
              <Content>
                <Category>내용</Category>
                <Context>{list.content}</Context>
              </Content>
              <FooterWrap>
                <IsSolved>
                  {list.isSolved ?
                  "질문 해결 완료"
                  : "질문 해결 미완료"
                  }
                </IsSolved>
                <Divider src={DividerImg}/>
                <DateCreated>{list.createAt}</DateCreated>
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

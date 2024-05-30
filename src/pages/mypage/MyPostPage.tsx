import Header from '../../components/Header.tsx'
import Profilebar from '../../components/sidebar/Profilebar.tsx'
import Navbar from '../../components/Navbar.tsx'
import DividerImg from '../../assets/images/divider1.png'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useApiUrlStore, usePostListStore, useLoadingStore } from '../../store/store.ts'
import { IoIosHeart, IoIosText } from 'react-icons/io'
import SkeletonUI from '../../components/skeleton/SkeletonUI.tsx'

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`

const MyPostWrapper = styled.div`
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
  height: 16rem;
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

const FooterWrap = styled.div`
  display: flex;
  margin: 0.625rem;
  align-items: center;
`
const Heart = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 5px;
  margin-right: 0.625rem;
`

const Comment = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 5px;
`

const Divider = styled.img`
  width: 2px;
  height: 1.25rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
`

const Writer = styled.div`
  font-size: 1.5rem;
  color: #9b9b9b;
`

const DateCreated = styled.div`
  font-size: 1.5rem;
  color: #9b9b9b;
`

function MyPostPage() {
  const { apiUrl } = useApiUrlStore()
  const { loading, setLoading } = useLoadingStore()
  const { postsList, setPostList } = usePostListStore()
  const [_nickname, setNickName] = useState<string>('')

  //내가 작성한 게시글 전체조회
  const getPost = async (nickname: string) => {
    try {
      const access = localStorage.getItem('accessToken')
      if (!access) {
        window.alert('로그인을해주세요.')
        return
      }
      const response = await axios.get(`${apiUrl}/posts`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setPostList(response.data)
      setLoading(true)

      const MyPosts = response.data.filter(
        (post: { nickname: string }) => post.nickname === nickname, //유저 nickname과 게시글 작성자 nickname이 일치하는 게시글
      )
      setPostList(MyPosts.reverse())
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
      await getPost(response.data.nickname) //nickname가져온 후 getpost
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
        <MyPostWrapper>
          <PageTitle>내가 작성한 게시글</PageTitle>
          {loading ? (
            postsList.map((post, index) => (
              <MyPost key={index}>
                <BoardType>
                  {
                    (post.category === 'FREE' ? '자유게시판'
                      : (post.category === 'STUDY'? '스터디 게시판'
                          : (post.category === 'QUESTION' ? '질문게시판' : '기타 게시판')
                  ))}
                </BoardType>
                <Title>{post.title}</Title>
                <Context>{post.content}</Context>
                <FooterWrap>
                  <IoIosHeart size={28} color='ff0000'/>
                  <Heart>{post.likeCount}</Heart>
                  <IoIosText size={28}/>
                  <Comment>{post.commentCount}</Comment>
                  <Divider src={DividerImg} />
                  <DateCreated>{post.createdAt}</DateCreated>
                  <Divider src={DividerImg} />
                  <Writer>{post.nickname}</Writer>
                </FooterWrap>
              </MyPost>
            ))
          ) : (
            <SkeletonUI />
          )}
        </MyPostWrapper>
      </Container>
    </div>
  )
}

export default MyPostPage

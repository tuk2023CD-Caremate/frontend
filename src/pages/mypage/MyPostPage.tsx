import Header from '../../components/Header.tsx'
import Userbar from '../../components/sidebar/Userbar.tsx'
import Navbar from '../../components/Navbar.tsx'
import DividerImg from '../../assets/images/divider1.png'
import CommentImg from '../../assets/images/comment2.png'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`

const MyPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 25rem);
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
  padding: 1.5rem 0rem 0rem 1.5rem;
  width: calc(100% - 6.25rem);
  height: 16rem;
  border: 1px solid #d8d8d8;
  flex-direction: column;
`

const BoardType = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #086ab5;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.625rem;
`

const Context = styled.div`
  font-size: 1.5rem;
  margin: 0.625rem;
  margin-top: 1.25rem;
`

const FooterWrap = styled.div`
  display: flex;
  margin-top: 1.25rem;
  align-items: center;
`

const CommentImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`

const Comment = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const Divider = styled.img`
  width: 2px;
  height: 1.25rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
`
const Writer = styled.div`
  font-size: 1.5rem;
  color: #9b9b9b;;
`

const DateCreated = styled.div`
  font-size: 1.5rem;
  color: #9b9b9b;
`

function MyPostPage() {
  const posts = [
    {
      boardType: '자유게시판',
      title: '자바 스터디 구합니다.',
      context: '자바의 정석 책으로 진행 할 예정이고, 5-6명 생각하고 있습니다 !',
      commentCount: 3,
      dateCreated: '01/06',
      writer: '틀니개',
    },
    {
      boardType: '자유게시판',
      title: '자바 스터디 구합니다.',
      context: '자바의 정석 책으로 진행 할 예정이고, 5-6명 생각하고 있습니다 !',
      commentCount: 3,
      dateCreated: '01/06',
      writer: '틀니개',
    },
    {
      boardType: '자유게시판',
      title: '자바 스터디 구합니다.',
      context: '자바의 정석 책으로 진행 할 예정이고, 5-6명 생각하고 있습니다 !',
      commentCount: 3,
      dateCreated: '01/06',
      writer: '틀니개',
    },
  ]
  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <Userbar />
        <MyPostWrapper>
          <PageTitle>내가 쓴 글</PageTitle>
          {posts.map((post, index) => (
            <MyPost key={index}>
              <BoardType>{post.boardType}</BoardType>
              <Title>{post.title}</Title>
              <Context>{post.context}</Context>
              <FooterWrap>
                <CommentImage src={CommentImg} />
                <Comment>{post.commentCount}</Comment>
                <Divider src={DividerImg} />
                <DateCreated>{post.dateCreated}</DateCreated>
                <Divider src={DividerImg} />
                <Writer>{post.writer}</Writer>
              </FooterWrap>
            </MyPost>
          ))}
        </MyPostWrapper>
      </Container>
    </div>
  )
}

export default MyPostPage

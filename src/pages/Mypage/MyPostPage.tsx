import Header2 from '../../components/Header2.tsx'
import MypageBar from '../../components/sidebar/Mypagebar.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import DividerImg from '../../assets/images/divider1.png'
import CommentImg from '../../assets/images/comment2.png'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-top: 100px;
`

const MyPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 400px);
`

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  width: calc(100% - 100px);
  height: 100px;
  padding-left: 20px;
  border: 1px solid #d8d8d8;
  margin-bottom: 40px;
`

const MyPost = styled.div`
  display: flex;
  padding: 20px 0px 0px 20px;

  width: calc(100% - 100px);
  height: 255px;
  border: 1px solid #d8d8d8;
  flex-direction: column;
`

const BoardType = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #086ab5;
  margin: 10px;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin: 10px;
`

const Context = styled.div`
  font-size: 28px;
  margin: 10px;
  margin-top: 20px;
`

const FooterWrap = styled.div`
  display: flex;
  margin: 10px;
  margin-top: 20px;
  align-items: center;
`

const CommentImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`

const Comment = styled.div`
  font-size: 28px;
  font-weight: bold;
`

const Divider = styled.img`
  width: 2px;
  height: 20px;
  margin-left: 20px;
  margin-right: 20px;
`
const Writer = styled.div`
  font-size: 28px;
  color: #9b9b9b;
`

const DateCreated = styled.div`
  font-size: 28px;
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
      <Header2 />
      <Navbar2 />
      <Container>
        <MypageBar />
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

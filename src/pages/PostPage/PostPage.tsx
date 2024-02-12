import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header2 from '../../components/Header2.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import PostBar from '../../components/sidebar/Postbar'
import commentImg from '../../assets/images/comment2.png'
import likeimg from '../../assets/images/likeicon.png'
import ProfileImg from '../../assets/images/profile.png'

const Container = styled.div`
  display: flex;
  margin-top: 100px;
`
const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 400px);
`

const PageTitle = styled.div`
  display: flex;
  height: 95px;
  width: calc(100% - 100px);
  padding-left: 20px;
  border: 1px solid #d8d8d8;
  font-weight: bold;
  font-size: 40px;
  align-items: center;
`

const MainPostWrapper = styled.div`
  display: flex;
  height: 370px;
  padding-left: 20px;
  width: calc(100% - 100px);
  border: 1px solid #d8d8d8;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
`
const Upper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 100px);
  height: 90px;
  padding: 10px;
`

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Profile = styled.img`
  width: 110px;
  height: 110px;
`

const Time = styled.div`
  font-size: 20px;
  color: #bdbdbd;
`

const Nickname = styled.div`
  font-size: 32px;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Modify = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  width: 100px;
  height: 50px;
  font-size: 20px;
  margin-right: 20px;
  cursor: pointer;
`

const Delete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  width: 100px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
`

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 100px);
  height: 200px;
  padding-left: 20px;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 20px;
`

const Context = styled.div`
  font-size: 28px;
  margin-left: 10px;
`

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 100px);
  padding: 20px;
  margin-bottom: 10px;
`
const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  width: 90px;
  height: 40px;
  font-size: 18px;
  margin-right: 20px;
  cursor: pointer;
`
const LikeImg = styled.img`
  margin-right: 5px;
  width: 30px;
  height: 30px;
`
const Likecount = styled.div`
  font-size: 28px;
  font-weight: bolder;
  margin-right: 10px;
`
const CommentImg = styled.img`
  margin-right: 5px;
  width: 30x;
  height: 30px;
`
const CommentCount = styled.div`
  font-size: 28px;
  font-weight: bolder;
`

const CommentWrapper = styled.div`
  display: flex;
  padding-left: 20px;
  width: calc(100% - 100px);
  height: 160px;
  border: 1px solid #d8d8d8;
  flex-direction: column;
  justify-content: center;
`
const CommentUserWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
`

const CommentProfile = styled.img`
  width: 70px;
  height: 70px;
`

const CommentNickname = styled.div`
  font-size: 24px;
`

const Comment = styled.div`
  width: calc(100% - 100px);
  padding-left: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 24px;
`
const CommentTime = styled.div`
  padding-left: 10px;
  margin-left: 10px;
  width: 80px;
  font-size: 20px;
  color: #bdbdbd;
`
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  width: calc(100% - 100px);
  height: 70px;
  border: 1px solid #d8d8d8;
`

const Input = styled.input`
text-indent: 20px;
  background-color: #f8f8f8;
  color: #d8d8d8;
  width: calc(100% - 400px);
  height: 65px;
  font-size: 24px;
  border: none;
`

const Send = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 70px;
  border: 1px solid #d8d8d8;
  font-size: 24px;
  font-weight: bolder;
  color: #650fa9;
  background-color: rgba(220, 196, 239, 0.3);
  cursor: pointer;
`

function PostPage() {
  const posts = [
    {
      title: '맥북사고싶다',
      context: '맥북가지고싶다',
      likeCount: 48,
      commentCount: 3,
      dateCreated: '12/25',
      writer: '정환코딩',
    },
  ]
  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <PostBar />
        <PostWrapper>
          <PageTitle>자유게시판</PageTitle>
          {posts.map((post, index) => (
            <MainPostWrapper key={index}>
              <Upper>
                <UserWrapper>
                  <Profile src={ProfileImg} />
                  <NameWrapper>
                    <Nickname>장희수</Nickname>
                    <Time>20분전</Time>
                  </NameWrapper>
                </UserWrapper>
                <ButtonWrapper>
                  <Modify>수정</Modify>
                  <Delete>삭제</Delete>
                </ButtonWrapper>
              </Upper>
              <Lower>
                <Title>{post.title}</Title>
                <Context>{post.context}</Context>
              </Lower>
              <FooterWrapper>
                <LikeBtn>좋아요</LikeBtn>
                <LikeImg src={likeimg} />
                <Likecount>{post.likeCount}</Likecount>
                <CommentImg src={commentImg} />
                <CommentCount>{post.commentCount}</CommentCount>
              </FooterWrapper>
            </MainPostWrapper>
          ))}
          <CommentWrapper>
            <CommentUserWrapper>
              <CommentProfile src={ProfileImg} />
              <CommentNickname>장희수</CommentNickname>
            </CommentUserWrapper>
            <Comment>틀니개씨 반가워요 스프링 장인이라고 들었어요</Comment>
            <CommentTime>20분전</CommentTime>
          </CommentWrapper>
          <InputWrapper>
            <Input type='text' placeholder='댓글을 입력하세요'></Input>
            <Send>작성</Send>
          </InputWrapper>
        </PostWrapper>
      </Container>
    </div>
  )
}
export default PostPage

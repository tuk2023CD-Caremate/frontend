import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header2 from '../../components/Header2.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import PostsBar from '../../components/sidebar/Postsbar'
import commentImg from '../../assets/images/comment2.png'
import likeimg from '../../assets/images/likeicon.png'
import ProfileImg from '../../assets/images/profile.png'

interface postsData {
  id: number
  title: string
  content: string
  nickname: string
  createdAt: string
  likeCount: number
  commentCount: number
  interests: string
  category: string
}

const Container = styled.div`
  display: flex;
  margin-top: 100px;
`
const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 400px);
  border-left: 1px solid #d8d8d8;
`

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  height: 95px;
  width: calc(100% - 100px);
  padding-left: 20px;
  border: 1px solid #d8d8d8;
  font-weight: bold;
  font-size: 40px;
`

const MainPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 370px;
  padding-left: 20px;
  width: calc(100% - 100px);
  border: 1px solid #d8d8d8;
`
const Upper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 100px);
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
  padding-left: 40px;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 20px;
`

const Context = styled.div`
  font-size: 28px;
`

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 100px);
  margin-bottom: 10px;
  padding-left: 40px;
`
const DetailFooterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
const LikeImg = styled.img`
  margin-right: 5px;
  width: 25px;
  height: 25px;
`
const Likecount = styled.div`
  font-size: 20px;
  font-weight: bolder;
  margin-right: 10px;
`
const CommentImg = styled.img`
  margin-right: 5px;
  width: 25x;
  height: 25px;
`
const CommentCount = styled.div`
  font-size: 20px;
  font-weight: bolder;
`
const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  width: 80px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
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
const CommentUpper = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 100px);
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
  font-size: 18px;
  color: #bdbdbd;
`
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 80px);
  height: 70px;
  border: 1px solid #d8d8d8;
`

const Input = styled.input`
  text-indent: 20px;
  background-color: #f8f8f8;
  color: #d8d8d8;
  width: calc(100% - 100px);
  font-size: 24px;
  border: none;

  &::placeholder {
    color: #bdbdbd;
  }
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

function DetailMainPostPage() {
  const {id} = useParams();
  const [postsData, SetpostData] = useState<postsData>({
    id: 0,
    title: '',
    content: '',
    nickname: '',
    createdAt: Date.toString(),
    likeCount: 0,
    commentCount: 0,
    interests: '',
    category: '',
  })

  const getPost = async () => {

    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`http://studymate-tuk.kro.kr:8080/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${access}` },
      })
      SetpostData(response.data)
      console.log(response)
    } catch (error) {}
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <PostsBar />
        <PostWrapper>
          <PageTitle>자유게시판</PageTitle>
          <MainPostWrapper>
            <Upper>
              <UserWrapper>
                <Profile src={ProfileImg} />
                <NameWrapper>
                  <Nickname>{postsData.nickname}</Nickname>
                  <Time>{postsData.createdAt}</Time>
                </NameWrapper>
              </UserWrapper>
              <ButtonWrapper>
                <Modify>수정</Modify>
                <Delete>삭제</Delete>
              </ButtonWrapper>
            </Upper>
            <Lower>
              <Title>{postsData.title}</Title>
              <Context>{postsData.content}</Context>
            </Lower>
            <FooterWrapper>
              <DetailFooterWrapper>
                <LikeImg src={likeimg} />
                <Likecount>{postsData.likeCount}</Likecount>
                <CommentImg src={commentImg} />
                <CommentCount>{postsData.commentCount}</CommentCount>
              </DetailFooterWrapper>
              <LikeBtn>좋아요</LikeBtn>
            </FooterWrapper>
          </MainPostWrapper>
          <CommentWrapper>
            <CommentUpper>
              <CommentUserWrapper>
                <CommentProfile src={ProfileImg} />
                <CommentNickname>장희수</CommentNickname>
              </CommentUserWrapper>
            </CommentUpper>
            <Comment>틀니개씨 반가워요 스프링 장인이라고 들었어요</Comment>
            <CommentTime>20분전</CommentTime>
          </CommentWrapper>
          <InputWrapper>
            <Input type="text" placeholder="댓글을 입력하세요"></Input>
            <Send>작성</Send>
          </InputWrapper>
        </PostWrapper>
      </Container>
    </div>
  )
}
export default DetailMainPostPage

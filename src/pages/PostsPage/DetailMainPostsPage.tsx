import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header2 from '../../components/Header2.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import PostsBar from '../../components/sidebar/Postsbar'
import commentImg from '../../assets/images/comment2.png'
import likeimg from '../../assets/images/likeicon.png'
import ProfileImg from '../../assets/images/profile.png'


interface PostsData {
  post_id: number
  title: string
  content: string
  nickname: string
  createdAt: string
  likeCount: number
  commentCount: number
  interests: string
  category: string
}

interface CommentData {
  post_id: number
  nickname: string
  content: string
  comment_id: number
  createdAt: string
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
const CommentTime = styled.div`
  font-size: 18px;
  color: #bdbdbd;
`

const CommentDelete = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #bdbdbd;
  cursor: pointer;
  padding: 5px;
`

const CommentUpdate = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #bdbdbd;
  cursor: pointer;
  padding: 5px;
`

const Comment = styled.div`
  width: calc(100% - 100px);
  padding-left: 20px;
  margin-left: 45px;
  margin-bottom: 5px;
  font-size: 24px;
`
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 100px);
  height: 70px;
  border: 1px solid #d8d8d8;
  margin-bottom: 30px;
`

const Input = styled.input`
  text-indent: 20px;
  background-color: #f8f8f8;
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
  const { post_id } = useParams()
  const navigate = useNavigate()

  //게시판 글 data
  const [postsData, SetpostData] = useState<PostsData>({
    post_id: 0,
    title: '',
    content: '',
    nickname: '',
    createdAt: Date.toString(),
    likeCount: 0,
    commentCount: 0,
    interests: '',
    category: '',
  })

  //게시글 단건조회
  const getPost = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`http://studymate-tuk.kro.kr:8080/api/posts/${post_id}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      SetpostData(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getPost()
  }, [])

  //게시글 삭제
  const deletePost = async () => {
    if (window.confirm('게시글을 삭제할까요?')) {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.delete(`http://studymate-tuk.kro.kr:8080/api/posts/${post_id}`,
          {
            headers: { Authorization: `Bearer ${access}` },
          })
        SetpostData(response.data)
      } catch (error) {}
      navigate('/posts')
    }
  }

  //게시글 수정
  const updatePost = async () => {
    if (window.confirm('게시글을 수정할까요?')) {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.put(`http://studymate-tuk.kro.kr:8080/api/posts/${post_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        SetpostData(response.data)
      } catch (error) {}
      navigate('/posts/update')
    }
  }

  //댓글CRUD
  const [content, SetContent] = useState('')
  const [editcontent, setEditContent] = useState('')
  const [isediting, setIsEditing] = useState(false)
  const [commentData, SetCommentData] = useState<CommentData[]>([])


  //댓글 조회
  const getComment = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`http://studymate-tuk.kro.kr:8080/api/posts/${post_id}/comments`,
        {
          headers: { Authorization: `Bearer ${access}` },
        })
      SetCommentData(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getComment()
  }, [commentData]) //변수가 달라질 때마다 getComment



  //댓글생성
  const createComment = async () => {
    const comment = {
      content: content,
    }

    if (content != '') {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.post(`http://studymate-tuk.kro.kr:8080/api/posts/${post_id}/comments`,
          comment,
          {
            headers: { Authorization: `Bearer ${access}` },
          })
        SetCommentData([...commentData, response.data])
      } catch (error) {}
      SetContent('')
    }
  }

  useEffect(() => {
    createComment()
  }, [])


  //댓글 삭제
  const deleteCommet = async (comment_id: number) => {
    if (window.confirm('댓글을 삭제할까요?')) {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.delete(`http://studymate-tuk.kro.kr:8080/api/posts/${post_id}/comments/${comment_id}`,{
            data: { post_id: post_id, comment_id: comment_id },
            headers: { Authorization: `Bearer ${access}` },
          })
        SetCommentData(response.data)
      } catch (error) {}
    }
  }

  const hadleEdit = () => {
    setIsEditing(true)
    console.log()
  }

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
                <Modify onClick={updatePost}>수정</Modify>
                <Delete onClick={deletePost}>삭제</Delete>
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
          {Array.isArray(commentData) &&
            commentData.map((comments) => (
            <CommentWrapper key={comments.comment_id}>
              <CommentUpper>
                <CommentUserWrapper>
                  <CommentProfile src={ProfileImg} />
                  <NameWrapper>
                    <CommentNickname>{comments.nickname}</CommentNickname>
                    <CommentTime>{comments.createdAt}</CommentTime>
                  </NameWrapper>
                </CommentUserWrapper>
                <ButtonWrapper>
                  <CommentDelete onClick={() => deleteCommet(comments.comment_id)}>
                    삭제
                  </CommentDelete>
                  <CommentUpdate onClick={hadleEdit}>수정</CommentUpdate>
                </ButtonWrapper>
              </CommentUpper>
              <Comment>{comments.content}</Comment>
            </CommentWrapper>
          ))}
          <InputWrapper>
            <Input
              type="text"
              placeholder="댓글을 입력하세요"
              value={content}
              onChange={(e) => SetContent(e.target.value)}></Input>
            <Send onClick={createComment}>작성</Send>
          </InputWrapper>
        </PostWrapper>
      </Container>
    </div>
  )
}
export default DetailMainPostPage

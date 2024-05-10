import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  useApiUrlStore,
  usePostStore,
  useLikeDataStore,
  useCommentDataStore,
} from '../../store/store.ts'
import axios from 'axios'
import Header2 from '../../components/Header2.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import PostsBar from '../../components/sidebar/Postsbar'
import ProfileImg from '../../assets/images/profile.png'
import { IoIosHeart, IoIosHeartEmpty, IoIosText } from 'react-icons/io'
import Skeleton from '../../components/skeleton/DetailSkeletonUI.tsx'

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
  border: 1px solid #e8e8e8;
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
const Likecount = styled.div`
  font-size: 25px;
  font-weight: bolder;
  margin-left: 5px;
  margin-right: 20px;
`
const CommentCount = styled.div`
  font-size: 25px;
  font-weight: bolder;
  margin-left: 5px;
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
const Editinput = styled.input`
  width: calc(100% - 140px);
  padding-left: 20px;
  margin-left: 45px;
  margin-bottom: 5px;
  font-size: 24px;
  border: 1px solid;
`
const EditBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  cursor: pointer;
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
  const { apiUrl } = useApiUrlStore()
  const [nickname, setNickname] = useState<string>('')
  const { likeList, setLikedList } = useLikeDataStore()
  const { postData, setPostData } = usePostStore() //게시글 객체
  const [loading, setLoading] = useState(true)

  //게시글 단건조회
  const getPost = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/posts/${post_id}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setPostData(response.data)
      setLoading(false)
    } catch (error) {
      alert('Error while fetching post')
    }
  }


  //게시글 수정&삭제 버튼이 작성자에게만 보이도록
  const getNickname = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setNickname(response.data.nickname)
    } catch (error) {
      alert('Error while fetching post')
    }
  }

  useEffect(() => {
    getPost()
    getNickname()
  }, [])

  //게시글 삭제
  const deletePost = async () => {
    if (window.confirm('게시글을 삭제할까요?')) {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.delete(`${apiUrl}/posts/${post_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        console.log(response.data)
      } catch (error) {
        alert('Error while delete post')
      }
      navigate('/posts')
    }
  }

  //게시글 수정
  const handlePostEdit = () => {
    if (window.confirm('게시글을 수정할까요?')) {
      navigate('/posts/update/' + post_id)
    }
  }

  //좋아요 누른 게시글인지 확인
  const LikedPost = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user/post/heart`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setLikedList(response.data)
    } catch (error) {
      alert('Error while liking post')
    }
  }

  useEffect(() => {
    LikedPost()
  }, [])

  //게시글 좋아요
  const onLikeBtn = async (postId: number) => {
    const access = localStorage.getItem('accessToken')
    try {
      const isPostLiked = likeList.some((post) => post.post_id === postId) //좋아요 누른 게시글인지 조회

      if (!isPostLiked) {
        //없을 경우

        const response = await axios.post(
          `${apiUrl}/post/heart/${postId}`, //좋아요 생성
          {},
          { headers: { Authorization: `Bearer ${access}` } }, // headers는 세 번째 매개변수로 전달
        )
        const updatelikecount = postData.likeCount + 1
        setPostData({ ...postData, likeCount: updatelikecount })
        setLikedList([...likeList, response.data])
        LikedPost()
      } else {
        //있을경우
        const response = await axios.delete(
          `${apiUrl}/post/heart/${postId}`, //좋아요 삭제
          { headers: { Authorization: `Bearer ${access}` } },
        )
        const updatelikecount = postData.likeCount - 1
        setPostData({ ...postData, likeCount: updatelikecount })
        setLikedList([...likeList, response.data])
        LikedPost()
      }
    } catch (error) {
      console.error('Error while toggling like:', error)
      alert('Error while liking post')
    }
  }

  //댓글CRUD
  const [content, SetContent] = useState('')
  const [editcontent, setEditContent] = useState('')
  const [commentnickname, setCommentNickname] = useState<string>('')
  const { commentData, setCommentData } = useCommentDataStore()

  //댓글 조회
  const getComment = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/posts/${post_id}/comments`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setCommentData(response.data)
    } catch (error) {
      alert('Error while fetching comment')
    }
  }

  //댓글 수정 &삭제 버튼 작성자만 보이게
  const getcommentNickname = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setCommentNickname(response.data.nickname)
    } catch (error) {
      alert('Error while fetching comment')
    }
  }

  useEffect(() => {
    getComment()
    getcommentNickname()
  }, [])

  //댓글생성
  const createComment = async () => {
    const comment = {
      content: content,
    }
    if (content != '') {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.post(`${apiUrl}/posts/${post_id}/comments`, comment, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setCommentData([...commentData, response.data])
        const updateCommentCount = postData.commentCount + 1
        setPostData({ ...postData, commentCount: updateCommentCount })
        getComment()
      } catch (error) {
        alert('Error while creating comment')
      }
      SetContent('')
    }
  }

  //댓글 삭제
  const deleteCommet = async (post_id: number, comment_id: number) => {
    if (window.confirm('댓글을 삭제할까요?')) {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.delete(`${apiUrl}/posts/${post_id}/comments/${comment_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        console.log(response.data)
        const updateCommentCount = postData.commentCount - 1
        setPostData({ ...postData, commentCount: updateCommentCount })
        getComment()
      } catch (error) {
        alert('Error while delete comment')
      }
    }
  }

  //댓글수정
  const [isediting, setIsEditing] = useState(0) //수정할 comment_id 초기화

  const handleEdit = (comment_id: number) => {
    setIsEditing(comment_id) //comment_id와 일치하는 댓글만 버튼 변경
    setEditContent('')
  }

  const updateComment = async (post_id: number, comment_id: number) => {
    const editcomment = {
      content: editcontent,
    }
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.put(
        `${apiUrl}/posts/${post_id}/comments/${comment_id}`,
        editcomment,
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )
      const updatedComments = commentData.map((comment) => {
        if (comment.comment_id === comment_id) {
          return response.data
        }
        return comment
      })
      setCommentData(updatedComments)
      getComment()
    } catch (error) {
      alert('Error while updating comment')
    }
    setIsEditing(0) //comment_id 초기화
  }

  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createComment() // Enter 키를 누르면 댓글 생성 함수를 호출합니다.
    }
  }

  const handleEditKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, post_id: number, comment_id: number) => {
    if (event.key === 'Enter') {
      updateComment(post_id, comment_id);
    }
  };


  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <PostsBar />
        <PostWrapper>
          <PageTitle>자유게시판</PageTitle>
          <MainPostWrapper>
          {loading ? (
          <Skeleton/>
            ) : (
              <>
                <Upper>
                  <UserWrapper>
                    <Profile src={ProfileImg} />
                    <NameWrapper>
                      <Nickname>{postData.nickname}</Nickname>
                      <Time>{postData.createdAt}</Time>
                    </NameWrapper>
                  </UserWrapper>
                  {nickname === postData.nickname ? (
                    <ButtonWrapper>
                      <Modify onClick={handlePostEdit}>수정</Modify>
                      <Delete onClick={deletePost}>삭제</Delete>
                    </ButtonWrapper>
                  ) : null}
                </Upper>
                <Lower>
                  <Title>{postData.title}</Title>
                  <Context>{postData.content}</Context>
                </Lower>
                </>
            )}
            <FooterWrapper>
              <DetailFooterWrapper>
                {likeList.some((post) => post.post_id === postData.post_id) ? (
                  <IoIosHeart color="#ff0000" size="30" />
                ) : (
                  <IoIosHeartEmpty color="#ff0000" size="30" />
                )}
                <Likecount>{postData.likeCount}</Likecount>
                <IoIosText size="30" />
                <CommentCount>{postData.commentCount}</CommentCount>
              </DetailFooterWrapper>
              <LikeBtn onClick={() => onLikeBtn(postData.post_id)}>좋아요</LikeBtn>
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
                  {commentnickname === comments.nickname ? (
                    <ButtonWrapper>
                      <CommentDelete
                        onClick={() => deleteCommet(postData.post_id, comments.comment_id)}>
                        삭제
                      </CommentDelete>
                      {isediting === comments.comment_id ? (
                        <EditBtn
                          onClick={() => updateComment(postData.post_id, comments.comment_id)}>
                          완료
                        </EditBtn>
                      ) : (
                        <CommentUpdate onClick={() => handleEdit(comments.comment_id)}>
                          수정
                        </CommentUpdate>
                      )}
                    </ButtonWrapper>
                  ) : null}
                </CommentUpper>
                {isediting === comments.comment_id ? (
                  <div>
                    <Editinput
                      type="text"
                      value={editcontent}
                      onChange={(e) => setEditContent(e.target.value)}
                      placeholder={comments.content}
                      onKeyDown={(e) => handleEditKeyPress(e, postData.post_id, comments.comment_id)}
                    />
                  </div>
                ) : (
                  <div>
                    <Comment>{comments.content}</Comment>
                  </div>
                )}
              </CommentWrapper>
            ))}
          <InputWrapper>
            <Input
              type="text"
              placeholder="댓글을 입력하세요"
              value={content}
              onChange={(e) => SetContent(e.target.value)}
              onKeyDown={handleKeyPress}></Input>
            <Send onClick={createComment}>작성</Send>
          </InputWrapper>
        </PostWrapper>
      </Container>
    </div>
  )
}
export default DetailMainPostPage

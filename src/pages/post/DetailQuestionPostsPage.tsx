import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoIosHeart, IoIosHeartEmpty, IoIosText } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import defaultImg from '../../assets/images/profileimg.png'
import Header from '../../components/Header.tsx'
import Navbar from '../../components/Navbar.tsx'
import PostsBar from '../../components/sidebar/Postsbar.tsx'
import Skeleton from '../../components/skeleton/DetailSkeletonUI.tsx'
import {
  getProfileImageUrl,
  useApiUrlStore,
  useCommentDataStore,
  useLikeDataStore,
  useLoadingStore,
  usePostStore,
} from '../../store/store.ts'

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`
const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 25rem);
  border-left: 1px solid #d8d8d8;
`

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
  width: calc(100% - 6.25rem);
  padding-left: 1.25rem;
  border: 1px solid #d8d8d8;
  font-weight: bold;
  font-size: 1.5rem;
`

const MainPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 23rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  width: calc(100% - 6.25rem);
  border: 1px solid #e8e8e8;
`
const Upper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 4;
  padding: 0.625rem;
  margin-top: 0.625rem;
`

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Profile = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-right: 1rem;
`

const Time = styled.div`
  font-size: 1.25rem;
  color: #bdbdbd;
`

const Nickname = styled.div`
  font-size: 2rem;
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
  border-radius: 0.625rem;
  border: 1px solid #d8d8d8;
  width: 6.25rem;
  height: 3rem;
  font-size: 1.25rem;
  margin-right: 1.25rem;
  cursor: pointer;
`

const Delete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  border: 1px solid #d8d8d8;
  width: 6.25rem;
  height: 3rem;
  font-size: 1.25rem;
  cursor: pointer;
`

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 4;
  padding-left: 2.5rem;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.25rem;
`

const Context = styled.div`
  font-size: 1.5rem;
`

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 2;
  margin-bottom: 0.625rem;
  padding-left: 2.5rem;
`
const DetailFooterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
`
const Likecount = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-left: 0.5rem;
  margin-right: 0.625rem;
`
const CommentCount = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-left: 0.5rem;
`
const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  border: 1px solid #d8d8d8;
  width: 5rem;
  height: 2.5rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #bdbdbd;
  }
`
const CommentWrapper = styled.div`
  display: flex;
  padding-left: 1.25rem;
  width: calc(100% - 6.25rem);
  height: 10rem;
  border: 1px solid #d8d8d8;
  flex-direction: column;
  justify-content: center;
`
const CommentUpper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
`
const CommentUserWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 18rem;
`

const CommentProfile = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
`

const CommentNickname = styled.div`
  font-size: 1.5rem;
`
const CommentTime = styled.div`
  font-size: 1rem;
  color: #bdbdbd;
`

const CommentDelete = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #bdbdbd;
  cursor: pointer;
  padding: 0.5rem;
`
const Editinput = styled.input`
  width: calc(100% - 11rem);
  padding-left: 1.25rem;
  margin-left: 4rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  border: 1px solid;
`
const EditBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 2.5rem;
  border: 1px solid #d8d8d8;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
`

const CommentUpdate = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #bdbdbd;
  cursor: pointer;
  padding: 0.5rem;
`

const Comment = styled.div`
  width: 95%;
  padding-left: 1.5rem;
  margin-left: 2.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 6.25rem);
  height: 4.5rem;
  border: 1px solid #d8d8d8;
  margin-bottom: 2rem;
`

const Input = styled.input`
  text-indent: 1.25rem;
  background-color: #f8f8f8;
  width: 100%;
  font-size: 1.5rem;
  border: none;

  &::placeholder {
    color: #bdbdbd;
  }
`

const Send = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 4.5rem;
  border: 1px solid #d8d8d8;
  font-size: 1.5rem;
  font-weight: bolder;
  color: #650fa9;
  background-color: rgba(220, 196, 239, 0.3);
  cursor: pointer;
  &:active {
    background: #e4d7ef;
  }
`

const ChatBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  font-size: 1.4rem;
  font-weight: bold;
  width: 8rem;
  height: 3.5rem;
  background-color: #e8dcf2;
  color: #650fa9;
  margin-left: 2rem;
  &:active {
    background: #e4d7ef;
  }
`

function DetailQuestionPostPage() {
  const { post_id } = useParams()
  const navigate = useNavigate()
  const { apiUrl } = useApiUrlStore()
  const [nickname, setNickname] = useState<string>('')
  const { likeList, setLikedList } = useLikeDataStore()
  const { postData, setPostData } = usePostStore()
  const { loading, setLoading } = useLoadingStore()
  const postImg = getProfileImageUrl(postData.profileUrl, defaultImg)

  //게시글 단건조회
  const getPost = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/posts/${post_id}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setPostData(response.data)
      setLoading(true)
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
      navigate('/posts/questions')
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
      console.log(isPostLiked)

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
    }
    SetContent('')
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

  const handleEditKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    post_id: number,
    comment_id: number,
  ) => {
    if (event.key === 'Enter') {
      updateComment(post_id, comment_id)
    }
  }

  const createChat = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const nickname = encodeURIComponent(postData.nickname)
      await axios.post(
        `${apiUrl}/chat/rooms?targetNickname=${nickname}`,
        {},
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )
      alert('채팅방이 생성 되었습니다.')
      navigate('/chats')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const statusCode = error.response.status
          switch (statusCode) {
            case 400:
              alert('해당 유저와의 채팅방이 이미 존재합니다.')
              break
            case 404:
              alert('해당 유저가 존재하지 않습니다.')
              break
            default:
              alert('채팅방 생성에 실패하였습니다.')
              break
          }
        }
      }
    }
  }

  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <PostsBar />
        <PostWrapper>
          <PageTitle>질문게시판</PageTitle>
          <MainPostWrapper>
            {loading ? (
              <>
                <Upper>
                  <UserWrapper>
                    <Profile src={postImg} />
                    <NameWrapper>
                      <Nickname>{postData.nickname}</Nickname>
                      <Time>{postData.createdAt}</Time>
                    </NameWrapper>
                    <ChatBtn onClick={createChat}>채팅하기</ChatBtn>
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
            ) : (
              <Skeleton />
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
                    <CommentProfile
                      src={
                        comments.profileUrl === '프로필 사진이 없습니다.'
                          ? defaultImg
                          : comments.profileUrl
                      }
                    />
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
                      onKeyDown={(e) =>
                        handleEditKeyPress(e, postData.post_id, comments.comment_id)
                      }
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
export default DetailQuestionPostPage

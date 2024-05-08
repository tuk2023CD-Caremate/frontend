import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  useApiUrlStore, 
  usePostListStore,
  useFilterListStore,
  PostsList,
  useLikeDataStore,
 } from '../../store/store.ts'
import axios from 'axios'
import Header2 from '../../components/Header2.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import PostsBar from '../../components/sidebar/Postsbar'
import DividerImg from '../../assets/images/divider1.png'
import { IoIosHeart, IoIosHeartEmpty, IoIosText } from "react-icons/io"
import SkeletonUI from '../../components/SkeletonUI.tsx'


const Container = styled.div`
  display: flex;
  margin-top: 100px;
`
const StudyPostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 400px);
  min-height: 780px;
  border-left: 1px solid #d8d8d8;
`

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 100px);
`
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`
const Btn = styled.button<{ active: boolean }>`
  width: 124px;
  height: 48px;
  border-radius: 10px;
  border: none;
  font-size: 24px;
  margin-right: 36px;
  background-color: ${({ active }) => (active ? '#E8DCF2' : '#e8e8e8')};
  color: ${({ active }) => (active ? '#650FA9' : '#bdbdbd')};
  font-weight: ${({ active }) => (active ? 'bolder' : 'normal')};
`
const SearchWrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 0;
  justify-content: space-between;
  margin-bottom: 10px;
`
const SideWrapper = styled.div`
  display: flex;
`

const Search = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  text-indent: 30px;
  width: 760px;
  height: 65px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  font-size: 24px;
  margin-right: 30px;
`

const SerarchBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 50px;
  border-radius: 5px;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  cursor: pointer;
`
const SelectBox = styled.select`
  width: 140px;
  height: 50px;
  border-radius: 5px;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  margin-right: 20px;
  cursor: pointer;
  text-align: center;
`

const WriteButton = styled.button`
  width: 120px;
  height: 50px;
  border-radius: 5px;
  border: 0.5px solid #bdbdbd;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  cursor: pointer;
`

const StudyPosts = styled(Link)<{recruitmentStatus: boolean}>`
  display: flex;
  height: 200px;
  padding: 20px 0px 0px 20px;
  width: calc(100% - 100px);
  border: 1px solid #d8d8d8;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  color: ${({ recruitmentStatus }) => (recruitmentStatus ? '#000000' : '#e8e8e8')};
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
`

const Context = styled.div`
  font-size: 28px;
  font-weight: normal;
  margin-top: 30px;
`

const FooterWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
`

const LikedIcon = styled(IoIosHeart)<{recruitmentStatus: boolean}>`
  color: ${({ recruitmentStatus }) => (recruitmentStatus ? '#ff0000' : '#e8e8e8')};
  font-size: 25px;
`

const UnLikedIcon = styled(IoIosHeartEmpty)<{recruitmentStatus: boolean}>`
 color: ${({ recruitmentStatus }) => (recruitmentStatus ? '#ff0000' : '#e8e8e8')};
  font-size: 25px;
`

const Likecount = styled.div`
  font-size: 28px;
  font-weight: bolder;
  margin-right: 10px;
  margin-left: 5px;
`

const CommentCount = styled.div`
  font-size: 28px;
  font-weight: bolder;
  margin-left: 5px;
`
const Divider = styled.img`
  margin: 0 20px 0 20px;
  width: 2px;
  height: 20px;
`
const Detail = styled.div<{recruitmentStatus: boolean}>`
  font-size: 28px;
  color: ${({ recruitmentStatus }) => (recruitmentStatus ? '#9b9b9b' : '#e8e8e8')};
`

const Sortoption = [
  { value: 'LIKE', name: '좋아요 순' },
  { value: 'COMMENT', name: '댓글 순' },
]

const recruitmentStatusLabels: { [key: string]: string } = {
  'false': '모집완료',
  'true': '모집중'
};

function StudyPostPage() {
  const { apiUrl } = useApiUrlStore()
  const [sortOption, setSortOption] = useState('')
  const [filterOption, setFilterOption] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const {filterList, setFilterList}= useFilterListStore()
  const {postsList, setPostList} = usePostListStore()
  const { likeList, setLikedList } = useLikeDataStore()
  const [isClicked, setIsClicked] = useState(false)
  const [isliked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(false)


  const OnListtHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSortOption(e.target.value)
  }

  //게시글 정렬
  const OnSortpostData = () => {
    const sortList = postsList.slice(0).sort((a, b) => {

   if(sortOption === "LIKE"){ //좋아요 순 option을 선택했을 경우
        return b.likeCount - a.likeCount;
    }
    else if (sortOption === 'COMMENT') {
      return b.commentCount - a.commentCount
    }
    return 0;
  });
  setPostList(sortList);
  }

  //게시글 전체조회
  const getPost = async () => {
    setLoading(!loading)
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/posts`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setPostList(response.data.reverse())
    } catch (error) {
      alert('Error while fetching post')
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  //게시글 검색
  const searchpost = async () => {
    if (searchKeyword !== '') {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.get(`${apiUrl}/posts/search`, {
          params: { keyword: searchKeyword },
          headers: { Authorization: `Bearer ${access}` },
        })
        setPostList(response.data)
      } catch (error) {
        alert('Error while searching keyword')
      }
    } else if (searchKeyword == '') {
      alert('검색어를 입력해주세요')
      getPost() 
    }
  }

  //게시글 필터링
  const OnFilter = (recruitmentStatus: boolean) => {
    if(isClicked && filterOption ===recruitmentStatus.toString()){
      setIsClicked(false);
      setFilterList([]);
    } else {
    setIsClicked(true) // true로 변경하여 filterPost를 map하게 함
    const filterPost = postsList.filter((post) => 
    post.recruitmentStatus === recruitmentStatus) 
    setFilterList(filterPost)
    setFilterOption(recruitmentStatus.toString())
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
      
      const isLiked = likeList.some((likedPost) => {
        return postsList.some((post) => post.post_id === likedPost.post_id)
      })
      setIsLiked(isLiked)
  
    } catch (error) {
      alert('Error while liking post')
    }
  }

  useEffect(() => {
    LikedPost()
  }, [])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchpost();
    }
  };

  //중복 코드 컴포넌트화
  const Post = ({ posts }: { posts: PostsList[] }) => (
    <>
      {posts
        .filter((post) => post.category === 'STUDY')
        .map((post) => (
          <StudyPosts 
          key={post.post_id} 
          to={`/posts/study/${post.post_id}`}
          recruitmentStatus={post.recruitmentStatus}>
            <Title>{post.title}</Title>
            <Context>{post.content}</Context>
            <FooterWrapper>
            {isliked ? (
            <LikedIcon recruitmentStatus={post.recruitmentStatus}/>
            ) : (
             <UnLikedIcon recruitmentStatus={post.recruitmentStatus}/>
            )}
              <Likecount >{post.likeCount}</Likecount>
              <IoIosText size="25"/>
              <CommentCount>{post.commentCount}</CommentCount>
              <Divider src={DividerImg} />
              <Detail recruitmentStatus={post.recruitmentStatus}>{post.createdAt}</Detail>
              <Divider src={DividerImg} />
              <Detail recruitmentStatus={post.recruitmentStatus}>{post.nickname}</Detail>
            </FooterWrapper>
          </StudyPosts>
        ))}
    </>
  )
  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <PostsBar />
        <StudyPostsWrapper>
          <Upper>
          <BtnWrapper>
              {Object.keys(recruitmentStatusLabels).map(status => (
                <Btn
                  key={status}
                  active={isClicked && filterList.some(post => post.recruitmentStatus === (status === 'true'))}
                  onClick={() => OnFilter(status === 'true')}>
                  {recruitmentStatusLabels[status]}
                </Btn>
              ))}
            </BtnWrapper>
            <SearchWrapper>
              <Search>
                <Input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="검색 내용을 입력하세요 (제목, 글쓴이, 내용)"
                  onKeyDown={handleKeyPress}
                />
                <SerarchBtn onClick={searchpost}>검색</SerarchBtn>
              </Search>
              <SideWrapper>
                <SelectBox value={sortOption} onChange={OnListtHandler} onClick={OnSortpostData}>
                  {Sortoption.map((item) => (
                    <option value={item.value} key={item.name}>
                      {item.name}
                    </option>
                  ))}
                </SelectBox>
                <Link to="/posts/write">
                  <WriteButton> 글쓰기</WriteButton>
                </Link>
              </SideWrapper>
            </SearchWrapper>
          </Upper>
          {loading ? <Post posts={isClicked ? filterList : postsList} /> 
          : <SkeletonUI count={isClicked ? filterList.length : postsList.length} />}
        </StudyPostsWrapper>
      </Container>
    </div>
  )
}

export default StudyPostPage

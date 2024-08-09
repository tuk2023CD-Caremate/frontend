import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoIosHeart, IoIosHeartEmpty, IoIosText, IoMdSearch } from 'react-icons/io'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DividerImg from '../../assets/images/divider1.png'
import Header from '../../components/Header.tsx'
import Navbar from '../../components/Navbar.tsx'
import PostsBar from '../../components/sidebar/Postsbar.tsx'
import SkeletonUI from '../../components/skeleton/SkeletonUI.tsx'
import {
  PostsList,
  useApiUrlStore,
  useFilterListStore,
  useLoadingStore,
  usePostListStore,
} from '../../store/store.ts'

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`
const QuestionPostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 25rem);
  min-height: 49rem;
  border-left: 1px solid #d8d8d8;
`

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 6.25rem);
`
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.625rem;
`
const Btn = styled.button<{ active: boolean }>`
  width: 10rem;
  height: 3rem;
  border-radius: 0.625rem;
  border: none;
  font-size: 1.3rem;
  margin-right: 2.25rem;
  background-color: ${({ active }) => (active ? '#E8DCF2' : '#e8e8e8')};
  color: ${({ active }) => (active ? '#650FA9' : '#bdbdbd')};
  font-weight: ${({ active }) => (active ? 'bolder' : 'normal')};
`
const SearchWrapper = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.25rem 1.25rem 0rem;
  margin-bottom: 1.25rem;
`
const SideWrapper = styled.div`
  display: flex;
`
const Search = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  text-indent: 2rem;
  width: 47rem;
  height: 3.5rem;
  border: 1px solid #bdbdbd;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  margin-right: 2rem;
`

const SerarchBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 1.25rem;
  cursor: pointer;
`

const SelectBox = styled.select`
  width: 8.75rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 1.25rem;
  margin-right: 1.25rem;
  cursor: pointer;
  text-align: center;
`

const WriteButton = styled.button`
  width: 7.5rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 0.5px solid #bdbdbd;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #bdbdbd;
  }
`

const QuestionPosts = styled(Link)`
  display: flex;
  height: 12.5rem;
  padding: 1.25rem 0rem 0rem 1.25rem;
  width: calc(100% - 6.25rem);
  border: 1px solid #d8d8d8;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  color: black;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`

const Context = styled.div`
  font-size: 1.75rem;
  margin-top: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95%;
`

const FooterWrapper = styled.div`
  display: flex;
  margin-top: 1.25rem;
  align-items: center;
`
const Likecount = styled.div`
  font-size: 1.75rem;
  font-weight: bolder;
  margin-right: 0.625rem;
  margin-left: 0.5rem;
`
const CommentCount = styled.div`
  font-size: 1.75rem;
  font-weight: bolder;
  margin-left: 0.5rem;
`
const Divider = styled.img`
  margin: 0rem 1.25rem 0rem 1.25rem;
  width: 2px;
  height: 1.25rem;
`
const DateCreated = styled.div`
  font-size: 1.75rem;
  color: #9b9b9b;
`
const Writer = styled.div`
  font-size: 1.75rem;
  color: #9b9b9b;
`
const Sortoption = [
  { value: 'LIKE', name: '좋아요 순' },
  { value: 'COMMENT', name: '댓글 순' },
]

const interestLabels: { [key: string]: string } = {
  WEBAPP: '웹/앱개발',
  SERVER: '서버/네트워크',
  AI: 'AI/IoT',
  DATA: '데이터 개발',
  SECURITY: '정보보안',
}

function QuestionPostPage() {
  const { apiUrl } = useApiUrlStore()
  const [sortOption, setSortOption] = useState('')
  const [filterOption, setFilterOption] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const { filterList, setFilterList } = useFilterListStore()
  const { postsList, setPostList } = usePostListStore()
  const [isClicked, setIsClicked] = useState(false)
  const { loading, setLoading } = useLoadingStore()
  const [isliked, setIsLiked] = useState<{ [postId: string]: boolean }>({})

  const OnListtHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSortOption(e.target.value)
  }

  //게시글 정렬
  const OnSortpostData = () => {
    const sortList = postsList.slice(0).sort((a, b) => {
      if (sortOption === 'LIKE') {
        //좋아요 순 option을 선택했을 경우
        return b.likeCount - a.likeCount
      } else if (sortOption === 'COMMENT') {
        return b.commentCount - a.commentCount
      }
      return 0
    })
    setPostList(sortList)
  }

  //게시글 전체조회
  const getPost = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      if (!access) {
        window.alert('로그인을 해주세요.')
        return
      }
      const response = await axios.get(`${apiUrl}/posts`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setPostList(response.data.reverse())
      setLoading(true)
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
  const OnFilter = (interests: string) => {
    if (isClicked && filterOption == interests) {
      setIsClicked(false)
      setFilterList([])
    } else {
      setIsClicked(true)
      const filterPost = postsList.filter((post) => post.interests === interests) // 복사된 값에서 filter
      setFilterList(filterPost)
      setFilterOption(interests)
    }
  }

  //좋아요 누른 게시글인지 확인
  const LikedPost = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user/post/heart`, {
        headers: { Authorization: `Bearer ${access}` },
      })

      const likedPostIds = response.data.map((likedPost: any) => likedPost.post_id)
      const newLikedMap: { [postId: string]: boolean } = {}
      likedPostIds.forEach((postId: string) => {
        newLikedMap[postId] = true
      })
      setIsLiked(newLikedMap)
    } catch (error) {
      alert('Error while liking post')
    }
  }

  useEffect(() => {
    LikedPost()
  }, [])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchpost()
    }
  }

  //중복 코드 컴포넌트화
  const Post = ({ posts }: { posts: PostsList[] }) => (
    <>
      {posts
        .filter((post) => post.category === 'QUESTION')
        .map((post) => (
          <QuestionPosts key={post.post_id} to={`/posts/questions/${post.post_id}`}>
            <Title>{post.title}</Title>
            <Context>{post.content}</Context>
            <FooterWrapper>
              {isliked[post.post_id] ? (
                <IoIosHeart color="#ff0000" size="25" />
              ) : (
                <IoIosHeartEmpty color="#ff0000" size="25" />
              )}
              <Likecount>{post.likeCount}</Likecount>
              <IoIosText size="30" />
              <CommentCount>{post.commentCount}</CommentCount>
              <Divider src={DividerImg} />
              <DateCreated>{post.createdAt}</DateCreated>
              <Divider src={DividerImg} />
              <Writer>{post.nickname}</Writer>
            </FooterWrapper>
          </QuestionPosts>
        ))}
    </>
  )

  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <PostsBar />
        <QuestionPostsWrapper>
          <Upper>
            <BtnWrapper>
              {Object.keys(interestLabels).map((interest) => (
                <Btn
                  key={interest}
                  active={isClicked && filterList.some((post) => post.interests === interest)}
                  onClick={() => OnFilter(interest)}>
                  {interestLabels[interest]}
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
                <SerarchBtn onClick={searchpost}>
                  <IoMdSearch size={26} />
                </SerarchBtn>
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
                  <WriteButton>글쓰기</WriteButton>
                </Link>
              </SideWrapper>
            </SearchWrapper>
          </Upper>
          {loading ? <Post posts={isClicked ? filterList : postsList} /> : <SkeletonUI />}
        </QuestionPostsWrapper>
      </Container>
    </div>
  )
}

export default QuestionPostPage

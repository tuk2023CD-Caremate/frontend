import styled from 'styled-components'
import { Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useApiUrlStore } from '../../store/store.ts'
import axios from 'axios'
import Header2 from '../../components/Header2.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import PostsBar from '../../components/sidebar/Postsbar.tsx'
import commentImg from '../../assets/images/comment2.png'
import likeimg from '../../assets/images/likeicon.png'
import DividerImg from '../../assets/images/divider1.png'

interface postsData {
  post_id: number
  title: string
  content: string
  likeCount: number
  commentCount: number
  nickname: string
  createdAt: string
  interests: string
  category: 'QUESTION'
  recruitmentStatus: boolean
}
const Container = styled.div`
  display: flex;
  margin-top: 100px;
`
const QuestionPostsWrapper = styled.div`
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
const Btn = styled.button<{active: boolean}>`
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
  width: 120px;
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

const QuestionPosts = styled(Link)`
  display: flex;
  height: 200px;
  padding: 20px 0px 0px 20px;
  width: calc(100% - 100px);
  border: 1px solid #d8d8d8;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  color: black;
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
const Divider = styled.img`
  margin: 0 20px 0 20px;
  width: 2px;
  height: 20px;
`
const DateCreated = styled.div`
  font-size: 28px;
  color: #9b9b9b;
`
const Writer = styled.div`
  font-size: 28px;
  color: #9b9b9b;
`
const Sortoption = [
  { value: 'LIKE', name: '좋아요 순' },
  { value: 'LATEST', name: '최신 순' },
  { value: 'COMMENT', name: '댓글 순' },
]

const interestLabels:  { [key: string]: string}= {
  KOREAN: '국어',
  MATH: '수학',
  ENGLISH: '영어',
  SCIENCE: '과학',
  PROGRAMMING: '코딩'
};

function QuestionPostPage() {

  const { apiUrl } = useApiUrlStore()
  const [sortoption, setSortoption] = useState('')
  const [filteroption, setFilteroption] = useState('')
  const [searchkeyword, SetSearchKeyword]= useState("")
  const [postsData, SetpostData] = useState<postsData[]>([])
  const [filterPost, setfilterPost] = useState<postsData[]>([])
  const [isClicked, setIsClicked] = useState(false)


  const OnListtHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSortoption(e.target.value)
  }


  //게시글 전체조회
  const getPost = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/posts`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      SetpostData(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getPost()
  }, [])

  
   //게시글 정렬
  const OnSortpostData = () => {
    const sortList = postsData.slice(0).sort((a, b) => {
      if (sortoption === 'LATEST') {
        //최신 순 option을 선택했을 경우
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      } else if (sortoption === 'LIKE') {
        //좋아요 순 option을 선택했을 경우
        return b.likeCount - a.likeCount
      } else if (sortoption === 'COMMENT') {
        return b.commentCount - a.commentCount
      }
      return 0
    })
    SetpostData(sortList)
  }

     //게시글 검색
     const searchpost = async ()=> {
       if(searchkeyword !==''){
         try {
           const access = localStorage.getItem('accessToken')
           const response = await axios.get(`${apiUrl}/posts/search`, {
             params: {keyword : searchkeyword},
             headers: { Authorization: `Bearer ${access}` },
           })
           SetpostData(response.data)
         } catch (error) {}
       } else if(searchkeyword ==''){
         alert("검색어를 입력해주세요")
         getPost(); //검색어 입력 안했을 경우 전체게시물 불러오기 >> 이미 검색한 이후 다른 단어로 검색해도 게시글이 출력될 수 있게
       }}


  //게시글 필터링
  const OnFilter = (interests: string) => {
    if (isClicked && filteroption==interests) {
 
      setIsClicked(false) 
      setfilterPost([])
    } else {
      setIsClicked(true) 
      const CopyPost = [...postsData.filter((post) => post.category === 'QUESTION')] 
      const filterPost = CopyPost.filter((post) => post.interests === interests) 
      setfilterPost(filterPost)
      setFilteroption(interests) 
    }
  }

  
  //중복 코드 컴포넌트화
  const Post = ({ posts }: { posts: postsData[] }) => (
    <>
      {posts
        .filter((post) => post.category === 'QUESTION')
        .map((post) => (
          <QuestionPosts key={post.post_id} to={`/posts/${post.post_id}`}>
            <Title>{post.title}</Title>
            <Context>{post.content}</Context>
            <FooterWrapper>
              <LikeImg src={likeimg} />
              <Likecount>{post.likeCount}</Likecount>
              <CommentImg src={commentImg} />
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
      <Header2 />
      <Navbar2 />
      <Container>
        <PostsBar />
        <QuestionPostsWrapper>
          <Upper>
          <BtnWrapper>
            {Object.keys(interestLabels).map(interest => (
            <Btn
              key={interest}
              active={isClicked && filterPost.some(post => post.interests === interest)}
              onClick={() => OnFilter(interest)}>
                {interestLabels[interest]}
              </Btn>
              ))}
          </BtnWrapper>
            <SearchWrapper>
              <Search>
              <Input type="text" value={searchkeyword} onChange={(e)=>SetSearchKeyword(e.target.value)} placeholder="검색 내용을 입력하세요 (제목, 글쓴이, 내용)"/>
              <SerarchBtn onClick={searchpost}>검색</SerarchBtn>
              </Search>
              <SideWrapper>
                <SelectBox value={sortoption} onChange={OnListtHandler} onClick={OnSortpostData}>
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
          <Post posts={isClicked ? filterPost : postsData} />
        </QuestionPostsWrapper>
      </Container>
    </div>
  )
}

export default QuestionPostPage

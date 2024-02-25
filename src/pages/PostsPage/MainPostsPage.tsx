import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header2 from '../../components/Header2.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import PostsBar from '../../components/sidebar/Postsbar'
import commentImg from '../../assets/images/comment2.png'
import likeimg from '../../assets/images/likeicon.png'
import DividerImg from '../../assets/images/divider1.png'

interface postsData {
  id: number
  title: string
  content: string
  likeCount: number
  commentCount: number
  nickname: string
  createdAt: string
  interests: string
  category: 'FREE'
  recruitmentStatus: boolean
}

const Container = styled.div`
  display: flex;
  margin-top: 100px;
`
const FreePostsWrapper = styled.div`
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
const Btn = styled.button`
  width: 124px;
  height: 48px;
  border-radius: 10px;
  border: none;
  font-size: 24px;
  margin-right: 36px;
  background-color: #e8e8e8;
  color: #bdbdbd;
  &:hover,
  &:active {
    font-weight: bold;
    color: #650fa9;
    background-color: rgba(220, 196, 239, 0.4); /* #dcc4ef의 60% 투명한 버전 */
  }
`
const SearchWrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 0;
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

const MainPosts = styled(Link)`
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
const Listoption = [
  { value: 'LIKE', name: '좋아요 순' },
  { value: 'LATEST', name: '최신 순' },
  { value: 'COMMENT', name: '댓글 순' },
]

function MainPostPage() {

  const [listoption, SetListoption] = useState('')
  const [postsData, SetpostData] = useState<postsData[]>([])

  const OnListtHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetListoption(e.target.value)
  }

//게시글 전체조회
  const getPost = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get('http://studymate-tuk.kro.kr:8080/api/posts', {
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
      if (listoption === 'LATEST') {
        //최신 순 option을 선택했을 경우
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      } else if (listoption === 'LIKE') {
        //좋아요 순 option을 선택했을 경우
        return b.likeCount - a.likeCount
      } else if (listoption === 'COMMENT') {
        return b.commentCount - a.commentCount
      }
      return 0
    })
    SetpostData(sortList)
  }
 
    //게시글 검색
    const [searchkeyword, SetSearchKeyword]= useState("")

    const searchpost = async ()=> {
      if(searchkeyword !==''){
        try {
          const access = localStorage.getItem('accessToken')
          const response = await axios.get(`http://studymate-tuk.kro.kr:8080/api/posts/search`, {
            params: {keyword : searchkeyword},
            headers: { Authorization: `Bearer ${access}` },
          })
          SetpostData(response.data)
        } catch (error) {}
      } else if(searchkeyword ==''){
        alert("검색어를 입력해주세요")
        getPost(); //검색어 입력 안했을 경우 전체게시물 불러오기 >> 이미 검색한 이후 다른 단어로 검색해도 게시글이 출력될 수 있게
      }}

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <PostsBar />
        <FreePostsWrapper>
          <Upper>
            <BtnWrapper>
              <Btn>국어</Btn>
              <Btn>수학</Btn>
              <Btn>영어</Btn>
              <Btn>과학</Btn>
              <Btn>코딩</Btn>
            </BtnWrapper>
            <SearchWrapper>
              <Search>
              <Input type="text" value={searchkeyword} onChange={(e)=>SetSearchKeyword(e.target.value)} placeholder="검색 내용을 입력하세요 (제목, 글쓴이, 내용)"/>
              <SerarchBtn onClick={searchpost}>검색</SerarchBtn>
              </Search>
              <SideWrapper>
                <SelectBox value={listoption} onChange={OnListtHandler} onClick={OnSortpostData}>
                  {Listoption.map((item) => (
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
          {postsData
          .filter(post => post.category === 'FREE')
          .map((post) => (
            <MainPosts key={post.id} to={`/posts/${post.id}`}>
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
            </MainPosts>
          ))}
        </FreePostsWrapper>
      </Container>
    </div>
  )
}
export default MainPostPage

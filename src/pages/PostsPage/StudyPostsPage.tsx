import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Header2 from '../../components/Header2.tsx';
import Navbar2 from '../../components/Navbar2.tsx';
import PostsBar from '../../components/sidebar/Postsbar';
import commentImg from '../../assets/images/comment2.png';
import likeimg from '../../assets/images/likeicon.png';
import DividerImg from '../../assets/images/divider1.png';

interface postsData {
  title: string,
  context: string,
  likeCount: number,
  commentCount: number,
  dateCreated: string,
  writer: string,
}
const Container = styled.div`
  display: flex;
  margin-top: 100px;
`
const StudyPostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 400px);
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
margin-right:36px;
background-color: #E8E8E8;
color: #BDBDBD;
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
  padding: 10px 10px 10px 0;
  justify-content: space-between;
  margin-bottom: 10px;
`
const SideWrapper = styled.div`
 display: flex;
`
const Input = styled.input`
  text-indent: 30px;
  width: 760px;
  height:65px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  font-size: 24px;
`
const SelectBox = styled.select`
  width: 120px;
  height: 50px;
  border-radius: 5px;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  margin-right:20px;
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

const StudyPosts = styled(Link)`
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
const Sortlist =[
  { value: "LIKE", name: "좋아요 순"},
  { value: "LATEST", name: "최신 순"},
];

function StudyPostPage() {
  const [sortlist, SetsortList] = useState("")

  const OnListtHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetsortList(e.target.value)
  }

  const [postsData, setPostsData] = useState<postsData>({
    title: '오프라인 스터디 하실 분~',
    context: '리액트로 한 3~4명 정도 스터디 할 생각입니다!',
    likeCount:48,
    commentCount: 3,
    dateCreated: '12/25',
    writer: '정환코딩',
})
  return (
      <div>
        <Header2/>
        <Navbar2/>
        <Container>
          <PostsBar/>
            <StudyPostsWrapper>
              <Upper>
                <BtnWrapper>
                <Btn >모집중</Btn>
                <Btn >모집완료</Btn>
                </BtnWrapper>
                <SearchWrapper>
                <Input type="text" placeholder="검색 내용을 입력하세요 (제목, 글쓴이, 내용)" />
                <SideWrapper>
                <SelectBox value={sortlist} onChange={OnListtHandler}>
                {Sortlist.map((item) => (
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
                     <StudyPosts to='/posts/${id}'>
                     <Title>{postsData.title}</Title>
                     <Context>{postsData.context}</Context>
                     <FooterWrapper>
                      <LikeImg src={likeimg}/>
                      <Likecount>{postsData.likeCount}</Likecount>
                      <CommentImg src={commentImg} />
                      <CommentCount>{postsData.commentCount}</CommentCount>
                      <Divider src={DividerImg} />
                      <DateCreated>{postsData.dateCreated}</DateCreated>
                      <Divider src={DividerImg} />
                      <Writer>{postsData.writer}</Writer>
                    </FooterWrapper>
                     </StudyPosts>
            </StudyPostsWrapper>
        </Container>
      </div>
    );
  }

export default StudyPostPage 
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header2 from '../../components/Header2.tsx';
import Navbar2 from '../../components/Navbar2.tsx';
import PostBar from '../../components/sidebar/Postbar.tsx';
import commentImg from '../../assets/images/comment2.png';
import likeimg from '../../assets/images/likeicon.png';
import DividerImg from '../../assets/images/divider1.png';


const Container = styled.div`
  display: flex;
  margin-top: 100px;
`
const QuestionPostWrapper = styled.div`
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
    border-radius: 10px;
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
  background-color: white;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  font-size: 24px;
`
const SelectBox = styled.select`
  color: black;
  width: 120px;
  height: 50px;
  border-radius: 5px;
  border: 0.5px solid #bdbdbd;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  margin-right:20px;
  &:hover,
  &:active {
    color: black;
    border-radius: 5px;
  }
`

const WriteButton = styled.button`
  color: black;
  width: 120px;
  height: 50px;
  border-radius: 5px;
  border: 0.5px solid #bdbdbd;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  cursor: pointer;
`

const MainPost = styled.div`
  display: flex;
  height: 200px;
  padding: 20px 0px 0px 20px;
  width: calc(100% - 100px);
  border: 1px solid #d8d8d8;
  flex-direction: column;
  justify-content: center;
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
margin-left: 20px;
  margin-right: 20px;
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

function QuestionPostPage() {
  const posts = [
    {
      title: '자바 환경설정 어떻게 하나요',
      context: '환경설정에서 막혔어요ㅜㅜ',
      likeCount:48,
      commentCount: 3,
      dateCreated: '12/25',
      writer: '정환코딩',
    },
  ]
  return (
      <div>
        <Header2/>
        <Navbar2/>
        <Container>
          <PostBar/>
            <QuestionPostWrapper>
              <Upper>
                <BtnWrapper>
                <Btn >국어</Btn>
                <Btn >수학</Btn>
                <Btn >영어</Btn>
                <Btn >과학</Btn>
                <Btn >코딩</Btn>
                </BtnWrapper>
                <SearchWrapper>
                <Input type="text" placeholder="검색 내용을 입력하세요 (제목, 글쓴이, 내용)" />
                <SideWrapper>
                <SelectBox></SelectBox>
                <Link to="/posts/write">
                <WriteButton>글쓰기</WriteButton>
                </Link>
                </SideWrapper>
                </SearchWrapper>
              </Upper>
                  {posts.map((post, index)=>(
                     <MainPost key={index}>
                     <Title>{post.title}</Title>
                     <Context>{post.context}</Context>
                   <FooterWrapper>
                     <LikeImg src={likeimg}/>
                     <Likecount>{post.likeCount}</Likecount>
                     <CommentImg src={commentImg} />
                     <CommentCount>{post.commentCount}</CommentCount>
                     <Divider src={DividerImg} />
                     <DateCreated>{post.dateCreated}</DateCreated>
                     <Divider src={DividerImg} />
                     <Writer>{post.writer}</Writer>
                   </FooterWrapper>
                     </MainPost>
                  ))}
            </QuestionPostWrapper>
        </Container>
      </div>
    );
  }

export default QuestionPostPage 
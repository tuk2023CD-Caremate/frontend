import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Header2 from '../../components/Header2.tsx';
import Navbar2 from '../../components/Navbar2.tsx';
import PostsBar from '../../components/sidebar/Postsbar.tsx';
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
const Listoption =[
  { value: "LIKE", name: "좋아요 순"},
  { value: "LATEST", name: "최신 순"},
];


function QuestionPostPage() {
  const [listoption, SetListoption] = useState("")

  const [postsData, SetpostData] = useState<postsData[]>([
    {
      title: 'java 환경설정 어떻게 하나요?',
      context: '한시간 째 하고 있는데 잘 안되네요ㅠㅠ',
      likeCount:1,
      commentCount: 3,
      dateCreated: '2023/05/02',
      writer: '정환코딩',
    },

    {
      title: '영어 해석 도와줄 사람?',
      context: 'I like you 해석 해줘!!',
      likeCount:125,
      commentCount: 5,
      dateCreated: '2023/11/11',
      writer: '틀니개',
    },

    {
      title: '수1 이차방정식 문제 질문합니다',
      context: '왜 b가 2인가요?',
      likeCount:32,
      commentCount: 1,
      dateCreated: '2024/09/22',
      writer: '장히수',
    },

    {
      title: '이거 코드 에러뜨는데',
      context: '왜 에러뜨는지 모르겟어,,,',
      likeCount:4,
      commentCount: 3,
      dateCreated: '2022/01/03',
      writer: '나야나',
    },
  ])
    
  const OnListtHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetListoption(e.target.value)
  }

  const OnSortpostData = () =>{

    const sortList = postsData.slice(0).sort((a, b) => {
       
      if(listoption === "LATEST"){ //최신 순 option을 선택했을 경우
        return new Date(b.dateCreated).valueOf() - new Date(a.dateCreated).valueOf(); 
      }
      else if(listoption === "LIKE"){ //좋아요 순 option을 선택했을 경우
        return b.likeCount - a.likeCount;
    }
    return 0;
  });
  SetpostData(sortList);
  }
  return (
      <div>
        <Header2/>
        <Navbar2/>
        <Container>
          <PostsBar/>
            <QuestionPostsWrapper>
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
              {postsData.map((post, index)=>(
              <QuestionPosts key={index} to='/posts/questions/${id}' >
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
              </QuestionPosts>
            ))}
          </QuestionPostsWrapper>
        </Container>
      </div>
    );
  }

export default QuestionPostPage 
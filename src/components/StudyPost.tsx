import React, {useState} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import bubbleimg  from '../assets/images/bubble.png';

const GlobalStyle = createGlobalStyle`
* {
  font-family: "Pretendard";
  margin: 0;
  padding: 0;
}
body {
    background-color: #fff;
  }
 
`

const PostContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  margin-left: 40px;
 
`
const Section = styled.div`
  width: 700px;
`

const SectionHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-left: 15px;
`
const Btn = styled.button`
width: 70px;
height: 30px;
border-radius: 10px;
border: none;
font-size: 12px;
margin-right:10px;
&:hover,
  &:active {
    font-weight: bold;
    color: #650fa9;
    background-color: rgba(220, 196, 239, 0.4); /* #dcc4ef의 60% 투명한 버전 */
    border-radius: 10px;
  }
`
const PostHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e8e8e8;
`

const Input = styled.input`
  text-indent: 20px;
  width: 400px;
  height:35px;
  background-color: white;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  font-size: 12px;
`

const WriteButton = styled.button`
  color: black;
  width: 70px;
  height: 35px;
  border-radius: 3px;
  border: 0.5px solid #bdbdbd;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40%;
  &:hover,
  &:active {
    color: black;
    border-radius: 5px;
  }
`


const PostGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const PostInfo = styled.a`
  color: #000;
  padding: 15px;
  border-bottom: 1px solid #e8e8e8;
  &:hover,
  &:active {
    color: #000;
  }
`

const PostTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`

const PostBody = styled.p`
  font-size: 15px;
  font-weight: normal;
  margin-top: 5px;
`

const PostInfoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  font-weight: lighter;
`

const PostInfoDetail = styled.div`
  display: flex;
`

const InfoDetail = styled.span`
  margin-right: 5%;
`
const PostData = styled.div`
  display: flex;
  align-items: center;
`
const CommentImg = styled.img`
  margin-right: 5px;
  width: 15px;
  height: 15px;
`
const Comment = styled.span`
  font-weight: bold;
`
const Like = styled.img`
  margin-right: 15px;
  width: 11px;
  height: 11px;
`

export default function MainPost() {
  const [like, setLike] = useState('src/assets/images/unlikeicon.png')
  const [isClicked, setIsClicked] = useState(false)

  const HandleClick = () => {
    if (isClicked) {
      setLike('src/assets/images/unlikeicon.png')
      setIsClicked(false)
    } else {
      setLike('src/assets/images/likeicon.png')
      setIsClicked(true)
    }
  }
  return (
    <>
      <GlobalStyle />
      <PostContainer>
        <Section>
          <SectionHeader>
              <Btn>모집중</Btn>
              <Btn >모집 완료</Btn>
          </SectionHeader>
          <PostGroup>
            <PostHeader>
              <Input type="text" placeholder="검색 내용을 입력하세요" />
              <WriteButton as="a" href="/writing">
              {' '}
              글쓰기
            </WriteButton>
            </PostHeader>
            <PostInfo href="/">
              <PostTitle>제목</PostTitle>
              <PostBody>상세 게시글 내용</PostBody>
              <PostInfoFooter>
                <PostInfoDetail>
                  <InfoDetail>heesu52@naver.com</InfoDetail>
                  <InfoDetail>12/25</InfoDetail>
                  <InfoDetail>23:00</InfoDetail>
                </PostInfoDetail>
                <PostData>
                  <Like src={like} onClick={HandleClick} />
                  <CommentImg src={bubbleimg} />
                  <Comment>3</Comment>
                </PostData>
              </PostInfoFooter>
            </PostInfo>
          </PostGroup>
        </Section>
      </PostContainer>
    </>
  )
}

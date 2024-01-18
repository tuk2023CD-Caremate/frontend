import React, {useState} from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  font-family: "Pretendard";
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {

    background-color: #fff;
  }
`

const PostContainer = styled.nav`
background-color: #bdbdbd;
  width: 100vw;
  height: 100vh; 

`

const SideNavbar = styled.div`
background-color: #944949;
  height: 190px;
  width: 200px;

`

const SideClick = styled.a`
color: #000;
font-weight: normal;
display: flex;
justify-items: baseline;
padding: 5%;

&:hover,
  &:active {
    font-weight: bold;
    color: #650fa9;
     background-color: rgba(220, 196, 239, 0.15); /* #dcc4ef의 60% 투명한 버전 */
     border-radius: 10px;
     
  }
`

const Section = styled.div`
`

const SectionHeader = styled.div`
width: 600px;
display: flex;
align-items: center;
right: 15%;
`

const Input = styled.input`
  text-indent: 20px;
  width: 200px;
  height: 35px;
  background-color: white;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  font-weight: normal;
  margin-right: 50%;
`

const WriteButton = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 3px;
  border: 0.5px solid #bdbdbd;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`


const PostGroup = styled.ul`
`
const PostInfo = styled.div`
`
const PostTitle = styled.h3`
`
const PostBody = styled.p`
`
const PostInfoFooter = styled.div`
`
const PostInfoDetail = styled.div`
`
const InfoDetail = styled.span`
`
const PostData = styled.div`
`
const CommentImg = styled.img`
`
const Comment = styled.span`
`

export default function MainPost() {
    return (
        <>
        <GlobalStyle/>
        <PostContainer>
            <SideNavbar>
                <SideClick href="/api/login">최근 게시글</SideClick>
                <SideClick href="/api/login">인기 게시글</SideClick>
                <SideClick href="/api/login">내가 쓴 게시글</SideClick>
                <SideClick href="/api/login">분야 별 게시글</SideClick>
            </SideNavbar>
            <Section>
                <SectionHeader>
                    <Input type="text" placeholder="검색 내용을 입력하세요" />
                    <WriteButton> 글쓰기</WriteButton>
                </SectionHeader>
                <PostGroup>
                    <PostInfo>
                        <PostTitle>제목</PostTitle>
                        <PostBody>상세 게시글 내용</PostBody>
                        <PostInfoFooter>
                            <PostInfoDetail>
                                <InfoDetail>heesu52@naver.com</InfoDetail>
                                <InfoDetail>12/25</InfoDetail>
                                <InfoDetail>23:00</InfoDetail>
                            </PostInfoDetail>
                            <PostData>
                                <CommentImg></CommentImg>
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
   
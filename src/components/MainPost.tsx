import React, {useState} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import image  from '../assets/images/bubble.png';

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

const PostContainer = styled.nav`
background-color: #ffffff;
display: flex;
margin-left: 15%;
margin-right: 15%;
`

const SideNavbar = styled.div`
background-color: #ffffff;
  height: 190px;
  width: 200px;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`


const SideClick = styled.button`  //버튼클릭시 파란색 border 지우기 
color: #000;
font-weight: normal;
margin-left: 10px;
padding: 5%;
border-bottom: 1px solid #e8e8e8;
text-align: start;
&:hover,
  &:active {
    font-weight: bold;
    color: #650fa9;
    background-color: rgba(220, 196, 239, 0.4); /* #dcc4ef의 60% 투명한 버전 */
    border-radius: 5px;
  }
`


const Section = styled.div`
margin-left: 5%;
margin-top: 5%;
`

const SectionHeader = styled.div`
width: 700px;
height: 35px;
display: flex;
align-items: center;
padding-bottom: 5%;
border-bottom: 1px solid #e8e8e8;
`

const Input = styled.input`
  text-indent: 20px;
  width: 400px;
  height: 40px;
  background-color: white;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  font-weight: normal;
`

const WriteButton = styled.button`
  width: 70px;
  height: 40px;
  border-radius: 3px;
  border: 0.5px solid #bdbdbd;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30%;
`


const PostGroup = styled.ul`
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
margin-right: 10%;
`
const CommentImg = styled.div`
background: url(${image});
width: 10px;
height: 10px;
`
const Comment = styled.span`
`


export default function MainPost() {
    return (
        <>
        <GlobalStyle/>
        <PostContainer>
            <SideNavbar>
              <SideClick as="a" href="/">최근 게시글</SideClick>
              <SideClick as="a" href="/">인기 게시글</SideClick>
              <SideClick as="a" href="/">내가 쓴 게시글</SideClick>
              <SideClick>분야 별 게시글</SideClick>
            </SideNavbar>
            <Section>
                <SectionHeader>
                    <Input type="text" placeholder="검색 내용을 입력하세요" />
                    <WriteButton> 글쓰기</WriteButton>
                </SectionHeader>
                <PostGroup>
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
                                <CommentImg/>
                                <Comment>3</Comment>
                            </PostData>
                        </PostInfoFooter>
                    </PostInfo>
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
                                <CommentImg/>
                                <Comment>3</Comment>
                            </PostData>
                        </PostInfoFooter>
                    </PostInfo>
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
                                <CommentImg/>
                                <Comment>3</Comment>
                            </PostData>
                        </PostInfoFooter>
                    </PostInfo>
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
                                <CommentImg/>
                                <Comment>3</Comment>
                            </PostData>
                        </PostInfoFooter>
                    </PostInfo>
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
                                <CommentImg/>
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
   
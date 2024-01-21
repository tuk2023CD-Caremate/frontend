import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import offlineimage from '../assets/images/offline.png'
import mypageimage from '../assets/images/mypage.png'
import studyingimage from '../assets/images/studying.png'
import postimage from '../assets/images/post.png'
import onlineimage from '../assets/images/online.png'

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}
body {
    background-color: #fff;
  }
`
const FrameContainer = styled.nav`
  background-color: #fff;
  width:100%;
  height: 50px;
  border-bottom: 1px solid #e8e8e8;  
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
`

const TextGroup = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const NavbarClick = styled.a`
color: #000;
font-size: 14px;
font-weight: normal;
white-space: nowrap;
margin-left: 10%;
margin-right: 10%;
&:hover,
  &:active {
    font-weight: bold;
    color: #650fa9;
     background-color: rgba(220, 196, 239, 0.3); /* #dcc4ef의 60% 투명한 버전 */
     border-radius: 3px;

  }
`




export default function Navbar() {
    return (
     <>
      <GlobalStyle/>
      <FrameContainer>
          <TextGroup>
            <NavbarClick href="/api/login">오프라인 매칭</NavbarClick>
            <NavbarClick href="/api/login">온라인 매칭</NavbarClick>
            <NavbarClick href="/api/login">게시판</NavbarClick>
            <NavbarClick href="/api/login">스터디 기록</NavbarClick>
            <NavbarClick href="/api/login">마이페이지</NavbarClick>
        </TextGroup>
      </FrameContainer>
    </>
  );
}


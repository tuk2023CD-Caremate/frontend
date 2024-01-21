import React from 'react'
import { Link } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

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
const HeaderContainer = styled.div`
  background-color: #fff;
  width:100%;
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`

const HeaderLogo = styled.a`
  color: #650fa9;
  font-size: 27px;
  font-weight: bold;
  margin-left: 15%;
  &:hover,
  &:active {
    color: #650fa9;
  }
`

const HeaderInput = styled.input`
  text-indent: 20px;
  width: 370px;
  height: 40px;
  background-color: white;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  flex-shrink: 0;
  font-weight: 600;
`

const HeaderMember = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15%;
`

const HeaderLogin = styled.a`
  color: #000;
  flex-shrink: 0;
  font-size: 14px;
  margin-right: 10%;
  &:hover,
  &:active {
    color: #650fa9;
    font-weight: bold;
  }
`

const HeaderSignup = styled.button`
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

`

export default function Header() {
  return (
    <>
      <GlobalStyle />
      <HeaderContainer>
        <HeaderLogo href="/home">StudyMate</HeaderLogo>
        <HeaderInput type="text" placeholder="검색 내용을 입력하세요" />
        <HeaderMember>
          <HeaderLogin href="/api/login">로그인</HeaderLogin>
          <Link to="/api/signup">
          <HeaderSignup> 회원가입</HeaderSignup>
          </Link>
        </HeaderMember>
      </HeaderContainer>
    </>
  )
}

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  margin-top: -8px;
  padding: 0;
  box-sizing: border-box;
}
body {
    font-family: 'Pretendard Variable', sans-serif;
  }
`;
const HeaderContainer = styled.div`
background-color: #FFF;
width: 100vw;
height: 70px;   //반응형으로 수정할 경우 함께 고쳐야 함, 모니터에 따라 달라짐
display: flex;
align-items: center;
padding: 0 15%;
border-bottom: 1px solid #E8E8E8;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 20px;
`;

const HeaderH2 = styled.h2`
color: #650FA9;
font-size: 27px;
font-style: normal;
font-weight: 600;
line-height: 70px;
margin-right: 10%;
`;

const HeaderInput = styled.input`
text-indent: 20px;
width: 370px;
height: 40px;
background-color: white;
border: 1px solid #BDBDBD;
border-radius: 5px;
flex-shrink: 0;
font-weight: 600;
margin-right: 15%;
`;

const HeaderMember = styled.div`
width: 100px;
display: flex;
align-items: center;

`;

const HeaderLogin = styled.a`
color: #000;
margin-right: 15%;
flex-shrink: 0;
font-size: 14px;
&:hover,
&:active {
  color: #650FA9;
}
`;

const HeaderSignup = styled.button`
width: 70px;
height: 40px;
border-radius: 3px;
border: 0.5px solid #BDBDBD;
background: #FFF;
box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.10);
font-size: 14px;
white-space: nowrap;
display: flex;
align-items: center;
justify-content: center;
`;

export default function Header() {  
  return (
    <>
    <GlobalStyle />
    <HeaderContainer>
      <HeaderH2>StudyMate</HeaderH2>
      <HeaderInput type="text" placeholder="검색 내용을 입력하세요" />
      <HeaderMember>
        <HeaderLogin href="#">로그인</HeaderLogin>
        <HeaderSignup>회원가입</HeaderSignup>
      </HeaderMember>
    </HeaderContainer>
    </>
  );
}

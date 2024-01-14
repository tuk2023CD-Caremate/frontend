import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import google_login from "D:/Project/frontend/src/assets/images/google_login.png";
import kakao_login from "D:/Project/frontend/src/assets/images/kakao_login.png";
const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: none;
}
body {
  font-family: "Pretendard Variable";
  }
`;
const LoginWrapper = styled.div`
margin-left: auto;
margin-right: auto;
width: 450px;
height: 618px;
padding: 40px;
box-sizing: border-box;
border-radius: 10px;
border: 1px solid var(--Gray-03, #BDBDBD);
`;

const LoginH2 = styled.h2`
width: 100%;
height: 40px;
color: #650FA9;
font-size: 35px;
font-weight: 600;
text-align: center;
margin-bottom: 50px;
margin-left: auto;
margin-right: auto;
`;

const LoginInput = styled.input`
text-indent: 20px;
width: 100%;
height: 48px;
padding: 0 10px;
box-sizing: border-box;
background-color: #F8F8F8;
border-radius:5px;
margin-bottom: 16px;
font-size: 14px;
`;

const LoginSubmit = styled.input`
width: 100%;
height: 55px;
border-radius: 10px;
border: 1px solid var(--Gray-03, #BDBDBD);
background: var(--bdbdbd, #650FA9);
color: var(--White, #FFF);
text-align: center;
font-size: 16px;
font-weight: 600;
margin-top: 20px;
`;

const FindMore = styled.p`
width: 100%;
height: 17px;
margin-top: 10px;
text-align: center;
`;

const FindIt = styled.a`
font-size: 12px;
font-weight: 600;
line-height: normal;
padding-left: 14px;
padding-right: 14px;
color: #bdbdbd;
&:hover,
&:active {
  color: #650FA9;
}
`;

const LoginH4 = styled.h4`
height: 20px;
text-align: center;
font-size: 16px;
font-weight: 600;
line-height: normal; 
color: #BDBDBD;
margin-top: 40px;
`;

const SubmitBtn = styled.div`
text-align: center;
    height: 75px;
`;

const KakaoSubmit = styled.input`
background-image: url(${kakao_login});
background-size: cover;
border-radius: 5px;
width: 175px;
height: 45px;
margin-top: 15px;
display: inline-block;
`;
const GoogleSubmit = styled.input`
background-image: url(${google_login});
background-size: cover;
width: 175px;
height: 40px;
position: absolute;
margin-top:35px;
left: 50%;
transform: translate(-50%, 100%);
`;

export default function Login() {
  return(
    <>
      <GlobalStyle />
      <LoginWrapper>
        <LoginH2>Login to StudyMate</LoginH2>
        <LoginInput type="email" placeholder="이메일" />
        <LoginInput type="password" placeholder="비밀번호" />
        <LoginSubmit type="submit" value="로그인" />
        <FindMore>
          <FindIt href="#">아이디(이메일)찾기</FindIt>
          <FindIt href="#">비밀번호 찾기</FindIt>
          <FindIt href="#">회원가입</FindIt>
        </FindMore>
        <LoginH4>간편로그인</LoginH4>
        <SubmitBtn>
          <KakaoSubmit type="submit" value="" />
          <GoogleSubmit type="submit" value="" />
        </SubmitBtn>
      </LoginWrapper>
    </>
  );
}
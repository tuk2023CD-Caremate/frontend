import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import google_login from '../assets/images/google_login.png'
import kakao_login from '../assets/images/kakao_login.png'
const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: none;
}
body {
  font-family: "Pretendard Variable";
  background-color: #fff;
  }
`
const LoginWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  width: 450px;
  height: 580px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid var(--Gray-03, #bdbdbd);
`

const LoginH2 = styled.h2`
  width: 100%;
  height: 40px;
  color: #650fa9;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
`

const LoginInput = styled.input`
  text-indent: 20px;
  width: 100%;
  height: 48px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border-radius: 5px;
  margin-bottom: 16px;
  font-size: 14px;
`

const LoginButton = styled.button`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  border: 1px solid var(--Gray-03, #bdbdbd);
  background: var(--bdbdbd, #650fa9);
  color: var(--White, #fff);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
`

const FindMore = styled.p`
  width: 100%;
  height: 17px;
  margin-top: 10px;
  text-align: center;
`

const FindIt = styled.a`
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  padding-left: 14px;
  padding-right: 14px;
  color: #bdbdbd;
  &:hover,
  &:active {
    color: #650fa9;
  }
`

const LoginH4 = styled.h4`
  height: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  color: #bdbdbd;
  margin-top: 40px;
`

const SubmitBtn = styled.div`
  text-align: center;
  height: 75px;
`

const KakaoSubmit = styled.input`
  background-image: url(${kakao_login});
  background-size: cover;
  border-radius: 5px;
  width: 175px;
  height: 45px;
  margin-top: 15px;
  display: inline-block;
`
const GoogleSubmit = styled.input`
  background-image: url(${google_login});
  background-size: cover;
  width: 175px;
  height: 40px;
  position: absolute;
  margin-top: 35px;
  left: 50%;
  transform: translate(-50%, 100%);
`

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailHandler = (e: { currentTarget: { value: React.SetStateAction<string> } }) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e: { currentTarget: { value: React.SetStateAction<string> } }) => {
    setPassword(e.currentTarget.value)
  }

  const onLoginHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('email: ' + email, 'password: ' + password)

    if (email === '' || password === '') {
      window.alert('이메일 또는 비밀번호를 확인해주세요.')
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/login', { //포트번호 잘못 작성함 5173은 내 포트, 아마 8000이거나 8080
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      })

      console.log('서버 응답', response)

      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.')
      }

      const data = await response.json()
      console.log('서버 응답 데이터:', data)

      // 로그인 성공 후, 다른 동작을 수행하거나 페이지를 이동할 수 있음
    } catch (error) {
      console.error('로그인 오류:', error)
      window.alert('로그인에 실패했습니다.')
    }
  }

  return (
    <>
      <GlobalStyle />
      <LoginWrapper>
        <form onSubmit={onLoginHandler}>
          <LoginH2>Login to StudyMate</LoginH2>
          <LoginInput type="text" placeholder="이메일" value={email} onChange={onEmailHandler} />
          <LoginInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
          />
          <LoginButton>로그인</LoginButton>
          <FindMore>
            <FindIt href="/findid">아이디 찾기</FindIt>
            <FindIt href="findpwd">비밀번호 찾기</FindIt>
            <FindIt href="/api/signup">회원가입</FindIt>
          </FindMore>
          <LoginH4>간편로그인</LoginH4>
          <SubmitBtn>
            <KakaoSubmit type="submit" value="" />
            <GoogleSubmit type="submit" value="" />
          </SubmitBtn>
        </form>
      </LoginWrapper>
    </>
  )
}

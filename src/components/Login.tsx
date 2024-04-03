import React, { useState } from 'react'
import styled from 'styled-components'
import google_login from '../assets/images/google_login.png'
import kakao_login from '../assets/images/kakao_login.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useApiUrlStore } from '../store/store'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 800px;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid var(--Gray-03, #bdbdbd);
`

const LoginH2 = styled.h2`
  width: 500px;
  height: 40px;
  color: #650fa9;
  font-size: 46px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 100px;
`

const LoginInput = styled.input`
  text-indent: 20px;
  width: 600px;
  height: 70px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border-radius: 10px;
  margin: 10px;
  font-size: 20px;
`

const LoginButton = styled.button`
  width: 600px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid var(--Gray-03, #bdbdbd);
  background: var(--bdbdbd, #650fa9);
  color: var(--White, #fff);
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  &:active {
    background: #490e76;
  }
`

const FindMore = styled.p`
  width: 100%;
  height: 17px;
  margin-top: 10px;
  text-align: center;
`

const FindIt = styled.a`
  font-size: 20px;
  font-weight: 600;
  padding-left: 14px;
  padding-right: 14px;
  color: #bdbdbd;
  text-decoration: none;
  &:hover,
  &:active {
    color: #650fa9;
  }
`

const LoginH4 = styled.div`
  margin-top: 60px;
  margin-bottom: 20px;
  height: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #bdbdbd;
`

const KakaoSubmit = styled.img`
  border-radius: 5px;
  width: 280px;
  margin: 10px;
`
const GoogleSubmit = styled.img`
  border-radius: 5px;
  width: 280px;
  margin: 10px;
`

export default function Login() {
  const { apiUrl } = useApiUrlStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onEmailHandler = (e: { currentTarget: { value: React.SetStateAction<string> } }) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e: { currentTarget: { value: React.SetStateAction<string> } }) => {
    setPassword(e.currentTarget.value)
  }

  const onLoginHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (email === '' || password === '') {
      alert('이메일 또는 비밀번호를 확인해주세요.')
      return
    }

    try {

      const response = await axios.post(`${apiUrl}/login`, {
        email: email,
        password: password,
      })

      const responsedToken = response.data.token

      localStorage.setItem('accessToken', responsedToken)
      alert('로그인에 성공하였습니다.')
      navigate('/mypage')
    } catch (error) {
      alert('로그인에 실패했습니다.')
    }
  }

  return (
    <Container>
      <form onSubmit={onLoginHandler}>
        <LoginWrapper>
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
            <FindIt href="/signUp">회원가입</FindIt>
          </FindMore>
          <LoginH4>간편로그인</LoginH4>
          <KakaoSubmit src={kakao_login} />
          <GoogleSubmit src={google_login} />
        </LoginWrapper>
      </form>
    </Container>
  )
}

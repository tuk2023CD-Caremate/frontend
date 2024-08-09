import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
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
  width: 43.75rem;
  height: 40rem;
  padding: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--Gray-03, #bdbdbd);
  margin-bottom: 7rem;
`

const LoginH2 = styled.h2`
  width: 75%;
  height: 10%;
  color: #650fa9;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 5rem;
`

const LoginInput = styled.input`
  text-indent: 1.25rem;
  width: 85%;
  height: 12%;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border-radius: 0.625rem;
  margin: 0.625rem;
  font-size: 1.25rem;
`

const LoginButton = styled.button`
  width: 85%;
  height: 12%;
  border-radius: 0.625rem;
  border: 1px solid var(--Gray-03, #bdbdbd);
  background: var(--bdbdbd, #650fa9);
  color: var(--White, #fff);
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.625rem;
  &:active {
    background: #490e76;
  }
  margin-top: 5rem;
`

const FindMore = styled.p`
  width: 100%;
  height: 1rem;
  margin-top: 0.625rem;
  text-align: center;
`

const FindIt = styled.a`
  font-size: 1.25rem;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #bdbdbd;
  text-decoration: none;
  &:hover,
  &:active {
    color: #650fa9;
  }
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

      const access = response.data.accessToken
      const refresh = response.data.refreshToken

      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
      alert('로그인에 성공하였습니다.')
      navigate('/mypage/profile')
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
            <FindIt href="/signUp">계정이 없으신가요? 회원가입</FindIt>
          </FindMore>
        </LoginWrapper>
      </form>
    </Container>
  )
}

import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: none;
  justify-content: center;
  align-items: center;
}
`

const SignUpWrapper = styled.div`
  width: 450px;
  height: 630px;

  box-sizing: border-box;
  border-radius: 10px;
  border: 0.5px solid var(--Gray-03, #bdbdbd);
  display: flex;
  justify-content: center;
  align-items: center;
`

const SignUpH2 = styled.h2`
  width: 100%;
  color: #650fa9;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
`

const SignUpInput = styled.input`
  text-indent: 20px;
  width: 300px;
  height: 43px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  border: 1px #bdbdbd solid;
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SelectBox = styled.div`
  display: flex;
  justify-content: center;
`

const RoleSelect = styled.select`
  width: 100px;
  height: 30px;
  margin-right: 15%;
  border: 1px #bdbdbd solid;
  border-radius: 10px;
`
const InterestsSelect = styled.select`
  width: 100px;
  height: 30px;
  border: 1px #bdbdbd solid;
  border-radius: 10px;
`

const Option = styled.option`
  text-align: center;
`


const Checkbox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
`

const AgreeCheck = styled.input`
  width: 12px;
  height: 12px;
  background-color: #fff;
  border: 1.5px solid gainsboro;
  border-radius: 4px;

  &:checked {
    //추후 check표시 이미지 추가
    background-color: #650fa9;
    border: 1px #650fa9 solid;
  }
`


const SignUpSubmit = styled.button`
  width: 300px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid var(--Gray-03, #bdbdbd);
  background: var(--bdbdbd, #650fa9);
  color: var(--White, #fff);
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
`

export default function Login() {
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassowrd2] = useState('')
  const [interests, SetInterests] = useState('')
  const [part, SetPart] = useState('')

  const onNameHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    // 리팩토링할 때 함수 한번에 합치는걸로 수정
    setName(e.target.value)
  }

  const onEmailHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setEmail(e.target.value)
  }
  const onNickNameHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setNickname(e.target.value)
  }

  const onPassword1Handler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(e.target.value)
  }
  const onPassword2Handler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPassowrd2(e.target.value)
  }
  const onInterestHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetInterests(e.target.value)
  }

  const onPartHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetPart(e.target.value)
  }

  const onSignupHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (
      email === '' ||
      password === '' ||
      name === '' ||
      nickname === '' ||
      password2 === '' ||
      part === '' ||
      interests === '' 
  
    ) {
      alert('회원가입에 실패하셨습니다. 입력정보를 다시 확인해주세요.')
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/signIn', {
        //포트번호 잘못 작성함 5173은 내 포트, 아마 8000이거나 8080
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          nickname: nickname,
          part: part,
          interests: interests,
        }),
      })
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.')
      }

      console.log(
        'name: ' + name,
        '/ email: ' + email,
        '/ password: ' + password,
        '/ nickname: ' + nickname,
        '/ part: ' + part,
        '/ interest: ' + interests,
      )
      console.log('서버 응답 상태: ', response.status)

      const data = await response.json()
      console.log('서버 응답 데이터:', data)
    } catch (error) {
      // 로그인 성공 후, 다른 동작을 수행하거나 페이지를 이동할 수 있음
      console.error('회원가입 오류:', error)
      alert('회원가입에 실패했습니다.')
    }
  }

  return (
    <>
      <GlobalStyle />
      <SignUpWrapper>
        <form onSubmit={onSignupHandler}>
          <SignUpH2>SignUp to StudyMate</SignUpH2>
          <SignUpInput type="text" placeholder="이름" value={name} onChange={onNameHandler} />
          <SignUpInput
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={onNickNameHandler}
          />
          <SignUpInput type="email" placeholder="이메일" value={email} onChange={onEmailHandler} />
          <SignUpInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPassword1Handler}
          />
          <SignUpInput
            type="password"
            placeholder="비밀번호 확인"
            value={password2}
            onChange={onPassword2Handler}
          />
          <SelectBox>
            <RoleSelect value={part} onChange={onPartHandler}>
              <Option>MENTOR</Option>
              <Option>멘티</Option>
            </RoleSelect>
            <InterestsSelect value={interests} onChange={onInterestHandler}>
              <Option>MATH</Option>
              <Option>국어</Option>
              <Option>영어</Option>
              <Option>과학</Option>
              <Option>코딩</Option>
            </InterestsSelect>
          </SelectBox>
          <Checkbox>
            <label>
              <AgreeCheck type="checkbox"/> 이용약관 동의
              (필수)
            </label>
            <label>
              <AgreeCheck type="checkbox"/> 개인정보 수집 및
              이용동의 (필수)
            </label>
            <label>
              <AgreeCheck type="checkbox"/> 위치정보서비스
              이용동의 (선택)
            </label>
          </Checkbox>
          <SignUpSubmit onClick={onSignupHandler}>가입하기</SignUpSubmit>
        </form>
      </SignUpWrapper>
    </>
  )
}

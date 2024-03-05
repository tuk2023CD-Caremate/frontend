import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useApiUrlStore } from '../store/store'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 800px;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid var(--Gray-03, #bdbdbd);
`

const SignUpH2 = styled.h2`
  width: 500px;
  height: 40px;
  color: #650fa9;
  font-size: 46px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`

const SignUpInput = styled.input`
  text-indent: 20px;
  width: 600px;
  height: 60px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border-radius: 10px;
  margin: 10px;
  font-size: 20px;
`

const SelectBox = styled.div`
  display: flex;
  justify-content: center;
`

const RoleSelect = styled.select`
  width: 150px;
  height: 40px;
  border: 1px #bdbdbd solid;
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
  margin: 10px;
`
const InterestsSelect = styled.select`
  width: 200px;
  height: 40px;
  border: 1px #bdbdbd solid;
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
  margin: 10px;
`

const Checkbox = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
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

const partList = [
  { value: 'MENTOR', name: 'MENTOR' },
  { value: 'MENTEE', name: 'MENTEE' },
]

const interestsList = [
  { value: 'KOREAN', name: '국어' },
  { value: 'MATH', name: '수학' },
  { value: 'ENGLISH', name: '영어' },
  { value: 'SCIENCE', name: '과학' },
  { value: 'PROGRAMMING', name: 'PROGRAMMING' },
]

export default function SignUp() {
  const { apiUrl } = useApiUrlStore()

  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassowrd2] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [interests, SetInterests] = useState('')
  const [part, SetPart] = useState('')

  const navigate = useNavigate()

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
      alert(' 입력정보를 다시 확인해주세요.')
      return
    }

    try {
      const response = await axios.post(`${apiUrl}/signIn`, {
        email: email,
        password: password,
        name: name,
        nickname: nickname,
        part: part,
        interests: interests,
      })

      console.log(response.status)
      alert('회원가입에 성공하였습니다.')
      navigate('/login')
    } catch (error) {
      alert('회원가입에 실패했습니다.')
    }
  }

  return (
    <Container>
      <form onSubmit={onSignupHandler}>
        <SignUpWrapper>
          <SignUpH2>Sign up to StudyMate</SignUpH2>
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
           <SignUpInput
            type="number"
            placeholder="전화번호"
            value={phonenumber}
          />
          <SelectBox>
            <RoleSelect value={part} onChange={onPartHandler}>
              {partList.map((item) => (
                <option value={item.value} key={item.name}>
                  {item.name}
                </option>
              ))}
            </RoleSelect>
            <InterestsSelect value={interests} onChange={onInterestHandler}>
              {interestsList.map((item) => (
                <option value={item.value} key={item.name}>
                  {item.name}
                </option>
              ))}
            </InterestsSelect>
          </SelectBox>
          <Checkbox>
            <label>
              <AgreeCheck type="checkbox" /> 이용약관 동의 (필수)
            </label>
            <label>
              <AgreeCheck type="checkbox" /> 개인정보 수집 및 이용동의 (필수)
            </label>
            <label>
              <AgreeCheck type="checkbox" /> 위치정보서비스 이용동의 (선택)
            </label>
          </Checkbox>
          <SignUpSubmit onClick={onSignupHandler}>가입하기</SignUpSubmit>
        </SignUpWrapper>
      </form>
    </Container>
  )
}

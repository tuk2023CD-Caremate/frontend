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
  height: 850px;
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
  margin-bottom: 70px;
  margin-top: 20px;
`

const InputWrap = styled.div`
  display: flex;
`

const SignUpInput = styled.input`
  text-indent: 20px;
  width: 300px;
  height: 60px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border-radius: 10px;
  margin: 10px;
  font-size: 20px;
`

const BtnWrap = styled.div`
  display: flex;
  width: 300px;
  height: 60px;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 10px;
  font-size: 20px;
  justify-content: start;
`

const SendNumBtn = styled.button`
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: #650fa9;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  margin-right: 10px;
`

const VerifyBtn = styled.button`
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: #650fa9;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
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

// const Checkbox = styled.div`
//   margin: 10px;
//   display: flex;
//   flex-direction: column;
//   font-size: 18px;
// `

// const AgreeCheck = styled.input`
//   width: 12px;
//   height: 12px;
//   background-color: #fff;
//   border: 1.5px solid gainsboro;
//   border-radius: 4px;

//   &:checked {
//     //추후 check표시 이미지 추가
//     background-color: #650fa9;
//     border: 1px #650fa9 solid;
//   }
// `

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
  margin: 50px;
  &:active {
    background: #490e76;
  }
`

const partList = [
  { value: 'MENTOR', name: 'MENTOR' },
  { value: 'MENTEE', name: 'MENTEE' },
]

const interestsList = [
  { value: 'PROGRAMMING', name: 'PROGRAMMING' },
  { value: 'KOREAN', name: 'KOREAN' },
  { value: 'MATH', name: 'MATH' },
  { value: 'ENGLISH', name: 'ENGLISH' },
  { value: 'SCIENCE', name: 'SCIENCE' },
]

export default function SignUp() {
  const { apiUrl } = useApiUrlStore()

  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [tel, setTel] = useState('')
  const [interests, SetInterests] = useState('')
  const [part, SetPart] = useState('')
  const [blogurl, setBlogurl] = useState('')
  const [PR, setPR] = useState('')
  const [job, setJob] = useState('')

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
    setPassword2(e.target.value)
  }

  const onInterestHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetInterests(e.target.value)
  }

  const onPartHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetPart(e.target.value)
  }
  const onTel = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTel(e.target.value)
  }
  const onBlogurl = (e: { target: { value: React.SetStateAction<string> } }) => {
    setBlogurl(e.target.value)
  }
  const onPR = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPR(e.target.value)
  }
  const onJob = (e: { target: { value: React.SetStateAction<string> } }) => {
    setJob(e.target.value)
  }

  const onSignupHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (
      email === '' ||
      password === '' ||
      name === '' ||
      nickname === '' ||
      tel === '' ||
      job === ''
    ) {
      alert('필수 정보를 입력해주세요.')
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
        tel: tel,
        blogUrl: blogurl,
        publicRelations: PR,
        job: job,
      })

      console.log(response.status)
      alert('회원가입에 성공하였습니다.')
      navigate('/login')
    } catch (error) {
      alert('회원가입에 실패했습니다.')
      console.error
    }
  }

  return (
    <Container>
      <form onSubmit={onSignupHandler}>
        <SignUpWrapper>
          <SignUpH2>Sign up to StudyMate</SignUpH2>
          <InputWrap>
            <SignUpInput type="text" placeholder="이름" value={name} onChange={onNameHandler} />
            <SignUpInput
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={onNickNameHandler}
            />
          </InputWrap>
          <InputWrap>
            <SignUpInput type="text" placeholder="이메일" value={email} onChange={onEmailHandler} />
            <SignUpInput type="text" placeholder="직업" value={job} onChange={onJob} />
          </InputWrap>
          <InputWrap>
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
          </InputWrap>
          <InputWrap>
            <SignUpInput
              type="number"
              placeholder="전화번호 ( - 제외 )"
              value={tel}
              onChange={onTel}
            />
            <BtnWrap>
              <SendNumBtn>인증번호 발송</SendNumBtn>
              <VerifyBtn>인증번호 확인</VerifyBtn>
            </BtnWrap>
          </InputWrap>

          <InputWrap>
            <SignUpInput type="text" placeholder="PR ( 선택 )" value={PR} onChange={onPR} />
            <SignUpInput
              type="text"
              placeholder="블로그 링크 ( 선택 )"
              value={blogurl}
              onChange={onBlogurl}
            />
          </InputWrap>

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
          {/* <Checkbox>
            <label>
              <AgreeCheck type="checkbox" /> 이용약관 동의 (필수)
            </label>
            <label>
              <AgreeCheck type="checkbox" /> 개인정보 수집 및 이용동의 (필수)
            </label>
            <label>
              <AgreeCheck type="checkbox" /> 위치정보서비스 이용동의 (선택)
            </label>
          </Checkbox> */}
          <SignUpSubmit onClick={onSignupHandler}>가입하기</SignUpSubmit>
        </SignUpWrapper>
      </form>
    </Container>
  )
}

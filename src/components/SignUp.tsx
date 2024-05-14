import { useState } from 'react'
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

const PhoneWrap = styled.div`
  display: flex;
  width: 300px;
  height: 60px;
  box-sizing: border-box;
  margin: 10px;
`

const SendNumBtn = styled.button`
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: #650fa9;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
`

const PhoneInput = styled.input`
  text-indent: 20px;
  width: 250px;
  height: 60px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border-radius: 10px;
  font-size: 20px;
  margin-right: 10px;
`

const VerifyBtn = styled.button`
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: #650fa9;
  color: white;
  font-size: 14px;
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
  {
    name: '웹/앱개발',
    value: 'WEBAPP',
  },
  {
    name: '서버/네트워크',
    value: 'SERVER',
  },
  {
    name: 'AI/IoT',
    value: 'AI',
  },
  {
    name: '데이터 개발',
    value: 'DATA',
  },
  {
    name: '정보보안',
    value: 'SECURITY',
  },
]

export default function SignUp() {
  const { apiUrl } = useApiUrlStore()

  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    password2: '',
    tel: '',
    interests: 'PROGRAMMING',
    part: 'MENTOR',
    blogurl: '',
    PR: '',
    job: '',
    authNum: '',
    isAuth: false,
  })

  const navigate = useNavigate()

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // 회원가입 요청
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (
      !formData.email ||
      !formData.password ||
      !formData.password2 ||
      !formData.name ||
      !formData.nickname ||
      !formData.tel ||
      !formData.job
    ) {
      alert('필수 정보를 입력해주세요.')
      return
    } else if (!formData.isAuth) {
      alert('휴대폰 번호 인증을 해주세요.')
      return
    }

    // 회원가입 시 보낼 데이터 생성
    const postData = {
      name: formData.name,
      nickname: formData.nickname,
      password: formData.password,
      email: formData.email,
      tel: formData.tel,
      interests: formData.interests,
      part: formData.part,
      blogUrl: formData.blogurl,
      publicRelations: formData.PR,
      job: formData.job,
    }

    // 회원가입 api
    try {
      const response = await axios.post(`${apiUrl}/signIn`, postData)

      console.log(response.status)
      alert('회원가입에 성공하였습니다.')
      navigate('/login')
    } catch (error) {
      alert('회원가입에 실패했습니다.')
      console.error(error)
    }
  }

  // 인증번호 발송 api 요청
  const handleSendAuthNum = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const { tel } = formData
    if (!tel) {
      alert('전화번호를 입력해주세요.')
      return
    }

    try {
      const response = await axios.post(`${apiUrl}/signIn/message`, {
        tel: tel,
      })

      if (response.status === 200) {
        alert('인증번호가 발송되었습니다.')
      } else {
        alert('휴대폰 번호 11자리를 입력해주세요')
      }
    } catch (error) {
      console.error('Error : ', error)
      alert('휴대폰 번호 11자리를 입력해주세요')
    }
  }

  // 인증번호 검증 api 요청
  const handleVerifyAuthNum = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const { tel, authNum } = formData
    if (!authNum) {
      alert('인증번호를 입력해주세요.')
      return
    }
    try {
      const response = await axios.post(`${apiUrl}/signIn/message/verify`, {
        phoneNumber: tel,
        randomNumber: authNum,
      })

      if (response.status === 200) {
        setFormData((prevData: any) => ({
          ...prevData,
          isAuth: true,
        }))
        alert('인증되었습니다.')
      }
    } catch (error) {
      console.error('Error : ', error)
      alert('잘못된 인증번호 입니다.')
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <SignUpWrapper>
          <SignUpH2>Sign up to StudyMate</SignUpH2>
          <InputWrap>
            <SignUpInput
              type="text"
              placeholder="이름"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <SignUpInput
              type="text"
              placeholder="닉네임"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </InputWrap>
          <InputWrap>
            <SignUpInput
              type="text"
              placeholder="이메일"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <SignUpInput
              type="text"
              placeholder="직업"
              name="job"
              value={formData.job}
              onChange={handleChange}
            />
          </InputWrap>
          <InputWrap>
            <SignUpInput
              type="password"
              placeholder="비밀번호"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <SignUpInput
              type="password"
              placeholder="비밀번호 확인"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
            />
          </InputWrap>
          <InputWrap>
            <PhoneWrap>
              <PhoneInput
                type="number"
                placeholder="전화번호 ( - 제외 )"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
              />
              <SendNumBtn onClick={handleSendAuthNum}>인증번호 발송</SendNumBtn>
            </PhoneWrap>
            <PhoneWrap>
              <PhoneInput
                type="number"
                placeholder="인증번호"
                name="authNum"
                value={formData.authNum}
                onChange={handleChange}
              />
              <VerifyBtn onClick={handleVerifyAuthNum}>인증번호 확인</VerifyBtn>
            </PhoneWrap>
          </InputWrap>
          <InputWrap>
            <SignUpInput
              type="text"
              placeholder="PR ( 선택 )"
              name="PR"
              value={formData.PR}
              onChange={handleChange}
            />
            <SignUpInput
              type="text"
              placeholder="블로그 링크 ( 선택 )"
              name="blogurl"
              value={formData.blogurl}
              onChange={handleChange}
            />
          </InputWrap>
          <SelectBox>
            <RoleSelect name="part" value={formData.part} onChange={handleChange}>
              {partList.map((item) => (
                <option value={item.value} key={item.name}>
                  {item.name}
                </option>
              ))}
            </RoleSelect>
            <InterestsSelect name="interests" value={formData.interests} onChange={handleChange}>
              {interestsList.map((item) => (
                <option value={item.value} key={item.name}>
                  {item.name}
                </option>
              ))}
            </InterestsSelect>
          </SelectBox>
          <SignUpSubmit>가입하기</SignUpSubmit>
        </SignUpWrapper>
      </form>
    </Container>
  )
}

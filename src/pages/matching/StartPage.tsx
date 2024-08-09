import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import { useApiUrlStore } from '../../store/store'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 14rem);
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const StartWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 70%;
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
`

const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin: 3.75rem;
`

const SelectInterest = styled.select`
  border: solid 1px black;
  width: 37.5rem;
  height: 4.3rem;
  font-size: 1.75rem;
  margin: 0.625rem;
  border-radius: 0.625rem;
  padding: 0.625rem;
`

const InputSpecificField = styled.input`
  margin: 0.625rem;
  border: solid 1px black;
  width: 37.5rem;
  height: 4.3rem;
  border-radius: 0.625rem;
  padding: 0.625rem;
  font-size: 1.75rem;
`

const InputTitle = styled.input`
  margin: 0.625rem;
  border: solid 1px black;
  width: 37.5rem;
  height: 4.3rem;
  border-radius: 0.625rem;
  padding: 0.625rem;
  font-size: 1.75rem;
`

const InputContent = styled.textarea`
  margin: 0.625rem;
  border: solid 1px black;
  width: 37.5rem;
  height: 12.5rem;
  border-radius: 0.625rem;
  padding: 0.625rem;
  font-size: 1.75rem;
  resize: none;
`

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37.5rem;
  height: 4.3rem;
  margin: 3.75rem;
`
const StartMatchingBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  font-size: 1.75rem;
  font-weight: bold;
  width: 15rem;
  height: 4.3rem;
  background-color: #e8dcf2;
  color: #650fa9;
  margin: 1.25rem;
  transition: background-color 0.3s ease;
  &:hover {
    background: #e0cfee;
  }
`

interface Option {
  label: string
  value: string
}

function StartPage() {
  const { apiUrl } = useApiUrlStore()

  const navigate = useNavigate()

  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [specificField, setSpecificField] = useState<string>('')
  const [options] = useState<Option[]>([
    {
      label: '웹/앱개발',
      value: 'WEBAPP',
    },
    {
      label: '서버/네트워크',
      value: 'SERVER',
    },
    {
      label: 'AI/IoT',
      value: 'AI',
    },
    {
      label: '데이터 개발',
      value: 'DATA',
    },
    {
      label: '정보보안',
      value: 'SECURITY',
    },
  ])

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  const handleSpecificFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecificField(event.target.value)
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleSubmit = async (useAi: boolean) => {
    const access = localStorage.getItem('accessToken')

    if (access) {
      try {
        const response = await axios.post(
          `${apiUrl}/question`,
          {
            title,
            content,
            specificField,
            interests: selectedOption,
          },
          {
            headers: { Authorization: `Bearer ${access}` },
          },
        )
        alert('질문이 생성되었습니다.')
        const pathname = useAi ? 'ai/' : ''
        const handleNavigation = (id: string, pathname: string) => {
          navigate('/matching/select', { state: { id, pathname } })
        }
        handleNavigation(response.data.id, pathname)
      } catch (error) {
        console.error('질문 생성 중 오류 발생:', error)
      }
    } else {
      console.error('액세스 토큰이 없습니다.')
    }
  }

  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <StartWrap>
          <Title>질문에 맞는 멘토들을 추천해 드릴게요</Title>
          <SelectInterest value={selectedOption} onChange={handleOptionChange}>
            <option value="">관심분야를 선택하세요</option>
            {options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInterest>
          <InputSpecificField
            placeholder="상세분야 ex)백엔드 JPA DB"
            onChange={handleSpecificFieldChange}></InputSpecificField>
          <InputTitle
            placeholder="제목 ex)mysql spring 연동"
            onChange={handleTitleChange}></InputTitle>
          <InputContent placeholder="내용" onChange={handleContentChange}></InputContent>
          <BtnWrap>
            <StartMatchingBtn onClick={() => handleSubmit(false)}>멘토 찾기</StartMatchingBtn>
            <StartMatchingBtn onClick={() => handleSubmit(true)}>
              AI 기반 멘토 찾기
            </StartMatchingBtn>
          </BtnWrap>
        </StartWrap>
      </Container>
    </div>
  )
}

export default StartPage

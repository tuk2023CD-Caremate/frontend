import { useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import Header2 from '../../components/Header2'
import Navbar2 from '../../components/Navbar2'
// import SelectUserModal from '../../components/SelectUserModal'
// import ConfirmMatchingModal from '../../components/ConfirmMatchingModal'
// import FindLoadingModal from '../../components/FindLoadingModal'
// import MatchingLoadingModal from '../../components/MatchingLoadingModal'
import axios from 'axios'
import { useApiUrlStore, useIsAiBasedStore } from '../../store/store'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 220px);
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
  font-size: 48px;
  font-weight: bold;
  margin: 60px;
`

const SelectInterest = styled.select`
  border: solid 1px black;
  width: 600px;
  height: 70px;
  font-size: 28px;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
`

const InputSpecificField = styled.input`
  margin: 10px;
  border: solid 1px black;
  width: 600px;
  height: 70px;
  border-radius: 10px;
  padding: 10px;
  font-size: 28px;
`

const InputTitle = styled.input`
  margin: 10px;
  border: solid 1px black;
  width: 600px;
  height: 70px;
  border-radius: 10px;
  padding: 10px;
  font-size: 28px;
`

const InputContent = styled.textarea`
  margin: 10px;
  border: solid 1px black;
  width: 600px;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  font-size: 28px;
  resize: none;
`

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 70px;
  margin: 60px;
`
const StartMatchingBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 32px;
  font-weight: bold;
  width: 240px;
  height: 70px;
  background-color: #e8dcf2;
  color: #650fa9;
  margin: 20px;
`

interface Option {
  label: string
  value: string
}

function StartPage() {
  const { apiUrl } = useApiUrlStore()
  const { setIsAiBased } = useIsAiBasedStore()

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
    setIsAiBased(useAi) // AI 사용 여부 설정
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
        navigate('/online/select', { state: response.data.id })
      } catch (error) {
        console.error('질문 생성 중 오류 발생:', error)
      }
    } else {
      console.error('액세스 토큰이 없습니다.')
    }
  }

  return (
    <div>
      <Header2 />
      <Navbar2 />
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
            onChange={handleTitleChange}></InputSpecificField>
          <InputTitle
            placeholder="제목 ex)mysql spring 연동"
            onChange={handleSpecificFieldChange}></InputTitle>
          <InputContent placeholder="내용" onChange={handleContentChange}></InputContent>
          <BtnWrap>
            <StartMatchingBtn onClick={() => handleSubmit(false)}>멘토 찾기</StartMatchingBtn>
            <StartMatchingBtn onClick={() => handleSubmit(true)}>
              AI 기반 멘토 찾기
            </StartMatchingBtn>
          </BtnWrap>
        </StartWrap>
        {/* <SelectUserModal /> */}
        {/* <ConfirmMatchingModal /> */}
        {/* <FindLoadingModal /> */}
        {/* <MatchingLoadingModal /> */}
      </Container>
    </div>
  )
}

export default StartPage

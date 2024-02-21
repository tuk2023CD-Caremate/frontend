import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import Header2 from '../components/Header2'
import Navbar2 from '../components/Navbar2'
import SelectUserModal from '../components/SelectUserModal'
import StartMatching from '../components/ConfirmMatching'

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
  margin: 120px;
`

const SelectInterest = styled.select`
  border: solid 1px black;
  width: 400px;
  height: 70px;
  font-size: 28px;
  margin: 20px;
  border-radius: 10px;
  padding: 10px;
`
const InputTitle = styled.input`
  margin: 20px;
  border: solid 1px black;
  width: 600px;
  height: 70px;
  border-radius: 10px;
  padding: 10px;
  font-size: 28px;
  ::placeholder {
    color: BDBDBD; /* placeholder 텍스트 색상 설정 */
    font-style: italic; /* placeholder 텍스트 스타일 설정 */
  }
`
const StartMatchingBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 32px;
  font-weight: bold;
  width: 320px;
  height: 80px;
  background-color: #e8dcf2;
  color: #650fa9;
  margin: 120px;
`

interface Option {
  label: string
  value: string
}

function OnlinePage() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined)

  const [options, setOptions] = useState<Option[]>([
    {
      label: '프로그래밍',
      value: 'interest1',
    },
    {
      label: '수학',
      value: 'interest2',
    },
    {
      label: '디자인',
      value: 'interest3',
    },
    {
      label: 'ComputerSience',
      value: 'interest4',
    },
    {
      label: 'Algorithm',
      value: 'interest5',
    },
  ])

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        {/* <StartWrap>
          <Title>온라인 매칭을 시작해볼게요</Title>
          <SelectInterest value={selectedOption} onChange={handleOptionChange}>
            <option value="">관심분야를 선택하세요</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInterest>
          <InputTitle placeholder="제목을 적어주세요"></InputTitle>
          <StartMatchingBtn>온라인 매칭 시작하기</StartMatchingBtn>
        </StartWrap> */}
        {/* <SelectUserModal /> */}
        <StartMatching />
      </Container>
    </div>
  )
}

export default OnlinePage

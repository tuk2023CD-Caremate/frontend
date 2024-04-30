import { useState } from 'react'
import styled from 'styled-components'
import { useApiUrlStore } from '../store/store'
import axios from 'axios'

type Prop = {
  PostingCloseModal: () => void
  studyClass: string
  startTime: string
  endTime: string
  getStudy: () => void
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`

const Modal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
  height: 300px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`
const Textarea = styled.textarea`
  width: 500px;
  height: 100px;
  font-size: 22px;
  border: 1px solid #dbdbdb;
  margin-bottom: 40px;
`

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
`

const Btn = styled.div`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`

function StudyPostingModal({ PostingCloseModal, studyClass, startTime, endTime, getStudy }: Prop) {
  const [content, setContent] = useState('')
  const { apiUrl } = useApiUrlStore()


  const createStudy = async () => {
    const calenderList = {
      content: content,
      studyClass: studyClass,
      startTime: startTime,
      endTime: endTime,
    }
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.post(`${apiUrl}/calender`, calenderList, {
        headers: { Authorization: `Bearer ${access}` },
      })
      alert('완료되었습니다.')
      getStudy()
      PostingCloseModal()
      console.log(response.data)
    } catch (error) {
      alert('입력값이 비어있습니다. 확인해주세요.')
    }
  }

  return (
    <div>
      <Container>
        <Modal>
          <Title>추가할 과목을 작성해주세요 </Title> 
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <BtnWrapper>
            <Btn onClick={createStudy}>저장</Btn>
            <Btn onClick={PostingCloseModal}>취소</Btn>
          </BtnWrapper>
        </Modal>
      </Container>
    </div>
  )
}

export default StudyPostingModal

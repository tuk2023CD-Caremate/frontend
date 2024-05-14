import { useState } from 'react'
import styled from 'styled-components'
import { useApiUrlStore } from '../store/store'
import axios from 'axios'

type Prop = {
  PostingCloseModal: () => void
  getSubject: () => void
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
  resize: none;
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
function AddSubjectModal({ PostingCloseModal, getSubject }: Prop) {
  const [subjectName, setSubjectName] = useState('')
  const { apiUrl } = useApiUrlStore()

  //과목 생성
  const createSubject = async () => {
    const subject = {
      subjectName: subjectName,
    }

    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.post(`${apiUrl}/subject`, subject, {
        headers: { Authorization: `Bearer ${access}` },
      })
      alert('완료되었습니다.')
      getSubject()
      PostingCloseModal()
      setSubjectName(subjectName)
      console.log(response.data)
    } catch (error) {
      alert('입력값이 비어있습니다. 확인해주세요.')
    }
  }
  {
    /*
   //기록 수정조회
   const updateStudy = async () => {
    getStudy()
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/calender`, {
        headers: { Authorization: `Bearer ${access}` },})
        setStudyList(response.data.calenderList)
      PostingCloseModal()
      console.log(response.data)
    }
    catch (error) {
    alert('Error fetching study data:')
  }
}
*/
  }
  return (
    <div>
      <Container>
        <Modal>
          <Title>추가할 과목을 입력하세요</Title>
          <Textarea value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
          <BtnWrapper>
            <Btn onClick={createSubject}>저장</Btn>
            <Btn onClick={PostingCloseModal}>취소</Btn>
          </BtnWrapper>
        </Modal>
      </Container>
    </div>
  )
}
export default AddSubjectModal

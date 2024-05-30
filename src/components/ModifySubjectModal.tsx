import { useState } from 'react'
import styled from 'styled-components'
import { useApiUrlStore } from '../store/store'
import axios from 'axios'

type Prop = {
  ModifyCloseModal: () => void
  getSubject: () => void
  subject_id: number
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
  backdrop-filter: blur(0.5rem);
`
const Modal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 37.5rem;
  height: 18.75rem;
  border-radius: 1rem;
  box-shadow: 0rem 0rem 1.25rem 0.625rem rgba(0, 0, 0, 0.2);
  background-color: white;
`
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`
const Textarea = styled.textarea`
  width: 31.25rem;
  height: 6.25rem;
  font-size: 1.3rem;
  border: 1px solid #dbdbdb;
  margin-bottom: 2.5rem;
  resize: none;
`
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 12.5rem;
`
const Btn = styled.div`
  width: 5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`
function ModifySubjectModal({ ModifyCloseModal, getSubject, subject_id }: Prop) {
  const [subjectName, setSubjectName] = useState('')
  const { apiUrl } = useApiUrlStore()

  //과목 수정
  const modifySubject = async () => {
    const subject = {
      subjectName: subjectName,
    }

    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.post(`${apiUrl}/subject/${subject_id}`, subject, {
        headers: { Authorization: `Bearer ${access}` },
      })
      alert('완료되었습니다.')
      getSubject()
      ModifyCloseModal()
      setSubjectName(subjectName)
      console.log(response.data)
    } catch (error) {
      console.log(subject_id)
      alert('입력값이 비어있습니다. 확인해주세요.')
    }
  }
 
  return (
    <div>
      <Container>
        <Modal>
          <Title>수정할 과목명을 입력해주세요</Title>
          <Textarea value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
          <BtnWrapper>
            <Btn onClick={modifySubject}>수정</Btn>
            <Btn onClick={ModifyCloseModal}>취소</Btn>
          </BtnWrapper>
        </Modal>
      </Container>
    </div>
  )
}
export default ModifySubjectModal

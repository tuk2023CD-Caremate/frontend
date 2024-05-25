import { useState } from 'react'
import styled from 'styled-components'
import { useApiUrlStore } from '../store/store'
import axios from 'axios'

type Prop = {
  PostingCloseModal: () => void
  //studyClass: string
  startTime: string
  endTime: string
  //getStudy: () => void
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
  width: 37rem;
  height: 19rem;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
`
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`
const Textarea = styled.textarea`
  width: 31rem;
  height: 8rem;
  font-size: 1.2rem;
  border: 1px solid #dbdbdb;
  margin-bottom: 1rem;
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
  border-radius: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
`
function AddStudyModal({ PostingCloseModal, startTime, endTime }: Prop) {
  const [studyname, setStudyname]=useState('')
  const { apiUrl } = useApiUrlStore()
  const createStudy = async () => {
    const calenderList = {
      //studyClass: studyClass,
      startTime: startTime,
      endTime: endTime,
    }
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.post(`${apiUrl}/calender`, calenderList, {
        headers: { Authorization: `Bearer ${access}` },
      })
      alert('완료되었습니다.')
      //getStudy()
      PostingCloseModal()
      setStudyname(studyname)
      console.log(response.data)
    } catch (error) {
      alert('입력값이 비어있습니다. 확인해주세요.')
    }
  }
{/*
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
*/}
  return (
    <div>
      <Container>
        <Modal>
          <Title>추가할 과목을 작성해주세요 </Title> 
          <Textarea value={studyname}  />
          <BtnWrapper>
            <Btn onClick={createStudy}>저장</Btn>
            <Btn onClick={PostingCloseModal}>취소</Btn>
          </BtnWrapper>
        </Modal>
      </Container>
    </div>
  )
}
export default AddStudyModal

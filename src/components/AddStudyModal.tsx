import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useApiUrlStore } from '../store/store.ts'
import axios from 'axios'

// type Prop = {
//   AddCloseModal?: () => void
// }

interface calenderList {
  id: number
  content: string
  studyClass: string
  startTime: string
  endTime: string
  entireTime: string
}

const Container = styled.div`
  width: 100%;
  top: 0;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  display: flex;
  height: calc(100vh - 220px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Modal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 900px;
  height: 600px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
`
const Close = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  margin-left: 90%;
  margin-top: 10px;
  cursor: pointer;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 15px;
`

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`

const StudyClass = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
`

const EntireTime = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const Text = styled.div`
  width: 650px;
  height: 350px;
  border: 1px solid #dbdbdb;
  margin-bottom: 20px;
`
const Textarea = styled.textarea`
  width: 650px;
  height: 350px;
  border: 1px solid #dbdbdb;
  margin-bottom: 20px;
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

function AddStudyModal() {
  const [calenderList, setCalenderList] = useState<calenderList>({
    id: 0,
    content: '',
    studyClass: '',
    startTime: '',
    endTime: '',
    entireTime: '',
  })

  //스터디기록 불러오기)
  const [content, setContent] = useState(calenderList.content)
  const [interests, setStudyClass] = useState(calenderList.studyClass)
  const [startTime, setStartTime] = useState(calenderList.startTime)
  const [endTime, setEndTime] = useState(calenderList.endTime)
  // const [entireTime, setEntireime] = useState(calenderList.entireTime)
  const [editmode, setEditmode] = useState(false)
  const { calender_id } = useParams()
  const { apiUrl } = useApiUrlStore()
  const navigate = useNavigate()

  useEffect(() => {
    const getStudy = async () => {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.get(`${apiUrl}/calender/${calender_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setCalenderList(response.data)
      } catch (error) {
        alert('get error')
      }
    }
    getStudy()
  }, [calender_id])

  useEffect(() => {
    setContent(calenderList.content)
  }, [calenderList.content])
  useEffect(() => {
    setStartTime(calenderList.startTime)
  }, [calenderList.startTime])
  useEffect(() => {
    setEndTime(calenderList.endTime)
  }, [calenderList.endTime])
  useEffect(() => {
    setStudyClass(calenderList.studyClass)
  }, [calenderList.studyClass])

  const editcontent = {
    content: content,
    interests: interests,
    startTime: startTime,
    endTime: endTime,
  }

  const handleEditClick = () => {
    setEditmode(true)
  }

  //스터디기록 수정
  const updateStudy = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.put(`${apiUrl}/calender/${calender_id}`, editcontent, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setCalenderList(response.data)
      alert('수정되었습니다')
      navigate('/calender')
    } catch (error) {
      alert('update error')
    }
  }

  //스터디기록 삭제
  const deleteStudy = async () => {
    if (window.confirm('기록을 삭제할까요?')) {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.delete(`${apiUrl}/calender/${calender_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setCalenderList(response.data)
      } catch (error) {
        alert('delete error')
      }
      navigate('/calender')
    }
  }

  const BacktoPage = () => {
    navigate('/calender')
  }
  return (
    <div>
      <Container>
        <Modal>
          <Close onClick={BacktoPage}>X</Close>
          <Title>작성한 스터디 기록 </Title>
          <Info>
            <StudyClass>공부 과목 : {calenderList.studyClass}</StudyClass>
            <EntireTime>공부 시간 : {calenderList.entireTime}</EntireTime>
          </Info>
          {editmode ? (
            <Textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} />
          ) : (
            <Text>{calenderList.content}</Text>
          )}
          <BtnWrapper>
            {editmode ? (
              <Btn onClick={updateStudy}>완료</Btn>
            ) : (
              <Btn onClick={handleEditClick}>수정</Btn>
            )}
            <Btn onClick={deleteStudy}>삭제</Btn>
          </BtnWrapper>
        </Modal>
      </Container>
    </div>
  )
}

export default AddStudyModal

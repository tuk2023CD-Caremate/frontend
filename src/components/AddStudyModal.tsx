import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate,useParams } from 'react-router-dom';
import { useApiUrlStore } from '../store/store.ts'
import axios from 'axios'

type Prop = {
  AddCloseModal?: () => void
}

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
  background-color: rgba(255,255,255,0.15);
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
  margin-bottom: 20px;
`

const Textarea = styled.textarea`
  width: 650px;
  height: 400px;
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

function AddStudyModal({AddCloseModal} : Prop) {
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
  const { calender_id } = useParams()
  const { apiUrl } = useApiUrlStore()
  const navigate = useNavigate();

  
   useEffect(() => {
   const getStudy = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/calender/${calender_id}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setCalenderList(response.data)
      setContent(response.data.content)
      console.log(response.data)
    } catch (error) {
      alert('get error')
    }
  }
  getStudy();
}, [calender_id])

useEffect(()=>{
  setContent(calenderList.content)
}, [calenderList.content]);

//스터디기록 수정


 //스터디기록 삭제
 const deleteStudy = async () => {
  if (window.confirm('기록을 삭제할까요?')) {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.delete(
        `${apiUrl}/calender/${calender_id}`,
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )
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
              <Textarea
              name='content'
              value={content}
              onChange={(e)=>setContent(e.target.value)}/>
              <BtnWrapper>
                <Btn onClick={BacktoPage}>수정</Btn>
                <Btn onClick={deleteStudy}>삭제</Btn>
              </BtnWrapper>
          </Modal>
      </Container>
    </div>
  )
}

export default AddStudyModal


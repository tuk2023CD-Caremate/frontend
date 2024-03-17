import styled from 'styled-components'
import Header2 from '../components/Header2.tsx'
import Navbar2 from '../components/Navbar2.tsx'
import playIcon from '../assets/images/play.png'
import stopIcon from '../assets/images/stop.png'
import StudyPostingModal from '../components/StudyPostingModal.tsx'
import AddStudyModal from '../components/AddStudyModal'
import Calendar from '../components/StudyCalendar.tsx'
import { useState, useEffect } from 'react'
import { useApiUrlStore } from '../store/store.ts'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface studyData {
  id: number
  content: string
  studyClass: string
  starttime: string
  endtime: string
  entiretime: string
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const StudyWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% - 300px);
  border-left: 1px solid #bdbdbd;
  border-right: 1px solid #bdbdbd;
`

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 700px;
  margin-top: 30px;
  margin-right: 50px;
`
const TimeRecodingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 160px;
`

const TodayText = styled.div`
  font-size: 36px;
  font-weight: bold;
`
const TotalTime = styled.div`
  font-size: 85px;
  font-weight: bold;
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 850px;
  margin-top: 30px;
`

const StudyingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  margin-top: 80px;
`
const Study = styled.div`
  display: flex;
  align-items: center;
`

const BtnWrapper = styled.div`
  display: flex;
`

const WriteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60px;
  font-size: 28px;
  font-weight: bold;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
`
const StudyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  min-height: 550px;
  margin-top: 30px;
  border-left: 1px solid #bdbdbd;
  border-right: 1px solid #bdbdbd;
  border-top: 1px solid #bdbdbd;
`

const StudyList = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 750px;
  height: 110px;
  border-bottom: 1px solid #bdbdbd;
`

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 20px;
`
const AddStudy = styled.select`
  display: flex;
  align-items: center;
  width: 150px;
  font-size: 32px;
  font-weight: bold;
  padding: 15px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  cursor: pointer;
`

const StatusIcon = styled.img`
  width: 80px;
  height: 80px;
`

const ListInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 650px;
  height: 90px;
`

const StudyName = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  font-size: 36px;
  font-weight: bold;
  padding: 5px;
  cursor: pointer;
`
const StudyingTime = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 36px;
  color: #bdbdbd;
`
const DeleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60px;
  font-size: 28px;
  font-weight: bold;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;
`

const interestsList = [
  { value: 'KOREAN', name: '국어' },
  { value: 'MATH', name: '수학' },
  { value: 'ENGLISH', name: '영어' },
  { value: 'SCIENCE', name: '과학' },
  { value: 'PROGRAMMING', name: '코딩' },
]

function StudyPage() {
  //스탑워치
  const [currentImg, setCurrentImg] = useState(playIcon)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  //모달창
  const [postingmodalOpen, setPostingModalOpen] = useState(false)
  const [addmodalOpen, setAddModalOpen] = useState(false)

  //props
  const [studyClass, setStudyClass] = useState('');
  const[starttime, setStartTime]=useState(new Date())
  const[endtime, setEndTime]=useState(new Date())
  const[entiretime, setEntireTime]=useState('')

  const [interval, setIntervalId] = useState<number | undefined>(undefined)
  const { apiUrl } = useApiUrlStore()

  const [studyData, SetstudyData] = useState<studyData[]>([])

  
  const ClickHandler = () => {
    if (!isRunning) {
      setCurrentImg(stopIcon) // 멈춤버튼 이미지로 변경
      setStartTime(new Date())
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000)
      }, 1000)
      setIntervalId(interval) // interval 변수 업데이트
      setEndTime(new Date())
      setIsRunning(true)
    } else {
      setCurrentImg(playIcon) // 재생버튼 이미지 변경
      clearInterval(interval)
      setIsRunning(false)
    }
    console.log(starttime)
    console.log(endtime)
  }

  const PostingOpenModal = () => {
    setPostingModalOpen(true)
  }
  const PostingCloseModal = () => {
    setPostingModalOpen(false)
  }

  const AddOpenModal = () => {
    setAddModalOpen(true)
  }
  const AddCloseModal = () => {
    setAddModalOpen(false)
  }

  //게시글 전체조회
  const getStudy = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/calender`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      SetstudyData(response.data)
      console.log(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getStudy()
  }, [])

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <StudyWrapper>
          <LeftWrapper>
            <TimeRecodingWrapper>
              <TodayText>오늘 총 공부 시간</TodayText>
              <TotalTime>
                00:00:00
              </TotalTime>
            </TimeRecodingWrapper>
            <Calendar />
          </LeftWrapper>
          <RightWrapper>
            <StudyingWrapper>
              <Study>
                <IconWrapper>
                  <StatusIcon src={currentImg} onClick={ClickHandler} />
                </IconWrapper>
                <AddStudy value={studyClass} onChange={(e) => setStudyClass(e.target.value)}>
                  {interestsList.map((item) => (
                    <option value={item.value} key={item.name}>
                      {item.name}
                    </option>
                  ))}
                </AddStudy>
              </Study>
              <StudyingTime>
                {`${('0' + Math.floor(time / 3600000)).slice(-2)}
                    :${('0' + Math.floor((time / 60000) % 60)).slice(-2)}
                    :${('0' + Math.floor((time / 1000) % 60)).slice(-2)}`}
              </StudyingTime>
              <BtnWrapper>
                <WriteBtn onClick={PostingOpenModal}>작성</WriteBtn>
                <DeleteBtn>삭제</DeleteBtn>
              </BtnWrapper>
            </StudyingWrapper>
            <StudyListWrapper>
            {Array.isArray(studyData) &&
              studyData.map((study) => (
                <StudyList key={study.id} to={`/calender/${study.id}`}>
                  <ListInfoWrapper>
                    <StudyName onClick={AddOpenModal}>{study.studyClass}</StudyName>
                    <StudyingTime>00:00:00</StudyingTime>
                  </ListInfoWrapper>
                </StudyList>
              ))}
            </StudyListWrapper>
          </RightWrapper>
        </StudyWrapper>
      </Container>
      {addmodalOpen && <AddStudyModal AddCloseModal={AddCloseModal} />}
      {postingmodalOpen && <StudyPostingModal
      PostingCloseModal={PostingCloseModal}
      studyClass={studyClass}
      starttime={starttime}
      endtime={endtime}
      entiretime={entiretime}/>}
    </div>
  )
}
export default StudyPage

import styled from 'styled-components'
import Header2 from '../components/Header2.tsx'
import Navbar2 from '../components/Navbar2.tsx'
import StatisticsBar from '../components/sidebar/Statisticsbar.tsx'
import { IoStopCircleSharp } from 'react-icons/io5'
import { IoIosPlayCircle } from 'react-icons/io'
import AddStudyModal from '../components/AddStudyModal.tsx'
import Calendar from '../components/StudyCalendar.tsx'
import { useState, useEffect } from 'react'
import { useApiUrlStore } from '../store/store.ts'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

interface calenderList {
  id: number
  studyName: string
  entiretime : string
  starttime : string
  endtime : string
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const StudyWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
  height: 870px;
`

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  padding: 30px;
  border-left: 1px solid #bdbdbd;
  border-right: 1px solid #bdbdbd;
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 60%;
  border-right: 1px solid #bdbdbd;
`

const StudyingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`

const TimeRecodingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 160px;
`

const TodayText = styled.div`
  font-size: 40px;
  font-weight: bold;
`
const TotalTime = styled.div`
  font-size: 90px;
  font-weight: bold;
`

const BtnWrapper = styled.div`
  display: flex;
  justify-content: baseline;
  width: 100%;
`

const WriteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 135px;
  height: 55px;
  font-size: 28px;
  font-weight: bolder;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-left: 40px;
  cursor: pointer;
`
const StudyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 450px;
  margin-top: 30px;
  border-top: 1px solid #bdbdbd;
`

const StudyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #bdbdbd;
`

const ListInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 112px;
  border-bottom: 1px solid #bdbdbd;
`
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-left: 50px;
`

const StudyName = styled.div`
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  margin-left: 20px;
  cursor: pointer;
`
const StudyingTime = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
  font-size: 36px;
  font-weight: bold;
`

function StudyPage() {
  //스탑워치
  const [time, setTime] = useState<{ [key: number]: number }>({});
  const [isRunning, setIsRunning] = useState(false)
  const [interval, setIntervalId] = useState<{ [key: number]: number }>({})

  //모달창
  const [postingmodalOpen, setPostingModalOpen] = useState(false)

  //props
  const [studyClass, setStudyClass] = useState('분야')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const { apiUrl } = useApiUrlStore()
  const [isStatisticsBarOpen, setIsStatisticsBarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [calenderList, setCalenderList] = useState<calenderList[]>([
    { id: 1, studyName: '졸작', entiretime: '00:00',starttime: '00:00',endtime: '00:00'},
    { id: 2, studyName: '학교 과제', entiretime: '00:00', starttime: '00:00',endtime: '00:00'},
    { id: 3, studyName: '코딩테스트', entiretime: '00:00', starttime: '00:00',endtime: '00:00'},
    { id: 4, studyName: '온라인 강의', entiretime: '00:00', starttime: '00:00',endtime: '00:00'}
  ])

  const ClickHandler = (id : number) => {
    
    //시간 형식 변환
    const startTime = dayjs().format('YYYY-MM-DD HH:mm')
    const endTime = dayjs().format('YYYY-MM-DD HH:mm')

    if (!isRunning) {
      setStartTime(startTime) // 현재 시간을 startTime으로 설정

      const interval = setInterval(() => {
        setTime((prevTime) => ({
          ...prevTime,
          [id]: (prevTime[id] || 0) + 1000
        }));
      }, 1000);

      setIntervalId((prevIntervalIds) => ({
        ...prevIntervalIds,
        [id]: interval
      })); 
      setIsRunning(true)
      
    } else {
      clearInterval(interval[id]);
      setIsRunning(false)
      setEndTime(endTime) //endTime업데이트
    }
  }



  const PostingOpenModal = () => {
    setPostingModalOpen(true)
  }

  const PostingCloseModal = () => {
    setPostingModalOpen(false)
  }

  const handleDateChange = (newDate: Date| null) => {
    setSelectedDate(newDate);
  };

  const toggleStatisticsBar = () => {
    setIsStatisticsBarOpen(true);
  };

  const handleOutsideClick = (event: any) => {
    const isOutsideStatisticsBar = !event.target.closest('.statistics-bar');
  
    if (isOutsideStatisticsBar || (selectedDate && selectedDate === new Date() && isStatisticsBarOpen)) {
      setIsStatisticsBarOpen(false);
    }
  };


  {/*
  //기록 전체조회

  const getStudy = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/calender`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setCalenderList(response.data.calenderList)
      console.log(response.data)
    } catch (error) {
      alert('Error fetching study data:')
    }
  }

  useEffect(() => {
    getStudy()
  }, [])
*/}


  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <StudyWrapper>
          <LeftWrapper>
            <Calendar 
             toggleStatisticsBar={toggleStatisticsBar}
             onDateChange={handleDateChange} />
          </LeftWrapper>
          <RightWrapper onClick={handleOutsideClick}>
          <StatisticsBar isOpen={isStatisticsBarOpen} selectedDate={selectedDate}/>
            <StudyingWrapper>
              <TimeRecodingWrapper>
                <TodayText>2024. 04. 22</TodayText>
                <TotalTime>03:12:20</TotalTime>
              </TimeRecodingWrapper>
              <BtnWrapper>
                <WriteBtn onClick={PostingOpenModal}>+ 과목</WriteBtn>
              </BtnWrapper>
            </StudyingWrapper>
            <StudyListWrapper>
              {Array.isArray(calenderList) &&
                calenderList.map((calender) => (
                  <StudyList key={calender.id}>
                    <ListInfoWrapper>
                      <IconWrapper>
                        {isRunning ? <IoStopCircleSharp color="#650FA9" size="50" onClick={()=>ClickHandler(calender.id)}/>
                        : <IoIosPlayCircle color="#650FA9" size="50" onClick={()=>ClickHandler(calender.id)}/>
                        }
                        <StudyName>{calender.studyName}</StudyName>
                      </IconWrapper>
                      <StudyingTime>
                      {`${('0'+ Math.floor((time[calender.id] || 0) / 3600000)).slice(-2)}:${('0' + Math.floor(((time[calender.id] || 0) / 60000) % 60)).slice(-2)}:${('0' + Math.floor(((time[calender.id] || 0) / 1000) % 60)).slice(-2)}`}
                      </StudyingTime>
                    </ListInfoWrapper>
                  </StudyList>
                ))}
            </StudyListWrapper>
          </RightWrapper>
        </StudyWrapper>
      </Container>
      {postingmodalOpen && (
        <AddStudyModal
          PostingCloseModal={PostingCloseModal}
          studyClass={studyClass}
          startTime={startTime}
          endTime={endTime}
          getStudy={getStudy}
        />
      )}
    </div>
  )
}
export default StudyPage

import styled from 'styled-components'
import Header2 from '../components/Header2.tsx'
import Navbar2 from '../components/Navbar2.tsx'
import StatisticsBar from '../components/sidebar/StatisticsBar.tsx'
import { IoStopCircleSharp, IoPencil } from 'react-icons/io5'
import { IoIosPlayCircle, IoIosRemoveCircleOutline } from 'react-icons/io'
import AddStudyModal from '../components/AddStudyModal.tsx'
import Calendar from '../components/StudyCalendar.tsx'
import { useState} from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko')
interface calenderList {
  id: number
  studyClass: string
  entiretime: string
  starttime: string
  endtime: string
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 220px);
`
const LeftWrapper = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-right: 1px solid #bdbdbd;
`
const RightWrapper = styled.div`
  display: flex;
   flex: 3;
  align-items: center;
  flex-direction: column;
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
  width: 300px;
  font-size: 36px;
  font-weight: bold;
  margin-left: 20px;
`

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 80px;
  margin-left: 50px;
`

const StudyingTime = styled.div`
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
`
const SideIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-right: 30px;
`
function StudyPage() {
  //스탑워치
  const [time, setTime] = useState<{ [key: number]: number }>({})
  const [isRunning, setIsRunning] = useState(false)
  const [interval, setIntervalId] = useState<{ [key: number]: number }>({})
  //모달창
  const [postingmodalOpen, setPostingModalOpen] = useState(false)
  //props
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  //const { apiUrl } = useApiUrlStore()
  const [isStatisticsBarOpen, setIsStatisticsBarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [clickedIconId, setClickedIconId] = useState<number | null>(null); 


  //const [calenderList, setCalenderList] = useState<calenderList[]>([])
  const [List, _setList] = useState<calenderList[]>([
    { id: 1, studyClass: '졸작', entiretime: '01:10:00', starttime: '00:00', endtime: '00:00' },
    { id: 2, studyClass: '학교 과제', entiretime: '00:32:52', starttime: '00:00', endtime: '00:00'},
    { id: 3, studyClass: '코딩테스트', entiretime: '00:25:40', starttime: '00:00', endtime: '00:00'},
    { id: 4, studyClass: '온라인 강의', entiretime: '02:33:0', starttime: '00:00', endtime: '00:00'},
  ])
  const ClickHandler = (id: number) => {
    //시간 형식 변환
    const startTime = dayjs().format('YYYY-MM-DD HH:mm')
    const endTime = dayjs().format('YYYY-MM-DD HH:mm')
    if (!isRunning) {
      setStartTime(startTime) // 현재 시간을 startTime으로 설정
      const interval = setInterval(() => {
        setTime((prevTime) => ({
          ...prevTime,
          [id]: (prevTime[id] || 0) + 1000,
        }))
      }, 1000)
      setIntervalId((prevIntervalIds) => ({
        ...prevIntervalIds,
        [id]: interval,
      }))
      setIsRunning(true)
      setClickedIconId(id);
    } else {
      clearInterval(interval[id])
      setIsRunning(false)
      setEndTime(endTime) //endTime업데이트
      setClickedIconId(null);
    }
  }

  const PostingOpenModal = () => {
    setPostingModalOpen(true)
  }
  const PostingCloseModal = () => {
    setPostingModalOpen(false)
  }

  const handleDateChange = (newDate: Date | null) => {
    //사용자가 선택한 날짜 === 현재 저장되어 있는 날짜(선택기준 이전날짜)
    if (newDate && newDate.getTime() === selectedDate?.getTime()) {
      setIsStatisticsBarOpen(!isStatisticsBarOpen)
    } else {
      setSelectedDate(newDate)
      setIsStatisticsBarOpen(true)
    }
  }

  const toggleStatisticsBar = () => {
    setIsStatisticsBarOpen(isStatisticsBarOpen)
  }
  const handleBarClose = (event: any) => {
    const isOutsideStatisticsBar = !event.target.closest('.statistics-bar');
    if (isOutsideStatisticsBar) {
      setIsStatisticsBarOpen(false);
    }
  }

  const TotalEntireTime = () => {
    let totalSeconds = 0;
    List.forEach(study => {
        const [hours, minutes, seconds] = study.entiretime.split(':').map(Number);
        totalSeconds += hours * 3600 + minutes * 60 + seconds;
    });
    const formattedTotalTime = `${('0' + Math.floor(totalSeconds / 3600)).slice(-2)}:${('0' + Math.floor((totalSeconds % 3600) / 60)).slice(-2)}:${('0' + (totalSeconds % 60)).slice(-2)}`;
    return formattedTotalTime;
};
  
{/*
  //기록 전체조회
  const getStudy = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      if (!access) {
        window.alert('로그인을 해주세요')
      } else {
        const response = await axios.get(`${apiUrl}/calender`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setCalenderList(response.data.calenderList)
        console.log(response.data)
      }
    } catch (error) {
      alert('Error fetching study data:')
    }
  }
  useEffect(() => {
    getStudy()
  }, [])
  
  //기록 삭제조회
  const deletedStudy = async (calender_id: number) => {
    if (window.confirm('과목을 삭제할까요?')) {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.delete(`${apiUrl}/calender/${calender_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setCalenderList(response.data.calenderList)
        console.log(response.data)
      } catch (error) {
        alert('Error fetching study data:')
      }
    }
    getStudy()
  }
*/}
  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
          <LeftWrapper>
            <Calendar toggleStatisticsBar={toggleStatisticsBar} onDateChange={handleDateChange} />
          </LeftWrapper>
          <RightWrapper onClick={handleBarClose}>
            <StatisticsBar isOpen={isStatisticsBarOpen} selectedDate={selectedDate} />
            <StudyingWrapper>
              <TimeRecodingWrapper>
                <TodayText>{dayjs().format('YYYY. MM. DD')}</TodayText>
                <TotalTime>{TotalEntireTime()}</TotalTime>
              </TimeRecodingWrapper>
              <BtnWrapper>
                <WriteBtn onClick={PostingOpenModal}>+ 과목</WriteBtn>
              </BtnWrapper>
            </StudyingWrapper>
            <StudyListWrapper>
                {List.map((study) => (
                  <StudyList key={study.id}>
                    <ListInfoWrapper>
                      <IconWrapper>
                        {isRunning && clickedIconId === study.id  ? (
                          <IoStopCircleSharp
                            color="#650FA9"
                            size="50"
                            onClick={() => ClickHandler(study.id)}
                          />
                        ) : (
                          <IoIosPlayCircle
                            color="#650FA9"
                            size="50"
                            onClick={() => ClickHandler(study.id)}
                          />
                        )}
                        <StudyName>{study.studyClass}</StudyName>
                      </IconWrapper>
                      <DetailWrapper>
                        <StudyingTime>
                          {`${('0' + Math.floor((time[study.id] || 0) / 3600000)).slice(-2)}:${(
                            '0' + Math.floor(((time[study.id] || 0) / 60000) % 60)
                          ).slice(-2)}:${(
                            '0' + Math.floor(((time[study.id] || 0) / 1000) % 60)
                          ).slice(-2)}`}
                        </StudyingTime>
                        <SideIconWrapper>
                          <IoPencil
                            size="30"
                            style={{ marginBottom: '10px' }}
                            onClick={PostingOpenModal}
                          />
                          <IoIosRemoveCircleOutline
                            size="30"
                            style={{ marginTop: '10px' }}
                            //onClick={() => deletedStudy(study.id)}
                          />
                        </SideIconWrapper>
                      </DetailWrapper>
                    </ListInfoWrapper>
                  </StudyList>
                ))}
            </StudyListWrapper>
          </RightWrapper>
      </Container>
      {postingmodalOpen && (
        <AddStudyModal
          PostingCloseModal={PostingCloseModal}
          //studyClass={studyClass}
          startTime={startTime}
          endTime={endTime}
          //getStudy={getStudy}
        />
      )}
    </div>
  )
}
export default StudyPage

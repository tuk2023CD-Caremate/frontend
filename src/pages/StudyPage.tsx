import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useEffect, useState } from 'react'
import { IoIosPlayCircle, IoIosRemoveCircleOutline } from 'react-icons/io'
import { IoPencil, IoStopCircleSharp } from 'react-icons/io5'
import styled from 'styled-components'
import AddSubjectModal from '../components/AddSubjectModal.tsx'
import Header from '../components/Header.tsx'
import ModifySubjectModal from '../components/ModifySubjectModal.tsx'
import Navbar from '../components/Navbar.tsx'
import StatisticsBar from '../components/sidebar/StatisticsBar.tsx'
import Calendar from '../components/StudyCalendar.tsx'
import { useApiUrlStore, useCalenderListState, useSubjectListState } from '../store/store'
dayjs.locale('ko')

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 14rem);
`
const LeftWrapper = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-right: 1px solid #bdbdbd;
`
const RightWrapper = styled.div`
  display: flex;
  flex: 3;
  align-items: center;
  flex-direction: column;
  position: relative;
`
const StudyingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 3rem;
`
const TimeRecodingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25rem;
  height: 10rem;
`
const TodayText = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
`
const TotalTime = styled.div`
  font-size: 6rem;
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
  width: 8.5rem;
  height: 3.5rem;
  font-size: 1.75rem;
  font-weight: bolder;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.625rem;
  margin-left: 2.5rem;
  cursor: pointer;
  background-color: #ffffff;
  border: solid 1px #bdbdbd;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #bdbdbd;
  }
`
const StudyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 28rem;
  margin-top: 2rem;
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
  height: 7rem;
  border-bottom: 1px solid #bdbdbd;
`
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin-left: 3rem;
`
const StudyName = styled.div`
  display: flex;
  align-items: center;
  width: 18rem;
  font-size: 2.2rem;
  font-weight: bold;
  margin-left: 1.25rem;
`

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 18rem;
  height: 5rem;
  margin-left: 3rem;
`

const StudyingTime = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.2rem;
  font-weight: bold;
`
const SideIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-right: 2rem;
`
function StudyPage() {
  //스탑워치
  const [time, setTime] = useState<{ [key: number]: number }>({})
  const [isRunning, setIsRunning] = useState(false)
  const [interval, setIntervalId] = useState<{ [key: number]: number }>({})

  //추가 모달창
  const [postingmodalOpen, setPostingModalOpen] = useState(false)

  //수정 모달창
  const [modifymodalOpen, setModifyModalOpen] = useState(false)
  const [modifySubjectId, setModifySubjectId] = useState<number>(0)
  //props
  const [startTime, setStartTime] = useState('')
  const [_endTime, setEndTime] = useState('')
  const { apiUrl } = useApiUrlStore()
  const [isStatisticsBarOpen, setIsStatisticsBarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [clickedIconId, setClickedIconId] = useState<number | null>(null)
  const { subjectList, setSubjectList } = useSubjectListState()
  const { calenderList, setCalenderList } = useCalenderListState()

  const ClickHandler = (id: number) => {
    if (!isRunning) {
      const startTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      setStartTime(startTime)
      setIsRunning(true)
      setClickedIconId(id)

      // 인터벌 생성 및 시작
      const newInterval = setInterval(() => {
        setTime((prevTime) => ({
          ...prevTime,
          [id]: (prevTime[id] || 0) + 1000,
        }))
      }, 1000)

      setIntervalId((prevIntervalIds) => ({
        ...prevIntervalIds,
        [id]: newInterval,
      }))
    } else if (clickedIconId === id) {
      // 스탑워치 종료
      clearInterval(interval[id])
      setIsRunning(false)
      const endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      setEndTime(endTime)

      // 인터벌 ID 정리 및 상태 초기화
      setIntervalId((prevIntervalIds) => ({
        ...prevIntervalIds,
        [id]: 0,
      }))
      setClickedIconId(null)

      // 서버에 스터디 세션 기록 보내기
      createStudy(id, startTime, endTime)
    }
  }

  const PostingOpenModal = () => {
    setPostingModalOpen(true)
  }
  const PostingCloseModal = () => {
    setPostingModalOpen(false)
  }

  const ModifyOpenModal = (subjectId: number) => {
    setModifySubjectId(subjectId)
    setModifyModalOpen(true)
  }
  const ModifyCloseModal = () => {
    setModifyModalOpen(false)
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
    const isOutsideStatisticsBar = !event.target.closest('.statistics-bar')
    if (isOutsideStatisticsBar) {
      setIsStatisticsBarOpen(false)
    }
  }

  const TotalEntireTime = () => {
    let totalSeconds = 0
    const today = dayjs().format('YYYY-MM-DD')

    if (!calenderList) {
      console.error('calenderList is undefined')
      return '00:00:00'
    }

    const todayCalenderList = calenderList.filter(
      (study) => dayjs(study.startTime).format('YYYY-MM-DD') === today,
    )

    todayCalenderList.forEach((study) => {
      // 시간 문자열이 올바른 형식인지 확인: "HH:MM:SS"
      const parts = study.entireTime.split(':')
      if (parts.length === 3) {
        const hours = parseInt(parts[0], 10)
        const minutes = parseInt(parts[1], 10)
        const seconds = parseInt(parts[2], 10)
        if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
          totalSeconds += hours * 3600 + minutes * 60 + seconds
        } else {
          console.error('Invalid time data:', study.entireTime)
        }
      } else {
        console.error('Incorrect time format:', study.entireTime)
      }
    })

    const formattedTotalTime = `${('0' + Math.floor(totalSeconds / 3600)).slice(-2)}:${(
      '0' + Math.floor((totalSeconds % 3600) / 60)
    ).slice(-2)}:${('0' + (totalSeconds % 60)).slice(-2)}`
    return formattedTotalTime
  }

  //과목 전체조회
  const getSubject = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      if (!access) {
        window.alert('로그인을 해주세요')
      } else {
        const response = await axios.get(`${apiUrl}/subject`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setSubjectList(response.data.subjectList)
      }
    } catch (error) {
      alert('Error fetching study data:')
    }
  }
  useEffect(() => {
    getSubject()
  }, [])

  //과목 삭제
  const deletedSubject = async (subject_id: number) => {
    if (window.confirm('과목을 삭제할까요?')) {
      try {
        const access = localStorage.getItem('accessToken')
        const response = await axios.delete(`${apiUrl}/subject/${subject_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        setSubjectList(response.data.subjectList)
      } catch (error) {
        alert('Error fetching study data:')
      }
    }
    getSubject()
  }

  //스터디 기록 생성
  const createStudy = async (subject_id: number, start: string, end: string) => {
    const study = {
      startTime: start,
      endTime: end,
    }
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.post(`${apiUrl}/calender/${subject_id}`, study, {
        headers: { Authorization: `Bearer ${access}` },
      })
      alert('스터디 기록이 완료되었습니다.')
      setCalenderList([...calenderList, response.data])
      console.log('Updated calenderList:', calenderList)
    } catch (error) {
      console.error('스터디 기록 생성 중 오류가 발생했습니다:', error)
      alert('스터디 기록 생성 중 오류가 발생했습니다.')
    }
  }

  return (
    <div>
      <Header />
      <Navbar />
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
            {Array.isArray(subjectList) &&
              subjectList.map((subject) => (
                <StudyList key={subject.id}>
                  <ListInfoWrapper>
                    <IconWrapper>
                      {isRunning && clickedIconId === subject.id ? (
                        <IoStopCircleSharp
                          color="#650FA9"
                          size="50"
                          onClick={() => {
                            ClickHandler(subject.id)
                          }}
                        />
                      ) : (
                        <IoIosPlayCircle
                          color="#650FA9"
                          size="50"
                          onClick={() => ClickHandler(subject.id)}
                        />
                      )}
                      <StudyName>{subject.subjectName}</StudyName>
                    </IconWrapper>
                    <DetailWrapper>
                      <StudyingTime>
                        {`${('0' + Math.floor((time[subject.id] || 0) / 3600000)).slice(-2)}:${(
                          '0' + Math.floor(((time[subject.id] || 0) / 60000) % 60)
                        ).slice(-2)}:${(
                          '0' + Math.floor(((time[subject.id] || 0) / 1000) % 60)
                        ).slice(-2)}`}
                      </StudyingTime>
                      <SideIconWrapper>
                        <IoPencil
                          size="30"
                          style={{ marginBottom: '10px' }}
                          onClick={() => ModifyOpenModal(subject.id)}
                        />
                        <IoIosRemoveCircleOutline
                          size="30"
                          style={{ marginTop: '10px' }}
                          onClick={() => deletedSubject(subject.id)}
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
        <AddSubjectModal PostingCloseModal={PostingCloseModal} getSubject={getSubject} />
      )}
      {modifymodalOpen && (
        <ModifySubjectModal
          ModifyCloseModal={ModifyCloseModal}
          getSubject={getSubject}
          subject_id={modifySubjectId}
        />
      )}
    </div>
  )
}
export default StudyPage

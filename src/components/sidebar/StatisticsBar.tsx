import styled from 'styled-components'
import PieChart from '../PieChart.tsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CalenderList, useApiUrlStore, useCalenderListState } from '../../store/store.ts'
import { IoIosCreate } from "react-icons/io";

interface StatisticsBarProps {
  isOpen: boolean
  selectedDate: Date | null
}

const Container = styled.div<StatisticsBarProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')}; // isOpen 상태에 따라 오른쪽에서 나오거나 숨김
  width: 59%;
  height: 100%;
  background-color: #f7f7f7;
  transition: right 0.3s ease; // 슬라이딩 효과를 위한 transition 설정
`

const UpperWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const TimeRecodingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TodayDate = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 4rem;
`
const TodayText = styled.div`
  font-size: 3rem;
  font-weight: bolder;
  color: #650fa9;
  margin-top: 3rem;
`
const TotalTime = styled.div`
  font-size: 5rem;
  font-weight: bolder;
`

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
`
const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Message = styled.div`
font-size: 24px;
font-weight: bold;
color: #dddcdc;
`

const GrapWrapper = styled.div`
  display: flex;
  flex: 3; // flex-grow 값을 조정하여 차트 영역을 늘립니다.
  align-items: center;
  margin-left: 1.25rem;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* PieChart 컴포넌트를 감싸고 있는 부모 컴포넌트에 적용 */
  min-height: 25rem;
  min-width: 25rem;
`
const ListWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  margin-right: 1.25rem;
  margin-top: -0.625rem;
`

const List = styled.div`
  display: flex;
  justify-content: space-between;
`

const Time = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-left: 2.5rem;
`

const PerCent = styled.div`
  width: 10rem;
  font-size: 1.8rem;
  font-weight: bold;
  margin-left: 2.5rem;
`

export default function StatisticsBar({ isOpen, selectedDate }: StatisticsBarProps) {
  const { calenderList, setCalenderList } = useCalenderListState()
  const [filteredCalenderList, setFilteredCalenderList] = useState<CalenderList[]>([])
  const { apiUrl } = useApiUrlStore()

  //스터디 기록 조회
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
      }
    } catch (error) {
      alert('Error fetching study data:')
    }
  }
  useEffect(() => {
    getStudy()
  }, [])

  //선택한 날짜와 같은 날짜의 리스트 조회
  useEffect(() => {
    if (selectedDate) {
      const filteredList = calenderList.filter(
        (item) =>
          dayjs(item.startTime).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD'),
      )
      setFilteredCalenderList(filteredList)
    }
  }, [calenderList, selectedDate])

  const timeToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(':').map(Number)
    return hours * 3600 + minutes * 60 + seconds
  }

  const totalSeconds = filteredCalenderList.reduce(
    (total, item) => total + timeToSeconds(item.entireTime),
    0,
  )

  const formatTime = (totalSeconds: number): string => {
    const hours: number = Math.floor(totalSeconds / 3600)
    const minutes: number = Math.floor((totalSeconds % 3600) / 60)
    const seconds: number = totalSeconds % 60

    // 시, 분, 초를 두 자리 문자열로 포매팅하는 내부 함수
    const pad = (num: number): string => (num < 10 ? '0' + num : num.toString())
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  const percentages = filteredCalenderList.map((item) => ({
    subjectName: item.subjectName,
    entireTime: item.entireTime,
    percentage: (timeToSeconds(item.entireTime) / totalSeconds) * 100,
  }))

  return (
    <Container isOpen={isOpen} selectedDate={selectedDate}>
      <UpperWrapper>
        <TimeRecodingWrapper>
          <TodayDate>{dayjs(selectedDate).format('YYYY.MM.DD')}</TodayDate>
          <TodayText>총 학습 시간</TodayText>
          <TotalTime>{formatTime(totalSeconds)}</TotalTime>
        </TimeRecodingWrapper>
      </UpperWrapper>
      <MainWrapper>
      {filteredCalenderList.length === 0 ? (
        <EmptyWrapper>
          <IoIosCreate size={160} color='#e8e8e8'/>
          <Message>작성된 스터디기록이 없어요!</Message>
        </EmptyWrapper>
      ) : (
        <>
        <GrapWrapper>
          <PieChart calenderList={filteredCalenderList} />
        </GrapWrapper>
        <ListWrapper>
          {percentages.map((study, index) => (
            <List key={index}>
              <Time>{study.entireTime}</Time>
              <PerCent>{study.percentage.toFixed(2)}%</PerCent>
            </List>
          ))}
        </ListWrapper>
        </>
        )}
      </MainWrapper>
    </Container>
  )
}

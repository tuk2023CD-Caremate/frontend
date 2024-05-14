import styled from 'styled-components'
import PieChart from '../PieChart.tsx'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import axios from 'axios'
import { useApiUrlStore, useCalenderListState } from '../../store/store.ts'

interface StatisticsBarProps {
  isOpen: boolean
  selectedDate: Date | null
}

const Container = styled.div<StatisticsBarProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  transition: right 0.3s ease;
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
  font-size: 40px;
  font-weight: bold;
  margin: 20px;
`
const TodayText = styled.div`
  font-size: 40px;
  font-weight: bolder;
  color: #650fa9;
`
const TotalTime = styled.div`
  font-size: 60px;
  font-weight: bolder;
`
const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const GrapWrapper = styled.div`
  display: flex;
  flex: 3; // flex-grow 값을 조정하여 차트 영역을 늘립니다.
  align-items: center;
  margin-top: -20px;
  margin-left: 20px;
  justify-content: center;
  width: 100%;
  /* PieChart 컴포넌트를 감싸고 있는 부모 컴포넌트에 적용 */
  min-height: 300px;
  min-width: 300px;
`
const ListWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
`
const List = styled.div`
  display: flex;
  justify-content: space-between;
`
const Name = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-left: 40px;
  width: 180px;
`

const Time = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-left: 40px;
`
const PerCent = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-left: 40px;
`

export default function StatisticsBar({ isOpen, selectedDate }: StatisticsBarProps) {
  const { calenderList, setCalenderList } = useCalenderListState()
  const { apiUrl } = useApiUrlStore()

  useEffect(() => {
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
          console.log(calenderList)
        }
      } catch (error) {
        alert('Error fetching study data:')
      }
    }
    getStudy()
  }, [])

  const timeToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(':').map(Number)
    return hours * 3600 + minutes * 60 + seconds
  }

  const totalSeconds = calenderList.reduce(
    (total, item) => total + timeToSeconds(item.entireTime),
    0,
  )

  const percentages = calenderList.map((item) => ({
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
          <TotalTime>{totalSeconds}</TotalTime>
        </TimeRecodingWrapper>
      </UpperWrapper>
      <MainWrapper>
        <GrapWrapper>
          <PieChart calenderList={calenderList} />
        </GrapWrapper>
        <ListWrapper>
          {percentages.map((study, index) => (
            <List key={index}>
              <Name>{study.subjectName}</Name>
              <Time>{study.entireTime}</Time>
              <PerCent>{study.percentage.toFixed(2)}%</PerCent>
            </List>
          ))}
        </ListWrapper>
      </MainWrapper>
    </Container>
  )
}

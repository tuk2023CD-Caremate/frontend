import styled from 'styled-components'
import PieChart from '../PieChart.tsx'
import dayjs from 'dayjs';
import { useState } from 'react'
interface StatisticsBarProps {
    isOpen: boolean;
    selectedDate: Date | null;
  }
  interface calenderList {
    id: number
    studyClass: string
    entiretime : string
    starttime : string
    endtime : string
    percent: string
  }
const Container = styled.div<StatisticsBarProps>`
display: flex;
flex-direction: column;
align-items: center;
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '0' : '-60%')}; // isOpen 상태에 따라 오른쪽에서 나오거나 숨김
  width: 59%;
  height: 870px;
  background-color: #F7F7F7;
  transition: right 0.3s ease; // 슬라이딩 효과를 위한 transition 설정

`
const UpperWrapper = styled.div`
display: flex;
justify-content: center;
width: 100%;
height: 40%;
`
const TimeRecodingWrapper = styled.div`
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
`
const TodayDate = styled.div`
font-size: 40px;
font-weight: bold;
margin-top: 60px;
`
const TodayText = styled.div`
font-size: 50px;
font-weight: bolder;
color: #650FA9;
margin-top: 50px;
`
const TotalTime = styled.div`
font-size: 80px;
font-weight: bolder;
`
const MainWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 80%;
height: 60%;
`
const GrapWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
flex: 3;
height: 100%;
margin-left: 80px;
`
const ListWrapper = styled.div`
display: flex;
flex-direction: column;
flex: 2;
margin-right: 80px;
`
const List = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
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
export default function StatisticsBar({ isOpen,selectedDate}: StatisticsBarProps) {
  
  const [calenderList, _setCalenderList] = useState<calenderList[]>([
    { id: 1, studyClass: '졸작', entiretime: '01:52:40',starttime: '00:00',endtime: '00:00', percent: '29%'},
    { id: 2, studyClass: '학교 과제', entiretime: '00:16:42', starttime: '00:00',endtime: '00:00', percent: '4%'},
    { id: 3, studyClass: '코딩테스트', entiretime: '03:11:03', starttime: '00:00',endtime: '00:00', percent: '49%'},
    { id: 4, studyClass: '온라인 강의', entiretime: '01:06:15', starttime: '00:00',endtime: '00:00', percent: '17%'}
  ])

  const TotalEntireTime = () => {
    let totalSeconds = 0;
    calenderList.forEach(study => {
        const [hours, minutes, seconds] = study.entiretime.split(':').map(Number);
        totalSeconds += hours * 3600 + minutes * 60 + seconds;
    });
    const formattedTotalTime = `${('0' + Math.floor(totalSeconds / 3600)).slice(-2)}:${('0' + Math.floor((totalSeconds % 3600) / 60)).slice(-2)}:${('0' + (totalSeconds % 60)).slice(-2)}`;
    return formattedTotalTime;
};
  
    return (
        <Container isOpen={isOpen} selectedDate={selectedDate}>
            <UpperWrapper>
                <TimeRecodingWrapper>
                    <TodayDate>{dayjs(selectedDate).format("YYYY.MM.DD")}</TodayDate>
                    <TodayText>총 학습 시간</TodayText>
                    <TotalTime>{TotalEntireTime()}</TotalTime>
                </TimeRecodingWrapper>
                </UpperWrapper>
                <MainWrapper>
                    <GrapWrapper>
                        <PieChart calenderList={calenderList}/>
                    </GrapWrapper>
                    <ListWrapper >
                     {calenderList.map((study)=> ( 
                        <List key={study.id}>
                            <Time>{study.entiretime}</Time>
                            <PerCent>{study.percent}</PerCent>
                         </List>
                        ))}
                        </ListWrapper>
                </MainWrapper>
        </Container>
    )
  }
  
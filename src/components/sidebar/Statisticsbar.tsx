import styled from 'styled-components'
import { CgLoadbar } from "react-icons/cg";
import PieChart from '../PieChart.tsx'
import dayjs from 'dayjs';
import { useState } from 'react'

interface StatisticsBarProps {
    isOpen: boolean;
    selectedDate: Date | null;
  }

  interface calenderList {
    id: number
    studyName: string
    entiretime : string
    starttime : string
    endtime : string
  }


const Container = styled.div<StatisticsBarProps>`
display: flex;
flex-direction: column;
align-items: center;
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '15%' : '-42%')}; // isOpen 상태에 따라 오른쪽에서 나오거나 숨김
  width: 42%;
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
width: 100%;
height: 60%;
`
const GrapWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 60%;
height: 100%;
margin-left: 50px;
`
const ListWrapper = styled.div`
display: flex;
flex-direction: column;
width: 40%;
margin-right: 50px;
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

    const [calenderList, setCalenderList] = useState<calenderList[]>([
        { id: 1, studyName: '졸작', entiretime: '01:10:00',starttime: '00:00',endtime: '00:00'},
        { id: 2, studyName: '학교 과제', entiretime: '00:32:52', starttime: '00:00',endtime: '00:00'},
        { id: 3, studyName: '코딩테스트', entiretime: '00:25:40', starttime: '00:00',endtime: '00:00'},
        { id: 4, studyName: '온라인 강의', entiretime: '02:33:04', starttime: '00:00',endtime: '00:00'}
      ])
    
    return (
        <Container isOpen={isOpen} selectedDate={selectedDate}>
            <UpperWrapper>
                <TimeRecodingWrapper>
                    <TodayDate>{dayjs(selectedDate).format("YYYY.MM.DD")}</TodayDate>
                    <TodayText>총 학습 시간</TodayText>
                    <TotalTime>03:12:20</TotalTime>
                </TimeRecodingWrapper>
                </UpperWrapper>
                <MainWrapper>
                    <GrapWrapper>
                        <PieChart calenderList={calenderList}/>
                    </GrapWrapper>
                    <ListWrapper >
                    {calenderList.map((calender)=> ( 
                        <List key={calender.id}>
                            <Time>{calender.entiretime}</Time>
                            <PerCent>58%</PerCent>
                         </List>
                        ))}
                        </ListWrapper>
                </MainWrapper>
        </Container>
    )
  }
  
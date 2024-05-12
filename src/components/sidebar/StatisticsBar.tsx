import styled from 'styled-components'
import PieChart from '../PieChart.tsx'
import dayjs from 'dayjs';
import { useEffect } from 'react'
import axios from 'axios';
import {useApiUrlStore, useCalenderListState} from '../../store/store.ts'

interface StatisticsBarProps {
    isOpen: boolean;
    selectedDate: Date | null;
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
  
  const {calenderList, setCalenderList} = useCalenderListState()
  const {apiUrl} = useApiUrlStore()

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


  const TotalEntireTime = () => {
    let totalSeconds = 0;
    calenderList.forEach(study => {
        const [hours, minutes, seconds] = study.entireTime.split(':').map(Number);
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
                            <Time>{study.entireTime}</Time>
                         </List>
                        ))}
                        </ListWrapper>
                </MainWrapper>
        </Container>
    )
  }
  
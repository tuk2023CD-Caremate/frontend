import styled from 'styled-components'
import { CgLoadbar } from "react-icons/cg";
import PieChart from '../PieChart.tsx'

interface StatisticsBarProps {
    isOpen: boolean;
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
width: 30%;
height: 100%;
margin-left: 50px;
`
const ListWrapper = styled.div`
display: flex;
flex-direction: column;
width: 70%;
margin-right: 50px;
`
const List = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`
const Tag = styled.div`
width: 40%;
display: flex;
margin-left: 30px;;
`
const Name = styled.div`
font-size: 30px;
font-weight: bold;
`
const Time = styled.div`
font-size: 30px;
font-weight: bold;
`
const PerCent = styled.div`
font-size: 30px;
font-weight: bold;
`

export default function StatisticsBar({ isOpen }: StatisticsBarProps) {
    
    return (
        <Container isOpen={isOpen}>
            <UpperWrapper>
                <TimeRecodingWrapper>
                    <TodayDate>2024. 04. 22</TodayDate>
                    <TodayText>총 학습 시간</TodayText>
                    <TotalTime>03:12:20</TotalTime>
                </TimeRecodingWrapper>
                </UpperWrapper>
                <MainWrapper>
                    <GrapWrapper>
                        <PieChart/>
                    </GrapWrapper>
                    <ListWrapper>
                        <List>
                            <Tag>
                                <div style={{ transform: 'rotate(90deg)' }}>
                                <CgLoadbar size="50" color='#7AC0F2'/>
                                </div>
                                <Name>코딩 테스트</Name>
                            </Tag>
                           
                            <Time>01:02:17</Time>
                            <PerCent>58%</PerCent>
                         </List>
                         <List>
                            <Tag>
                                <div style={{ transform: 'rotate(90deg)' }}>
                                <CgLoadbar size="50" color='#D75983'/>
                                </div>
                                <Name>프로젝트</Name>
                            </Tag>
                            <Time>01:19:10</Time>
                            <PerCent>42%</PerCent>
                        </List>
                        </ListWrapper>
                </MainWrapper>
        </Container>
    )
  }
  
import styled from 'styled-components'
import Header2 from '../components/Header2.tsx'
import Navbar2 from '../components/Navbar2.tsx'
import calender from '../assets/images/calender.png'
import playIcon from '../assets/images/play.png'
import StudyPostingModal from '../components/StudyPostingModal'
import { useState } from 'react'

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

const Calender = styled.img`
  display: flex;
  width: 600px;
  height: 500px;
  margin-top: 20px;
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 850px;
  margin-top: 30px;
`

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  height: 80px;
  padding-bottom: 30px;
`
const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 80px;
  font-size: 32px;
  font-weight: bold;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;
`
const StudyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  min-height: 550px;
  padding: 20px;
  border-left: 1px solid #bdbdbd;
  border-right: 1px solid #bdbdbd;
`

const StudyList = styled.div`
  display: flex;
  align-items: center;
  width: 750px;
  height: 110px;
  border-bottom: 1px solid #bdbdbd;
`

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
`

const StatusIcon = styled.img`
  width: 80px;
  height: 80px;
`

const ListInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 650px;
  height: 80px;
  padding: 15px;
`

const StudyName = styled.div`
  display: flex;
  align-items: center;
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
  font-weight: bold;
  color: #bdbdbd;
`

function StudyPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const OpenModal = () => {
    setModalOpen(true)
  }
  const CloseModal = () => {
    setModalOpen(false)
  }

  const studylist = [
    { id: 1, name: 'js 코딩', time: '00:00:00' },
    { id: 2, name: '영어 회화 공부', time: '00:00:00' },
    { id: 3, name: '졸업 작품 UI', time: '02:12:10' },
  ]

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <StudyWrapper>
          <LeftWrapper>
            <TimeRecodingWrapper>
              <TodayText>오늘 총 공부 시간</TodayText>
              <TotalTime>02:12:10</TotalTime>
            </TimeRecodingWrapper>
            <Calender src={calender} />
          </LeftWrapper>
          <RightWrapper>
            <BtnWrapper>
              <Btn>과목 추가</Btn>
            </BtnWrapper>
            <StudyListWrapper>
              {studylist.map((study) => (
                <StudyList key={study.id}>
                  <IconWrapper>
                    <StatusIcon src={playIcon} />
                  </IconWrapper>
                  <ListInfoWrapper>
                    <StudyName onClick={OpenModal}>{study.name}</StudyName>
                    <StudyingTime>{study.time}</StudyingTime>
                  </ListInfoWrapper>
                </StudyList>
              ))}
            </StudyListWrapper>
          </RightWrapper>
        </StudyWrapper>
      </Container>
        {modalOpen && (<StudyPostingModal CloseModal={CloseModal} />)}
    </div>
  )
}
export default StudyPage

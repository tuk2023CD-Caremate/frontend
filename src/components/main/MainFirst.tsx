import { keyframes, styled } from 'styled-components'
import onboarding1 from '../../assets/images/onboarding1.png'

const Container = styled.div`
  background-image: url(${onboarding1});
  width: 100dvw;
  height: calc(100vh - 110px);
  background-size: cover;
`

const textSlide1 = keyframes`
  0% {
    top: 220px;
    opacity: 0;
  }

  100% {
      top: 200px;
      opacity: 1;
  }
`

const textSlide2 = keyframes`
  0% {
    top: 60px;
    opacity: 0;
  }
  100% {
    top: 40px;
    opacity: 1;
  }
`

const Slogan1 = styled.div`
  position: relative;
  left: 140px;
  color: #ffffff;
  width: 760px;
  height: 330px;
  font-size: 120px;
  letter-spacing: 15px;
  font-weight: bold;

  animation: ${textSlide1} 1s ease-out;

  animation-fill-mode: forwards;
`

const Slogan2 = styled.div`
  position: relative;
  left: 140px;
  color: #ffffff;
  width: 780px;
  height: 308px;
  font-size: 36px;

  letter-spacing: 0.8px;
  font-weight: bold;

  animation: ${textSlide2} 1.8s ease-out;
  animation-fill-mode: forwards;
`

function MainFirst() {
  return (
    <div>
      <Container>
        <Slogan1>스터디 메이트</Slogan1>
        <Slogan2>
          스터디 메이트는 각 개인의 학습에 맞춤화된 서비스로 효과적인 학습을 촉진합니다. 지금
          시작하세요 !
        </Slogan2>
      </Container>
    </div>
  )
}

export default MainFirst

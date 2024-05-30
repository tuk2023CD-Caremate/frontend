import { keyframes, styled } from 'styled-components'
import onboarding1 from '../../assets/images/onboarding1.png'

const textSlide1 = keyframes`
  0% {
    top: 13.75rem;
    opacity: 0;
  }

  100% {
      top: 12.5rem;
      opacity: 1;
  }
`

const textSlide2 = keyframes`
  0% {
    top: 3.75rem;
    opacity: 0;
  }
  100% {
    top: 2.5rem;
    opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${onboarding1});
  width: 100dvw;
  height: 100dvh;
  background-size: cover;
  position: relative;
`

const SloganWrap = styled.div`
  display: flex;
  position: absolute;
  left: 8%;
  top: 25%;
  flex-direction: column;
`

const Slogan1 = styled.div`
  display: flex;
  color: #ffffff;
  width: 47.5rem;
  height: 12.5rem;
  font-size: 7.5rem;
  letter-spacing: 1rem;
  font-weight: bold;

  animation: ${textSlide1} 1s ease-out;
  animation-fill-mode: forwards;
`

const Slogan2 = styled.div`
  display: flex;
  color: #ffffff;
  width: 48.75rem;
  height: 12.5rem;
  font-size: 2.25rem;
  letter-spacing: 0.8px;
  font-weight: bold;

  animation: ${textSlide2} 1.8s ease-out;
  animation-fill-mode: forwards;
`

function MainFirst() {
  return (
    <div>
      <Container>
        <SloganWrap>
          <Slogan1>스터디 메이트</Slogan1>
          <Slogan2>
            스터디 메이트는 각 개인의 학습에 맞춤화된 서비스로 효과적인 학습을 촉진합니다. 지금
            시작하세요 !
          </Slogan2>
        </SloganWrap>
      </Container>
    </div>
  )
}

export default MainFirst

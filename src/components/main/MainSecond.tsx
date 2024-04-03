import { useRef } from 'react'
import { styled } from 'styled-components'
import onboard_text_1 from '../../assets/images/onboard_text_1.png'
import onboard_text_2 from '../../assets/images/onboard_text_2.png'
import onboard_img_1 from '../../assets/images/onboard_img_1.png'
import useOnScreen from './useOnScreen.ts'

interface OnboardProps {
  isVisible?: boolean
}

const Container = styled.div`
  background-color: #f4eef4;
  width: 100vw;
  height: 100vh;
  position: relative;
`

const OnboardWrap = styled.div<OnboardProps>`
  position: absolute;
  left: 5%;
  top: 20%;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 3s ease;
`

const Onboard1 = styled.img`
  margin: 30px;
`

const Onboard2 = styled.img`
  margin: 30px;
`

const ImgWrap = styled.div<OnboardProps>`
  position: absolute;
  right: 5%;
  top: 25%;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1.5s ease;
`

const OnbardImg = styled.img``

function MainSecond() {
  const onboardWrapRef = useRef<HTMLDivElement>(null!)
  const isVisible = useOnScreen(onboardWrapRef)

  return (
    <Container>
      <OnboardWrap ref={onboardWrapRef} isVisible={isVisible}>
        <Onboard1 src={onboard_text_1} />
        <Onboard2 src={onboard_text_2} />
      </OnboardWrap>
      <ImgWrap ref={onboardWrapRef} isVisible={isVisible}>
        <OnbardImg src={onboard_img_1} />
      </ImgWrap>
    </Container>
  )
}

export default MainSecond

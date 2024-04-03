import { useRef } from 'react'
import { styled } from 'styled-components'
import onboard_text_3 from '../../assets/images/onboard_text_3.png'
import onboard_text_4 from '../../assets/images/onboard_text_4.png'
import onboard_img_2 from '../../assets/images/onboard_img_2.png'
import useOnScreen from './useOnScreen.ts'

interface OnboardProps {
  isVisible?: boolean
}

const Container = styled.div`
  background-color: #f7f7f7;
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

function MainThird() {
  const onboardWrapRef = useRef<HTMLDivElement>(null!)
  const isVisible = useOnScreen(onboardWrapRef)

  return (
    <Container>
      <OnboardWrap ref={onboardWrapRef} isVisible={isVisible}>
        <Onboard1 src={onboard_text_3} />
        <Onboard2 src={onboard_text_4} />
      </OnboardWrap>
      <ImgWrap ref={onboardWrapRef} isVisible={isVisible}>
        <OnbardImg src={onboard_img_2} />
      </ImgWrap>
    </Container>
  )
}

export default MainThird

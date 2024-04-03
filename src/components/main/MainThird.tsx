import { styled } from 'styled-components'
import onboard_text_3 from '../../assets/images/onboard_text_3.png'
import onboard_text_4 from '../../assets/images/onboard_text_4.png'
import onboard_img_2 from '../../assets/images/onboard_img_2.png'

const Container = styled.div`
  background-color: #f7f7f7;
  width: 100vw;
  height: 100vh;
  position: relative;
`

const OnboardWrap = styled.div`
  position: absolute;
  left: 5%;
  top: 20%;
`
const Onboard1 = styled.img`
  margin: 30px;
`
const Onboard2 = styled.img`
  margin: 30px;
`
const OnbardImg = styled.img`
  position: absolute;
  right: 5%;
  top: 25%;
`

function MainThird() {
  return (
    <div>
      <Container>
        <OnboardWrap>
          <Onboard1 src={onboard_text_3} />
          <Onboard2 src={onboard_text_4} />
        </OnboardWrap>
        <OnbardImg src={onboard_img_2} />
      </Container>
    </div>
  )
}

export default MainThird

import { styled } from 'styled-components'
import onboard_text_5 from '../../assets/images/onboard_text_5.png'
import onboard_text_6 from '../../assets/images/onboard_text_6.png'
import onboard_img_3 from '../../assets/images/onboard_img_3.png'

const Container = styled.div`
  background-color: #f4eef4;
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

function MainFourth() {
  return (
    <div>
      <Container>
        <OnboardWrap>
          <Onboard1 src={onboard_text_5} />
          <Onboard2 src={onboard_text_6} />
        </OnboardWrap>
        <OnbardImg src={onboard_img_3} />
      </Container>
    </div>
  )
}

export default MainFourth

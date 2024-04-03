import { styled } from 'styled-components'
import onboard_text_3 from '../../assets/images/onboard_text_3.png'
import onboard_text_4 from '../../assets/images/onboard_text_4.png'
import onboard_img_2 from '../../assets/images/onboard_img_2.png'

const Container = styled.div`
  background-color: #f7f7f7;
  width: 100dvw;
  height: 100dvh;
  background-size: cover;
`

const Onboard1 = styled.img`
  position: relative;
  left: 120px;
  top: 220px;
`
const Onboard2 = styled.img`
  position: relative;
  left: 120px;
  top: 250px;
`
const OnbardImg = styled.img`
  position: relative;
  left: 1000px;
  top: 100px;
`

function MainThird() {
  return (
    <div>
      <Container>
        <Onboard1 src={onboard_text_3} />
        <Onboard2 src={onboard_text_4} />
        <OnbardImg src={onboard_img_2} />
      </Container>
    </div>
  )
}

export default MainThird

import { styled } from 'styled-components'
import onboard_text_1 from '../../assets/images/onboard_text_1.png'
import onboard_text_2 from '../../assets/images/onboard_text_2.png'
import onboard_img_1 from '../../assets/images/onboard_img_1.png'

const Container = styled.div`
  background-color: #f4eef4;
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

function MainSecond() {
  return (
    <div>
      <Container>
        <Onboard1 src={onboard_text_1} />
        <Onboard2 src={onboard_text_2} />
        <OnbardImg src={onboard_img_1} />
      </Container>
    </div>
  )
}

export default MainSecond
